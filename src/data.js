'use strict';
/* Stammdaten. Alles hier stammt aus dem Bestand von merkle-muenchen.de.
   Nicht belegte Werte tragen einen TODO-Marker und werden nie geraten. */

const SITE = {
  name: 'Wilhelm Merkle Schweißtechnik GmbH',
  shortName: 'Merkle Schweißtechnik',
  base: 'https://www.merkle-muenchen.de',
  locale: 'de_DE',
  lang: 'de'
};

const EXTERN = {
  shop: 'https://www.merkle-shop.de/',
  amazon: 'https://amazon.de/merkle',
  kurse: 'https://www.schweisskurse-merkle.de/',
  landshut: 'https://www.merkle-landshut.de/',
  rosenheim: 'https://www.merkle-rosenheim.de/',
  mieten: 'https://www.schweissgeraete-mieten.de/',
  gebraucht: 'https://www.gebrauchte-schweissgeraete.de/',
  reparatur: 'https://www.schweissgeraete-mieten.de/reparaturen',
  katalog: 'https://www.merkle-muenchen.de/Merkle_Produkt_Katalog.pdf',
  katalogGroesse: '114 MB'
};

/* Telefonnummern nach DIN 5008 */
const TEL = {
  zentrale:    { text: '+49 89 897717-0',  href: 'tel:+498989771700' },
  verkauf:     { text: '+49 89 897717-16', href: 'tel:+498989771716' },
  gase:        { text: '+49 89 897717-17', href: 'tel:+498989771717' },
  reparatur:   { text: '+49 89 897717-20', href: 'tel:+498989771720' },
  gebraucht:   { text: '+49 89 897717-12', href: 'tel:+498989771712' },
  kurse:       { text: '+49 89 897717-28', href: 'tel:+498989771728' },
  buchhaltung: { text: '+49 89 897717-21', href: 'tel:+498989771721' },
  webshop:     { text: '+49 89 897717-12', href: 'tel:+498989771712' },
  webshop2:    { text: '+49 89 897717-31', href: 'tel:+498989771731' },
  zentrale2:   { text: '+49 89 897717-27', href: 'tel:+498989771727' },
  landshut:    { text: '+49 871 93317-0',  href: 'tel:+4987193317000' },
  rosenheim:   { text: '+49 8031 2854-0',  href: 'tel:+49803128540' }
};

const STANDORTE = [
  {
    id: 'muenchen',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
    imgAlt: 'Firmengebäude von Merkle Schweißtechnik in München-Freiham',
    name: 'München',
    ort: 'München-Freiham',
    street: 'Anton-Böck-Straße 31',
    zip: '81249',
    city: 'München',
    tel: TEL.zentrale,
    mail: 'info@merkle-muenchen.de',
    geo: { lat: '48.136052', lon: '11.413829' },
    href: '/standorte/muenchen/',
    intern: true,
    placeId: 'ChIJX68Zh8HXnUcRppq3vUDfgVs',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Anton-B%C3%B6ck-Stra%C3%9Fe+31%2C+81249+M%C3%BCnchen',
    hours: [
      { d: 'Montag bis Freitag', t: '6:30–18:00 Uhr', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '06:30', close: '18:00' },
      { d: 'Samstag', t: '8:00–12:00 Uhr', days: ['Sa'], open: '08:00', close: '12:00' }
    ]
  },
  {
    id: 'landshut',
    img: '20241022-merkle-landshut-filiale-und-mitarbeiter-team-1-dsc02020.jpg',
    imgAlt: 'Team der Merkle-Filiale in Ergolding bei Landshut',
    name: 'Landshut',
    ort: 'Ergolding bei Landshut',
    street: 'Meisenstraße 11a',
    zip: '84030',
    city: 'Ergolding',
    tel: TEL.landshut,
    mail: 'info@merkle-landshut.de',
    /* Koordinaten am 16.10.2026 über OpenStreetMap zur Adresse ermittelt,
       der Betrieb ist dort namentlich verzeichnet. */
    geo: { lat: '48.557185', lon: '12.157278' },
    href: EXTERN.landshut,
    intern: false,
    placeId: 'ChIJs-ca55klnkcRKQCtSPjgqwc',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Meisenstra%C3%9Fe+11a%2C+84030+Ergolding',
    hours: [
      { d: 'Montag bis Freitag', t: '7:00–12:00 und 13:00–17:30 Uhr', days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '07:00', close: '12:00', open2: '13:00', close2: '17:30' }
    ]
  },
  {
    id: 'rosenheim',
    img: '20241022-merkle-rosenheim-filiale-und-mitarbeiter-team-vor-container-2.jpg',
    imgAlt: 'Team der Merkle-Filiale in Rosenheim vor dem Gasecontainer',
    name: 'Rosenheim',
    ort: 'Rosenheim',
    street: 'Weidestraße 5A',
    zip: '83024',
    city: 'Rosenheim',
    tel: TEL.rosenheim,
    mail: 'info@merkle-rosenheim.de',
    /* Koordinaten am 16.10.2026 über OpenStreetMap zur Adresse ermittelt. */
    geo: { lat: '47.880787', lon: '12.127332' },
    href: EXTERN.rosenheim,
    intern: false,
    placeId: 'ChIJW2FmBf4adkcRXsupqn_-Mns',
    maps: 'https://www.google.com/maps/dir/?api=1&destination=Weidestra%C3%9Fe+5A%2C+83024+Rosenheim',
    hours: [
      { d: 'Montag bis Donnerstag', t: '7:00–12:00 und 13:00–17:30 Uhr', days: ['Mo', 'Tu', 'We', 'Th'], open: '07:00', close: '12:00', open2: '13:00', close2: '17:30' },
      { d: 'Freitag', t: '7:00–12:00 und 13:00–15:00 Uhr', days: ['Fr'], open: '07:00', close: '12:00', open2: '13:00', close2: '15:00' }
    ]
  }
];

/* Ansprechpartner — Bereiche und Durchwahlen aus dem Bestand.
   Portraitfotos je Bereich liegen nicht vor, siehe TODO-Liste. */
