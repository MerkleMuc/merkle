'use strict';
/* Schweißgeräte-Finder.
   Sechs Fragen, danach ein Verfahren und zwei Geräte aus dem Sortiment.
   Alle Ergebnistexte und Gerätekarten werden im Build erzeugt und liegen
   als <template> in der Seite — der Browser setzt nur zusammen, er textet
   nichts. Dadurch stimmen Bilder, Links und Markup immer. */

const ui = require('../ui');
const { v } = require('../doc');
const { icon, iconBox } = require('../icons');
const { EXTERN, TEL, FINDER_RESULTS, FINDER_DEVICES, BERATER, WHATSAPP, VERFAHREN } = require('../data');
const { esc, attr, todo } = ui;

const CRUMBS = [
  { label: 'Startseite', href: '/' },
  { label: 'Schweißgeräte', href: '/schweissgeraete/' },
  { label: 'Finder', href: '/schweissgeraete/finder/' }
];

function deviceCard(key) {
  const d = FINDER_DEVICES[key];
  const mail = 'mailto:verkauf@merkle-muenchen.de'
    + '?subject=' + encodeURIComponent('Anfrage ' + d.name)
    + '&body=' + encodeURIComponent('Guten Tag,\n\nich interessiere mich für ' + d.name + '. Bitte melden Sie sich bei mir.\n\nName:\nFirma:\nTelefon:\n');
  return `<article class="mk-dev">
          <div class="mk-dev__media">${ui.plainImg(d.img, d.alt, { sizes: '(min-width:768px) 420px, 92vw' })}</div>
          <h4 class="mk-dev__name">${esc(d.name)}</h4>
          <p class="mk-dev__sub">${esc(d.serie)}</p>
          <p class="mk-dev__price"><span class="mk-dev__pricetext">Preis auf Anfrage</span></p>
          <div class="mk-dev__feats">
            ${d.feats.map(f => `<p class="mk-dev__feat">${icon('check')}<span>${esc(f)}</span></p>`).join('\n            ')}
          </div>
          <div class="mk-dev__btns">
            <a class="mk-btn mk-btn--primary" href="${attr(mail)}">${icon('mail')}Per E-Mail anfragen</a>
            <a class="mk-btn mk-btn--outline" href="${attr(EXTERN.shop)}" target="_blank" rel="noopener">${icon('cart')}Details im Webshop</a>
          </div>
        </article>`;
}

function resultTemplate(key) {
  const r = FINDER_RESULTS[key];
  return `<template data-result="${attr(key)}">
      <div class="mk-result">
        <p class="mk-result__kicker">Unser Vorschlag</p>
        <p class="mk-result__name">${esc(r.name)}</p>
        <p class="mk-result__why" data-why-kurz>${esc(r.kurz)}</p>
        <p class="mk-result__why" data-why-lang hidden>${esc(r.lang)}</p>
        <p class="mk-result__list" data-answers></p>
        <div class="mk-result__list">
          ${r.chips.map(c => `<span class="mk-chip">${icon('check')}${esc(c)}</span>`).join('\n          ')}
        </div>
        <div class="mk-devs">
          ${r.devices.map(deviceCard).join('\n          ')}
        </div>
        <p style="margin-top:22px"><a class="mk-textlink" href="${attr(r.href)}">Alles zu ${esc(r.name)} ansehen</a></p>

        <div class="mk-advisor">
          <span class="mk-advisor__avatar" aria-hidden="true">${icon('user')}</span>
          <span class="mk-advisor__body">
            <span class="mk-advisor__title">Noch nicht entschieden? Melden Sie sich bei mir.</span>
            <span class="mk-advisor__sub">${esc(BERATER.name)} · Jedes Gerät können Sie vorher bei uns ausprobieren.</span>
          </span>
          <a class="mk-btn mk-btn--primary" href="${TEL.verkauf.href}">${icon('phone')}${esc(TEL.verkauf.text)}</a>
          <a class="mk-btn mk-btn--outline" href="${attr(WHATSAPP)}" target="_blank" rel="noopener">${icon('whatsapp')}WhatsApp</a>
        </div>

        <div class="mk-quiz__again">
          <button class="mk-btn mk-btn--outline" type="button" data-quiz-reset>${icon('recycle')}Von vorn beginnen</button>
        </div>
      </div>
    </template>`;
}

module.exports = [
  () => ({
    url: '/schweissgeraete/finder/',
    title: 'Schweißgeräte-Finder | Merkle Schweißtechnik München',
    description: 'Sechs Fragen zu Einsatz, Werkstoff und Ziel — danach schlagen wir Ihnen ein Schweißverfahren und zwei passende Merkle-Geräte vor.',
    crumbs: CRUMBS,
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
    body: [
      ui.pageHero({
        kicker: 'Schweißgeräte-Finder',
        h1: 'Welches Verfahren passt zu Ihrer Arbeit?',
        sub: 'Sechs Fragen, ein Vorschlag — und am Ende ein Gerät, das Sie bei uns selbst ausprobieren können.',
        img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
        alt: 'Reihe türkisfarbener Merkle MIG/MAG-Schweißgeräte im Ausstellungsraum in München-Freiham'
      }),
      ui.breadcrumbs(CRUMBS),
      ui.finder({}),
      `<div hidden data-quiz-templates>
      ${Object.keys(FINDER_RESULTS).map(resultTemplate).join('\n      ')}
    </div>`,
      ui.cards({
        wash: true,
        kicker: 'Auch ohne Finder',
        h2: 'Die fünf Verfahren im Überblick.',
        items: VERFAHREN.slice(0, 3).map(v => ({
          href: v.href, img: v.img, alt: v.alt, title: v.title,
          text: v.text.split('. ')[0] + '.'
        }))
      }),
      ui.siblings({
        kicker: 'Weiter im Sortiment',
        items: [
          { href: '/schweissgeraete/pulse-arc/', label: 'Pulse-Arc', note: 'Der pulsierende Lichtbogen' },
          { href: '/schweissgeraete/plasma-schneidanlagen/', label: 'Plasmaschneiden', note: 'Trennen mit Druckluft' },
          { href: '/zusatzwerkstoffe/', label: 'Zusatzwerkstoffe', note: 'Draht, Stab, Elektrode' },
          { href: '/gas/', label: 'Gas und Tauschflaschen', note: 'Schutzgas ohne Wartezeit' }
        ]
      }),
      ui.contactband({
        h2: 'Lieber gleich sprechen?<br>Der Verkauf klärt das in fünf Minuten.',
        text: 'Der Finder gibt eine erste Richtung. Welches Gerät am Ende wirklich passt, hängt an Ihrem Werkstück — deshalb können Sie jedes Gerät vorher im Vorführraum oder in Ihrem Betrieb testen.'
      })
    ].join('\n\n'),
    extraScripts: '<script src="/assets/js/finder.js' + v('assets/js/finder.js') + '" defer></script>'
  })
];
