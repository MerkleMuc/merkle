'use strict';
/* Build: Bildderivate, Seiten, Sitemap, robots.txt, Suchindex, Redirects.
   Ausgabe ist reines statisches HTML in ./site — ohne Laufzeitabhängigkeit. */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = path.join(ROOT, 'site');
/* Quelle: unbearbeitete Originale. Ziel: nur die Derivate im Deployment. */
const SRCIMG = path.join(ROOT, '_bestand', 'img-original');
const IMGDIR = path.join(SITE, 'assets', 'img');
const DERIV = path.join(IMGDIR, 'd');
const MANIFEST_FILE = path.join(ROOT, '_bestand', 'img-manifest.json');

const WIDTHS = [320, 640, 960, 1280, 1600, 1920];

/* ------------------------------------------------------------- Bildderivate */
async function buildImages(force) {
  let sharp;
  try { sharp = require('sharp'); }
  catch (e) {
    console.warn('! sharp nicht verfügbar — Bilder werden unverändert ausgeliefert.');
    return {};
  }

  if (!force && fs.existsSync(MANIFEST_FILE)) {
    return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
  }

  fs.mkdirSync(DERIV, { recursive: true });
  const manifest = {};
  const files = fs.readdirSync(SRCIMG)
    .filter(f => /\.(jpe?g|png)$/i.test(f))
    .filter(f => !/^logo/.test(f));

  let n = 0;
  for (const file of files) {
    const src = path.join(SRCIMG, file);
    const base = file.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]+/g, '-').toLowerCase();
    let meta;
    try { meta = await sharp(src, { failOn: 'none' }).metadata(); }
    catch (e) { console.warn('  ! übersprungen (Metadaten):', file, e.message); continue; }
    if (!meta.width || !meta.height) continue;

    const maxW = Math.min(meta.width, 1920);
    const maxH = Math.round(meta.height * maxW / meta.width);
    let widths = WIDTHS.filter(w => w <= maxW);
    if (!widths.length || widths[widths.length - 1] !== maxW) widths.push(maxW);
    widths = Array.from(new Set(widths)).sort((a, b) => a - b);

    const entry = { w: maxW, h: maxH, avif: [], webp: [], fallbackSet: [] };
    const hasAlpha = meta.hasAlpha === true;

    try {
      for (const w of widths) {
        const pipe = () => sharp(src, { failOn: 'none' }).resize({ width: w, withoutEnlargement: true });

        const avifName = `d/${base}-${w}.avif`;
        await pipe().avif({ quality: 50, effort: 4 }).toFile(path.join(IMGDIR, avifName));
        entry.avif.push({ name: avifName, w });

        const webpName = `d/${base}-${w}.webp`;
        await pipe().webp({ quality: 74 }).toFile(path.join(IMGDIR, webpName));
        entry.webp.push({ name: webpName, w });

        if (hasAlpha) {
          const pngName = `d/${base}-${w}.png`;
          await pipe().png({ compressionLevel: 9, palette: true }).toFile(path.join(IMGDIR, pngName));
          entry.fallbackSet.push({ name: pngName, w });
        } else {
          const jpgName = `d/${base}-${w}.jpg`;
          await pipe().jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(IMGDIR, jpgName));
          entry.fallbackSet.push({ name: jpgName, w });
        }
      }
    } catch (e) {
      console.warn('  ! übersprungen (Konvertierung):', file, e.message);
      continue;
    }

    entry.fallback = entry.fallbackSet[entry.fallbackSet.length - 1].name;
    manifest[file] = entry;
    n++;
    if (n % 20 === 0) process.stdout.write('  ' + n + '/' + files.length + '\n');
  }

  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 1));
  console.log('  ' + n + ' Bilder verarbeitet');
  return manifest;
}

/* ------------------------------------------------------------------- Seiten */
function collectPages() {
  const pages = [];
  const groups = [
    [require('./src/pages/home')],
    require('./src/pages/sortiment'),
    require('./src/pages/unternehmen'),
    require('./src/pages/finder'),
    require('./src/pages/en'),
    require('./src/pages/legal')
  ];
  groups.forEach(g => g.forEach(fn => pages.push(fn())));
  return pages;
}