const PEOPLE = [
  {
    bereich: 'Verkauf',
    text: 'Sie suchen ein Schweißgerät, haben Fragen zu Produkten und Konditionen oder möchten ein Gerät vorgeführt bekommen? Das Verkaufsteam berät Sie im Laden und am Telefon.',
    tel: TEL.verkauf,
    mail: 'verkauf@merkle-muenchen.de',
    img: 'laden-1200-x700.png',
    alt: 'Verkäufer im Merkle-Ladengeschäft berät einen Kunden über zwei Schweißhelme auf dem Verkaufstresen'
  },
  {
    bereich: 'Gase',
    text: 'Zwölf Gase am Lager — Argon, Mischgas, Kohlensäure, Acetylen, Sauerstoff, Propan und mehr. Bestellen, abholen oder liefern lassen; Eigentumsflaschen tauschen wir leer gegen voll, ohne TÜV-Sorgen und ohne Bindung.',
    tel: TEL.gase,
    mail: 'info@merkle-muenchen.de',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
    alt: 'Überdachtes Gasflaschenlager von Merkle München mit Flaschen in Gitterboxen und Hinweisschild zum Tauschflaschensystem'
  },
  {
    bereich: 'Schweißkurse',
    text: 'MIG/MAG-, WIG- und Elektroden-Kurse für Einsteiger und Fortgeschrittene, vom eintägigen Anfängerkurs bis zum Lehrgang mit TÜV-Prüfung.',
    tel: TEL.kurse,
    mail: 'info@schweisskurse-merkle.de',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
    alt: 'WIG-Schweißbrenner mit Keramikdüse in der Halterung vor einem rot beleuchteten Schweißvorhang'
  },
  {
    bereich: 'Buchhaltung',
    text: 'Fragen zu Ihrer Rechnung oder zu Finanzierungsmöglichkeiten? Unsere Buchhaltung hilft weiter — Anlagen finanzieren Sie bei uns direkt, ohne Bankeinschaltung.',
    tel: TEL.buchhaltung,
    mail: 'buchhaltung@merkle-muenchen.de',
    img: 'buchhaltung-1200x500-1.png',
    alt: 'Zwei Mitarbeitende der Merkle-Buchhaltung im Bürogang'
  }
];

/* Register-Modul: die fünf Schweiß- und Schneidverfahren.
   Copy gekürzt aus /schweissgeraete/. */
const VERFAHREN = [
  {
    num: '01',
    title: 'MIG/MAG',
    href: '/schweissgeraete/mig-mag/',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
    alt: 'Reihe türkisfarbener Merkle MIG/MAG-Schweißgeräte im Ausstellungsraum in München-Freiham',
    text: 'MAG-Schweißen wird vornehmlich bei Stahl und Edelstahl angewandt, MIG-Schweißen bei Nichteisen-Metallen. Unsere Schutzgasgeräte beherrschen beide Schweißarten — vom dünnen Blech bis zum großen Bauteil. Fünf Serien von der wirtschaftlichen RedMIG bis zur SpeedMIG.'
  },
  {
    num: '02',
    title: 'WIG',
    href: '/schweissgeraete/wig/',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
    alt: 'WIG-Schweißbrenner mit Keramikdüse in der Halterung vor einem rot beleuchteten Schweißvorhang',
    text: 'Schutzgasschweißen mit deutlich reduzierter Wärme und inertem Gas. Damit eignet sich WIG für jedes Metall, das sich durch Schmelzschweißen bearbeiten lässt. Tragbare DC-Kraftpakete ab 5,0&nbsp;kg bis zur Industrielinie Insquare.'
  },
  {
    num: '03',
    title: 'Elektrode',
    href: '/schweissgeraete/elektroden-schweissanlagen/',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
    alt: 'Merkle-Ladengeschäft mit Schweißgeräten, Schweißerjacke und Schutzhelmen an der Wand',
    text: 'Das Elektrodenhandschweißen ist eines der ältesten Verfahren und wird heute vor allem auf Montage eingesetzt. Klein, leicht, leistungsstark: MobiARC und LiteArc&nbsp;180 mit LiftTIG-Zündung und Digitalanzeige, nur 5,0&nbsp;kg.'
  },
  {
    num: '04',
    title: 'Pulse-Arc',
    href: '/schweissgeraete/pulse-arc/',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09881-hdr.jpg',
    alt: 'Ausstellungsraum mit mehreren Merkle-Schweißanlagen vor der Verkaufstheke',
    text: 'Der pulsierende Lichtbogen erlaubt den Einsatz verhältnismäßig dicker Drahtelektroden. Das Spektrum reicht von der tragbaren Handstromquelle bis zur automatisierten Sonderlösung, etwa für den Schiffbau oder die Produktionslinie.'
  },
  {
    num: '05',
    title: 'Plasmaschneiden',
    href: '/schweissgeraete/plasma-schneidanlagen/',
    img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
    alt: 'Überdachtes Gasflaschenlager von Merkle München mit Flaschen in Gitterboxen',
    text: 'Mit Druckluft als Plasmagas schneiden Sie nahezu alle leitfähigen Metalle — Baustahl, Chrom-Nickel-Stahl, Aluminium, Messing, Kupfer, Grauguss oder Titan. Eine wirtschaftliche Alternative zum Autogen-Schneiden mit schmaler Schnittfuge und geringem Verzug.'
  }
];

/* Kennzahlen — nur belegte Werte. */
const FIGURES = [
  { value: 1976, raw: '1976', label: 'Beginn in München — seit 1980 als eigene GmbH', count: false },
  { value: 3, raw: '3', label: 'Standorte in Bayern: München, Landshut, Rosenheim', count: true },
  { value: 50, raw: '50', suffix: '+', label: 'Jahre Schweiß- und Schneidtechnischer Fachhandel', count: true },
  { value: 3800, raw: '3.800', suffix: '+', label: 'Artikel dauerhaft am Lager', count: true }
];

