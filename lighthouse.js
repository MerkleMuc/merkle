'use strict';
/* Lighthouse (mobil, 4G-Drosselung) über eine echte Chrome-Instanz.
   Playwrights gebündeltes Chromium meldet im Headless-Betrieb auf manchen
   Seiten keinen LCP-Kandidaten — Lighthouse liefert dann für die ganze
   Kategorie null, obwohl mit der Seite nichts ist. Deshalb startet dieser
   Prüfstand Chrome über chrome-launcher, das Lighthouse ohnehin mitbringt. */

const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE || 'http://localhost:4321';

/* Ohne Argument sechs Stichproben, mit --all jede gebaute Seite. */
function allUrls() {
  const site = path.join(__dirname, 'site');
  const out = [];
  (function walk(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name === 'assets') continue;
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p, rel + '/' + e.name);
      else if (e.name === 'index.html') out.push((rel || '') + '/');
    }
  })(site, '');
  return out.sort();
}

const args = process.argv.slice(2);
const eigene = args.filter(a => a[0] === '/');
const PAGES = args.includes('--all') ? allUrls()
  : (eigene.length ? eigene
    : ['/', '/schweissgeraete/', '/gas/', '/ueber-uns/', '/kontakt/', '/impressum/']);

(async () => {
  const lighthouse = (await import('lighthouse')).default;
  const chromeLauncher = await import('chrome-launcher');

  const opts = {
    output: 'json',
    logLevel: 'silent',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
    throttling: {
      rttMs: 150, throughputKbps: 1638.4, cpuSlowdownMultiplier: 4,
      requestLatencyMs: 562.5, downloadThroughputKbps: 1474.56, uploadThroughputKbps: 675
    }
  };

  let chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  const rows = [];
  let wiederholt = 0;

  for (const u of PAGES) {
    let res = await lighthouse(BASE + u, Object.assign({ port: chrome.port }, opts));
    /* Bleibt die Kategorie leer, war es ein Messfehler: einmal mit frischem
       Browser wiederholen, bevor eine Zahl in der Tabelle landet. */
    if (res.lhr.categories.performance.score === null) {
      await chrome.kill();
      chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
      res = await lighthouse(BASE + u, Object.assign({ port: chrome.port }, opts));
      wiederholt++;
    }

    const c = res.lhr.categories;
    const a = res.lhr.audits;
    rows.push({
      url: u,
      perf: c.performance.score === null ? null : Math.round(c.performance.score * 100),
      a11y: Math.round(c.accessibility.score * 100),
      bp: Math.round(c['best-practices'].score * 100),
      seo: Math.round(c.seo.score * 100),
      lcp: a['largest-contentful-paint'].displayValue || '',
      cls: a['cumulative-layout-shift'].displayValue || '',
      tbt: a['total-blocking-time'].displayValue || '',
      failedA11y: Object.values(a).filter(x => x.score === 0 && x.scoreDisplayMode === 'binary'
        && c.accessibility.auditRefs.some(r => r.id === x.id)).map(x => x.id)
    });
    process.stdout.write('.');
  }

  await chrome.kill();
  fs.writeFileSync(path.join(__dirname, 'docs', 'lighthouse.json'), JSON.stringify(rows, null, 1));

  console.log('\n\n=== Lighthouse (mobil, 4G-Drosselung) ===');
  console.log('Seite'.padEnd(44), 'Perf', 'A11y', 'BP', 'SEO', ' LCP', '     CLS', '   TBT');
  rows.forEach(r => console.log(
    r.url.padEnd(44),
    String(r.perf === null ? 'n/v' : r.perf).padStart(4),
    String(r.a11y).padStart(4), String(r.bp).padStart(3), String(r.seo).padStart(4),
    r.lcp.padStart(6), r.cls.padStart(8), r.tbt.padStart(7)
  ));

  const messbar = rows.filter(r => r.perf !== null).map(r => r.perf);
  console.log('\nPerformance: ' + Math.min.apply(null, messbar) + ' bis ' + Math.max.apply(null, messbar)
    + ' auf ' + messbar.length + ' von ' + rows.length + ' Seiten'
    + (wiederholt ? ' (' + wiederholt + ' einmal wiederholt)' : ''));

  const fails = rows.flatMap(r => r.failedA11y.map(f => r.url + ': ' + f));
  if (fails.length) { console.log('\nFehlgeschlagene A11y-Audits:'); fails.forEach(f => console.log('  ' + f)); }
})().catch(e => { console.error(e); process.exit(1); });
