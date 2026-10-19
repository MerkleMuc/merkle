'use strict';
/* Härtung: Screenshots in drei Breiten, axe-core, Kontrastregel,
   Überschriftenhierarchie, Alt-Texte, interne Links. */

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:4321';
const SHOTS = path.join(__dirname, 'docs', 'screenshots');
const WIDTHS = [375, 768, 1440];
/* --noshots überspringt die Vollbildaufnahmen: dieselben Prüfungen,
   deutlich kürzere Laufzeit während der Entwicklung. */
const NOSHOTS = process.argv.includes('--noshots');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

function urls() {
  const site = path.join(__dirname, 'site');
  const out = [];
  (function walk(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === 'assets') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, rel + '/' + e.name);
      else if (e.name === 'index.html') out.push((rel || '') + '/');
      else if (e.name === '404.html') out.push('/404.html');
    }
  })(site, '');
  return out.sort();
}

/* Zählt Text- und Bildelemente im <main>, deren effektive Deckkraft über
   alle Vorfahren hinweg praktisch null ist. Optional nur oberhalb des Viewports. */
const HIDDEN_FN = (onlyAbove) => {
  const main = document.querySelector('main');
  if (!main) return 0;
  const cache = new Map();
  const eff = el => {
    if (!el || el === document.documentElement) return 1;
    if (cache.has(el)) return cache.get(el);
    const v = parseFloat(getComputedStyle(el).opacity) * eff(el.parentElement);
    cache.set(el, v);
    return v;
  };
  let n = 0;
  main.querySelectorAll('*').forEach(el => {
    const hasText = Array.from(el.childNodes).some(c => c.nodeType === 3 && c.textContent.trim());
    if (!hasText && el.tagName !== 'IMG') return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (el.closest('[hidden]')) return;
    /* Inaktive Registerbilder sind für die Überblendung bewusst unsichtbar. */
    if (el.matches('.mk-register__img:not(.is-active)')) return;
    /* Die Bayern-Karte ist dekorativ und aria-hidden. Ihre Sprechblasen
       leuchten nacheinander auf, sie sind kein verborgener Inhalt. */
    if (el.closest('[data-bayern]')) return;
    if (onlyAbove && r.bottom >= 0) return;
    if (eff(el) < 0.05) n++;
  });
  return n;
};

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const list = urls();
  const report = { pages: [], violations: [], contrast: [], structure: [], links: [], console: [], hidden: [], robust: [] };
  const seenLinks = new Map();

  for (const u of list) {
    const slug = (u === '/' ? 'home' : u.replace(/^\/|\/$/g, '').replace(/[\/.]/g, '-')) || 'home';

    for (const w of WIDTHS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
      const page = await ctx.newPage();
      const errs = [];
      page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
      page.on('pageerror', e => errs.push(String(e)));

      const resp = await page.goto(BASE + u, { waitUntil: 'networkidle' });
      /* Durchscrollen, damit loading="lazy" und der Reveal auslösen. Sofort,
         nicht weich: html trägt scroll-behavior:smooth, jede Animation würde
         vom nächsten Schritt abgebrochen und lange Seiten nie bis unten laufen. */
      await page.evaluate(async () => {
        const go = y => window.scrollTo({ top: y, left: 0, behavior: 'instant' });
        const max = () => document.documentElement.scrollHeight - window.innerHeight;
        for (let y = 0; y < max(); y += 600) { go(y); await new Promise(r => setTimeout(r, 90)); }
        go(max()); await new Promise(r => setTimeout(r, 250));
        go(0);
      });
      await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 15000 }).catch(() => {});
      /* Reveal-Transitions dauern bis zu 700 ms plus 280 ms Staffelung. */
      await page.waitForTimeout(1300);
      /* Schnelles Durchscrollen muss jeden Inhalt sichtbar gemacht haben.
         Sonst wären Screenshots leer und axe prüfte den Kontrast nicht. */
      const hidden = await page.evaluate(HIDDEN_FN, false);
      if (hidden) report.hidden.push({ url: u, w, hidden });
      if (!NOSHOTS) await page.screenshot({ path: path.join(SHOTS, `${slug}-${w}.png`), fullPage: true });

      if (errs.length) report.console.push({ url: u, w, errs });

      /* axe-core in der kleinsten und der größten Breite: horizontale
         Scrollbereiche und umbrechende Layouts entstehen nur mobil. */
      if (w === 375 || w === 1440) {
        await page.evaluate(AXE);
        const res = await page.evaluate(async () => await window.axe.run(document, {
          runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] }
        }));
        res.violations.forEach(v => report.violations.push({
          url: u + ' @' + w, id: v.id, impact: v.impact, help: v.help,
          nodes: v.nodes.slice(0, 3).map(n => n.html.slice(0, 160))
        }));
      }

      if (w === 1440) {
        report.pages.push({ url: u, status: resp ? resp.status() : 0 });

        /* Kontrastregel: --mk-teal (#21B2BA) erreicht auf Weiß nur 2,58:1
           und darf deshalb in keiner Größe Textfarbe sein. */
        const bad = await page.evaluate(() => {
          const out = [];
          document.querySelectorAll('*').forEach(el => {
            if (!el.childNodes.length) return;
            const hasText = Array.from(el.childNodes).some(n => n.nodeType === 3 && n.textContent.trim());
            if (!hasText) return;
            const cs = getComputedStyle(el);
            const size = parseFloat(cs.fontSize);
            if (cs.color.replace(/\s/g, '') === 'rgb(33,178,186)') {
              out.push({ tag: el.tagName, size, text: el.textContent.trim().slice(0, 60) });
            }
          });
          return out;
        });
        bad.forEach(b => report.contrast.push(Object.assign({ url: u }, b)));

        /* Struktur: genau ein h1, lückenlose Hierarchie, Alt-Texte, radius 0 */
        const struct = await page.evaluate(() => {
          const hs = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
          const levels = hs.map(h => +h.tagName[1]);
          const gaps = [];
          for (let i = 1; i < levels.length; i++) {
            if (levels[i] > levels[i - 1] + 1) gaps.push(hs[i - 1].tagName + ' → ' + hs[i].tagName + ': ' + hs[i].textContent.trim().slice(0, 40));
          }
          const imgs = Array.from(document.images);
          const noAlt = imgs.filter(i => !i.hasAttribute('alt')).map(i => i.currentSrc || i.src);
          const noDims = imgs.filter(i => !i.hasAttribute('width') || !i.hasAttribute('height')).map(i => (i.currentSrc || i.src).split('/').pop());
          const filenameAlt = imgs.filter(i => /\.(jpg|png|webp|avif)$|^\d{8}[\s-]/i.test(i.alt || '')).map(i => i.alt);
          /* Radius-Skala: kantig. Erlaubt ist 0 — rund ist nur, was man
             anklickt, und das sind Pill-Werte ab 100 px. */
          const ALLOWED = [0];
          /* Einzige begründete Ausnahme: die Sprechblase der Beraterkarte. */
          const AUSNAHME = '.mk-berater__bubble';
          const radii = [];
          document.querySelectorAll('*').forEach(el => {
            if (el.closest(AUSNAHME)) return false;
            const r = getComputedStyle(el).borderRadius;
            if (!r) return;
            const values = r.split('/')[0].trim().split(/\s+/);
            const bad = values.filter(v => {
              if (v.endsWith('%')) return parseFloat(v) !== 0 && parseFloat(v) < 50;
              const n = Math.round(parseFloat(v));
              if (isNaN(n)) return false;
              return n >= 100 ? false : ALLOWED.indexOf(n) === -1;
            });
            if (bad.length) radii.push(el.tagName + '.' + (typeof el.className === 'string' ? el.className : '') + ' → ' + r);
          });
          return {
            h1: document.querySelectorAll('h1').length,
            gaps, noAlt, noDims, filenameAlt,
            radii: Array.from(new Set(radii)).slice(0, 5),
            lang: document.documentElement.lang,
            title: document.title.length,
            desc: (document.querySelector('meta[name=description]') || {}).content
              ? document.querySelector('meta[name=description]').content.length : 0,
            ogLocale: (document.querySelector('meta[property="og:locale"]') || {}).content || '',
            jsonld: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(s => {
              try { JSON.parse(s.textContent); return 'ok'; } catch (e) { return 'PARSE-ERROR'; }
            })
          };
        });
        report.structure.push(Object.assign({ url: u }, struct));

        /* interne Links sammeln */
        const hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]'))
          .map(a => a.getAttribute('href')).filter(h => h && !/^(https?:|tel:|mailto:|#)/.test(h)));
        hrefs.forEach(h => {
          const clean = h.split('#')[0];
          if (!clean) return;
          if (!seenLinks.has(clean)) seenLinks.set(clean, new Set());
          seenLinks.get(clean).add(u);
        });
      }

      await ctx.close();
    }
    process.stdout.write('.');
  }

  /* Linkprüfung */
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  for (const [href, from] of seenLinks) {
    const r = await page.request.get(BASE + href).catch(() => null);
    const status = r ? r.status() : 0;
    if (status !== 200) report.links.push({ href, status, from: Array.from(from).slice(0, 3) });
  }
  await ctx.close();

  /* Robustheit des Scroll-Reveals: Inhalt darf in keinem Fall verborgen bleiben. */
  async function robust(label, url, opts) {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: opts.js !== false });
    if (opts.init) await c.addInitScript(opts.init);
    const pg = await c.newPage();
    if (opts.block) await pg.route('**/merkle.js*', r => r.abort());
    await pg.goto(BASE + url, { waitUntil: 'load' });
    await pg.waitForTimeout(opts.wait || 1500);
    const n = await pg.evaluate(HIDDEN_FN, !!opts.onlyAbove);
    report.robust.push({ label, url, hidden: n });
    await c.close();
  }
  await robust('Ankersprung, Inhalt oberhalb', '/gas/#tauschsystem', { onlyAbove: true });
  await robust('JavaScript deaktiviert', '/', { js: false });
  await robust('merkle.js nicht geladen', '/', { block: true, wait: 3600 });
  await robust('ohne IntersectionObserver', '/', { init: () => { delete window.IntersectionObserver; }, wait: 1500 });

  await browser.close();

  fs.writeFileSync(path.join(__dirname, 'docs', 'qa-report.json'), JSON.stringify(report, null, 1));

  console.log('\n\n=== QA ===');
  console.log('Seiten:', report.pages.length, '· Screenshots:', report.pages.length * WIDTHS.length);
  console.log('\naxe-Verstöße (375 und 1440 px):', report.violations.length);
  const byId = {};
  report.violations.forEach(v => { byId[v.id] = byId[v.id] || { n: 0, impact: v.impact, help: v.help, ex: v.nodes[0] }; byId[v.id].n++; });
  Object.entries(byId).forEach(([id, v]) => console.log(`  ${id} (${v.impact}) ×${v.n} — ${v.help}\n    ${v.ex}`));

  console.log('\nKontrastregel (Türkis #21B2BA als Textfarbe):', report.contrast.length);
  report.contrast.slice(0, 8).forEach(c => console.log('  ', c.url, c.tag, c.size + 'px', c.text));

  console.log('\nDefekte interne Links:', report.links.length);
  report.links.forEach(l => console.log('  ', l.status, l.href, '←', l.from.join(', ')));

  console.log('\nStruktur:');
  report.structure.forEach(s => {
    const p = [];
    if (s.h1 !== 1) p.push('h1=' + s.h1);
    if (s.gaps.length) p.push('Hierarchielücke: ' + s.gaps.join(' | '));
    if (s.noAlt.length) p.push('ohne alt: ' + s.noAlt.length);
    if (s.noDims.length) p.push('ohne width/height: ' + s.noDims.slice(0, 3).join(', '));
    if (s.filenameAlt.length) p.push('Dateiname als alt: ' + s.filenameAlt.join(' | '));
    if (s.radii.length) p.push('Radius außerhalb der Skala: ' + s.radii.join(' | '));
    if (s.title > 60) p.push('Title ' + s.title + ' Zeichen');
    if (s.desc > 155) p.push('Description ' + s.desc + ' Zeichen');
    if (s.ogLocale !== 'de_DE' && s.ogLocale !== 'en_US') p.push('og:locale=' + s.ogLocale);
    if (s.jsonld.includes('PARSE-ERROR')) p.push('JSON-LD kaputt');
    if (p.length) console.log('  ', s.url, '→', p.join(' · '));
  });

  console.log('\nKonsolenfehler:', report.console.length);
  report.console.slice(0, 6).forEach(c => console.log('  ', c.url, c.w, c.errs[0]));

  console.log('\nUnsichtbarer Inhalt nach schnellem Durchscrollen:', report.hidden.length ? '' : '0');
  report.hidden.forEach(h => console.log('  ', h.url, h.w + 'px', h.hidden, 'Elemente'));
  console.log('\nRobustheit Scroll-Reveal:');
  report.robust.forEach(r => console.log('  ', (r.hidden ? 'FEHLER ' : 'ok     ') + r.label.padEnd(32), r.url, '→', r.hidden, 'verborgen'));

  /* Bestands-URLs: erreichbar oder 301 */
  const bestand = fs.readFileSync(path.join(__dirname, '_bestand', 'urls.txt'), 'utf8')
    .trim().split(/\r?\n/).map(u => u.replace('https://www.merkle-muenchen.de', ''));
  const built = new Set(list);
  built.add('/suche/');
  const redir = new Map(fs.readFileSync(path.join(__dirname, 'site', '_redirects'), 'utf8')
    .trim().split('\n').filter(l => !l.startsWith('/*'))
    .map(l => { const p = l.trim().split(/\s+/); return [p[0], p[1]]; }));
  const orphan = bestand.filter(u => !built.has(u) && !redir.has(u));
  console.log('\nBestands-URLs:', bestand.length,
    '· erreichbar oder 301:', bestand.length - orphan.length,
    '· ungeklärt:', orphan.length);
  orphan.forEach(o => console.log('  ', o));
})();