/* Navigation */
const NAV = [
  {
    label: 'Sortiment',
    href: '/schweissgeraete/',
    id: 'nav-sortiment',
    mega: {
      groups: [
        {
          title: 'Schweißgeräte',
          links: [
            { label: 'Alle Schweißgeräte', href: '/schweissgeraete/' },
            { label: 'Schweißgeräte-Finder', href: '/schweissgeraete/finder/' },
            { label: 'MIG/MAG', href: '/schweissgeraete/mig-mag/' },
            { label: 'WIG', href: '/schweissgeraete/wig/' },
            { label: 'Elektrode', href: '/schweissgeraete/elektroden-schweissanlagen/' },
            { label: 'Pulse-Arc', href: '/schweissgeraete/pulse-arc/' },
            { label: 'Plasmaschneiden', href: '/schweissgeraete/plasma-schneidanlagen/' }
          ]
        },
        {
          title: 'Verbrauch und Zubehör',
          links: [
            { label: 'Zusatzwerkstoffe', href: '/zusatzwerkstoffe/' },
            { label: 'Für Stahl', href: '/zusatzwerkstoffe/stahl/' },
            { label: 'Für Edelstahl', href: '/zusatzwerkstoffe/edelstahl/' },
            { label: 'Für Aluminium', href: '/zusatzwerkstoffe/aluminium/' },
            { label: 'Schweißzubehör', href: '/schweisszubehoer/' },
            { label: 'Gas und Tauschflaschen', href: '/gas/' },
            { label: 'Kühlwasser', href: '/wasser/' }
          ]
        }
      ],
      teasers: [
        {
          href: EXTERN.shop, external: true,
          img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
          alt: 'Merkle-Schweißgeräte im Ausstellungsraum München-Freiham',
          title: 'Online-Shop',
          text: 'Geräte, Ersatzteile und Zubehör rund um die Uhr bestellen.'
        },
        {
          href: '/laden/',
          img: 'laden-1200-x700.png',
          alt: 'Beratungsgespräch am Verkaufstresen im Merkle-Ladengeschäft',
          title: 'Ladengeschäft',
          text: 'Mo bis Fr von 6:30 bis 18:00 Uhr in München-Freiham.'
        }
      ]
    }
  },
  {
    label: 'Service',
    href: '/service/',
    id: 'nav-service',
    mega: {
      groups: [
        {
          title: 'Leistungen',
          links: [
            { label: 'Alle Leistungen', href: '/service/' },
            { label: 'Werkstatt und Reparatur', href: '/service/#werkstatt' },
            { label: 'Mietgeräte', href: '/service/#miete' },
            { label: 'Gebrauchtanlagen', href: '/service/#gebraucht' },
            { label: 'Beratung und Vorführung', href: '/service/#vorfuehrung' },
            { label: 'Finanzierung', href: '/service/#finanzierung' }
          ]
        },
        {
          title: 'Weiteres',
          links: [
            { label: 'Tauschflaschensystem', href: '/gas/#tauschsystem' },
            { label: 'Wasserdurchfluss-Wächter', href: '/durchfluss-waechter/' },
            { label: 'Schweißkurse', href: EXTERN.kurse, external: true },
            { label: 'Öffnungszeiten', href: '/laden/#oeffnungszeiten' },
            { label: 'Bewertung abgeben', href: '/bewertung/' }
          ]
        }
      ],
      teasers: [
        {
          href: '/service/#werkstatt',
          img: 'schweisskurse-1200x500-1.png',
          alt: 'Werkstattmitarbeiter mit Schweißbrenner und Schutzhelm in der Merkle-Werkstatt',
          title: 'Werkstatt und Reparatur',
          text: 'Reparatur aller Fabrikate, auf Wunsch mit Mietgerät.'
        },
        {
          href: EXTERN.kurse, external: true,
          img: 'merkle-gaslieferant-waehrend-der-arbeit1.png',
          alt: 'Merkle-Lieferfahrzeug mit Werbung für Schweißkurse und Gasflaschen auf der Ladefläche',
          title: 'Schweißkurse',
          text: 'Für Einsteiger und Fortgeschrittene, auf Wunsch mit TÜV-Prüfung.'
        }
      ]
    }
  },
  { label: 'Standorte', href: '/standorte/muenchen/' },
  { label: 'Über uns', href: '/ueber-uns/' },
  { label: 'Aktuelles', href: '/aktuelles/' },
  { label: 'Jobs', href: '/jobs/' },
  { label: 'Kontakt', href: '/kontakt/' }
];

const FOOTER_COLS = [
  {
    title: 'Sortiment',
    links: [
      { label: 'Schweißgeräte', href: '/schweissgeraete/' },
      { label: 'Schweißgeräte-Finder', href: '/schweissgeraete/finder/' },
      { label: 'Zusatzwerkstoffe', href: '/zusatzwerkstoffe/' },
      { label: 'Schweißzubehör', href: '/schweisszubehoer/' },
      { label: 'Gas und Tauschflaschen', href: '/gas/' },
      { label: 'Kühlwasser', href: '/wasser/' },
      { label: 'Wasserdurchfluss-Wächter', href: '/durchfluss-waechter/' }
    ]
  },
  {
    title: 'Service',
    links: [
      { label: 'Leistungen im Überblick', href: '/service/' },
      { label: 'Ladengeschäft München', href: '/laden/' },
      { label: 'Mietgeräte', href: EXTERN.mieten, external: true },
      { label: 'Gebrauchtanlagen', href: EXTERN.gebraucht, external: true },
      { label: 'Reparaturen', href: EXTERN.reparatur, external: true },
      { label: 'Schweißkurse', href: EXTERN.kurse, external: true }
    ]
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Über uns', href: '/ueber-uns/' },
      { label: 'Standort München', href: '/standorte/muenchen/' },
      { label: 'Aktuelles', href: '/aktuelles/' },
      { label: 'Jobs', href: '/jobs/' },
      { label: 'Kontakt', href: '/kontakt/' },
      { label: 'Bewertung abgeben', href: '/bewertung/' }
    ]
  },
  {
    title: 'Kaufen',
    links: [
      { label: 'Merkle Online-Shop', href: EXTERN.shop, external: true },
      { label: 'Amazon-Store', href: EXTERN.amazon, external: true },
      { label: 'Katalog (PDF, ' + EXTERN.katalogGroesse + ')', href: EXTERN.katalog, external: true },
      { label: 'Glossar', href: '/glossary/' },
      { label: 'Coolant (English)', href: '/water/' },
      { label: 'Sitemap', href: '/kontakt/sitemap/' }
    ]
  }
];

const LEGAL_LINKS = [
  { label: 'Impressum', href: '/impressum/' },
  { label: 'Datenschutz', href: '/datenschutz/' },
  { label: 'AGB', href: '/agb/' },
  { label: 'EKB', href: '/ekb/' },
  { label: 'Nutzungsbedingungen', href: '/nutzungsbedingungen/' },
  { label: 'Sitemap', href: '/kontakt/sitemap/' }
];


/* ------------------------------------------------- Google-Bewertungen ---- */
/* Schnitt, Anzahl und Rezensionen stammen aus dem Google-Unternehmensprofil
   des Standorts München, Stand 16.10.2026. Texte sind wörtlich übernommen,
   gekürzte Rezensionen sind als solche markiert und verlinken zu Google. */
const GOOGLE = {
  rating: '4,8',
  ratingNum: 4.8,
  count: 78,
  stars: 5,
  url: 'https://www.google.com/maps/search/?api=1&query=Wilhelm+Merkle+Schwei%C3%9Ftechnik+GmbH+M%C3%BCnchen'
};

