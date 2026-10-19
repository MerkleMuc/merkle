'use strict';
/* Sektionsbibliothek und Layout.
   Jede Sektion ist eine eigenständige Funktion, die HTML zurückgibt. */

const {
  SITE, EXTERN, TEL, STANDORTE, PEOPLE, VERFAHREN, FIGURES, NAV, FOOTER_COLS, LEGAL_LINKS,
  GOOGLE, REVIEWS, WHATSAPP, BERATER, BERATER_TEAM, KUNDEN, MAP_EVENTS, NAV_EN, FOOTER_COLS_EN, EN_TEXT
} = require('./data');
const { icon, iconBox, stars } = require('./icons');

/* ------------------------------------------------------------- Hilfsmittel */
const esc = s => String(s == null ? '' : s)
  .replace(/&(?![a-zA-Z#0-9]+;)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const attr = s => String(s == null ? '' : s)
  .replace(/&(?![a-zA-Z#0-9]+;)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/"/g, '&quot;');

/* Sichtbarer Marker für unbestätigte Angaben */
const todo = label => `<span class="mk-todo">{{TODO: ${esc(label)}}}</span>`;

/* Bilder: Manifest kommt aus dem Build (AVIF/WebP-Derivate + Maße). */
let MANIFEST = {};
function setManifest(m) { MANIFEST = m || {}; }

/**
 * Bild mit <picture>, srcset, festen Maßen.
 * opts: { file, alt, sizes, eager, className, ratio }
 */
function picture(opts) {
  const file = opts.file;
  const entry = MANIFEST[file];
  const alt = attr(opts.alt || '');
  const sizes = opts.sizes || '100vw';
  const cls = opts.className ? ` class="${attr(opts.className)}"` : '';
  const loading = opts.eager ? 'eager' : 'lazy';
  const prio = opts.eager ? ' fetchpriority="high"' : '';
  const decoding = opts.eager ? '' : ' decoding="async"';

  if (!entry) {
    return `<img src="/assets/img/${attr(file)}" alt="${alt}"${cls} loading="${loading}"${prio}${decoding}>`;
  }

  const set = (kind) => (entry[kind] || [])
    .map(v => `/assets/img/${v.name} ${v.w}w`).join(', ');

  const avif = set('avif');
  const webp = set('webp');
  const fbset = set('fallbackSet');
  const fallback = entry.fallback || file;

  let out = '<picture>';
  if (avif) out += `<source type="image/avif" srcset="${attr(avif)}" sizes="${attr(sizes)}">`;
  if (webp) out += `<source type="image/webp" srcset="${attr(webp)}" sizes="${attr(sizes)}">`;
  out += `<img src="/assets/img/${attr(fallback)}"${fbset ? ` srcset="${attr(fbset)}" sizes="${attr(sizes)}"` : ''}`
       + ` alt="${alt}"${cls} width="${entry.w}" height="${entry.h}" loading="${loading}"${prio}${decoding}>`;
  out += '</picture>';
  return out;
}

/* Wie picture(), aber mit Klassen und Zusatzattributen am <img>. */
function plainImg(file, alt, opts) {
  opts = opts || {};
  const entry = MANIFEST[file];
  const cls = opts.className ? ` class="${attr(opts.className)}"` : '';
  const extra = opts.extra || '';
  const loading = opts.eager ? 'eager' : 'lazy';
  const decoding = opts.eager ? '' : ' decoding="async"';
  const sizes = opts.sizes || '(min-width:1360px) 1360px, 100vw';

  if (!entry) {
    return `<img src="/assets/img/${attr(file)}" alt="${attr(alt)}"${cls} loading="${loading}"${decoding}${extra}>`;
  }

  const set = kind => (entry[kind] || []).map(v => `/assets/img/${v.name} ${v.w}w`).join(', ');
  const avif = set('avif');
  const webp = set('webp');
  const fbset = set('fallbackSet');

  let out = '<picture>';
  if (avif) out += `<source type="image/avif" srcset="${attr(avif)}" sizes="${attr(sizes)}">`;
  if (webp) out += `<source type="image/webp" srcset="${attr(webp)}" sizes="${attr(sizes)}">`;
  out += `<img src="/assets/img/${attr(entry.fallback)}"${fbset ? ` srcset="${attr(fbset)}" sizes="${attr(sizes)}"` : ''}`
       + ` alt="${attr(alt)}"${cls} width="${entry.w}" height="${entry.h}" loading="${loading}"${decoding}${extra}>`;
  out += '</picture>';
  return out;
}

/* sizes je Komponente — sonst lädt eine 400-px-Kachel die 1600-px-Datei. */
const SIZES = {
  full:     '100vw',
  register: '(min-width:900px) 46vw, 92vw',
  card3:    '(min-width:1024px) 31vw, (min-width:640px) 46vw, 92vw',
  card4:    '(min-width:1024px) 23vw, (min-width:640px) 46vw, 92vw',
  person:   '(min-width:1024px) 23vw, (min-width:640px) 46vw, 92vw',
  teaser:   '(min-width:1024px) 21vw, 44vw',
  serie:    '115px',
  proof:    '(min-width:768px) 240px, 45vw'
};

const isExt = href => /^https?:\/\//.test(href);
const extAttr = href => isExt(href) ? ' target="_blank" rel="noopener"' : '';

/* ------------------------------------------------------------------ Header */
/* Sprachschalter. Die englische Fassung deckt die Kernseiten ab; für Seiten
   ohne Übersetzung führt der Schalter auf die englische Startseite. */
const EN_PAGES = {
  '/': '/en/',
  '/schweissgeraete/': '/en/welding-machines/',
  '/service/': '/en/service/',
  '/standorte/muenchen/': '/en/locations/munich/',
  '/ueber-uns/': '/en/about/',
  '/kontakt/': '/en/contact/'
};
const DE_PAGES = Object.keys(EN_PAGES).reduce((m, de) => { m[EN_PAGES[de]] = de; return m; }, {});

function langSwitch(url, cls) {
  const isEn = url.indexOf('/en/') === 0;
  const de = isEn ? (DE_PAGES[url] || '/') : url;
  const en = isEn ? url : (EN_PAGES[url] || '/en/');
  const item = (code, href, active, label) => active
    ? `<span aria-current="true" lang="${code === 'DE' ? 'de' : 'en'}">${code}</span>`
    : `<a href="${attr(href)}" hreflang="${code === 'DE' ? 'de' : 'en'}" lang="${code === 'DE' ? 'de' : 'en'}" aria-label="${attr(label)}">${code}</a>`;
  return `<div class="mk-lang${cls ? ' ' + cls : ''}">`
    + item('DE', de, !isEn, 'Diese Seite auf Deutsch')
    + item('EN', en, isEn, 'This page in English')
    + '</div>';
}

function header(ctx) {
  const current = ctx.url;
  const en = ctx.lang === 'en';
  const t = EN_TEXT;
  const NAVI = en ? NAV_EN : NAV;

  const megaPanels = [];
  const navItems = NAVI.map((item, i) => {
    const active = current === item.href || (item.href !== '/' && current.startsWith(item.href) && item.href.length > 1);
    if (!item.mega) {
      return `<li class="mk-nav__item"><a class="mk-nav__link" href="${attr(item.href)}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
    }
    const panelId = `mega-${i}`;
    megaPanels.push(megaPanel(panelId, item.mega));
    /* Link und Aufklappen sind getrennt: der Link führt auf die Übersichtsseite,
       der Knopf öffnet das Panel. Sonst wäre die Übersicht per Klick unerreichbar. */
    return `<li class="mk-nav__item" data-mega-item>
        <span class="mk-nav__head">
          <a class="mk-nav__link" href="${attr(item.href)}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a>
          <button class="mk-nav__toggle" type="button" data-mega-toggle aria-expanded="false" aria-controls="${panelId}">
            <span class="mk-sr">Untermenü ${esc(item.label)}</span>
            <span class="mk-nav__caret" aria-hidden="true"></span>
          </button>
        </span>
        ${megaPanels[megaPanels.length - 1]}
      </li>`;
  }).join('\n');

  const locSwitch = STANDORTE.map(s => {
    const isCurrent = s.id === 'muenchen';
    return `<li><a href="${attr(s.href)}"${isCurrent ? ' aria-current="true"' : extAttr(s.href)}>${icon('pin')}${esc(s.name)}</a></li>`;
  }).join('');

  return `<header class="mk-head" data-head>
  <div class="mk-head__top">
    <div class="mk-container mk-head__topinner">
      <ul class="mk-locswitch">
        <li class="mk-locswitch__label" aria-hidden="true">${en ? t.location : 'Standort'}</li>
        ${locSwitch}
      </ul>
      <div class="mk-head__topright">
        <a class="mk-head__tel" href="${TEL.zentrale.href}">${icon('headset')}${en ? t.advice : 'Beratung'} <b>${esc(TEL.zentrale.text)}</b></a>
      </div>
    </div>
  </div>

  <div class="mk-container mk-head__main">
    <a class="mk-brand" href="/" aria-label="${attr(SITE.name)}${en ? ' — home' : ' — zur Startseite'}">
      <img src="/assets/img/logo2x.png" alt="Merkle Schweißtechnik" width="196" height="54">
    </a>

    <nav class="mk-nav" aria-label="${en ? t.mainNav : 'Hauptnavigation'}">
      <ul class="mk-nav__list">
        ${navItems}
      </ul>
    </nav>

    <div class="mk-head__actions">
      ${langSwitch(current, 'mk-head__langmain')}
      <button class="mk-searchtoggle" type="button" data-search-toggle aria-expanded="false" aria-controls="site-search" aria-label="${en ? t.openSearch : 'Suche öffnen'}">
        ${icon('search')}
      </button>
      <a class="mk-btn mk-btn--primary mk-btn--shop" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">${en ? t.shop : 'Zum Online-Shop'}</a>
      <button class="mk-burger" type="button" data-burger aria-expanded="false" aria-controls="mobile-nav" aria-label="${en ? t.menuOpen : 'Menü öffnen'}">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="mk-search" id="site-search" data-search-panel hidden>
    <div class="mk-container">
      <form class="mk-search__form" action="/suche/" method="get" role="search" data-search-form>
        <label class="mk-sr" for="head-q">${en ? t.searchTerm : 'Suchbegriff'}</label>
        <input class="mk-search__input" type="search" id="head-q" name="q" placeholder="${en ? t.searchPlaceholder : 'Wonach suchen Sie?'}" autocomplete="off">
        <button class="mk-btn mk-btn--outline" type="submit">${en ? t.searchButton : 'Suchen'}</button>
      </form>
      <p class="mk-search__hint">${en ? t.searchHint : 'Die Suche durchsucht diese Website. Produkte und Preise finden Sie im '}<a href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">${en ? t.shopName : 'Merkle Online-Shop'}</a>.</p>
    </div>
  </div>
  <div class="mk-progress" data-progress aria-hidden="true"></div>
</header>

${mobileNav(current, en)}`;
}

function megaPanel(id, mega) {
  const cols = mega.groups.map(g => `
        <div class="mk-mega__group">
          <p class="mk-mega__grouptitle">${esc(g.title)}</p>
          ${g.links.map(l => `<a class="mk-mega__link" href="${attr(l.href)}"${extAttr(l.href)}>${icon(iconForHref(l.href))}${esc(l.label)}</a>`).join('\n          ')}
        </div>`).join('');

  const teasers = mega.teasers.map(t => `
        <a class="mk-teaser" href="${attr(t.href)}"${extAttr(t.href)}>
          <span class="mk-teaser__media">${plainImg(t.img, t.alt, { sizes: SIZES.teaser })}</span>
          <span class="mk-teaser__title">${esc(t.title)}</span>
          <span class="mk-teaser__text">${esc(t.text)}</span>
        </a>`).join('');

  return `<div class="mk-mega" id="${id}" hidden>
        <div class="mk-container mk-mega__inner">
          <div class="mk-mega__cols">${cols}
          </div>
          <div class="mk-mega__teasers">${teasers}
          </div>
        </div>
      </div>`;
}

function mobileNav(current, en) {
  const t = EN_TEXT;
  const items = (en ? NAV_EN : NAV).map((item, i) => {
    if (!item.mega) {
      return `<li class="mk-mobile__group"><a class="mk-mobile__direct" href="${attr(item.href)}"${current === item.href ? ' aria-current="page"' : ''}><span class="mk-iconline">${icon(iconForHref(item.href))}${esc(item.label)}</span></a></li>`;
    }
    const pid = `m-panel-${i}`;
    const links = item.mega.groups.flatMap(g => g.links)
      .map(l => `<a href="${attr(l.href)}"${extAttr(l.href)}>${icon(iconForHref(l.href))}${esc(l.label)}</a>`).join('\n            ');
    return `<li class="mk-mobile__group">
          <button class="mk-mobile__toggle" type="button" data-mobile-toggle aria-expanded="false" aria-controls="${pid}">
            <span class="mk-iconline">${icon(iconForHref(item.href))}${esc(item.label)}</span><span class="mk-mobile__plus" aria-hidden="true"></span>
          </button>
          <div class="mk-mobile__panel" id="${pid}" hidden>
            ${links}
          </div>
        </li>`;
  }).join('\n        ');

  return `<div class="mk-mobile" id="mobile-nav" data-mobile hidden>
  <div class="mk-container mk-mobile__head">
    <a href="${en ? '/en/' : '/'}" aria-label="${en ? 'Home' : 'Zur Startseite'}"><img src="/assets/img/logo2x.png" alt="Merkle Schweißtechnik" width="170" height="47"></a>
    <button class="mk-burger" type="button" data-mobile-close aria-label="${en ? t.menuClose : 'Menü schließen'}" aria-expanded="true">
      <span></span><span></span><span></span>
    </button>
  </div>
  <nav class="mk-container mk-mobile__body" aria-label="${en ? t.mainNav + ', mobile' : 'Hauptnavigation, mobil'}">
    <ul>
        ${items}
      <li class="mk-mobile__group"><a class="mk-mobile__direct" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">${en ? t.shop : 'Online-Shop'}</a></li>
      ${en ? '' : '<li class="mk-mobile__group"><a class="mk-mobile__direct" href="/suche/">Suche</a></li>'}
    </ul>
    <ul class="mk-mobile__locs">
      <li><span>${en ? t.location : 'Standort'}</span></li>
      ${STANDORTE.map(s => `<li><a href="${attr(s.href)}"${s.id === 'muenchen' ? ' aria-current="true"' : extAttr(s.href)}>${esc(s.name)}</a></li>`).join('')}
    </ul>
    ${langSwitch(current, 'mk-mobile__lang')}
  </nav>
  <div class="mk-mobile__foot">
    <a class="mk-btn mk-btn--outline" href="${TEL.zentrale.href}">${icon('phone')}${en ? t.call : 'Anrufen'}</a>
    <a class="mk-btn mk-btn--primary" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">${icon('cart')}${en ? t.shopShort : 'Zum Shop'}</a>
  </div>
</div>`;
}

/* ------------------------------------------------------------------ Footer */
function footer(lang) {
  const en = lang === 'en';
  const cols = (en ? FOOTER_COLS_EN : FOOTER_COLS).map(c => `
        <div>
          <p class="mk-foot__coltitle">${esc(c.title)}</p>
          ${c.links.map(l => `<a href="${attr(l.href)}"${extAttr(l.href)}>${esc(l.label)}</a>`).join('\n          ')}
        </div>`).join('');

  const locs = STANDORTE.map(s => `
      <div class="mk-foot__loc">
        <b class="mk-iconline">${icon('pin')}${esc(s.name)}</b>
        ${esc(s.street)}, ${esc(s.zip)} ${esc(s.city)}<br>
        <a href="${s.tel.href}">${esc(s.tel.text)}</a> · <a href="mailto:${esc(s.mail)}">${esc(s.mail)}</a><br>
        <a class="mk-foot__route" href="${attr(s.maps)}" target="_blank" rel="noopener">${icon('route')}${en ? 'Open route in Google Maps' : 'Google Maps Routenplaner öffnen'}</a>
      </div>`).join('');

  return `<footer class="mk-foot mk-dark">
  <div class="mk-container">
    <div class="mk-foot__top">
      <div class="mk-foot__brand">
        <img src="/assets/img/logo2x.png" alt="Merkle Schweißtechnik" width="314" height="86">
        <address>
          ${esc(SITE.name)}<br>
          Anton-Böck-Straße 31<br>
          81249 München
        </address>
        <p><a href="${TEL.zentrale.href}">${esc(TEL.zentrale.text)}</a><br>
        <a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a></p>
      </div>
      <div class="mk-foot__sitemap">${cols}
      </div>
    </div>

    <div class="mk-foot__locs">${locs}
    </div>

    <div class="mk-foot__legal">
      <ul>
        ${LEGAL_LINKS.map(l => `<li><a href="${attr(l.href)}">${esc(l.label)}</a></li>`).join('\n        ')}
      </ul>
      <p>© ${new Date().getFullYear()} ${esc(SITE.name)}</p>
    </div>
  </div>
</footer>`;
}

/* ============================================================ Sektionen === */

/* 6.2 Hero */
function hero(o) {
  return `<section class="mk-hero">
  <div class="mk-hero__media">${plainImg(o.img, o.alt, { eager: true, extra: ' fetchpriority="high"', sizes: SIZES.full })}</div>
  <div class="mk-hero__scrim" aria-hidden="true"></div>
  <div class="mk-container mk-hero__inner">
    <div class="mk-hero__body">
      <p class="mk-kicker">${esc(o.kicker)}</p>
      <h1>${o.h1}</h1>
      <p class="mk-hero__sub">${o.sub}</p>
      <div class="mk-btnrow">
        <a class="mk-btn mk-btn--primary" href="${attr(o.cta1.href)}"${extAttr(o.cta1.href)}>${esc(o.cta1.label)}</a>
        <a class="mk-btn mk-btn--ghost" href="${attr(o.cta2.href)}"${extAttr(o.cta2.href)}>${esc(o.cta2.label)}</a>
      </div>
    </div>
  </div>
</section>`;
}

/* 6.14 Seiten-Hero + Breadcrumb darunter */
function pageHero(o) {
  const media = o.img
    ? `<div class="mk-phero__media">${plainImg(o.img, o.alt, { eager: true, extra: ' fetchpriority="high"', sizes: SIZES.full })}</div>
  <div class="mk-phero__scrim" aria-hidden="true"></div>`
    : '';
  return `<section class="mk-phero${o.img ? '' : ' mk-phero--plain'}">
  ${media}
  <div class="mk-container mk-phero__inner">
    ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
    <h1>${o.h1}</h1>
    ${o.sub ? `<p class="mk-phero__sub">${o.sub}</p>` : ''}
  </div>
</section>`;
}

function breadcrumbs(trail) {
  if (!trail || !trail.length) return '';
  const items = trail.map((c, i) => {
    const last = i === trail.length - 1;
    return last
      ? `<li aria-current="page">${esc(c.label)}</li>`
      : `<li><a href="${attr(c.href)}">${esc(c.label)}</a></li>`;
  }).join('');
  return `<nav class="mk-crumbs" aria-label="${trail.lang === 'en' ? 'Breadcrumb navigation' : 'Brotkrumennavigation'}">
  <div class="mk-container"><ol>${items}</ol></div>
</nav>`;
}

/* 6.3 Kennzahlenband */
function figures(o) {
  o = o || {};
  const list = (o.items || FIGURES).map(f => {
    if (f.todo) {
      return `<div class="mk-figure">
        <p class="mk-figure__value">${todo(f.todo)}</p>
        <p class="mk-figure__label">${esc(f.label)}</p>
      </div>`;
    }
    const countAttrs = f.count
      ? ` data-count-to="${f.value}"${f.suffix ? ` data-count-suffix="${attr(f.suffix)}"` : ''}`
      : '';
    return `<div class="mk-figure">
        <p class="mk-figure__value"${countAttrs}>${esc(f.raw)}${f.suffix ? esc(f.suffix) : ''}</p>
        <p class="mk-figure__label">${esc(f.label)}</p>
        ${f.note ? `<p class="mk-figure__note">${esc(f.note)}</p>` : ''}
      </div>`;
  }).join('\n      ');

  return `<section class="mk-section mk-figures">
  <div class="mk-container">
    <div class="mk-figures__list">
      ${list}
    </div>
  </div>
</section>`;
}

/* 6.4 Bildzäsur */
function caesura(o) {
  return `<section class="mk-caesura" aria-hidden="${o.decorative === false ? 'false' : 'true'}">
  ${picture({ file: o.img, alt: o.alt, sizes: '100vw' })}
</section>`;
}

/* 6.5 Statement */
function statement(o) {
  return `<section class="mk-section mk-statement${o.wash ? ' mk-wash' : ''}">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
        <div class="mk-statement__body">
          <p>${o.text}</p>
          <a class="mk-textlink" href="${attr(o.link.href)}"${extAttr(o.link.href)}>${esc(o.link.label)}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* 6.6 Register-Modul — das Signature-Element */
function register(o) {
  const items = o.items || VERFAHREN;

  const images = items.map((v, i) =>
    plainImg(v.img, v.alt, { className: 'mk-register__img' + (i === 0 ? ' is-active' : ''), extra: ' data-register-img', sizes: SIZES.register })
  ).join('\n      ');

  const tabs = items.map((v, i) => `<button class="mk-tab" type="button" role="tab"
          id="tab-${o.id}-${i}" aria-controls="panel-${o.id}-${i}"
          aria-selected="${i === 0}" tabindex="${i === 0 ? '0' : '-1'}">
          <span class="mk-tab__num" aria-hidden="true">${esc(v.num)}</span>
          <span>${esc(v.title)}</span>
        </button>`).join('\n        ');

  /* Alle Panels bleiben im DOM, inaktive sind hidden. */
  const panels = items.map((v, i) => `<div class="mk-tabpanel" role="tabpanel"
          id="panel-${o.id}-${i}" aria-labelledby="tab-${o.id}-${i}"${i === 0 ? '' : ' hidden'}>
          <p>${v.text}</p>
          <a class="mk-textlink" href="${attr(v.href)}">${esc(v.linkLabel || ('Zu ' + v.title))}</a>
        </div>`).join('\n        ');

  const acc = items.map((v, i) => `<details class="mk-acc-item"${i === 0 ? ' open' : ''}>
        <summary><span><span class="mk-acc-item__num">${esc(v.num)}</span>${esc(v.title)}</span><span class="mk-mobile__plus" aria-hidden="true"></span></summary>
        <div class="mk-acc-item__body">
          ${plainImg(v.img, v.alt, { sizes: SIZES.full })}
          <p>${v.text}</p>
          <a class="mk-textlink" href="${attr(v.href)}">${esc(v.linkLabel || ('Zu ' + v.title))}</a>
        </div>
      </details>`).join('\n      ');

  return `<section class="mk-section mk-wash mk-register" data-register id="${o.id}">
  <div class="mk-container">
    <div class="mk-register__grid">
      <div class="mk-register__media mk-hide-mobile">
        ${images}
      </div>
      <div class="mk-register__side">
        <div class="mk-register__intro">
          <p class="mk-kicker">${esc(o.kicker)}</p>
          <h2>${o.h2}</h2>
          <p class="mk-lead">${o.lead}</p>
        </div>

        <div class="mk-register__desktop">
          <div class="mk-tablist" role="tablist" aria-label="${attr(o.tablistLabel || 'Verfahren')}" aria-orientation="vertical">
        ${tabs}
          </div>
          <div class="mk-tabpanels">
        ${panels}
          </div>
        </div>

        <div class="mk-register__acc mk-register__mobile">
      ${acc}
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* 6.7 Service-Bühne (dunkel) */
const ICONS = {
  wrench: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M26 5a9 9 0 0 0-8.2 12.7L5.6 29.9a3 3 0 0 0 4.2 4.2l12.2-12.2A9 9 0 1 0 26 5Z"/><path d="M9.5 30.5h.02"/></svg>',
  rent: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 14 20 5l16 9v18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V14Z"/><path d="M15 35V22h10v13"/></svg>',
  recycle: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6v8m0 0-4-4m4 4 4-4"/><path d="M33 20a13 13 0 0 1-13 13A13 13 0 0 1 7 20 13 13 0 0 1 20 7"/><path d="M28 12h6v6"/></svg>',
  cylinder: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="12" y="11" width="16" height="24" rx="4"/><path d="M17 11V7h6v4M20 3v4"/><path d="M12 19h16"/></svg>',
  truck: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10h20v16H3zM23 15h6l5 5v6h-11z"/><circle cx="11" cy="30" r="3"/><circle cx="28" cy="30" r="3"/></svg>',
  clock: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="20" r="15"/><path d="M20 11v9l6 4"/></svg>',
  euro: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M28 11a11 11 0 1 0 0 18"/><path d="M8 17h14M8 23h14"/></svg>',
  eye: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 20s7-10 18-10 18 10 18 10-7 10-18 10S2 20 2 20Z"/><circle cx="20" cy="20" r="5"/></svg>',
  spark: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 3 8 22h10L18 37l14-19H22l0-15Z"/></svg>',
  drop: '<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 4s11 12 11 19a11 11 0 1 1-22 0C9 16 20 4 20 4Z"/></svg>'
};

/* Alte Icon-Namen auf den neuen Satz abgebildet. */
const ICON_ALIAS = { rent: 'home', wrench: 'wrench', recycle: 'recycle', cylinder: 'cylinder', truck: 'truck', clock: 'clock', euro: 'euro', eye: 'eye', spark: 'spark', drop: 'drop' };

function services(o) {
  const cards = o.items.map(s => `<div class="mk-service">
        <span class="mk-service__icon" aria-hidden="true">${icon(ICON_ALIAS[s.icon] || 'wrench', 'mk-icon--lg')}</span>
        <h3>${esc(s.title)}</h3>
        <p>${s.text}</p>
        <a class="mk-textlink" href="${attr(s.href)}"${extAttr(s.href)}>${esc(s.link)}</a>
      </div>`).join('\n      ');

  return `<section class="mk-section mk-dark mk-services"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker)}</p>
        <h2>${o.h2}</h2>
        ${o.lead ? `<p class="mk-lead" style="margin-top:18px">${o.lead}</p>` : ''}
      </div>
    </div>
    <div class="mk-services__grid">
      ${cards}
    </div>
  </div>
</section>`;
}

/* 6.8 Dreier-Karten */
function cards(o) {
  const list = o.items.map(c => `<a class="mk-card" href="${attr(c.href)}"${extAttr(c.href)}>
        <span class="mk-card__media">${plainImg(c.img, c.alt, { sizes: o.items.length === 4 ? SIZES.card4 : SIZES.card3 })}</span>
        <h3>${esc(c.title)}</h3>
        <p>${c.text}</p>
      </a>`).join('\n      ');

  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
      </div>
    </div>
    <div class="mk-cards${o.items.length === 4 ? ' mk-cards--4' : ''}" style="margin-top:56px">
      ${list}
    </div>
  </div>
</section>`;
}

/* 6.9 Standortband — links die Standorte untereinander, rechts die Karte */
function locations(o) {
  o = o || {};
  const list = STANDORTE.map(s => {
    const hours = s.hours.map(h => `<div><dt>${esc(h.d)}</dt><dd>${esc(h.t)}</dd></div>`).join('');
    return `<div class="mk-location">
        <div class="mk-location__head">
          <span class="mk-location__thumb">${s.img
            ? plainImg(s.img, s.imgAlt, { sizes: '72px' })
            : locationThumb(s.id)}</span>
          <div>
            <h3>${esc(s.name)}</h3>
            <address>${esc(s.street)}<br>${esc(s.zip)} ${esc(s.city)}</address>
          </div>
        </div>
        <dl class="mk-hours">${hours}</dl>
        <div class="mk-location__links">
          <a href="${s.tel.href}">${icon('phone')}${esc(s.tel.text)}</a>
          <a href="mailto:${esc(s.mail)}">${icon('mail')}${esc(s.mail)}</a>
          <a href="${attr(s.maps)}" target="_blank" rel="noopener">${icon('route')}Route planen</a>
          <a href="${attr(s.href)}"${extAttr(s.href)}>${icon('arrowRight')}${s.intern ? 'Standortseite München' : 'Zur Website ' + esc(s.name)}</a>
        </div>
      </div>`;
  }).join('\n      ');

  const wash = o.wash === false ? '' : ' mk-wash';
  const map = o.map === false ? '' : bayernMap();
  return `<section class="mk-section mk-bayernwrap${wash}"${o.id ? ` id="${o.id}"` : ''}>
  ${map}
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker || 'Drei Standorte in Bayern')}</p>
        <h2>${o.h2 || 'München, Landshut und Rosenheim —<br>überall mit demselben Lager im Rücken.'}</h2>
      </div>
    </div>
    <div class="mk-locsplit">
      <div class="mk-locations">
      ${list}
      </div>
    </div>
  </div>
</section>`;
}

/* ----------------------------------------- Karte mit Kundenkontakten ---- */
/* Dekorative Bewegtgrafik hinter dem Standortband. Grundlage sind die
   amtlichen Umrisse der Bundesländer, orthografisch projiziert — daher die
   leichte Wölbung wie bei einem Globus. Bayern ist in den Hausfarben
   hervorgehoben, der Rest Deutschlands bleibt hellgrau.
   Rein dekorativ, aria-hidden: alles, was hier aufleuchtet, ist beispielhaft
   und steht als Aussage nirgends sonst auf der Seite. */

const KIND_ICON = {
  liefer:  '<path d="M0 2h5v4H0zM5 3.2h1.7L8 4.6V6H5z"/>',
  anfahrt: '<path d="M0.6 4.3h6.6v1.5H0.6zM1.4 4.2 2.3 2h3.6l.9 2.2z"/>',
  anruf:   '<path d="M1.4 0.6 0.2 1.9c0 2.7 2.2 4.9 4.9 4.9l1.3-1.2-1.6-.8-.7.8a5 5 0 0 1-1.6-1.6l.8-.7z"/>',
  vorort:  '<circle cx="3" cy="1.8" r="1.5"/><path d="M0.6 6.4a2.6 2.6 0 0 1 4.8 0z"/>',
  werk:    '<path d="M0 6.5V2l2 1.4V2l2 1.4V0.6h2.4v5.9z"/>',
  miete:   '<path d="M0.4 2.8 3.4 0.5l3 2.3v3.7H0.4z"/>',
  kurs:    '<path d="M3.4.6 6.8 2 3.4 3.4 0 2z"/><path d="M1.4 2.8v2.1c0 .6.9 1.1 2 1.1s2-.5 2-1.1V2.8"/>',
  shop:    '<path d="M0.4 0.8h1.2l1 4.2h4l.9-3H2.2"/><circle cx="2.8" cy="6" r="0.7"/><circle cx="5.8" cy="6" r="0.7"/>',
  mail:    '<path d="M0.4 1.2h6.6v4.4H0.4z"/><path d="m0.6 1.5 3.1 2.2 3.1-2.2"/>',
  bewertung: '<path d="m3.7 0.4 1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2L0.5 2.7l2.2-.3z"/>'
};

/* Miniaturkarte als Rückfall, falls zu einem Standort kein Foto vorliegt. */
function locationThumb(id) {
  const geo = require('./geo');
  const p = geo.ortXY(id);
  return `<svg viewBox="52 70 76 76" class="mk-thumbmap" role="presentation" focusable="false">
      <path class="mk-thumbmap__shape" d="${geo.laender()['Bayern']}"/>
      <circle class="mk-thumbmap__ring" cx="${p.x}" cy="${p.y}" r="7"/>
      <circle class="mk-thumbmap__dot" cx="${p.x}" cy="${p.y}" r="3"/>
    </svg>`;
}

function bayernMap() {
  const geo = require('./geo');
  const L = geo.laender();

  const rest = Object.keys(L).filter(n => n !== 'Bayern').map(n => L[n]).join('');
  const bayern = L['Bayern'];
  const nachbarn = geo.nachbarn();

  /* Die drei eigenen Standorte. */
  const HOME = [
    { key: 'muenchen', label: 'München' },
    { key: 'landshut', label: 'Landshut' },
    { key: 'rosenheim', label: 'Rosenheim' }
  ].map(h => Object.assign({}, h, geo.ortXY(h.key)));

  const homes = HOME.map(h => `<g class="mk-globe__hg">
        <circle class="mk-globe__halo" cx="${h.x}" cy="${h.y}" r="2.5"/>
        <circle class="mk-globe__ring" cx="${h.x}" cy="${h.y}" r="1.35"/>
        <circle class="mk-globe__dot" cx="${h.x}" cy="${h.y}" r="0.55"/>
        <text class="mk-globe__label" x="${h.x + 2.1}" y="${h.y + 0.45}">${esc(h.label.toUpperCase())}</text>
      </g>`).join('\n      ');

  const events = MAP_EVENTS.map((e, i) => {
    const p = geo.ortXY(e.ort);
    const ziel = e.to ? geo.ortXY(e.to) : null;
    const ein = e.kind === 'anfahrt';
    const a = ein ? p : (ziel || p);
    const b = ein ? (ziel || p) : p;
    const faehrt = (e.kind === 'liefer' || e.kind === 'anfahrt') && ziel;

    const w = Math.min(32, 3.4 + e.text.length * 0.6);
    const links = p.x > geo.CX + 16;
    const bx = links ? p.x - w - 1.4 : p.x + 1.4;

    return `<g class="mk-ev" data-ev="${i}" data-kind="${attr(e.kind)}">
        ${faehrt ? `<path class="mk-ev__route" d="M${a.x} ${a.y} Q ${(a.x + b.x) / 2 + (b.y - a.y) / 4.5} ${(a.y + b.y) / 2 - (b.x - a.x) / 4.5} ${b.x} ${b.y}" data-route="${i}"/>` : ''}
        <circle class="mk-ev__pulse" cx="${p.x}" cy="${p.y}" r="0.8"/>
        <g transform="translate(${p.x} ${p.y})">
          <g class="mk-ev__pin">
            <path class="mk-ev__pinbody" d="M0 0c0 0-1.05-1.1-1.05-1.85A1.05 1.05 0 0 1 0-2.9a1.05 1.05 0 0 1 1.05 1.05C1.05-1.1 0 0 0 0Z"/>
            <circle class="mk-ev__pinmark" cx="0" cy="-1.85" r="0.34"/>
          </g>
        </g>
        <g transform="translate(${bx} ${p.y - 5.2})"><g class="mk-ev__tip">
          <rect class="mk-ev__tipbg" x="0" y="0" width="${w}" height="2.9" rx="0.3"/>
          <g class="mk-ev__tipicon" transform="translate(0.75 0.72) scale(0.2)">${KIND_ICON[e.kind] || ''}</g>
          <text class="mk-ev__tiptext" x="2.7" y="2.05">${esc(e.text)}</text>
        </g></g>
        ${faehrt ? `<g class="mk-ev__van" data-van="${i}">
          <rect class="mk-ev__vanbody" x="-1.05" y="-0.68" width="1.5" height="0.95" rx="0.15"/>
          <path class="mk-ev__vanbody" d="M0.45-0.36h0.5l0.45 0.39v0.24H0.45z"/>
          <rect class="mk-ev__vanaccent" x="-1.05" y="-0.68" width="1.5" height="0.28" rx="0.15"/>
          <circle class="mk-ev__vanwheel" cx="-0.6" cy="0.4" r="0.25"/>
          <circle class="mk-ev__vanwheel" cx="0.85" cy="0.4" r="0.25"/>
        </g>` : ''}
      </g>`;
  }).join('\n      ');

  return `<div class="mk-bayern" aria-hidden="true" data-bayern>
    <div class="mk-bayern__inner" data-globe>
      <svg class="mk-bayern__map" viewBox="44 42 112 104" preserveAspectRatio="xMidYMid meet" role="presentation" focusable="false">
        <defs>
          <!-- Punktraster als Maske: ein Rechteck je Fläche, nicht tausend Kreise.
               Die Farbe kommt vom Rechteck darunter, nicht vom Punkt. -->
          <pattern id="mk-m1" width="1.62" height="1.62" patternUnits="userSpaceOnUse">
            <circle cx="0.81" cy="0.81" r="0.22" fill="#fff"/>
          </pattern>
          <pattern id="mk-m2" width="1.42" height="1.42" patternUnits="userSpaceOnUse">
            <circle cx="0.71" cy="0.71" r="0.36" fill="#fff"/>
          </pattern>
          <mask id="mk-mk-feld" maskUnits="userSpaceOnUse" x="10" y="8" width="180" height="172">
            <rect x="10" y="8" width="180" height="172" fill="url(#mk-m1)"/>
          </mask>
          <mask id="mk-mk-rest" maskUnits="userSpaceOnUse" x="10" y="8" width="180" height="172">
            <path d="${rest}" fill="url(#mk-m1)"/>
          </mask>
          <mask id="mk-mk-by" maskUnits="userSpaceOnUse" x="10" y="8" width="180" height="172">
            <path d="${bayern}" fill="url(#mk-m2)"/>
          </mask>
          <!-- Münchner Farben: tiefes Petrol im Westen, helles Türkis im Osten -->
          <linearGradient id="mk-bygrad" x1="0" y1="0.1" x2="1" y2="0.75">
            <stop offset="0%" stop-color="#06394A"/>
            <stop offset="34%" stop-color="#1C7488"/>
            <stop offset="70%" stop-color="#31BDD0"/>
            <stop offset="100%" stop-color="#2BE0F0"/>
          </linearGradient>
          <radialGradient id="mk-bykern" cx="54%" cy="50%" r="34%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity=".62"/>
            <stop offset="62%" stop-color="#ffffff" stop-opacity=".16"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- 0. angedeutete Staatsgrenzen ringsum -->
        <path class="mk-globe__nbline" d="${nachbarn}"/>
        <!-- 1. flächendeckendes Raster, sehr leise -->
        <rect class="mk-globe__feld" x="10" y="8" width="180" height="172" mask="url(#mk-mk-feld)"/>
        <!-- 2. die übrigen Länder etwas kräftiger, dazu Haarlinien -->
        <rect class="mk-globe__restfill" x="10" y="8" width="180" height="172" mask="url(#mk-mk-rest)"/>
        <path class="mk-globe__line" d="${rest}"/>
        <!-- 3. Bayern im Farbverlauf, Kern aufgehellt -->
        <rect class="mk-globe__byfill" x="10" y="8" width="180" height="172" fill="url(#mk-bygrad)" mask="url(#mk-mk-by)"/>
        <rect class="mk-globe__bykern" x="10" y="8" width="180" height="172" fill="url(#mk-bykern)" mask="url(#mk-mk-by)"/>
        <path class="mk-globe__byline" d="${bayern}"/>
        ${homes}
        ${events}
      </svg>
    </div>
  </div>`;
}



/* ------------------------------------------------ Gasflaschen-Slider ---- */
/* Breites Band zum Durchswipen: mindestens sechs Flaschen nebeneinander,
   die mittlere steht größer und trägt Bezeichnung und Text. Welche das ist,
   rechnet die JS beim Scrollen aus; ohne JS bleibt es eine Liste. */
/* -------------------------------------------------- Kundenlogos -------- */
/* Ein ruhiges Feld statt eines Karussells: feste Reihen, jedes Logo in
   derselben Box, alle entsättigt. Beim Überfahren kommt die Farbe zurück. */
function logos(o) {
  o = o || {};
  const items = (o.items || KUNDEN).map(k => `<li class="mk-logos__item${k.boxed ? ' mk-logos__item--boxed' : ''}">
        ${plainImg(k.img, (o.altPrefix || 'Logo ') + k.name, { sizes: '160px' })}
      </li>`).join('\n      ');

  return `<section class="mk-logos${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <p class="mk-logos__kicker">${esc(o.kicker || 'Langjährige Kundenbeziehungen')}</p>
    <ul class="mk-logos__list">
      ${items}
    </ul>
  </div>
</section>`;
}

function bottles(o) {
  const items = (o.items || []).map((b, i) => `<li class="mk-bottle" data-bottle="${i}">
        <span class="mk-bottle__pic">${plainImg(b.img, b.alt || (b.title + ' Gasflasche'), { sizes: '(max-width:767px) 40vw, 200px' })}</span>
        <span class="mk-bottle__name">${esc(b.title)}</span>
        <span class="mk-bottle__text">${esc(b.text || '')}</span>
      </li>`).join('\n      ');

  return `<section class="mk-section mk-bottles${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        ${o.h2 ? `<h2>${o.h2}</h2>` : ''}
      </div>
    </div>
  </div>
  <div class="mk-bottles__rail" data-bottles tabindex="0" role="group" aria-label="${attr(o.railLabel || 'Gasflaschen zum Durchblättern')}">
    <ul class="mk-bottles__track">
      ${items}
    </ul>
  </div>
</section>`;
}

/* 6.10 Ansprechpartner */
function people(o) {
  o = o || {};
  const list = PEOPLE.map(p => `<div class="mk-person">
        <div class="mk-person__media">${plainImg(p.img, p.alt, { sizes: SIZES.person })}</div>
        <h3>${esc(p.bereich)}</h3>
        <p>${p.text}</p>
        <div class="mk-person__contact">
          <a href="${p.tel.href}">${esc(p.tel.text)}</a>
          <a href="mailto:${esc(p.mail)}">${esc(p.mail)}</a>
        </div>
      </div>`).join('\n      ');

  return `<section class="mk-section"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker || 'Direkt zum richtigen Bereich')}</p>
        <h2>${o.h2 || 'Vier Durchwahlen — und Sie sprechen mit<br>der Kollegin oder dem Kollegen, die weiterhelfen.'}</h2>
      </div>
    </div>
    <div class="mk-people">
      ${list}
    </div>
  </div>
</section>`;
}

/* 6.11 Aktuelles */
function news(o) {
  const list = o.items.map(n => `<article class="mk-newsitem">
        ${n.date ? `<time datetime="${attr(n.datetime)}">${esc(n.date)}</time>` : ''}
        <h3><a href="${attr(n.href)}"${extAttr(n.href)}>${esc(n.title)}</a></h3>
        <p>${n.text}</p>
      </article>`).join('\n      ');

  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker || 'Aktuelles')}</p>
        <h2>${o.h2}</h2>
      </div>
    </div>
    <div class="mk-news">
      ${list}
    </div>
    ${o.more ? `<p style="margin-top:40px"><a class="mk-textlink" href="${attr(o.more.href)}">${esc(o.more.label)}</a></p>` : ''}
  </div>
</section>`;
}

/* 6.12 Shop-Band — die einzige türkise Fläche */
function shopband() {
  return `<section class="mk-shopband">
  <div class="mk-container mk-shopband__inner">
    <div>
      <h2>Das komplette Sortiment gibt es online — und im Laden in Freiham.</h2>
      <p>Geräte, Ersatzteile, Zusatzwerkstoffe und Zubehör. Im Shop rund um die Uhr, im Katalog zum Blättern.</p>
    </div>
    <div class="mk-btnrow">
      <a class="mk-btn mk-btn--onteal" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">Zum Online-Shop</a>
      <a class="mk-btn mk-btn--outlineteal" href="${attr(EXTERN.amazon)}" target="_blank" rel="noopener">Amazon-Store</a>
      <a class="mk-btn mk-btn--outlineteal" href="${attr(EXTERN.katalog)}" target="_blank" rel="noopener">Katalog öffnen (PDF, ${esc(EXTERN.katalogGroesse)})</a>
    </div>
  </div>
</section>`;
}

/* 6.14 Kontaktband — vor dem Footer auf jeder Unterseite */
function contactband(o) {
  o = o || {};
  return `<section class="mk-section mk-wash mk-contactband">
  <div class="mk-container">
    <div class="mk-contactband__grid">
      <div>
        <p class="mk-kicker">Beratung</p>
        <h2>${o.h2 || 'Sie wissen nicht, welches Gerät passt?<br>Rufen Sie an — wir klären das in fünf Minuten.'}</h2>
        <p>${o.text || 'Wir beraten Sie im Laden in München-Freiham, telefonisch oder bei Ihnen vor Ort. Jedes Gerät können Sie vorher ausgiebig testen — im Vorführraum oder in Ihrem Betrieb.'}</p>
        <div class="mk-btnrow">
          <a class="mk-btn mk-btn--primary" href="${TEL.verkauf.href}">${icon('phone')}Verkauf anrufen: ${esc(TEL.verkauf.text)}</a>
          <a class="mk-btn mk-btn--outline" href="/kontakt/">${icon('mail')}Zum Kontaktformular</a>
          <a class="mk-btn mk-btn--outline" href="${attr(WHATSAPP)}" target="_blank" rel="noopener">${icon('whatsapp')}WhatsApp schreiben</a>
        </div>
      </div>
      <div class="mk-contactcard">
        <dl>
          <dt>Zentrale</dt><dd><a href="${TEL.zentrale.href}">${esc(TEL.zentrale.text)}</a></dd>
          <dt>Verkauf</dt><dd><a href="${TEL.verkauf.href}">${esc(TEL.verkauf.text)}</a></dd>
          <dt>Reparatur</dt><dd><a href="${TEL.reparatur.href}">${esc(TEL.reparatur.text)}</a></dd>
          <dt>Gase</dt><dd><a href="${TEL.gase.href}">${esc(TEL.gase.text)}</a></dd>
          <dt>E-Mail</dt><dd><a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a></dd>
          <dt>Adresse</dt><dd>Anton-Böck-Straße 31<br>81249 München</dd>
        </dl>
        <div class="mk-emergency">
          <p class="mk-emergency__title">Ladengeschäft München-Freiham</p>
          <p>Montag bis Freitag 6:30–18:00 Uhr, Samstag 8:00–12:00 Uhr. Parkplätze direkt vor der Tür.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* Geschwister-Navigation */
/* Passendes Icon aus dem Ziel ableiten, damit jede Kachel eines bekommt,
   ohne dass jede Aufrufstelle eines mitgeben muss. */
function iconForHref(href) {
  const h = String(href);
  if (/merkle-shop|amazon/.test(h)) return 'cart';
  if (/schweisskurse/.test(h)) return 'book';
  if (/mieten/.test(h)) return 'home';
  if (/gebrauchte/.test(h)) return 'recycle';
  if (/^\/gas\//.test(h)) return 'cylinder';
  if (/^\/wasser\/|coolant|^\/water\//.test(h)) return 'drop';
  if (/durchfluss/.test(h)) return 'gear';
  if (/zusatzwerkstoffe/.test(h)) return 'layers';
  if (/schweisszubehoer/.test(h)) return 'helmet';
  if (/mig-mag/.test(h)) return 'bolt';
  if (/\/wig\//.test(h)) return 'target';
  if (/elektroden/.test(h)) return 'sliders';
  if (/pulse-arc/.test(h)) return 'gear';
  if (/plasma/.test(h)) return 'spark';
  if (/edelstahl/.test(h)) return 'shield';
  if (/aluminium/.test(h)) return 'layers';
  if (/finder/.test(h)) return 'compass';
  if (/suche/.test(h)) return 'search';
  if (/sitemap/.test(h)) return 'layers';
  if (/oeffnungszeiten|#tauschsystem/.test(h)) return 'clock';
  if (/werkstatt|reparatur/.test(h)) return 'wrench';
  if (/miete|#miete/.test(h)) return 'home';
  if (/gebraucht/.test(h)) return 'recycle';
  if (/vorfuehrung/.test(h)) return 'eye';
  if (/finanzierung/.test(h)) return 'euro';
  if (/schweissgeraete|welding-machines/.test(h)) return 'bolt';
  if (/service/.test(h)) return 'wrench';
  if (/laden/.test(h)) return 'home';
  if (/standorte|locations/.test(h)) return 'pin';
  if (/kontakt|contact/.test(h)) return 'mail';
  if (/jobs/.test(h)) return 'user';
  if (/aktuelles/.test(h)) return 'calendar';
  if (/ueber-uns|about/.test(h)) return 'book';
  if (/glossary/.test(h)) return 'search';
  if (/bewertung/.test(h)) return 'star';
  return 'arrowRight';
}

function siblings(o) {
  const list = o.items.map(s => `<li class="mk-sibling"><a href="${attr(s.href)}"${extAttr(s.href)}><span class="mk-sibling__icon" aria-hidden="true">${icon(s.icon || iconForHref(s.href))}</span><span class="mk-sibling__label">${esc(s.label)}<small>${esc(s.note)}</small></span></a></li>`).join('\n      ');
  return `<section class="mk-section mk-section--tight mk-pattern">
  <div class="mk-container">
    <p class="mk-kicker">${esc(o.kicker || 'Weiter im Sortiment')}</p>
    <ul class="mk-siblings__list">
      ${list}
    </ul>
  </div>
</section>`;
}

/* Lead-Statement */
function leadStatement(o) {
  return `<section class="mk-section mk-lead-statement${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
        <div class="mk-prose" style="margin-top:8px">${o.body}</div>
      </div>
    </div>
  </div>
</section>`;
}


/* Ablaufgrafik — visualisiert die vier Schritte, die direkt darunter im
   Text stehen. Rein dekorativ, deshalb aria-hidden: sie trägt nichts,
   was nicht ohnehin als Fließtext da wäre. */
function flow(o) {
  const steps = o.items.map((s, i) => `<li class="mk-flow__step" style="--i:${i}">
        <span class="mk-flow__node">${icon(s.icon, 'mk-icon--lg')}</span>
        <span class="mk-flow__label">${esc(s.label)}</span>
      </li>`).join(String.fromCharCode(10) + "      ");
  return `<div class="mk-flow" aria-hidden="true">
    <ol class="mk-flow__list">
      ${steps}
    </ol>
    <span class="mk-flow__rail"><span class="mk-flow__runner"><span class="mk-flow__token"></span></span></span>
  </div>`;
}

/* Merkmalsraster */
function featureGrid(o) {
  const list = o.items.map(f => `<div class="mk-feature">
        <h3 class="mk-iconline">${icon('check')}${esc(f.title)}</h3>
        <p>${f.text}</p>
      </div>`).join('\n      ');
  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
        ${o.lead ? `<p class="mk-lead" style="margin-top:18px">${o.lead}</p>` : ''}
      </div>
    </div>
    ${o.flow ? flow({ items: o.flow }) : ''}
    <div class="mk-features" style="margin-top:${o.flow ? '40px' : '56px'}">
      ${list}
    </div>
  </div>
</section>`;
}

/* Horizontaler Slider.
   Ohne JavaScript bleibt es eine Fläche, die man mit Finger, Trackpad oder
   Tastatur seitlich scrollt — die Pfeile sind nur eine Zugabe. */
let sliderN = 0;
function slider(o) {
  const id = 'sl-' + (++sliderN);
  const label = String(o.label || 'Inhalte').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return `<div class="mk-slider" data-slider>
      <div class="mk-slider__head">
        <p class="mk-slider__hint">${esc(o.hint || 'Seitlich scrollen für mehr')}</p>
        <div class="mk-slider__nav">
          <button class="mk-slider__btn" type="button" data-slider-prev aria-controls="${id}" aria-label="Zurück">${icon('chevronLeft')}</button>
          <button class="mk-slider__btn" type="button" data-slider-next aria-controls="${id}" aria-label="Weiter">${icon('chevronRight')}</button>
        </div>
      </div>
      <div class="mk-slider__track" id="${id}" tabindex="0" role="group" aria-label="${attr(label)}">
        ${o.items}
      </div>
      <div class="mk-slider__rail" aria-hidden="true"><span class="mk-slider__thumb" data-slider-thumb></span></div>
    </div>`;
}

/* Serienliste — als Slider, damit zwölf Gase nicht zwölf Zeilen werden. */
function seriesList(o) {
  const list = o.items.map(s => `<div class="mk-serie">
        ${plainImg(s.img, s.alt, { sizes: SIZES.serie })}
        <div>
          <h3>${esc(s.title)}</h3>
          <p>${s.text}</p>
        </div>
      </div>`).join('\n        ');
  const head = String(o.h2).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
      </div>
    </div>
    ${slider({ label: head, items: list })}
  </div>
</section>`;
}

/* Aufklappteaser — Inhalt bleibt vollständig im DOM */
function disclosures(o) {
  const list = o.items.map((d, i) => `<div class="mk-disc">
        ${d.img ? `<div class="mk-disc__media">${plainImg(d.img, d.alt, { sizes: SIZES.card3 })}</div>` : ''}
        <h3>${esc(d.title)}</h3>
        ${d.sub ? `<p class="mk-disc__sub">${esc(d.sub)}</p>` : ''}
        <p>${d.teaser}</p>
        <details>
          <summary><span class="mk-disc__more">Mehr anzeigen</span><span class="mk-disc__less">Weniger anzeigen</span></summary>
          <div>${d.body}</div>
        </details>
      </div>`).join('\n      ');

  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
      </div>
    </div>
    <div class="mk-disclosures" style="margin-top:56px">
      ${list}
    </div>
  </div>
</section>`;
}

/* Alternierende Bild-Text-Blöcke */
function alternating(o) {
  const list = o.items.map((b, i) => `<div class="mk-alt${i % 2 ? ' mk-alt--flip' : ''}"${b.id ? ` id="${b.id}"` : ''}>
      <div class="mk-alt__media">${picture({ file: b.img, alt: b.alt, sizes: '(min-width:900px) 46vw, 92vw' })}</div>
      <div class="mk-alt__body">
        <h3>${esc(b.title)}</h3>
        ${b.body}
        ${b.link ? `<a class="mk-textlink" href="${attr(b.link.href)}"${extAttr(b.link.href)}>${esc(b.link.label)}</a>` : ''}
      </div>
    </div>`).join('\n    ');

  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    ${o.h2 ? `<div class="mk-grid" style="margin-bottom:56px"><div class="mk-col-8">
      ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
      <h2>${o.h2}</h2>
    </div></div>` : ''}
    ${list}
  </div>
</section>`;
}

/* Tech-Tabelle */
function table(o) {
  const head = `<tr>${o.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr>`;
  const rows = o.rows.map(r => `<tr>${r.map((c, i) => i === 0
    ? `<th scope="row">${c}</th>`
    : `<td>${c}</td>`).join('')}</tr>`).join('\n        ');
  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        <h2>${o.h2}</h2>
      </div>
    </div>
    <section class="mk-tablewrap" style="margin-top:48px" tabindex="0" aria-label="${attr('Tabelle: ' + String(o.h2).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())}">
      <table class="mk-table">
        ${o.caption ? `<caption>${o.caption}</caption>` : ''}
        <thead>${head}</thead>
        <tbody>
        ${rows}
        </tbody>
      </table>
    </section>
  </div>
</section>`;
}

/* FAQ mit JSON-LD */
function faq(o) {
  const list = o.items.map(f => `<details>
        <summary>${esc(f.q)}<span class="mk-faq__plus" aria-hidden="true"></span></summary>
        <div class="mk-faq__answer">${f.a}</div>
      </details>`).join('\n      ');
  return `<section class="mk-section mk-pattern${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker || 'Häufige Fragen')}</p>
        <h2>${o.h2}</h2>
      </div>
    </div>
    <div class="mk-faq" style="margin-top:48px">
      ${list}
    </div>
  </div>
</section>`;
}

/* Downloads */
function downloads(o) {
  const list = o.items.map(d => `<a class="mk-download" href="${attr(d.href)}"${d.href.endsWith('.pdf') ? ' target="_blank" rel="noopener"' : ''}>
        <span class="mk-iconline">${icon(d.href.endsWith('.pdf') ? 'download' : 'arrowRight')}${esc(d.label)}</span><span>${esc(d.meta)}</span>
      </a>`).join('\n      ');
  return `<section class="mk-section mk-section--tight mk-pattern${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <p class="mk-kicker">${esc(o.kicker || 'Zum Mitnehmen')}</p>
    <h2 style="margin-bottom:40px">${o.h2}</h2>
    <div class="mk-downloads">
      ${list}
    </div>
  </div>
</section>`;
}

/* Nachweisreihe — Händlernachweise aus dem Bestand, keine Deko. */
function proof(o) {
  const logos = o.items.map(b => `<figure class="mk-proof">
        ${plainImg(b.img, b.alt, { sizes: SIZES.proof })}
        <figcaption>${esc(b.caption)}</figcaption>
      </figure>`).join('\n      ');
  return `<section class="mk-section mk-section--tight${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <p class="mk-kicker">${esc(o.kicker)}</p>
    <h2 style="margin-bottom:16px">${o.h2}</h2>
    ${o.note ? `<p class="mk-note" style="margin-bottom:40px">${o.note}</p>` : ''}
    <div class="mk-proofs">
      ${logos}
    </div>
  </div>
</section>`;
}

/* Prose-Sektion */
function prose(o) {
  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        ${o.kicker ? `<p class="mk-kicker">${esc(o.kicker)}</p>` : ''}
        ${o.h2 ? `<h2 style="margin-bottom:28px">${o.h2}</h2>` : ''}
        <div class="mk-prose">${o.body}</div>
      </div>
    </div>
  </div>
</section>`;
}

/* Consent-Blocker: blockiert nur eingebettete Drittinhalte, nie Fließtext */
function embed(o) {
  return `<div class="mk-embed" data-embed data-embed-src="${attr(o.src)}" data-embed-title="${attr(o.title)}">
  <div class="mk-embed__placeholder">
    <h3>${esc(o.title)}</h3>
    <p>${esc(o.note)}</p>
    <button class="mk-btn mk-btn--outline" type="button" data-embed-load>${esc(o.button)}</button>
  </div>
</div>`;
}


/* ------------------------------------------------- Google-Bewertungen --- */
/* Wörtliche Rezensionen aus dem Google-Unternehmensprofil. Gekürzte Texte
   sind als gekürzt gekennzeichnet und verlinken auf die vollständige
   Fassung bei Google — nichts wird umgeschrieben oder zusammengefasst. */
function reviewCard(r) {
  const initial = String(r.author).trim().charAt(0).toUpperCase();
  return `<figure class="mk-review">
        <span class="mk-review__g" aria-hidden="true">${icon('googleG')}</span>
        <div class="mk-review__top">
          <span class="mk-review__stars" role="img" aria-label="${r.stars} von 5 Sternen">${stars(r.stars)}</span>
          <span class="mk-review__when">${esc(r.when)}</span>
        </div>
        <blockquote class="mk-review__text">${esc(r.text)}${r.cut ? ' …' : ''}</blockquote>
        ${r.cut ? `<a class="mk-textlink mk-review__more" href="${attr(GOOGLE.url)}" target="_blank" rel="noopener">Vollständig bei Google lesen</a>` : ''}
        <figcaption class="mk-review__foot">
          <span class="mk-review__avatar" aria-hidden="true">${esc(initial)}</span>
          <span class="mk-review__who">
            <span class="mk-review__name">${esc(r.author)}</span>
            <span class="mk-review__count">${esc(r.meta)}</span>
          </span>
        </figcaption>
      </figure>`;
}

function reviews(o) {
  o = o || {};
  const items = (o.items || REVIEWS).slice(0, o.limit || REVIEWS.length);
  return `<section class="mk-section${o.wash ? ' mk-wash' : ''}"${o.id ? ` id="${o.id}"` : ''}>
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">${esc(o.kicker || 'Was Kundinnen und Kunden schreiben')}</p>
        <h2>${o.h2 || 'Bewertungen bei Google.'}</h2>
        <div class="mk-reviewhead">
          <span class="mk-reviewhead__score">${esc(GOOGLE.rating)}</span>
          <span class="mk-rating__stars" role="img" aria-label="${esc(GOOGLE.rating)} von 5 Sternen">${stars(5)}</span>
          <span class="mk-reviewhead__meta">${GOOGLE.count} Bewertungen · <a href="${attr(GOOGLE.url)}" target="_blank" rel="noopener">alle bei Google ansehen</a></span>
        </div>
      </div>
    </div>
    ${slider({ label: 'Google-Bewertungen', hint: 'Seitlich scrollen für weitere Bewertungen', items: items.map(reviewCard).join('\n        ') })}
  </div>
</section>`;
}

/* ----------------------------------------------------- Schwebende Leisten */
/* Drei feste Elemente am unteren Rand. Sie enthalten ausschließlich Wege,
   die es auf der Seite ohnehin gibt: Shop, Kontaktformular, Telefon,
   WhatsApp und die Google-Bewertungen. */
function dock(en) {
  const t = EN_TEXT;
  return `<nav class="mk-float mk-dock" data-dock aria-label="${en ? t.quick : 'Schnellzugriff'}">
  <a class="mk-dock__btn mk-dock__btn--shop" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">
    ${icon('cart')}<span class="mk-dock__full">${en ? t.shop : 'Zum Online-Shop'}</span><span class="mk-dock__short">${en ? t.shopShort : 'Shop'}</span>
  </a>
  <a class="mk-dock__btn" href="${en ? '/en/contact/#form' : '/kontakt/#formular'}">
    ${icon('headset')}<span class="mk-dock__full">${en ? t.consult : 'Persönliche Beratung'}</span><span class="mk-dock__short">${en ? t.consultShort : 'Beratung'}</span>${icon('chevronRight')}
  </a>
  <a class="mk-dock__btn mk-dock__btn--wa" href="${attr(WHATSAPP)}" target="_blank" rel="noopener">
    ${icon('whatsapp')}<span class="mk-dock__full">${en ? t.whatsapp : 'WhatsApp schreiben'}</span><span class="mk-dock__short">WhatsApp</span>
  </a>
</nav>`;
}

function ratingBar(en) {
  const t = EN_TEXT;
  return `<aside class="mk-float mk-rating" aria-label="${en ? 'Google rating' : 'Google-Bewertung'}" data-ratingbar>
  <a class="mk-rating__save" href="https://google.com/preferences/source?q=merkle-shop.de" target="_blank" rel="noopener" aria-label="${en ? 'Save us directly in Google' : 'Speichere uns direkt in Google'}">
    <span class="mk-rating__savetext">${en ? 'Save us directly in Google' : 'Speichere uns direkt in Google'}</span>
    <span class="mk-rating__savecheck" aria-hidden="true">${icon('check')}</span>
  </a>
  <a class="mk-rating__pill" href="${attr(GOOGLE.url)}" target="_blank" rel="noopener">
    <span class="mk-rating__g" aria-hidden="true">${icon('googleG')}</span>
    <span class="mk-rating__stars" aria-hidden="true">${stars(5)}</span>
    <span class="mk-rating__value">${esc(GOOGLE.rating)}</span>
    <span class="mk-rating__star" aria-hidden="true">${stars(1)}</span>
    <span class="mk-rating__count">(${GOOGLE.count})</span>
    <span class="mk-sr">${esc(GOOGLE.rating)} ${en ? t.reviewsSr : 'von 5 Sternen aus'} ${GOOGLE.count} Google ${en ? 'reviews' : 'Bewertungen'}</span>
  </a>
  <a class="mk-rating__link" href="${en ? attr(GOOGLE.url) : '/bewertung/'}"${en ? ' target="_blank" rel="noopener"' : ''}>${en ? t.reviewsAll : 'Alle Bewertungen anzeigen'} ${icon('arrowUpRight')}</a>
</aside>`;
}

/* Öffnungszeiten als Datenattribut: die Karte erscheint nur, wenn der
   Laden in München geöffnet hat. Gerechnet wird clientseitig. */
function beraterCard(en) {
  const t = EN_TEXT;
  const muc = STANDORTE[0];
  const slots = muc.hours.map(h => ({ d: h.days, o: h.open, c: h.close, o2: h.open2 || null, c2: h.close2 || null }));

  /* Ein Schalter je Thema, darunter die zugehörigen Ansprechpersonen. Sind
     es mehrere, blättert ein Pfeilpaar durch sie — Name, Rolle und Durchwahl
     wechseln mit. Die E-Mail bleibt immer info@. Ohne JavaScript bleibt die
     erste Person des ersten Themas sichtbar. */
  const tabs = BERATER_TEAM.map((g, i) => `<button class="mk-berater__tab${i ? '' : ' is-active'}" type="button"
      data-berater-tab="${attr(g.key)}" aria-pressed="${i ? 'false' : 'true'}">${esc(en ? g.tabEn : g.tab)}</button>`).join('\n    ');

  const gruppen = BERATER_TEAM.map((g, i) => {
    const rolle = esc(en ? g.rolleEn : g.rolle);
    const leute = g.leute.map((p, j) => `<div class="mk-berater__one" data-berater-one="${j}"${j ? ' hidden' : ''}>
        <div class="mk-berater__row">
          <span class="mk-berater__avatar">
            ${plainImg(p.foto, (en ? 'Portrait of ' : 'Portrait von ') + p.name, { sizes: '56px' })}
            <span class="mk-berater__dot"></span>
          </span>
          <span>
            <span class="mk-berater__name">${esc(p.name)}</span>
            <span class="mk-berater__role">${rolle}</span>
          </span>
        </div>
        <a class="mk-berater__call" href="${attr(p.tel.href)}">${icon('phone')}${esc(p.tel.text)}</a>
      </div>`).join('\n      ');

    const pager = g.leute.length > 1 ? `<div class="mk-berater__pager">
        <button class="mk-berater__arrow" type="button" data-berater-arrow="-1" aria-label="${en ? 'Previous contact' : 'Vorherige Ansprechperson'}">${icon('chevronLeft')}</button>
        <span class="mk-berater__count" data-berater-count>1/${g.leute.length}</span>
        <button class="mk-berater__arrow" type="button" data-berater-arrow="1" aria-label="${en ? 'Next contact' : 'Nächste Ansprechperson'}">${icon('chevronRight')}</button>
      </div>` : '';

    return `<div class="mk-berater__person" data-berater-person="${attr(g.key)}"${i ? ' hidden' : ''}>
      ${leute}
      <div class="mk-berater__side">
        ${pager}
        <a class="mk-berater__wa" href="${attr(WHATSAPP)}" target="_blank" rel="noopener" aria-label="${en ? 'Message on WhatsApp' : 'WhatsApp schreiben'}">${icon('whatsapp')}</a>
        <a class="mk-berater__mail" href="mailto:info@merkle-muenchen.de" aria-label="${en ? 'Write an e-mail' : 'E-Mail schreiben'}">${icon('mail')}</a>
      </div>
    </div>`;
  }).join('\n    ');

  return `<aside class="mk-contactfloat" aria-label="${en ? 'Personal contact' : 'Persönlicher Kontakt'}">
<div class="mk-float mk-berater" data-berater data-hours="${attr(JSON.stringify(slots))}" hidden>
  <button class="mk-berater__close" type="button" data-berater-close aria-label="${en ? t.closeHint : 'Hinweis verkleinern'}">${icon('close')}</button>
  <p class="mk-berater__title">${icon('check')}${en ? 'We are available for you' : 'Wir sind für dich verfügbar'}</p>
  <div class="mk-berater__tabs" role="group" aria-label="${en ? 'Choose a topic' : 'Thema wählen'}">
    ${tabs}
  </div>
  ${gruppen}
</div>

<button class="mk-float mk-mini" type="button" data-berater-mini hidden aria-label="${en ? 'Open contact card' : 'Kontaktkarte öffnen'}">
  <span class="mk-mini__dot" aria-hidden="true"></span>
  <span class="mk-mini__text">${en ? 'Online' : 'Online'} <b data-mini-hours></b></span>
  <span class="mk-mini__avatar" aria-hidden="true">${icon('user')}</span>
</button>
</aside>`;
}

function floatBars(lang) {
  const en = lang === 'en';
  return [ratingBar(en), dock(en), beraterCard(en)].join('\n');
}

/* ------------------------------------------------- Schweißgeräte-Finder - */
/* Das Formular funktioniert ohne JavaScript nicht; deshalb steht unter dem
   Modul eine vollständige, verlinkte Übersicht der fünf Verfahren. */
function finder(o) {
  const { FINDER_STEPS } = require('./data');
  const steps = FINDER_STEPS.map((s, i) => `<fieldset class="mk-quiz__step" data-step="${i}"${i ? ' hidden' : ''}>
        <legend class="mk-sr">Schritt ${i + 1} von ${FINDER_STEPS.length}</legend>
        <p class="mk-quiz__q" id="q-${s.id}">${esc(s.q)}</p>
        <p class="mk-quiz__hint">${esc(s.hint)}</p>
        <div class="mk-quiz__opts" role="group" aria-labelledby="q-${s.id}">
          ${s.options.map(op => `<button class="mk-opt" type="button" data-key="${attr(s.id)}" data-value="${attr(op.v)}" aria-pressed="false">
            ${iconBox(op.icon)}
            <span class="mk-opt__title">${esc(op.title)}<span class="mk-opt__note">${esc(op.note)}</span></span>
          </button>`).join('\n          ')}
        </div>
        <div class="mk-quiz__nav">
          ${i ? `<button class="mk-quiz__back" type="button" data-quiz-back>${icon('chevronLeft')}Zurück</button>` : ''}
        </div>
      </fieldset>`).join('\n      ');

  return `<section class="mk-section${o && o.wash ? ' mk-wash' : ''}" id="finder">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">In sechs Schritten zum Verfahren</p>
        <h2>Welches Schweißgerät passt zu Ihnen?</h2>
        <p class="mk-lead" style="margin-top:18px">Sie beantworten sechs Fragen zu Ihrem Einsatz, zum Werkstoff und zu Ihrem Ziel. Danach schlagen wir ein Verfahren und zwei Geräte aus unserem Sortiment vor. Verbindlich ist am Ende immer das Gespräch — und das Gerät, das Sie bei uns selbst ausprobiert haben.</p>
      </div>
    </div>

    <div class="mk-quiz" data-quiz style="margin-top:48px">
      <div class="mk-quiz__bar">
        <span class="mk-quiz__count" data-quiz-count>Schritt 1 von ${FINDER_STEPS.length}</span>
        <span class="mk-quiz__rail"><span class="mk-quiz__fill" data-quiz-fill></span></span>
      </div>
      <div data-quiz-form>
      ${steps}
      </div>
      <div class="mk-quiz__result" data-quiz-result hidden aria-live="polite"></div>
      <noscript>
        <p class="mk-note">Der Finder braucht JavaScript. Die fünf Verfahren stehen vollständig auf den verlinkten Seiten unten — oder Sie rufen an unter <a href="${TEL.verkauf.href}">${esc(TEL.verkauf.text)}</a>.</p>
      </noscript>
    </div>
  </div>
</section>`;
}

module.exports = {
  esc, attr, todo, picture, plainImg, setManifest,
  header, footer, hero, pageHero, breadcrumbs,
  figures, caesura, statement, register, services, cards,
  locations, people, news, shopband, contactband, siblings,
  leadStatement, featureGrid, seriesList, bottles, logos, disclosures, alternating,
  table, faq, downloads, prose, embed, proof, ICONS,
  slider, flow, reviews, reviewCard, floatBars, dock, ratingBar, beraterCard,
  bayernMap, locationThumb, finder, langSwitch, EN_PAGES, icon, iconBox, stars
};
