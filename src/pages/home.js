'use strict';
const ui = require('../ui');
const { EXTERN, TEL } = require('../data');

module.exports = function home() {
  const body = [

    /* 1 — Hero (dunkel) */
    ui.hero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
      alt: 'WIG-Schweißbrenner mit Keramikdüse in der Halterung auf einem Schweißtisch, dahinter ein rot leuchtender Schweißvorhang',
      kicker: 'Fachhandel für Schweiß- und Schneidtechnik',
      h1: 'Alles, was ein Schweißer braucht.<br>Auf Lager, in München-Freiham.',
      sub: 'Geräte, Zusatzwerkstoffe, Zubehör, Gas und Kühlwasser — dazu Werkstatt, Mietgeräte und Beratung von Leuten, die selbst schweißen.',
      cta1: { label: 'Zum Online-Shop', href: EXTERN.shop },
      cta2: { label: 'Beratung: ' + TEL.zentrale.text, href: TEL.zentrale.href }
    }),

    /* 2 — Kennzahlenband (weiß) */
    ui.figures(),

    /* 2b — Kundenlogos im freien Weiß unter dem Kennzahlenband */
    ui.logos(),

    /* 3 — Bildzäsur */
    ui.caesura({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
      alt: 'Firmengebäude von Merkle Schweißtechnik in München-Freiham mit Lieferfahrzeug und Gasflaschen vor dem Eingang'
    }),

    /* 4 — Statement (weiß) */
    ui.statement({
      kicker: 'Familiengeführt, Nachfolge gesichert',
      h2: '„Einmal Merkle – immer Merkle.“',
      text: 'Wir liefern nicht einfach Produkte. Wir sind Problemlöser in allen Fragen rund um Schweißen und Schneiden — ob es um ein spezielles schweißtechnisches Problem geht, ob Sie innerhalb von Stunden ein Mietgerät brauchen oder ob eine Express-Lieferung nach Bozen gehen muss. Zukunft braucht Herkunft.',
      link: { label: 'Die Firmengeschichte lesen', href: '/ueber-uns/' }
    }),

    /* 5 — Register-Modul (Signature, #F4F7F7) */
    ui.register({
      id: 'verfahren',
      kicker: 'Fünf Verfahren, ein Ansprechpartner',
      h2: 'Welches Verfahren zu Ihrem Werkstück passt,<br>klären wir vor dem Kauf.',
      lead: 'Vom dünnen Blech bis zum Stahlbau: Für jedes Verfahren führen wir passende Geräte — und Sie dürfen jedes davon vorher ausprobieren.',
      tablistLabel: 'Schweiß- und Schneidverfahren'
    }),

    /* 6 — Service-Bühne (dunkel) */
    ui.services({
      id: 'service',
      kicker: 'Was nach dem Kauf kommt',
      h2: 'Ein Gerät zu verkaufen ist einfach.<br>Es am Laufen zu halten, ist die Arbeit.',
      items: [
        {
          icon: 'wrench', title: 'Werkstatt und Reparatur',
          text: 'Wir reparieren defekte Anlagen aller Fabrikate und führen die vorgeschriebenen Prüfungen nach EN/IEC 60&nbsp;974-4 durch — in unserer Werkstatt oder in Ihrem Betrieb.',
          href: '/service/#werkstatt', link: 'Werkstatt ansehen'
        },
        {
          icon: 'rent', title: 'Mietgeräte',
          text: 'Wir vermieten so gut wie jede Schweiß- und Schneidanlage. Für die Dauer einer Reparatur stellen wir Ihnen auf Wunsch ein Ersatzgerät.',
          href: '/service/#miete', link: 'Mietgeräte ansehen'
        },
        {
          icon: 'recycle', title: 'Gebrauchtanlagen',
          text: 'Geprüfte Gebrauchtanlagen zum günstigen Preis. Fragen Sie unser Fachpersonal, welche Geräte gerade verfügbar sind.',
          href: '/service/#gebraucht', link: 'Gebrauchtanlagen ansehen'
        },
        {
          icon: 'cylinder', title: 'Tauschflaschensystem',
          text: 'Leer gegen voll, sofort und ohne Wartezeit. Sie zahlen nur die Füllung — kein Mietvertrag, keine TÜV-Sorgen.',
          href: '/gas/#tauschsystem', link: 'Tauschsystem verstehen'
        }
      ]
    }),

    /* 7 — Dreier-Karten (weiß) */
    ui.cards({
      kicker: 'Drei Wege zu uns',
      h2: 'Vorbeikommen, anrufen oder bestellen.',
      items: [
        {
          href: '/laden/',
          img: 'laden-1200-x700.png',
          alt: 'Verkäufer zeigt einem Kunden zwei Schweißhelme auf dem Verkaufstresen im Merkle-Ladengeschäft',
          title: 'Ladengeschäft Freiham',
          text: 'Montag bis Freitag durchgehend von 6:30 bis 18:00 Uhr, samstags von 8:00 bis 12:00 Uhr. Parkplätze direkt vor der Tür.'
        },
        {
          href: '/gas/',
          img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
          alt: 'Überdachtes Gasflaschenlager von Merkle München mit Flaschen in Gitterboxen und Hinweisschild zum Tauschflaschensystem',
          title: 'Gas und Tauschflaschen',
          text: 'Acetylen, Argon, Kohlensäure, Formiergas, Propan und mehr — abholen, liefern lassen oder tauschen.'
        },
        {
          href: EXTERN.kurse,
          img: 'merkle-gaslieferant-waehrend-der-arbeit1.png',
          alt: 'Merkle-Lieferfahrzeug mit Schweißkurs-Werbung, davor Gasflaschen auf dem Bürgersteig',
          title: 'Schweißkurse',
          text: 'MIG/MAG, WIG und Elektrode für Einsteiger und Fortgeschrittene — auf Wunsch mit TÜV-Prüfung.'
        }
      ]
    }),

    /* 8 — Standortband (#F4F7F7) */
    ui.locations({ id: 'standorte' }),

    /* 9 — Ansprechpartner (weiß) */
    ui.people({ id: 'ansprechpartner' }),

    /* 9b — Google-Bewertungen als Slider (weiß, direkt nach den Menschen) */
    ui.reviews({
      id: 'bewertungen',
      kicker: 'Was Kundinnen und Kunden schreiben',
      h2: 'Bewertungen bei Google.',
      limit: 12
    }),

    /* 10 — Aktuelles (#F4F7F7, damit sich der Block vom Vorgänger absetzt) */
    ui.news({
      id: 'aktuelles',
      kicker: 'Aktuelles',
      h2: 'Was gerade bei uns ansteht.',
      items: NEWS,
      more: { label: 'Alle Meldungen', href: '/aktuelles/' }
    }),

    /* 11 — Shop-Band (die einzige türkise Fläche) */
    ui.shopband()

  ].join('\n\n');

  return {
    url: '/',
    title: 'Merkle Schweißtechnik München | Fachhandel fürs Schweißen',
    description: 'Fachhandel rund ums Schweißen in München: Schweißgeräte, Zusatzwerkstoffe, Zubehör, Gase und Kühlwasser — mit eigener Werkstatt und Mietgeräten.',
    localBusiness: true,
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
    body
  };
};

/* Meldungen, die sich aus dem Bestand belegen lassen.
   Veröffentlichungsdaten liegen nicht vor und werden nicht geschätzt. */
const NEWS = [
  {
    title: 'Service-Techniker (m/w/d) für UVV-Prüfungen gesucht',
    href: '/jobs/',
    text: 'Vollzeit oder Teilzeit am Standort München-Freiham, mit Firmenauto zur privaten Nutzung. Bewerbung genügt per Mail mit Lebenslauf.'
  },
  {
    title: 'Merkle-Tauschsystem: der Kostenvergleich über zehn Jahre',
    href: '/gas/#tauschsystem',
    text: 'Miete, Miet-Abo oder Eigentumsflasche — was eine 20-Liter-Flasche Mischgas&nbsp;18 über zehn Jahre wirklich kostet.'
  },
  {
    title: 'Wasserdurchfluss-Wächter statt Wassermangelschalter',
    href: '/durchfluss-waechter/',
    text: 'Ein abgeknickter Schlauch erzeugt keinen Druckabfall, aber zu wenig Kühlung. Der Durchflusswächter reagiert trotzdem.'
  }
];