const REVIEWS = [
  {
    stars: 5, when: 'vor 2 Monaten', author: 'M Pfaender', meta: '2 Rezensionen',
    text: 'Meine Bestellung ist super schnell angekommen inerhalb eines Tages. Super Freundlicher Kundes Support. Den Mitarbeiter den ich Abends um 20 Uhr noch erreicht habe ging sogar nochmal ins Lager um zu Überprüfen ob die Post das Packet abgeholt hatte. Ich würde dort direkt wieder Bestellen wenn ich etwas brauche.'
  },
  {
    stars: 5, when: 'vor einem Monat', author: 'M.', meta: 'Local Guide · 55 Rezensionen · 11 Fotos',
    text: 'Sehr freundliche und kompetente Beratung. Sehr schnelle Lieferung und auch nach dem Kauf habe ich noch hilfreiche Unterstützung bei einer technischen Frage zu meinem neuen Schweißgerät bekommen. Top'
  },
  {
    stars: 5, when: 'vor 4 Monaten', author: 'Markus Werner', meta: '2 Rezensionen',
    text: 'Top preise, super schnelle Lieferung und sehr kompetent!👌', cut: true
  },
  {
    stars: 5, when: 'vor einem Jahr', author: 'Stefan Lietzau', meta: '1 Rezension',
    text: 'Nachdem meine alte Schweißmaschine (von einem anderen deutschen Hersteller ;-) leider irreparabel kaputt ging, habe ich mir u.a. die Geräte von Merkle in aller Ruhe auf deren Website angesehen. Meine engere Wahl fiel auf die RedMIG eco 2800', cut: true
  },
  {
    stars: 5, when: 'vor 2 Jahren', author: 'Holger Ley', meta: '5 Rezensionen · 2 Fotos',
    text: 'Wir haben ein Schweißgerät für unseren Verein beschafft. Der Service, die Beratung und auch der Mailverkehr war großartig. Ich bzw. wir als Verein können die Firma Merkle nur empfehlen. Unser aktuelles Projekt ist die Aufarbeitung eines', cut: true
  },
  {
    stars: 5, when: 'vor 2 Jahren', author: 'Nico Bernhardt', meta: '6 Rezensionen · 1 Foto',
    text: 'Top Service! Zuvorkommende und freundliche Mitarbeiter, die sich direkt meinem Problem angenommen haben. Mein defektes Schlauchpaket wurde sofort vor Ort repariert, konnte darauf warten.'
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Alex W.', meta: 'Local Guide · 10 Rezensionen',
    text: 'Ich war lange auf der Suche nach einem guten Gebrauchtgerät, was ich dann bei Merkle Schweißtechnik gefunden habe. Ich war bei vielen Anbietern in München und habe mich auch jedesmal beraten lassen.', cut: true
  },
  {
    stars: 5, when: 'vor 8 Jahren', author: 'Sebastian Boß', meta: 'Local Guide · 16 Rezensionen · 8 Fotos',
    text: 'Ich habe noch nie einen Betrieb erlebt bei dem man als Kunde so ernst genommen und freundlich behandelt wird. Ich hatte bisher mit 8 verschiedenen Mitarbeitern zu tun und ausnahmslos jeder war total engagiert. Ich habe mir dort ein', cut: true
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Konrad Löffler', meta: '7 Rezensionen',
    text: 'Zu meiner großen Freude hatte ich die Möglichkeit am Samstag zur Firma Merkle Schweißtechnik zu fahren. Mein Einkauf wurde von sehr gutem & freundlichem Service begleitet und mir wurde sogar beim Einladen geholfen. Ich empfehle die Firma gern weiter.'
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Maximilian Schwarzbach', meta: '10 Rezensionen · 6 Fotos',
    text: 'Mir ist am Samstag in der Früh das Propan für den Heizstrahler ausgegangen. Bei Merkle bin ich schnell fündig geworden. Alte Flasche gegen neue Flasche getauscht. Günstig, komfortabel und super Beratung. Gerne wieder!'
  },
  {
    stars: 5, when: 'vor 5 Jahren', author: 'Muni', meta: 'Local Guide · 12 Rezensionen · 2 Fotos',
    text: 'Trotz Mittagspause und fehlender Flaschenschutzkappe konnte ich telefonisch mit dem Filialleiter in Kontakt treten und bekam meine Stickstoffflasche sofort. Top Service, Daumen hoch!'
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Yama Ahmadi', meta: '2 Rezensionen',
    text: 'Ich war auch schon bei Merkle, weil ich eine alte Pfandflasche von meinem Opa los sein wollte und bekam problemlos Geld dafür. Auf der Werbung vor dem Gebäude steht genau beschrieben, dass Merkle alle', cut: true
  },
  {
    stars: 5, when: 'vor einem Jahr', author: 'Arthur Larisch', meta: 'Local Guide · 91 Rezensionen · 52 Fotos',
    text: 'Superschnelle Abwicklung und Lieferung, Danke!! Auch 2025 wird der MERKLE-Kalender meine kleine Werkstatt verzieren. Super!'
  },
  {
    stars: 5, when: 'vor 3 Jahren', author: 'Michael Mattstedt', meta: 'Local Guide · 460 Rezensionen · 284 Fotos',
    text: 'Service und Kommunikation hervorragend. Von den Geräten muss ich nicht viel sagen. Made in Germany.', cut: true
  },
  {
    stars: 5, when: 'vor 10 Jahren', author: 'Steffen Now', meta: 'Local Guide · 846 Rezensionen · 1.818 Fotos',
    text: 'Die Schweißkurse - auch für Anfänger - sind echt empfehlenswert. Rund um die Schweißtechnik bekommt man hier gute Beratung und einen sehr guten Service.'
  },
  {
    stars: 5, when: 'vor 5 Jahren', author: 'Martin ecker', meta: '6 Rezensionen · 1 Foto',
    text: 'Nette Mitarbeiter, ich hab für uns alle Dinge bekommen. Man kommt sehr gut hin und die Hygiene erscheint mir vorbildlich.'
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Marc Ackermann', meta: 'Local Guide · 69 Rezensionen · 22 Fotos',
    text: 'Super seriöse Firma, auch wenn es um Garantie abwicklungen geht. Top kann ich nur empfehlen..'
  },
  {
    stars: 5, when: 'vor 3 Jahren', author: 'Thomas', meta: 'Local Guide · 18 Rezensionen · 3 Fotos',
    text: 'Top Beratung und fast alles auf Lager! Übrigens: super Kalender 📆', cut: true
  },
  {
    stars: 5, when: 'vor 2 Jahren', author: 'Engin Oender', meta: 'Local Guide · 50 Rezensionen · 1 Foto',
    text: 'Ware wir beschrieben, superschneller Versand ins Ausland, gerne wieder!'
  },
  {
    stars: 5, when: 'vor 6 Jahren', author: 'Alexander Felgner', meta: 'Local Guide · 134 Rezensionen · 34 Fotos',
    text: 'Ich wurde stets sehr freundlich beraten und die Qualität passte immer gut, deshalb komme ich immer gern wieder.'
  }
];

/* ------------------------------------------------------------- Berater --- */
const WHATSAPP = 'https://api.whatsapp.com/send/?phone=49898977170&text=Ich+habe+eine+Frage+zu+Ihrem+Angebot&type=phone_number&app_absent=0';