/* --------------------------------------------------------- Zusatzdokumente */
function extraPages(pages) {
  const ui = require('./src/ui');
  const { EXTERN, TEL } = require('./src/data');
  const out = [];

  /* Suche */
  out.push({
    url: '/suche/',
    title: 'Suche | Merkle Schweißtechnik München',
    description: 'Durchsuchen Sie die Website von Merkle Schweißtechnik München nach Geräten, Verfahren, Gasen und Serviceleistungen.',
    noindex: true,
    crumbs: [{ label: 'Startseite', href: '/' }, { label: 'Suche', href: '/suche/' }],
    body: [
      ui.pageHero({ kicker: 'Suche', h1: 'Suche', sub: 'Diese Suche durchsucht die Seiten dieser Website. Produkte und Preise finden Sie im Online-Shop.' }),
      ui.breadcrumbs([{ label: 'Startseite', href: '/' }, { label: 'Suche', href: '/suche/' }]),
      `<section class="mk-section">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <form class="mk-search__form" role="search" data-sitesearch style="margin-bottom:40px">
          <label class="mk-sr" for="q">Suchbegriff</label>
          <input class="mk-search__input" type="search" id="q" name="q" placeholder="Wonach suchen Sie?" autocomplete="off">
          <button class="mk-btn mk-btn--primary" type="submit">Suchen</button>
        </form>
        <div id="results" aria-live="polite"></div>
        <noscript><p class="mk-note">Für die Suche wird JavaScript benötigt. Alle Seiten finden Sie auch in der <a href="/kontakt/sitemap/">Sitemap</a>.</p></noscript>
      </div>
    </div>
  </div>
</section>`,
      ui.contactband()
    ].join('\n\n'),
    extraScripts: '<script src="/assets/js/suche.js" defer></script>'
  });

  /* HTML-Sitemap */
  const groups = [
    { title: 'Sortiment', match: u => /^\/(schweissgeraete|zusatzwerkstoffe|schweisszubehoer|gas|wasser|water|durchfluss)/.test(u) },
    { title: 'Service und Standorte', match: u => /^\/(service|laden|standorte|kontakt)/.test(u) },
    { title: 'Unternehmen', match: u => /^\/(ueber-uns|jobs|aktuelles|bewertung|glossary)/.test(u) },
    { title: 'Rechtliches', match: u => /^\/(impressum|datenschutz|agb|ekb|nutzungsbedingungen)/.test(u) }
  ];
  const all = pages.concat(out);
  const cols = groups.map(g => {
    const links = all.filter(p => g.match(p.url))
      .sort((a, b) => a.url.localeCompare(b.url))
      .map(p => `<a href="${p.url}">${p.crumbs ? p.crumbs[p.crumbs.length - 1].label : p.title}</a>`)
      .join('\n        ');
    return `<div>\n        <h2>${g.title}</h2>\n        ${links}\n      </div>`;
  }).join('\n      ');

  out.push({
    url: '/kontakt/sitemap/',
    title: 'Sitemap | Merkle Schweißtechnik München',
    description: 'Alle Seiten von merkle-muenchen.de auf einen Blick: Sortiment, Service, Standorte, Unternehmen und Rechtliches.',
    crumbs: [{ label: 'Startseite', href: '/' }, { label: 'Kontakt', href: '/kontakt/' }, { label: 'Sitemap', href: '/kontakt/sitemap/' }],
    body: [
      ui.pageHero({ kicker: 'Übersicht', h1: 'Sitemap', sub: 'Alle Seiten dieser Website auf einen Blick.' }),
      ui.breadcrumbs([{ label: 'Startseite', href: '/' }, { label: 'Kontakt', href: '/kontakt/' }, { label: 'Sitemap', href: '/kontakt/sitemap/' }]),
      `<section class="mk-section">
  <div class="mk-container">
    <div class="mk-sitemap">
      ${cols}
      <div>
        <h2>Extern</h2>
        <a href="${EXTERN.shop}" target="_blank" rel="noopener">Merkle Online-Shop</a>
        <a href="${EXTERN.amazon}" target="_blank" rel="noopener">Amazon-Store</a>
        <a href="${EXTERN.kurse}" target="_blank" rel="noopener">Schweißkurse</a>
        <a href="${EXTERN.mieten}" target="_blank" rel="noopener">Mietgeräte</a>
        <a href="${EXTERN.gebraucht}" target="_blank" rel="noopener">Gebrauchtanlagen</a>
        <a href="${EXTERN.landshut}" target="_blank" rel="noopener">Merkle Landshut</a>
        <a href="${EXTERN.rosenheim}" target="_blank" rel="noopener">Merkle Rosenheim</a>
      </div>
    </div>
  </div>
</section>`,
      ui.contactband()
    ].join('\n\n')
  });

  /* 404 */
  out.push({
    url: '/404.html',
    file: '404.html',
    noindex: true,
    title: 'Seite nicht gefunden | Merkle Schweißtechnik München',
    description: 'Diese Seite wurde nicht gefunden.',
    body: `<section class="mk-container mk-404">
  <p class="mk-kicker">Fehler 404</p>
  <h1 class="mk-display">Diese Seite gibt es nicht.</h1>
  <p>Vielleicht hat sich die Adresse geändert oder ein Link ist veraltet. Über die Sitemap finden Sie alles, was es auf dieser Website gibt — oder Sie rufen kurz an, dann sagen wir Ihnen, wo es steht.</p>
  <div class="mk-btnrow">
    <a class="mk-btn mk-btn--primary" href="/">Zur Startseite</a>
    <a class="mk-btn mk-btn--outline" href="/kontakt/sitemap/">Zur Sitemap</a>
    <a class="mk-btn mk-btn--outline" href="${TEL.zentrale.href}">Anrufen: ${TEL.zentrale.text}</a>
  </div>
</section>
${ui.contactband()}`
  });

  return out;
}

