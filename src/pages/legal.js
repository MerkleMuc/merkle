'use strict';
/* Rechtsseiten: Wortlaut unverändert aus dem Bestand übernommen,
   ausschließlich neu typografiert. */

const fs = require('fs');
const path = require('path');
const ui = require('../ui');

const DIR = path.join(__dirname, '..', '..', '_bestand');

function load(slug) {
  const raw = fs.readFileSync(path.join(DIR, 'legal-' + slug + '.html'), 'utf8');
  return raw
    .split('<!--BLOCK-->').join('\n')
    /* Genau ein <h1> pro Seite: die Überschrift trägt der Seiten-Hero. */
    .replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '')
    /* Interne Links relativ setzen, damit sie im Neubau funktionieren. */
    .replace(/https?:\/\/(www\.)?merkle-muenchen\.de\//gi, '/')
    /* Toter TYPO3-Downloadlink aus dem Bestand: Wortlaut bleibt, das
       ins Leere zeigende href entfällt (siehe docs/TODO.md). */
    .replace(/<a href="\/[a-z]{2}\/index\.php\?eID=[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, '$1')
    /* Externe Links absichern — nur, wenn der Bestand die Attribute nicht
       ohnehin schon mitbringt. Sonst stünden sie doppelt im Tag. */
    .replace(/<a ([^>]*href="https?:\/\/(?!www\.merkle-muenchen)[^"]+"[^>]*)>/gi,
      (m, attrs) => {
        let a = attrs;
        if (!/(?:^|\s)target\s*=/i.test(a)) a += ' target="_blank"';
        if (!/(?:^|\s)rel\s*=/i.test(a)) a += ' rel="noopener"';
        return '<a ' + a + '>';
      })
    .trim();
}

function legalPage(cfg) {
  const crumbs = [{ label: 'Startseite', href: '/' }, { label: cfg.crumb, href: cfg.url }];
  const body = [
    ui.pageHero({ kicker: 'Rechtliches', h1: cfg.h1, sub: cfg.sub }),
    ui.breadcrumbs(crumbs),
    `<section class="mk-section">
  <div class="mk-container">
    <div class="mk-legal mk-prose">
${load(cfg.slug)}
    </div>
  </div>
</section>`,
    ui.contactband({
      h2: 'Fragen zu diesen Angaben?<br>Rufen Sie uns an.',
      text: 'Für Auskünfte zu Impressum, Datenschutz oder Vertragsbedingungen erreichen Sie uns unter der Zentrale in München.'
    })
  ].join('\n\n');

  return {
    url: cfg.url,
    title: cfg.title,
    description: cfg.description,
    crumbs,
    body
  };
}

const impressum = () => legalPage({
  slug: 'impressum', url: '/impressum/', crumb: 'Impressum',
  h1: 'Impressum',
  sub: 'Angaben gemäß § 5 TMG, Haftungsausschluss und Bildnachweise.',
  title: 'Impressum | Wilhelm Merkle Schweißtechnik GmbH',
  description: 'Impressum der Wilhelm Merkle Schweißtechnik GmbH, Anton-Böck-Straße 31, 81249 München. Geschäftsführer Siegfried Awissus, HRB 61 102.'
});

const datenschutz = () => legalPage({
  slug: 'datenschutz', url: '/datenschutz/', crumb: 'Datenschutz',
  h1: 'Datenschutzerklärung',
  sub: 'Wie wir mit Ihren personenbezogenen Daten umgehen.',
  title: 'Datenschutzerklärung | Merkle Schweißtechnik München',
  description: 'Datenschutzerklärung der Wilhelm Merkle Schweißtechnik GmbH: Datenerfassung auf dieser Website, Ihre Rechte, Analyse-Werkzeuge und Kontaktmöglichkeiten.'
});

const agb = () => legalPage({
  slug: 'agb', url: '/agb/', crumb: 'AGB',
  h1: 'Allgemeine Geschäftsbedingungen',
  sub: 'Unsere Liefer- und Zahlungsbedingungen.',
  title: 'AGB | Wilhelm Merkle Schweißtechnik GmbH',
  description: 'Allgemeine Geschäftsbedingungen der Wilhelm Merkle Schweißtechnik GmbH, München.'
});

const ekb = () => legalPage({
  slug: 'ekb', url: '/ekb/', crumb: 'EKB',
  h1: 'Allgemeine Einkaufsbedingungen gültig ab 01.07.2012',
  sub: 'Unsere Bedingungen für den Einkauf.',
  title: 'Einkaufsbedingungen | Merkle Schweißtechnik München',
  description: 'Allgemeine Einkaufsbedingungen der Wilhelm Merkle Schweißtechnik GmbH, gültig ab 01.07.2012.'
});

const nutzungsbedingungen = () => legalPage({
  slug: 'nutzungsbedingungen', url: '/nutzungsbedingungen/', crumb: 'Nutzungsbedingungen',
  h1: 'Nutzungsbedingungen',
  sub: 'Markenzeichen, externe Links, Copyright und Haftungsausschluss.',
  title: 'Nutzungsbedingungen | Merkle Schweißtechnik München',
  description: 'Nutzungsbedingungen für die Websites der Merkle Schweißtechnik: Markenzeichen, Hinweise zu externen Links, Copyright und Haftungsausschluss.'
});

module.exports = [impressum, datenschutz, agb, ekb, nutzungsbedingungen];