const BERATER = {
  name: 'Siegfried Awissus',
  /* Funktion bewusst neutral: der Bestand belegt nur die Auszeichnung von
     2013, keine Positionsbezeichnung. */
  rolle: 'Ihr Ansprechpartner',
  tel: TEL.zentrale,
  spruch: 'Ich bin gerade erreichbar, kann ich dir eine Frage beantworten?',
  foto: 'portrait-siegfried-awissus.jpg',
  standort: 'muenchen'
};

/* Themenschalter der Kontaktkarte: je Thema eine Ansprechperson.
   Reihenfolge entspricht der Reihenfolge der Schalter. */
const BERATER_TEAM = [
  { key: 'zentrale', tab: 'Zentrale', tabEn: 'Reception', rolle: 'Zentrale', rolleEn: 'Reception', leute: [
    { name: 'Siegfried Awissus', foto: 'portrait-siegfried-awissus.jpg', tel: TEL.zentrale },
    { name: 'Jan Krafft',        foto: 'portrait-jan-krafft.jpg',       tel: TEL.zentrale2 }
  ] },
  { key: 'vertrieb', tab: 'Vertrieb', tabEn: 'Sales', rolle: 'Vertrieb', rolleEn: 'Sales', leute: [
    { name: 'Thomas Wagner', foto: 'portrait-thomas-wagner.jpg', tel: TEL.verkauf }
  ] },
  { key: 'gase', tab: 'Gase', tabEn: 'Gas', rolle: 'Gase bestellen', rolleEn: 'Ordering gas', leute: [
    { name: 'Bef Dagim', foto: 'portrait-bef-dagim.jpg', tel: TEL.gase }
  ] },
  { key: 'reparatur', tab: 'Reparatur', tabEn: 'Repairs', rolle: 'Reparaturen', rolleEn: 'Repairs', leute: [
    { name: 'Benjamin Awissus', foto: 'portrait-benjamin-awissus.jpg', tel: TEL.reparatur }
  ] },
  { key: 'kurse', tab: 'Schweißkurse', tabEn: 'Courses', rolle: 'Schweißkurse', rolleEn: 'Welding courses', leute: [
    { name: 'Vanessa Mendes', foto: 'portrait-vanessa-mendes.jpg', tel: TEL.kurse }
  ] },
  { key: 'webshop', tab: 'Webshop', tabEn: 'Web shop', rolle: 'Webshop', rolleEn: 'Web shop', leute: [
    { name: 'Manuel Maier',  foto: 'portrait-manuel-maier.jpg',  tel: TEL.webshop },
    { name: 'Eric Dietrich', foto: 'portrait-eric-dietrich.jpg', tel: TEL.webshop2 }
  ] }
];


/* Kundenlogos. Ruhiges Feld, kein Karussell: alle gleich groß und
   einfarbig, damit kein Logo das andere übertönt. */
const KUNDEN = [
  { img: 'kunde-maurer.png',                    name: 'Maurer' },
  { img: 'kunde-siemens.png',                   name: 'Siemens' },
  { img: 'kunde-swm.png',                       name: 'Stadtwerke München', h: 32 },
  { img: 'kunde-bundeswehr.png',                name: 'Bundeswehr', h: 62, breit: true },
  { img: 'kunde-tum.png',                       name: 'Technische Universität München', h: 32 },
  { img: 'kunde-mtu.png',                       name: 'MTU Aero Engines' },
  { img: 'kunde-landeshauptstadt-muenchen.png', name: 'Landeshauptstadt München', h: 52, breit: true },
  { img: 'kunde-baywa.png',                     name: 'BayWa', h: 64, breit: true },
  { img: 'kunde-eaton.png',                     name: 'Eaton' },
  { img: 'kunde-convotherm.png',                name: 'Convotherm' },
  { img: 'kunde-lausser.png',                   name: 'Lausser Anlagenbau Stuttgart' },
  { img: 'kunde-hochland.png',                  name: 'Hochland', h: 64, breit: true },
  { img: 'kunde-schandl.png',                   name: 'Schandl' },
  { img: 'kunde-sd-hirsch.png',                 name: 'SD Hirsch automotive' }
];




/* --------------------------------------------------- Schweißgeräte-Finder */
/* Die Empfehlung fasst zusammen, was auf den Verfahrensseiten steht.
   Geräte, Serien und Merkmale sind wörtlich aus dem Bestand übernommen.
   Preise liegen nicht vor und werden nicht geschätzt. */
const FINDER_STEPS = [
  {
    id: 'einsatz',
    q: 'Wofür schweißen Sie?',
    hint: 'Das entscheidet, wie viel Leistung und Einschaltdauer das Gerät braucht.',
    options: [
      { v: 'hobby', icon: 'home', title: 'Hobby und Haus', note: 'Garage, Garten, eigene Projekte' },
      { v: 'handwerk', icon: 'wrench', title: 'Handwerk und Montage', note: 'Werkstatt, Baustelle, Kundendienst' },
      { v: 'industrie', icon: 'factory', title: 'Industrie und Serie', note: 'Produktion, lange Nähte, Dauerbetrieb' },
      { v: 'ausbildung', icon: 'book', title: 'Ausbildung und Lehrwerkstatt', note: 'Viele Hände an einem Gerät' }
    ]
  },
  {
    id: 'werkstoff',
    q: 'Welchen Werkstoff schweißen Sie überwiegend?',
    hint: 'Aluminium und Edelstahl stellen andere Anforderungen als Baustahl.',
    options: [
      { v: 'stahl', icon: 'layers', title: 'Stahl', note: 'Un- und niedriglegierte Stähle' },
      { v: 'edelstahl', icon: 'shield', title: 'Edelstahl', note: 'Hochlegiert, sichtbare Nähte' },
      { v: 'alu', icon: 'bolt', title: 'Aluminium', note: 'Auch Nichteisen-Metalle' },
      { v: 'gemischt', icon: 'sliders', title: 'Wechselt ständig', note: 'Mal Stahl, mal Edelstahl, mal Alu' }
    ]
  },
  {
    id: 'dicke',
    q: 'Wie dick ist das Material meistens?',
    hint: 'Dünnblech verzeiht keine zu hohe Wärme, dicke Teile brauchen Einbrand.',
    options: [
      { v: 'duenn', icon: 'target', title: 'Bis 2 Millimeter', note: 'Blech, Karosserie, Geländer' },
      { v: 'mittel', icon: 'layers', title: '2 bis 8 Millimeter', note: 'Der übliche Werkstattbereich' },
      { v: 'dick', icon: 'factory', title: 'Über 8 Millimeter', note: 'Träger, Rahmen, Stahlbau' },
      { v: 'trennen', icon: 'spark', title: 'Ich will vor allem trennen', note: 'Schneiden statt schweißen' }
    ]
  },
  {
    id: 'ort',
    q: 'Wo steht das Gerät?',
    hint: 'Auf Montage zählt Gewicht, in der Werkstatt zählt Leistung.',
    options: [
      { v: 'werkstatt', icon: 'home', title: 'Fest in der Werkstatt', note: 'Drehstrom vorhanden' },
      { v: 'montage', icon: 'truck', title: 'Unterwegs auf Montage', note: 'Tragbar, oft nur 230 Volt' },
      { v: 'beides', icon: 'route', title: 'Mal so, mal so', note: 'Werkstatt und Einsatzort' }
    ]
  },
  {
    id: 'ziel',
    q: 'Was ist Ihnen am wichtigsten?',
    hint: 'Mehrfachnennung ist nicht nötig, wählen Sie den wichtigsten Punkt.',
    options: [
      { v: 'tempo', icon: 'bolt', title: 'Tempo und Wirtschaftlichkeit', note: 'Viel Naht pro Stunde' },
      { v: 'optik', icon: 'eye', title: 'Saubere, sichtbare Naht', note: 'Wenig Nacharbeit, kein Spritzer' },
      { v: 'einfach', icon: 'check', title: 'Einfache Bedienung', note: 'Schnell eingestellt, wenig Fehler' },
      { v: 'mobil', icon: 'truck', title: 'Geringes Gewicht', note: 'Tragen statt fahren' }
    ]
  },
  {
    id: 'kenntnis',
    q: 'Kennen Sie die Schweißverfahren bereits?',
    hint: 'Danach richtet sich, wie ausführlich wir das Ergebnis erklären.',
    options: [
      { v: 'profi', icon: 'check', title: 'Ja, ich arbeite damit', note: 'Kurz und technisch, bitte' },
      { v: 'etwas', icon: 'compass', title: 'Grob, aber nicht im Detail', note: 'Eine Einordnung hilft' },
      { v: 'neu', icon: 'book', title: 'Nein, ich fange an', note: 'Bitte mit Erklärung' }
    ]
  }
];