/* ------------------------------------------------------------------ Schreiben */
function outPath(page) {
  if (page.file) return path.join(SITE, page.file);
  if (page.url === '/') return path.join(SITE, 'index.html');
  return path.join(SITE, page.url.replace(/^\/|\/$/g, ''), 'index.html');
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

/* --------------------------------------------------------------- Redirects */
const REDIRECTS = [
  ['/service-2/', '/service/', 301, 'Doppelung aufgelöst, /service/ ist kanonisch'],
  ['/404-2/', '/404.html', 301, 'WordPress-404-Seite auf statische 404 umgelegt'],
  ['/de/', '/', 301, 'Sprachpräfix der WPGlobus-Installation'],
  ['/de/schweissgeraete/', '/schweissgeraete/', 301, 'Sprachpräfix'],
  ['/de/schweissgeraete/plasma-schneidanlagen/', '/schweissgeraete/plasma-schneidanlagen/', 301, 'Canonical zeigte fälschlich auf /de/'],
  ['/fr/', '/', 301, 'Nicht gepflegte Sprachversion'],
  ['/fr/zusatzwerkstoffe/edelstahl/', '/zusatzwerkstoffe/edelstahl/', 301, 'Canonical zeigte fälschlich auf /fr/'],
  ['/es/', '/', 301, 'Nicht gepflegte Sprachversion'],
  ['/ru/', '/', 301, 'Nicht gepflegte Sprachversion'],
  ['/en/', '/', 301, 'Nicht gepflegte Sprachversion, Ausnahme: /water/ bleibt']
];

/* ------------------------------------------------------------------- Main */
async function main() {
  const force = process.argv.includes('--images');
  console.log('› Bilder');
  const manifest = await buildImages(force);

  const ui = require('./src/ui');
  ui.setManifest(manifest);
  const doc = require('./src/doc');
  const { SITE: S } = require('./src/data');

  console.log('› Seiten');
  const pages = collectPages();
  const extras = extraPages(pages);
  const all = pages.concat(extras);

  all.forEach(p => write(outPath(p), doc.document(p)));
  console.log('  ' + all.length + ' Seiten');

  /* Suchindex */
  const index = all
    .filter(p => !p.noindex && p.url !== '/404.html')
    .map(p => ({
      u: p.url,
      t: (p.crumbs ? p.crumbs[p.crumbs.length - 1].label : 'Startseite'),
      d: p.description || '',
      k: String(p.body).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ')
        .replace(/\s+/g, ' ').trim().slice(0, 1400)
    }));
  write(path.join(SITE, 'assets', 'js', 'suche-index.json'), JSON.stringify(index));

  /* Sitemap */
  const today = new Date().toISOString().slice(0, 10);
  const urls = all.filter(p => !p.noindex && p.url !== '/404.html')
    .map(p => `  <url>\n    <loc>${S.base}${p.url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n');
  write(path.join(SITE, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  /* robots.txt */
  write(path.join(SITE, 'robots.txt'),
    `User-agent: *\nAllow: /\nDisallow: /suche/\n\nSitemap: ${S.base}/sitemap.xml\n`);

  /* Favicon */
  write(path.join(SITE, 'assets', 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#1A1F22"/><path d="M6 24V8h4.6l5.4 9.3L21.4 8H26v16h-4V15.4l-4.4 7.4h-3.2L10 15.4V24z" fill="#2BB8C4"/></svg>\n`);

  /* Redirect-Liste */
  const csv = 'alt;neu;status;grund\n' + REDIRECTS.map(r => r.join(';')).join('\n') + '\n';
  write(path.join(ROOT, 'docs', 'redirects.csv'), csv);

  /* Serverkonfigurationen */
  write(path.join(SITE, '.htaccess'),
    'ErrorDocument 404 /404.html\n\n' +
    'RewriteEngine On\n' +
    REDIRECTS.map(r => `RewriteRule ^${r[0].replace(/^\//, '').replace(/\/$/, '/?')}$ ${r[1]} [R=301,L]`).join('\n') +
    '\n\n# Kanonisch mit www\nRewriteCond %{HTTP_HOST} !^www\\. [NC]\nRewriteRule ^(.*)$ https://www.merkle-muenchen.de/$1 [R=301,L]\n');

  write(path.join(SITE, '_redirects'),
    REDIRECTS.map(r => `${r[0]}  ${r[1]}  ${r[2]}`).join('\n') + '\n/*  /404.html  404\n');

  console.log('› Fertig');
}

main().catch(e => { console.error(e); process.exit(1); });
