'use strict';
/* Dokumenthülle: <head>, Meta, JSON-LD, Skip-Link, Header, Footer. */

const { SITE, EXTERN, TEL, STANDORTE } = require('./data');
const ui = require('./ui');
const { esc, attr } = ui;


/* Versionsstempel aus der Dateigröße und der Änderungszeit. So dürfen CSS
   und JS dauerhaft gecacht werden und sind nach einem Build trotzdem neu. */
const fsx = require('fs');
const pathx = require('path');
const stampCache = {};
function v(rel) {
  if (stampCache[rel]) return stampCache[rel];
  let s = '';
  try {
    const st = fsx.statSync(pathx.join(__dirname, '..', 'site', rel));
    s = '?v=' + (st.size.toString(36) + Math.round(st.mtimeMs).toString(36)).slice(-8);
  } catch (e) { s = ''; }
  stampCache[rel] = s;
  return s;
}

const DAYMAP = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
  Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday'
};

function openingSpecs(std) {
  const out = [];
  std.hours.forEach(h => {
    const days = h.days.map(d => DAYMAP[d]);
    out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: h.open, closes: h.close });
    if (h.open2) out.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: days, opens: h.open2, closes: h.close2 });
  });
  return out;
}

function localBusiness(std) {
  const node = {
    '@type': 'HardwareStore',
    '@id': SITE.base + '/#' + std.id,
    name: SITE.name + ' — ' + std.name,
    url: std.intern ? SITE.base + std.href : std.href,
    image: SITE.base + '/assets/img/20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
    telephone: std.tel.text,
    email: std.mail,
    parentOrganization: { '@id': SITE.base + '/#organization' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: std.street,
      postalCode: std.zip,
      addressLocality: std.city,
      addressRegion: 'BY',
      addressCountry: 'DE'
    },
    openingHoursSpecification: openingSpecs(std)
  };
  if (std.geo) {
    node.geo = { '@type': 'GeoCoordinates', latitude: std.geo.lat, longitude: std.geo.lon };
  }
  return node;
}

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': SITE.base + '/#organization',
  name: SITE.name,
  alternateName: 'Merkle Schweißtechnik München',
  url: SITE.base + '/',
  logo: SITE.base + '/assets/img/logo2x.png',
  telephone: TEL.zentrale.text,
  email: 'info@merkle-muenchen.de',
  foundingDate: '1980',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Anton-Böck-Straße 31',
    postalCode: '81249',
    addressLocality: 'München',
    addressRegion: 'BY',
    addressCountry: 'DE'
  },
  sameAs: [EXTERN.shop, EXTERN.kurse, EXTERN.landshut, EXTERN.rosenheim]
};

const WEBSITE = {
  '@type': 'WebSite',
  '@id': SITE.base + '/#website',
  url: SITE.base + '/',
  name: SITE.name,
  inLanguage: 'de-DE',
  publisher: { '@id': SITE.base + '/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: SITE.base + '/suche/?q={search_term_string}' },
    'query-input': 'required name=search_term_string'
  }
};

function jsonld(page) {
  const graph = [ORGANIZATION, WEBSITE];

  if (page.localBusiness) STANDORTE.forEach(s => graph.push(localBusiness(s)));
  else if (page.localBusinessOnly) graph.push(localBusiness(STANDORTE.find(s => s.id === page.localBusinessOnly)));

  if (page.crumbs && page.crumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': SITE.base + page.url + '#breadcrumb',
      itemListElement: page.crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.label,
        item: SITE.base + (c.href || page.url)
      }))
    });
  }

  if (page.faq && page.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': SITE.base + page.url + '#faq',
      mainEntity: page.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: String(f.a).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() }
      }))
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c');
}

/* Preload für das LCP-Bild: die erste <picture> mit fetchpriority="high".
   Wird aus dem fertigen Body gelesen, damit keine Seite es doppelt pflegen muss. */
function heroPreload(body) {
  const m = String(body).match(/<picture>([\s\S]{0,2000}?)<img[^>]*fetchpriority="high"/);
  if (!m) return '';
  const avif = m[1].match(/<source type="image\/avif" srcset="([^"]+)" sizes="([^"]+)"/);
  if (!avif) return '';
  const first = avif[1].split(',')[0].trim().split(' ')[0];
  return `<link rel="preload" as="image" type="image/avif" href="${attr(first)}"`
       + ` imagesrcset="${attr(avif[1])}" imagesizes="${attr(avif[2])}" fetchpriority="high">`;
}


/* hreflang-Paare für die Seiten, die es auf Englisch gibt. */
function alternates(page) {
  const EN = ui.EN_PAGES;
  const isEn = page.url.indexOf('/en/') === 0;
  let de = null, en = null;
  if (isEn) {
    Object.keys(EN).forEach(k => { if (EN[k] === page.url) de = k; });
    en = page.url;
  } else if (EN[page.url]) { de = page.url; en = EN[page.url]; }
  if (!de || !en) return '';
  return `<link rel="alternate" hreflang="de" href="${SITE.base}${de}">
<link rel="alternate" hreflang="en" href="${SITE.base}${en}">
<link rel="alternate" hreflang="x-default" href="${SITE.base}${de}">`;
}

function document(page) {
  const canonical = SITE.base + page.url;
  const title = page.title;
  const desc = page.description || '';
  const ogImage = SITE.base + '/assets/img/' + (page.ogImage || '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg');

  const lang = page.lang || 'de';
  /* Nur wenn die Seite mit einer dunklen Bühne beginnt, darf der Header
     oben durchsichtig stehen. Sonst stünde weiße Schrift auf Weiß. */
  const dunkelOben = /^s*<section class="mk-(hero|phero)/.test(String(page.body));
  const bodyKlassen = [page.bodyClass, dunkelOben ? 'mk-dark-top' : ''].filter(Boolean).join(' ');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
${desc ? `<meta name="description" content="${attr(desc)}">` : ''}
<link rel="canonical" href="${attr(canonical)}">
${alternates(page)}
<meta name="robots" content="${page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}">

<meta name="geo.region" content="DE-BY">
<meta name="geo.placename" content="München">
<meta name="geo.position" content="48.136052;11.413829">
<meta name="ICBM" content="48.136052, 11.413829">

<meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'de_DE'}">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${attr(SITE.name)}">
<meta property="og:title" content="${attr(title)}">
${desc ? `<meta property="og:description" content="${attr(desc)}">` : ''}
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:image" content="${attr(ogImage)}">
<meta name="twitter:card" content="summary_large_image">

<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="/assets/img/logo2x.png">
<meta name="theme-color" content="#111827">

${heroPreload(page.body)}
<link rel="preload" href="/assets/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/merkle.css${v('assets/css/merkle.css')}">
<script>document.documentElement.className+=" mk-js";setTimeout(function(){if(!window.__mkReveal)document.documentElement.classList.remove("mk-js")},3000);</script>

<script type="application/ld+json">${jsonld(page)}</script>
</head>
<body${bodyKlassen ? ` class="${attr(bodyKlassen)}"` : ''}>
<a class="mk-skip" href="#main">${lang === 'en' ? 'Skip to content' : 'Zum Inhalt springen'}</a>
${ui.header({ url: page.url, lang: lang })}
<main id="main">
${page.body}
</main>
${ui.footer(lang)}
${page.noFloat ? '' : ui.floatBars(lang)}
<script src="/assets/js/merkle.js${v('assets/js/merkle.js')}" defer></script>
${page.extraScripts || ''}
</body>
</html>
`;
}

module.exports = { document, localBusiness, openingSpecs, v };