/* Ergebnisse. kurz = für Kenner, lang = mit Erklärung des Verfahrens. */
const FINDER_RESULTS = {
  mig: {
    name: 'MIG/MAG',
    href: '/schweissgeraete/mig-mag/',
    kurz: 'Das Schutzgasschweißen mit Massivdraht ist für Ihren Einsatz das wirtschaftlichste Verfahren: hohe Abschmelzleistung, gut automatisierbar, großes Verbrauchsmaterial-Angebot.',
    lang: 'Beim MIG/MAG-Schweißen läuft ein Draht automatisch nach und brennt als Elektrode ab, Schutzgas hält die Luft von der Naht fern. MAG mit aktivem Gas nimmt man für Stahl und Edelstahl, MIG mit inertem Gas für Nichteisen-Metalle. Das Verfahren ist schnell erlernt und liefert viel Naht pro Stunde.',
    chips: ['Hohe Abschmelzleistung', 'Vom Dünnblech bis zum Träger', 'Fünf Merkle-Serien'],
    devices: ['redmig', 'compactmig']
  },
  migIndustrie: {
    name: 'MIG/MAG in der Industrielinie',
    href: '/schweissgeraete/mig-mag/',
    kurz: 'Für Dauerbetrieb und lange Nähte zählt Einschaltdauer statt Spitzenstrom. Die Industrieanlagen bringen getrennten Drahtvorschub, Wasserkühlung und reproduzierbare Programme mit.',
    lang: 'MIG/MAG ist das Verfahren der Serienfertigung: Der Draht läuft automatisch nach, Schutzgas schützt die Naht. In der Industrielinie kommt dazu, was den Dauerbetrieb trägt — getrenntes Drahtvorschubgerät, Wasserkühlung, gespeicherte Programme und eine Energieregelung direkt am Brenner.',
    chips: ['Für Dauerbetrieb', 'Getrennter Drahtvorschub', 'Programme reproduzierbar'],
    devices: ['optimig', 'speedmig']
  },
  wig: {
    name: 'WIG',
    href: '/schweissgeraete/wig/',
    kurz: 'Weniger Wärme, kein Spritzer, volle Kontrolle über das Schmelzbad. Für sichtbare Nähte, dünne Wandstärken und Edelstahl ist WIG die richtige Wahl.',
    lang: 'Beim WIG-Schweißen brennt der Lichtbogen zwischen einer Wolframelektrode und dem Werkstück, der Zusatzwerkstoff wird von Hand zugegeben. Dadurch bringen Sie deutlich weniger Wärme ein und steuern das Schmelzbad genau. Das dauert länger als MIG/MAG, liefert aber die sauberste Naht — und eignet sich für jedes schmelzschweißbare Metall.',
    chips: ['Sichtbare Nähte ohne Nacharbeit', 'Auch für dünne Bleche', 'Mit AC auch Aluminium'],
    devices: ['litetig', 'mobitig180']
  },
  elektrode: {
    name: 'Elektrodenschweißen',
    href: '/schweissgeraete/elektroden-schweissanlagen/',
    kurz: 'Kein Gas, kein Schlauchpaket, wenig Gewicht. Auf Montage und im Freien bleibt das Elektrodenhandschweißen unschlagbar unkompliziert.',
    lang: 'Beim Elektrodenhandschweißen brennt eine umhüllte Stabelektrode ab und bildet dabei selbst die Schutzschlacke. Sie brauchen also keine Gasflasche und sind auch bei Wind im Freien einsatzfähig. Das macht das älteste Verfahren bis heute zum Standard auf der Montage.',
    chips: ['Ohne Gasflasche', 'Nur 5,0 Kilogramm', 'Auch im Freien'],
    devices: ['mobiarc', 'litearc']
  },
  pulse: {
    name: 'Pulse-Arc',
    href: '/schweissgeraete/pulse-arc/',
    kurz: 'Der pulsierende Lichtbogen trennt Wärmeeintrag und Materialübergang. So schweißen Sie dicke Drähte spritzerarm und bekommen auch bei Aluminium eine saubere Naht.',
    lang: 'Pulse-Arc ist MIG/MAG mit getaktetem Strom: Zwischen den Impulsen kühlt das Bad ab, im Impuls löst sich genau ein Tropfen. Dadurch arbeiten Sie mit verhältnismäßig dicken Drahtelektroden, bringen wenig Wärme ein und bekommen eine spritzerarme, optisch saubere Naht — besonders bei Aluminium und Edelstahl.',
    chips: ['Spritzerarm', 'Stark bei Aluminium', 'Bis zur Sonderlösung'],
    devices: ['highpulse', 'highpulse-kompakt']
  },
  plasma: {
    name: 'Plasmaschneiden',
    href: '/schweissgeraete/plasma-schneidanlagen/',
    kurz: 'Mit Druckluft als Plasmagas trennen Sie nahezu jedes leitfähige Metall — schmale Schnittfuge, geringer Verzug, niedrige Betriebskosten.',
    lang: 'Beim Plasmaschneiden wird Druckluft durch einen Lichtbogen auf mehrere Tausend Grad gebracht und schmilzt das Metall, der Gasstrom bläst die Schmelze aus der Fuge. Weil nur Druckluft nötig ist, entfallen Brenngasflaschen. Gegenüber dem Autogen-Schneiden bleiben Schnittfuge und Wärmeverzug kleiner.',
    chips: ['Nur Druckluft nötig', 'Schmale Schnittfuge', 'Geringer Verzug'],
    devices: ['c82', 'aircut']
  }
};

/* Geräte. Alle Angaben stammen von den Bestandsseiten. */
const FINDER_DEVICES = {
  redmig: {
    name: 'RedMIG', serie: 'Die wirtschaftliche MIG/MAG-Linie',
    img: 'schweissgeraete-serie-mig-mag-1.jpg', alt: 'Merkle RedMIG Schweißgerät',
    href: '/schweissgeraete/mig-mag/',
    feats: ['4-Rollen-Präzisions-Flanschgetriebe DV-26 serienmäßig bei 2800 und 3000 K', 'Austauschbare Steuerelektronik', 'Kompakt und platzsparend aufgebaut']
  },
  compactmig: {
    name: 'CompactMIG', serie: 'Die professionelle Universalklasse',
    img: 'schweissgeraete-serie-mig-mag-2.jpg', alt: 'Merkle CompactMIG Schweißgerät',
    href: '/schweissgeraete/mig-mag/',
    feats: ['Übersichtliche Anzeige von Strom, Spannung und a-Maß', 'Erprobte Schweißprogramme integriert', 'Staubfilter mit wenigen Handgriffen gewechselt']
  },
  optimig: {
    name: 'OptiMIG', serie: 'Die MIG/MAG-Industrieanlagen',
    img: 'schweissgeraete-serie-mig-mag-3.jpg', alt: 'Merkle OptiMIG Schweißanlage',
    href: '/schweissgeraete/mig-mag/',
    feats: ['Getrenntes Drahtvorschubgerät, Leitungen bis 20 Meter', 'Stufenlose Energiefernregelung über das TEDAC-System', 'Waagerechte oder senkrechte Montage des Vorschubs']
  },
  speedmig: {
    name: 'SpeedMIG', serie: 'Die Spitze der MIG/MAG-Linie',
    img: 'schweissgeraete-serie-mig-mag-5.jpg', alt: 'Merkle SpeedMIG Schweißanlage',
    href: '/schweissgeraete/mig-mag/',
    feats: ['Für hohe Abschmelzleistung ausgelegt', 'Anzeige von Strom, Spannung und Drahtvorschubgeschwindigkeit', 'Klemm- und steckbares Verbindungskabel']
  },
  litetig: {
    name: 'LiteTIG / MobiTIG', serie: 'Kompakte ProfiPower mit Digitalanzeige',
    img: 'schweissgeraete-serie-wig-1.jpg', alt: 'Merkle LiteTIG und MobiTIG Schweißgeräte',
    href: '/schweissgeraete/wig/',
    feats: ['HF-Zündung, TIG-Pulsen und Elektrodenschweißen', 'Große 50-Quadratmillimeter-Profianschlüsse', 'Trage- und Schultergurt, nur 5,0 Kilogramm']
  },
  mobitig180: {
    name: 'MobiTIG 180 AC/DC', serie: 'Das kleine Kraftpaket',
    img: 'schweissgeraete-serie-wig-2.jpg', alt: 'Merkle MobiTIG 180 AC/DC Schweißgerät',
    href: '/schweissgeraete/wig/',
    feats: ['AC/DC, damit auch für Aluminium geeignet', 'Kompaktes Gehäuse mit seitlichen Öffnungsschnallen', 'TCG-Anschluss, Brennerwechsel ohne Werkzeug']
  },
  mobiarc: {
    name: 'MobiARC', serie: 'Elektroden-Schweißgerät',
    img: 'mobiarc.jpg', alt: 'Merkle MobiARC Elektroden-Schweißgerät',
    href: '/schweissgeraete/elektroden-schweissanlagen/',
    feats: ['Volle Leistung bis 160 Ampere Schweißstrom', 'Metall-Kunststoff-Gehäuse, stabil und schlagfest', 'Extra langes Anschlusskabel, 5 Meter']
  },
  litearc: {
    name: 'LiteArc 180', serie: 'Kompakt, handlich, leistungsstark',
    img: 'lightarc180.jpg', alt: 'Merkle LiteArc 180 Elektroden-Schweißgerät',
    href: '/schweissgeraete/elektroden-schweissanlagen/',
    feats: ['Stufenlos bis 170 Ampere Elektrode, 180 Ampere TIG', 'LiftTIG-Zündung für das WIG-Schweißen', 'Nur 5,0 Kilogramm, mit Schultergurt']
  },
  highpulse: {
    name: 'HighPULSE', serie: 'Die Pulse-Arc-Linie',
    img: 'schweissgeraete-serien-pulse-arc-1.jpg', alt: 'Merkle HighPULSE Schweißanlage',
    href: '/schweissgeraete/pulse-arc/',
    feats: ['TEDAC DIGITAL: Energieregelung direkt am Brenner', 'Doppel-Drahtvorschub DV-31 TWIN ohne Rollenwechsel', 'NFC-Userkarte zum Freischalten der Anlage']
  },
  'highpulse-kompakt': {
    name: 'HighPULSE kompakt', serie: 'Pulse-Arc für unterwegs',
    img: 'schweissgeraete-serien-pulse-arc-3.jpg', alt: 'Kompakte gaskühlte HighPULSE Anlage',
    href: '/schweissgeraete/pulse-arc/',
    feats: ['Kompakte, tragbare Bauweise', 'Optional mit anschließbarem Wasserkühlgerät', 'Handfernregler MFR 20 und Fernsteller MRC 50']
  },
  c82: {
    name: 'C82', serie: 'Plasma-Schneidgerät',
    img: 'plasmaschneider-c82.jpg', alt: 'Merkle C82 Plasma-Schneidgerät',
    href: '/schweissgeraete/plasma-schneidanlagen/',
    feats: ['Handlich und tragbar', 'Brenneranschluss im Seitenraum mit Sicherheitsabschaltung', 'Schneidet mit Druckluft statt Brenngas']
  },
  aircut: {
    name: 'Plasma mit Wasserkühlung', serie: 'Mit integrierter Umlaufkühlung',
    img: 'plasmaschneider-aircut.jpg', alt: 'Merkle Plasma-Schneidanlage mit Wasserumlauf-Kühleinrichtung',
    href: '/schweissgeraete/plasma-schneidanlagen/',
    feats: ['Integrierte Wasserumlauf-Kühleinrichtung', 'Für längere Schnitte am Stück', 'Schmale Schnittfugen bei hoher Geschwindigkeit']
  }
};

/* ------------------------------------------- Kundenkontakte auf der Karte */
/* Zehn typische Abläufe aus dem Tagesgeschäft, ohne Namen von Kundinnen
   und Kunden. Die Orte sind die bayerischen Städte, in die geliefert wird. */
const MAP_EVENTS = [
  /* Anfahrten: Kundschaft aus ganz Bayern kommt zu einem der drei Standorte. */
  { ort: 'ingolstadt',  kind: 'anfahrt', to: 'muenchen',  text: 'Mietgerät wird in München abgeholt' },
  { ort: 'nuernberg',   kind: 'liefer',  to: 'muenchen',  text: 'Schweißdraht Böhler online bestellt' },
  { ort: 'dachau',      kind: 'anfahrt', to: 'muenchen',  text: 'Werkstatt holt Zusatzwerkstoff' },
  { ort: 'regensburg',  kind: 'anruf',                    text: 'Betrieb ruft Merkle München an' },
  { ort: 'garmisch',    kind: 'anfahrt', to: 'muenchen',  text: 'Anfahrt zum Schweißkurs' },
  { ort: 'augsburg',    kind: 'liefer',  to: 'muenchen',  text: 'Argon-Tauschflasche unterwegs' },
  { ort: 'freising',    kind: 'bewertung',                text: '5 Sterne bei Google: sehr zufrieden' },
  { ort: 'deggendorf',  kind: 'anfahrt', to: 'landshut',  text: 'Gerät kommt zur Reparatur' },
  { ort: 'wuerzburg',   kind: 'liefer',  to: 'muenchen',  text: 'Schweißhelm und Handschuhe' },
  { ort: 'erding',      kind: 'anfahrt', to: 'muenchen',  text: 'Abholung im Laden in Freiham' },
  { ort: 'passau',      kind: 'vorort',                   text: 'Außendienst hilft vor Ort' },
  { ort: 'straubing',   kind: 'anfahrt', to: 'landshut',  text: 'Flaschentausch in Landshut' },
  { ort: 'memmingen',   kind: 'liefer',  to: 'muenchen',  text: 'Kühlflüssigkeit ME 30-100.2-ECO' },
  { ort: 'traunstein',  kind: 'anfahrt', to: 'rosenheim', text: 'Abholung in Rosenheim' },
  { ort: 'schweinfurt', kind: 'anruf',                    text: 'Rückfrage zur Einstellung am Gerät' },
  { ort: 'kempten',     kind: 'miete',                    text: 'Mietgerät für zwei Wochen' },
  { ort: 'badtoelz',    kind: 'anfahrt', to: 'rosenheim', text: 'Beratung vor dem Kauf' },
  { ort: 'amberg',      kind: 'shop',                     text: 'Bestellung im Online-Shop' },
  { ort: 'bayreuth',    kind: 'kurs',                     text: 'Platz im Schweißkurs gebucht' },
  { ort: 'landsberg',   kind: 'anfahrt', to: 'muenchen',  text: 'Gasflasche wird getauscht' },
  { ort: 'rosenheim',   kind: 'werk',                     text: 'Gerät zur UVV-Prüfung angemeldet' },
  { ort: 'hof',         kind: 'liefer',  to: 'muenchen',  text: 'Ersatzteile für den Brenner' },
  { ort: 'wasserburg',  kind: 'bewertung',                text: '5 Sterne: schnelle Lieferung' },
  { ort: 'neuulm',      kind: 'mail',                     text: 'Angebot für eine WIG-Anlage' },
  { ort: 'aschaffenburg', kind: 'shop',                   text: 'Schutzkleidung nachbestellt' },
  { ort: 'freising',    kind: 'anfahrt', to: 'landshut',  text: 'Abholung von Schweißdraht' }
];


/* --------------------------------------------------- Englische Fassung --- */
/* Übersetzt sind die Kernseiten. Alles andere bleibt deutsch und ist von
   der englischen Navigation aus erreichbar — mit sichtbarem Hinweis. */
const NAV_EN = [
  { label: 'Welding machines', href: '/en/welding-machines/' },
  { label: 'Service', href: '/en/service/' },
  { label: 'Location', href: '/en/locations/munich/' },
  { label: 'About us', href: '/en/about/' },
  { label: 'Contact', href: '/en/contact/' }
];

const FOOTER_COLS_EN = [
  {
    title: 'Products',
    links: [
      { label: 'Welding machines', href: '/en/welding-machines/' },
      { label: 'Coolant', href: '/water/' },
      { label: 'Online shop', href: EXTERN.shop, external: true }
    ]
  },
  {
    title: 'Service',
    links: [
      { label: 'Service and workshop', href: '/en/service/' },
      { label: 'Rental machines', href: EXTERN.mieten, external: true },
      { label: 'Used machines', href: EXTERN.gebraucht, external: true },
      { label: 'Welding courses', href: EXTERN.kurse, external: true }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/en/about/' },
      { label: 'Munich location', href: '/en/locations/munich/' },
      { label: 'Contact', href: '/en/contact/' },
      { label: 'German website', href: '/' }
    ]
  },
  {
    title: 'Legal (German)',
    links: [
      { label: 'Impressum', href: '/impressum/' },
      { label: 'Datenschutz', href: '/datenschutz/' },
      { label: 'AGB', href: '/agb/' },
      { label: 'Sitemap', href: '/kontakt/sitemap/' }
    ]
  }
];

const EN_TEXT = {
  skip: 'Skip to content',
  mainNav: 'Main navigation',
  location: 'Location',
  advice: 'Advice',
  openSearch: 'Open search',
  searchTerm: 'Search term',
  searchPlaceholder: 'What are you looking for?',
  searchButton: 'Search',
  searchHint: 'This search covers the German website. Products and prices are in the ',
  shopName: 'Merkle online shop',
  shop: 'To the online shop',
  shopShort: 'Shop',
  call: 'Call',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  submenu: 'Submenu',
  consult: 'Personal advice',
  consultShort: 'Advice',
  whatsapp: 'Message on WhatsApp',
  whatsappShort: 'WhatsApp',
  quick: 'Quick access',
  reviewsAll: 'See all reviews',
  reviewsSr: 'out of 5 stars from',
  available: 'Available right now',
  closeHint: 'Close notice',
  breadcrumb: 'Breadcrumb navigation'
};

module.exports = {
  SITE, EXTERN, TEL, STANDORTE, PEOPLE, VERFAHREN, FIGURES, NAV, FOOTER_COLS, LEGAL_LINKS,
  GOOGLE, REVIEWS, WHATSAPP, BERATER, BERATER_TEAM, KUNDEN,
  FINDER_STEPS, FINDER_RESULTS, FINDER_DEVICES, MAP_EVENTS,
  NAV_EN, FOOTER_COLS_EN, EN_TEXT
};
