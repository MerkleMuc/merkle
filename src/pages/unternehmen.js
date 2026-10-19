'use strict';
const ui = require('../ui');
const { EXTERN, TEL, STANDORTE } = require('../data');

const CRUMB_HOME = { label: 'Startseite', href: '/' };
const MUC = STANDORTE[0];

/* ================================================================ Service */
function service() {
  const crumbs = [CRUMB_HOME, { label: 'Service', href: '/service/' }];
  const faqItems = [
    { q: 'Reparieren Sie auch Geräte anderer Hersteller?', a: '<p>Ja. Wir reparieren defekte Anlagen aller Fabrikate und führen die gesetzlich vorgeschriebenen Prüfungen nach EN/IEC 60&nbsp;974-4 durch — entweder in unserer Werkstatt oder in Ihrem Betrieb.</p>' },
    { q: 'Bekomme ich ein Ersatzgerät, solange meines repariert wird?', a: '<p>Auf Wunsch ja. Für die Dauer der Reparatur stellen wir Ihnen ein Mietgerät zur Verfügung.</p>' },
    { q: 'Kann ich ein Gerät vor dem Kauf testen?', a: '<p>Sie können jedes Gerät ausgiebig testen — entweder in unserem Vorführraum oder bei Ihnen vor Ort an Ihrem eigenen Werkstück.</p>' },
    { q: 'Wie finanziere ich eine Anlage?', a: '<p>Alle unsere Anlagen können Sie bei uns einfach und unkompliziert ohne Bankeinschaltung direkt finanzieren.</p>' },
    { q: 'Sind Sie außerhalb der Öffnungszeiten erreichbar?', a: '<p>Ja. Bei einem Notfall sind wir zu jeder Tages- und Nachtzeit gegen einen geringen Aufschlag für Sie da.</p>' },
    { q: 'Liefern Sie die Ware auch aus?', a: '<p>Bei Bedarf liefern wir die bestellte Ware direkt zu Ihnen — in die Werkstatt, auf die Baustelle oder nach Hause.</p>' }
  ];

  const body = [
    ui.pageHero({
      img: 'schweisskurse-1200x500-1.png',
      alt: 'Werkstattmitarbeiter in Schweißerjacke mit Schweißbrenner und Schutzhelm in der Merkle-Werkstatt',
      kicker: 'Service', h1: 'Unsere Leistungen',
      sub: 'Was nach dem Kauf kommt — Werkstatt, Miete, Gebrauchtanlagen, Vorführung und Finanzierung.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Der Unterschied zum Versandhandel',
      h2: 'Ein Gerät zu verkaufen ist einfach.<br>Es am Laufen zu halten, ist die Arbeit.',
      body: `<p>Wir liefern nicht einfach Produkte, sondern lösen Probleme rund um Schweißen und Schneiden — ob es um ein spezielles schweißtechnisches Problem geht, ob Sie innerhalb von Stunden ein Mietgerät brauchen oder ob eine Express-Lieferung nach Bozen gehen muss.</p>`
    }),

    ui.alternating({
      wash: true,
      kicker: 'Die Leistungen im Einzelnen',
      h2: 'Fünf Dinge, die wir für Sie tun,<br>nachdem das Gerät bei Ihnen steht.',
      items: [
        {
          id: 'werkstatt',
          img: 'schweisskurse-1200x500-1.png',
          alt: 'Werkstattmitarbeiter mit Schweißbrenner und Schutzhelm in der Merkle-Werkstatt',
          title: 'Werkstatt und Reparatur',
          body: `<p>Wir reparieren defekte Anlagen aller Fabrikate und führen die gesetzlich vorgeschriebenen Prüfungen nach EN/IEC 60&nbsp;974-4 durch — entweder in unserer Werkstatt oder in Ihrem Betrieb.</p>
          <p>Für die Dauer der Reparatur stellen wir Ihnen auf Wunsch ein Mietgerät zur Verfügung, damit die Arbeit weitergeht.</p>`,
          link: { label: 'Zentrale anrufen: ' + TEL.zentrale.text, href: TEL.zentrale.href }
        },
        {
          id: 'miete',
          img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
          alt: 'Schweißgeräte und Zubehör im Merkle-Ladengeschäft',
          title: 'Mietanlagen',
          body: `<p>Wir vermieten so gut wie jede Schweiß- und Schneidanlage. Das lohnt sich für den einzelnen Auftrag, für Lastspitzen und für den Test vor dem Kauf.</p>`,
          link: { label: 'Zu den Mietgeräten', href: EXTERN.mieten }
        },
        {
          id: 'gebraucht',
          img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09881-hdr.jpg',
          alt: 'Ausstellungsraum mit mehreren Merkle-Schweißanlagen vor der Verkaufstheke',
          title: 'Gebrauchtanlagen',
          body: `<p>Suchen Sie eine besonders günstige Gebrauchtanlage? Fragen Sie unser Fachpersonal, welche Geräte gerade verfügbar sind — der Bestand wechselt laufend.</p>`,
          link: { label: 'Zu den Gebrauchtanlagen', href: EXTERN.gebraucht }
        },
        {
          id: 'vorfuehrung',
          img: 'laden-1200-x700.png',
          alt: 'Verkäufer zeigt einem Kunden zwei Schweißhelme auf dem Verkaufstresen',
          title: 'Beratung und Vorführung',
          body: `<p>Sie können jedes Gerät ausgiebig testen, entweder in unserem Vorführraum oder bei Ihnen zu Hause beziehungsweise im Betrieb — an Ihrem eigenen Werkstück, mit Ihrem eigenen Material.</p>`,
          link: { label: 'Termin vereinbaren: ' + TEL.verkauf.text, href: TEL.verkauf.href }
        },
        {
          id: 'finanzierung',
          img: 'merkle-gaslieferant-waehrend-der-arbeit1.png',
          alt: 'Merkle-Lieferfahrzeug mit Gasflaschen bei der Auslieferung',
          title: 'Lieferservice und Finanzierung',
          body: `<p>Bei Bedarf liefern wir die bestellte Ware direkt zu Ihnen. Und alle unsere Anlagen können Sie bei uns einfach und unkompliziert ohne Bankeinschaltung direkt finanzieren.</p>`,
          link: { label: 'Zentrale anrufen: ' + TEL.zentrale.text, href: TEL.zentrale.href }
        }
      ]
    }),

    ui.services({
      kicker: 'Und außerdem',
      h2: 'Drei Dinge, die man selten<br>bei einem Fachhandel bekommt.',
      items: [
        { icon: 'spark', title: 'Schweißkurse', text: 'MIG/MAG-, WIG- und Elektroden-Kurse für Einsteiger und Hobbybastler, auf Wunsch mit TÜV-Prüfung.', href: EXTERN.kurse, link: 'Zu den Kursen' },
        { icon: 'cylinder', title: 'Tauschflaschensystem', text: 'Leer gegen voll, sofort und ohne Wartezeit. Sie zahlen nur die Füllung.', href: '/gas/#tauschsystem', link: 'Tauschsystem verstehen' },
        { icon: 'truck', title: 'Lieferservice', text: 'Bundesweites Netz für Gase, Lieferung in die Werkstatt oder auf die Baustelle.', href: '/gas/', link: 'Gas bestellen' }
      ]
    }),

    ui.faq({ wash: true, h2: 'Häufige Fragen zum Service.', items: faqItems }),
    ui.locations({ id: 'oeffnungszeiten', wash: false }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/service/',
    title: 'Service München | Merkle Schweißtechnik GmbH',
    description: 'Der Merkle München Service bietet Werkstatt und Reparatur, Mietgeräte, Gebrauchtanlagen, Vorführung, Finanzierung, lange Öffnungszeiten.',
    ogImage: 'schweisskurse-1200x500-1.png',
    crumbs, faq: faqItems, body
  };
}

/* ================================================================== Laden */
function laden() {
  const crumbs = [CRUMB_HOME, { label: 'Ladengeschäft', href: '/laden/' }];
  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
      alt: 'Blick durch das Merkle-Ladengeschäft zum Eingang, links Schweißgeräte, rechts Schweißhelme an der Wand',
      kicker: 'München-Freiham', h1: 'Unser Schweißerladen',
      sub: 'Alles, was ein Schweißer braucht — auf Lager.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Warum vorbeikommen',
      h2: 'Was Sie sehen wollen, steht da.<br>Was Sie brauchen, nehmen Sie mit.',
      body: `<p>In unserem Schweißladen bieten wir Ihnen alles, was ein Schweißer braucht, direkt vor Ort — und das sofort, denn wir haben so ziemlich alles direkt auf Lager. Durch unsere langen Öffnungszeiten unter der Woche von 6:30 bis 18:00 Uhr durchgängig sowie samstags von 8:00 bis 12:00 Uhr können wir schnell helfen. Bei Bedarf liefern wir die bestellte Ware auch direkt zu Ihnen nach Hause.</p>
      <p>Falls es ein Notfall ist, sind wir auch zu jeder Tages- und Nachtzeit gegen einen geringen Aufschlag für Sie da.</p>
      <p>Außerdem erwerben Sie bei uns die Schweiß- und Schneidanlagen sowie die entsprechenden Brenner direkt vom Hersteller.</p>
      <p>Und damit Ihr Besuch bei Merkle München jedes Mal ein Vergnügen ist, steht Ihnen während Ihres Besuchs kostenlos eine große Auswahl an warmen und kalten Getränken zur Verfügung — sowie unsere kostenlosen Parkplätze direkt vor der Tür.</p>`
    }),

    ui.cards({
      wash: true,
      kicker: 'Einblick ins Fachgeschäft',
      h2: 'So sieht es bei uns aus.',
      items: [
        { href: '/schweissgeraete/', img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg', alt: 'Reihe türkisfarbener Merkle-Schweißgeräte auf Fahrwagen im Verkaufsraum', title: 'Geräte zum Anfassen', text: 'Die Anlagen stehen zum Ausprobieren bereit — nicht nur als Bild im Katalog.' },
        { href: '/schweisszubehoer/', img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09881-hdr.jpg', alt: 'Verkaufstheke mit Schweißgeräten, Drahtrollen und Zubehör im Ladengeschäft', title: 'Zubehör am Lager', text: 'Masken, Handschuhe, Schlauchpakete, Drahtrollen und Verschleißteile — alles griffbereit.' },
        { href: '/laden/#oeffnungszeiten', img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01059.jpg', alt: 'Kaffeeautomat im Merkle-Ladengeschäft, daneben ein Tablett mit türkisfarbenen Merkle-Tassen', title: 'Kaffee inklusive', text: 'Warme und kalte Getränke kostenlos während Ihres Besuchs, Parkplätze direkt vor der Tür.' }
      ]
    }),

    ui.prose({
      id: 'oeffnungszeiten',
      kicker: 'Öffnungszeiten und Anfahrt',
      h2: 'Anton-Böck-Straße 31, 81249 München.',
      body: `<p>Montag bis Freitag durchgehend von 6:30 bis 18:00 Uhr, samstags von 8:00 bis 12:00 Uhr. Parkplätze liegen direkt vor der Tür.</p>`
    }),
    ui.locations({}),
    ui.contactband({
      h2: 'Kommen Sie vorbei.<br>Bei Merkle gibt es alles, was ein Schweißer braucht.',
      text: 'Wenn Sie vorher wissen wollen, ob ein bestimmtes Gerät da ist: kurz anrufen. Wir schauen nach und legen es zur Seite.'
    })
  ].join('\n\n');

  return {
    url: '/laden/',
    title: 'Schweißladen München | Wilhelm Merkle Schweißtechnik GmbH',
    description: 'Alles, was ein Schweißer braucht, bieten wir in unserem Schweißladen in München-Freiham — auf Lager, mit langen Öffnungszeiten.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
    localBusinessOnly: 'muenchen',
    crumbs, body
  };
}

/* =============================================================== Über uns */
function ueberUns() {
  const crumbs = [CRUMB_HOME, { label: 'Über uns', href: '/ueber-uns/' }];
  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-team-1-dsc09946.jpg',
      alt: 'Das Team von Merkle Schweißtechnik München vor dem Firmengebäude in der Anton-Böck-Straße',
      kicker: 'Über uns', h1: 'Die Merkle Schweißtechnik GmbH stellt sich vor',
      sub: 'Familiengeführt, in dritter Generation vorbereitet — und seit 1976 in Bayern unterwegs.'
    }),
    ui.breadcrumbs(crumbs),

    /* Fließtext ist immer sichtbar. Kein Consent-Platzhalter davor. */
    ui.prose({
      kicker: 'Die Geschichte',
      h2: 'Von einer Vertriebsniederlassung<br>zu drei Standorten in Bayern.',
      body: `<p>Die Merkle Schweißtechnik GmbH wurde 1980 in München als Vertriebs- und Serviceniederlassung der Merkle-Schweißmaschinenbau GmbH aus Kötz in Schwaben gegründet, um von München aus die nieder- und oberbayerischen Kunden optimal zu betreuen.</p>
      <p>Da wir schnell gewachsen sind, wurde 1985 eine weitere Vertriebs- und Serviceniederlassung in Kumhausen bei Landshut gegründet, 1988 kam dann die nächste in Rosenheim dazu. Damit waren die Bedingungen geschaffen, um die Handwerks- und Industriekunden in den Ballungsräumen München, Landshut und Rosenheim und in den umliegenden Gebieten zu betreuen.</p>
      <p>Die Vision, neue Märkte zu erschließen, hat uns dazu bewogen, den osteuropäischen Markt genau zu analysieren. Im Jahr 2004 haben wir unsere Aktivitäten entsprechend ausgeweitet und haben heute dort Werksvertretungen: in der Tschechischen Republik, in Rumänien, in Serbien, in Kroatien und in Südtirol. Durch den Umzug in unser eigenes Gebäude 2008 nach München-Freiham wurde unsere Expansion vorläufig abgeschlossen.</p>`
    }),

    ui.caesura({
      img: 'ueber-uns-1.png',
      alt: 'Luftaufnahme des Merkle-Firmengeländes in München-Freiham mit Betriebsgebäude, Parkplatz und Gasflaschenlager'
    }),

    ui.prose({
      wash: true,
      kicker: 'Die Haltung',
      h2: 'Traditionelle Werte, innovative Visionen.',
      body: `<p>Unser Ziel war von Anfang an eine gesunde Mischung aus traditionellen Werten und innovativen Visionen, die uns dabei helfen, unsere Marktposition langfristig zu halten und weiter auszubauen.</p>
      <p>Wir liefern nicht einfach nur Produkte, sondern wir sind vor allem Problemlöser in allen Fragen rund um das Thema Schweißen und Schneiden — egal, ob es um ein spezielles schweißtechnisches Problem geht, ob Sie innerhalb von Stunden ein Mietgerät benötigen oder ob es um eine Express-Lieferung nach Bozen geht. Wir sind da und bieten entsprechende Lösungen an.</p>
      <p>Deshalb gehören Merkle, Innovation und Problemlösungen genauso unzertrennlich zusammen wie die ständige Weiterbildung und die Schulung von Mitarbeitern und Kunden. Um dies auch für die Zukunft zu garantieren, bilden wir in unserem Unternehmen seit über 30&nbsp;Jahren unseren Nachwuchs selbst aus. Außerdem nehmen wir unsere soziale Verantwortung ernst: Seit 20&nbsp;Jahren sponsern wir den Merkle-Cup, um Jugendlichen eine sinnvolle Freizeitbeschäftigung zu bieten.</p>
      <p>Als Schweiß- und Schneidtechnischer Fachhandel sind wir seit über 50&nbsp;Jahren am Markt — begonnen 1976 in München, seit 1980 als eigene GmbH.</p>`
    }),

    ui.prose({
      kicker: 'Die Zusage',
      h2: '„Einmal Merkle – immer Merkle.“',
      body: `<p>Unsere Philosophie war von Anfang an und wird auch in Zukunft sein, dass wir stets Maßnahmen treffen und nur solche Ziele vor Augen haben, die auch langfristig eine stabile wirtschaftliche Basis garantieren.</p>
      <p>Da sich viele Kunden Gedanken über eine langfristige Zusammenarbeit mit ihren Lieferanten machen, dürfen wir Ihnen heute schon versichern, dass Merkle ein familiengeführtes Unternehmen ist und auch bleiben wird, da auch die Nachfolge bereits gesichert ist.</p>
      <p>Wir können Ihnen versichern, dass wir ein Team mit klaren und nachvollziehbaren Vorstellungen und Zielen sind, das sich seiner Verantwortung bewusst ist — heute und auch morgen. Dadurch wird der Ausspruch „Einmal Merkle – immer Merkle“ auch morgen und übermorgen noch Gültigkeit und Bestand haben, denn Zukunft braucht Herkunft.</p>
      <p>In diesem Sinne hoffen wir weiterhin auf Ihre Treue und Verbundenheit zu uns und dürfen Ihnen versichern, dass wir alles unternehmen werden, um Sie optimal zufriedenzustellen.</p>
      <p><strong>Ihr Siegfried Awissus</strong><br>Geschäftsführer</p>`
    }),

    /* Zeitleiste als eigenes Modul */
    `<section class="mk-section mk-wash">
  <div class="mk-container">
    <div class="mk-grid" style="margin-bottom:48px">
      <div class="mk-col-8">
        <p class="mk-kicker">Firmengeschichte</p>
        <h2>Fünf Jahreszahlen, an denen sich alles<br>entschieden hat.</h2>
      </div>
    </div>
    <div class="mk-timeline">
      ${[
        ['1976', 'Der Beginn von Merkle München: Bartholomäus Burghart bereist das Gebiet München.'],
        ['1980', 'Der erste große Meilenstein: unser erster Laden in der Peslmüllerstraße.'],
        ['1994', 'Der Platz wurde zu klein: Umzug in ein größeres Gebäude in die Bodenseestraße.'],
        ['2008', 'Nun bauen wir selbst: Einzug in das eigene Gebäude in der Anton-Böck-Straße.'],
        ['2013', 'Siegfried Awissus wird auf dem CSU-Ball in Bayern zum Unternehmer des Jahres gekürt.']
      ].map(([y, t]) => `<div class="mk-timeline__item">
        <p class="mk-timeline__year">${y}</p>
        <p class="mk-timeline__text">${t}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`,

    ui.cards({
      kicker: 'Die Teams',
      h2: 'Drei Standorte, ein Verständnis von Arbeit.',
      items: [
        { href: '/standorte/muenchen/', img: '20241021-merkle-munchen-filiale-und-mitarbeiter-team-2-dsc09952-bearbeitet-2.jpg', alt: 'Sechs Mitarbeiter des Merkle-Verkaufsteams München im Ladengeschäft', title: 'München', text: 'Verkauf, Werkstatt, Gase und Buchhaltung unter einem Dach in Freiham.' },
        { href: EXTERN.landshut, img: '20241022-merkle-landshut-filiale-und-mitarbeiter-team-1-dsc02020.jpg', alt: 'Team der Merkle-Filiale Landshut vor dem Betriebsgebäude', title: 'Landshut', text: 'Seit 1985 in Ergolding bei Landshut für Niederbayern zuständig.' },
        { href: EXTERN.rosenheim, img: '20241022-merkle-rosenheim-filiale-und-mitarbeiter-team-vor-container-2.jpg', alt: 'Team der Merkle-Filiale Rosenheim vor einem Container auf dem Betriebsgelände', title: 'Rosenheim', text: 'Seit 1988 im Chiemgau und im südlichen Oberbayern vor Ort.' }
      ]
    }),

    ui.people({ kicker: 'Ihre Ansprechpartner', h2: 'Vier Bereiche, vier Durchwahlen.' }),

    /* Eingebettete Drittinhalte werden geblockt — Fließtext nie. */
    `<section class="mk-section mk-section--tight mk-wash">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">Standort ansehen</p>
        <h2 style="margin-bottom:32px">Merkle München auf der Karte.</h2>
        ${ui.embed({
          src: 'https://www.openstreetmap.org/export/embed.html?bbox=11.4058%2C48.1325%2C11.4218%2C48.1396&layer=mapnik&marker=48.136052%2C11.413829',
          title: 'Karte: Anton-Böck-Straße 31, 81249 München',
          note: 'Die Karte wird von OpenStreetMap geladen. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen. Der Text dieser Seite bleibt davon unberührt.',
          button: 'Karte laden'
        })}
        <p style="margin-top:20px"><a class="mk-textlink" href="${MUC.maps}" target="_blank" rel="noopener">Route mit Google Maps planen</a></p>
      </div>
    </div>
  </div>
</section>`,

    ui.contactband()
  ].join('\n\n');

  return {
    url: '/ueber-uns/',
    title: 'Über uns | Merkle München | Merkle Schweißtechnik GmbH',
    description: 'Die Merkle Schweißtechnik GmbH stellt sich vor: Firmengeschichte seit 1976, drei Standorte in Bayern, familiengeführt mit gesicherter Nachfolge.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-team-1-dsc09946.jpg',
    localBusiness: true,
    crumbs, body
  };
}

/* =================================================== Standort München (neu) */
function standortMuenchen() {
  const crumbs = [CRUMB_HOME, { label: 'Standorte', href: '/standorte/muenchen/' }, { label: 'München', href: '/standorte/muenchen/' }];
  const faqItems = [
    { q: 'Wo finde ich Merkle in München?', a: '<p>In der Anton-Böck-Straße 31, 81249 München-Freiham. Kostenlose Parkplätze liegen direkt vor der Tür.</p>' },
    { q: 'Wie sind die Öffnungszeiten in München?', a: '<p>Montag bis Freitag durchgehend von 6:30 bis 18:00 Uhr, samstags von 8:00 bis 12:00 Uhr.</p>' },
    { q: 'Welche Abteilung erreiche ich unter welcher Nummer?', a: '<p>Zentrale −0, Verkauf −16, Gase −17, Reparatur −20, gebrauchte Schweißgeräte −12, Schweißkurse −28. Die Vorwahl lautet jeweils +49 89 897717.</p>' },
    { q: 'Bekomme ich in München auch Gas?', a: '<p>Ja. Zwölf Gase stehen zur Verfügung, dazu das Merkle-Tauschflaschensystem. Sie können selbst abholen oder sich beliefern lassen.</p>' }
  ];

  const depts = [
    ['Zentrale', TEL.zentrale], ['Verkauf', TEL.verkauf], ['Gase', TEL.gase],
    ['Reparatur', TEL.reparatur], ['Gebrauchte Schweißgeräte', TEL.gebraucht],
    ['Schweißkurse', TEL.kurse]
  ];

  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
      alt: 'Firmengebäude von Merkle Schweißtechnik in München-Freiham mit Logo an der anthrazitfarbenen Fassade',
      kicker: 'Standort', h1: 'Merkle München-Freiham',
      sub: 'Anton-Böck-Straße 31, 81249 München — Verkauf, Werkstatt, Gase und Lager unter einem Dach.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Der Standort',
      h2: 'Seit 2008 im eigenen Gebäude im Münchner Westen.',
      body: `<p>Von Freiham aus betreuen wir Handwerksbetriebe, Industrie, Metallbauer und ambitionierte Privatanwender in München und Oberbayern. Verkauf, Werkstatt, Gasflaschenlager und Vorführraum liegen auf einem Gelände — was Sie brauchen, bekommen Sie in einem Gang.</p>
      <p>Kostenlose Parkplätze liegen direkt vor der Tür, warme und kalte Getränke gibt es während Ihres Besuchs kostenlos dazu.</p>`
    }),

    `<section class="mk-section mk-wash">
  <div class="mk-container">
    <div class="mk-contactband__grid">
      <div>
        <p class="mk-kicker">Öffnungszeiten und Anfahrt</p>
        <h2 style="margin-bottom:24px">Montag bis Freitag durchgehend<br>von 6:30 bis 18:00 Uhr.</h2>
        <dl class="mk-hours" style="max-width:34rem">
          ${MUC.hours.map(h => `<div><dt>${h.d}</dt><dd>${h.t}</dd></div>`).join('\n          ')}
        </dl>
        <div class="mk-emergency">
          <p class="mk-emergency__title">Ladengeschäft München-Freiham</p>
          <p>Außerhalb der Öffnungszeiten erreichen Sie uns gegen einen geringen Aufschlag.</p>
        </div>
        <div class="mk-btnrow" style="margin-top:32px">
          <a class="mk-btn mk-btn--primary" href="${MUC.tel.href}">Anrufen: ${MUC.tel.text}</a>
          <a class="mk-btn mk-btn--outline" href="${MUC.maps}" target="_blank" rel="noopener">Route planen</a>
        </div>
      </div>
      <div>
        ${ui.embed({
          src: 'https://www.openstreetmap.org/export/embed.html?bbox=11.4058%2C48.1325%2C11.4218%2C48.1396&layer=mapnik&marker=48.136052%2C11.413829',
          title: 'Karte: Anton-Böck-Straße 31, 81249 München',
          note: 'Die Karte wird von OpenStreetMap geladen. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen. Alle Angaben dieser Seite stehen auch ohne die Karte zur Verfügung.',
          button: 'Karte laden'
        })}
      </div>
    </div>
  </div>
</section>`,

    ui.table({
      kicker: 'Durchwahlen',
      h2: 'Zehn Durchwahlen — damit Sie nicht weitervermittelt werden.',
      head: ['Abteilung', 'Telefon'],
      rows: depts.map(([n, t]) => [n, `<a href="${t.href}">${t.text}</a>`])
    }),

    ui.faq({ wash: true, h2: 'Häufige Fragen zum Standort München.', items: faqItems }),

    ui.siblings({
      kicker: 'Weitere Standorte',
      items: [
        { href: EXTERN.landshut, label: 'Merkle Landshut', note: 'Meisenstraße 11a, 84030 Ergolding' },
        { href: EXTERN.rosenheim, label: 'Merkle Rosenheim', note: 'Weidestraße 5A, 83024 Rosenheim' },
        { href: '/laden/', label: 'Ladengeschäft', note: 'Was Sie im Laden erwartet' },
        { href: '/kontakt/', label: 'Kontakt', note: 'Alle Wege zu uns' }
      ]
    }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/standorte/muenchen/',
    title: 'Merkle München-Freiham | Standort, Öffnungszeiten, Anfahrt',
    description: 'Merkle Schweißtechnik in München-Freiham: Anton-Böck-Straße 31, Mo bis Fr 6:30–18:00 Uhr, Sa 8:00–12:00 Uhr, mit Werkstatt, Gaselager.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
    localBusinessOnly: 'muenchen',
    crumbs, faq: faqItems, body
  };
}

/* ================================================================== Jobs */
function jobs() {
  const crumbs = [CRUMB_HOME, { label: 'Jobs', href: '/jobs/' }];
  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-team-2-dsc09952-bearbeitet-2.jpg',
      alt: 'Sechs Mitarbeiter des Merkle-Verkaufsteams München stehen nebeneinander im Ladengeschäft',
      kicker: 'Jobs', h1: 'Arbeiten bei Merkle München',
      sub: 'Familiäres Arbeitsklima, langfristig sicherer Arbeitsplatz — und Aufgaben, die man abends erklären kann.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Offene Stelle',
      h2: 'Service-Techniker, Elektroniker oder Elektriker (m/w/d)<br>mit Schwerpunkt UVV-Prüfungen an Schweißgeräten.',
      body: `<p>Standort München-Freiham, Einsatzgebiet im Umkreis von rund 50&nbsp;km. Vollzeit oder Teilzeit, gute Bezahlung, sicherer Job.</p>`
    }),

    ui.featureGrid({
      wash: true,
      kicker: 'Was Sie bekommen',
      h2: 'Acht Dinge, die zum Job gehören.',
      items: [
        { title: 'Firmenauto', text: 'Inklusive privater Nutzung.' },
        { title: 'Firmenhandy', text: 'Gestellt, für die Arbeit im Außendienst.' },
        { title: 'Familiäres Arbeitsklima', text: 'Kleines Team, kurze Wege, keine Konzernstrukturen.' },
        { title: 'Zusätzliche Sonderleistungen', text: 'Über das Gehalt hinaus.' },
        { title: 'Eigenverantwortliches Arbeiten', text: 'Sie planen Ihre Touren und Prüfungen selbst.' },
        { title: 'Moderner Arbeitsplatz', text: 'Werkstatt und Ausstattung auf aktuellem Stand.' },
        { title: 'Abwechslungsreicher Alltag', text: 'Jeder Betrieb, jede Anlage ist anders.' },
        { title: 'Langfristig sicherer Arbeitsplatz', text: 'Familiengeführt, Nachfolge gesichert.' }
      ]
    }),

    ui.prose({
      kicker: 'Was Sie mitbringen',
      h2: 'Das ist uns das Wichtigste.',
      body: `<ul>
        <li>Sie sind ausgebildete beziehungsweise ausgebildeter und erfahrene beziehungsweise erfahrener Elektroniker oder Techniker.</li>
        <li>Sie haben eine gültige Fahrerlaubnis.</li>
        <li>Sie haben gute Deutschkenntnisse und können sicher kommunizieren.</li>
      </ul>
      <p><strong>Ein großes Plus, aber kein Muss:</strong></p>
      <ul>
        <li>abgeschlossene Fortbildung zur Prüfung ortsveränderlicher elektrischer Geräte, Arbeits- und Betriebsmittel</li>
        <li>abgeschlossene Fortbildung zur elektrotechnisch unterwiesenen Person</li>
      </ul>
      <p>Wenn das passt, schreiben Sie uns eine Mail mit Lebenslauf für ein Kennenlernen. Ein vollständiges Bewerbungsdossier brauchen wir für den ersten Schritt nicht.</p>
      <p><a class="mk-btn mk-btn--primary" href="mailto:info@merkle-muenchen.de?subject=Bewerbung%20Service-Techniker%20(m%2Fw%2Fd)">E-Mail mit Lebenslauf schreiben</a></p>`
    }),

    ui.downloads({
      wash: true,
      kicker: 'Stellenausschreibungen',
      h2: 'Die Ausschreibungen als PDF.',
      items: [
        { label: 'Service-Techniker (m/w/d) mit Schwerpunkt UVV-Prüfungen an Schweißanlagen', href: '/assets/pdf/stellenangebot-servicetechniker-uvv.pdf', meta: 'PDF · München-Freiham' },
        { label: 'Fachkraft (m/w/d) für Lagerlogistik', href: '/assets/pdf/stellenangebot-fachkraft-lagerlogistik_24.pdf', meta: 'PDF · München-Freiham' }
      ]
    }),

    ui.contactband({
      h2: 'Fragen zur Stelle?<br>Rufen Sie einfach an.',
      text: 'Sie erreichen uns unter der Zentrale. Wir verbinden Sie mit der richtigen Ansprechperson — ohne Bewerbungsportal und ohne Formular.'
    })
  ].join('\n\n');

  return {
    url: '/jobs/',
    title: 'Jobs bei Merkle München | Merkle Schweißtechnik GmbH',
    description: 'Merkle München sucht Verstärkung: Service-Techniker (m/w/d) mit Schwerpunkt UVV-Prüfungen und Fachkraft für Lagerlogistik. Bewerbung genügt per Mail.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-team-2-dsc09952-bearbeitet-2.jpg',
    crumbs, body
  };
}

/* =============================================================== Kontakt */
function kontakt() {
  const crumbs = [CRUMB_HOME, { label: 'Kontakt', href: '/kontakt/' }];

  const depts = [
    ['Zentrale', TEL.zentrale], ['Verkauf', TEL.verkauf], ['Gase', TEL.gase],
    ['Reparatur', TEL.reparatur], ['Gebrauchte Schweißgeräte', TEL.gebraucht],
    ['Schweißkurse', TEL.kurse]
  ];

  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
      alt: 'Merkle-Betriebsgebäude in München-Freiham mit Eingang, Lieferfahrzeug und Gasflaschen davor',
      kicker: 'Kontakt', h1: 'Kontakt',
      sub: 'Telefon, Mail, Formular oder einfach vorbeikommen — vier Wege, uns zu erreichen.'
    }),
    ui.breadcrumbs(crumbs),

    ui.table({
      kicker: 'München',
      h2: 'Zehn Durchwahlen — damit Sie nicht weitervermittelt werden.',
      head: ['Abteilung', 'Telefon'],
      rows: depts.map(([n, t]) => [n, `<a href="${t.href}">${t.text}</a>`])
    }),

    ui.locations({ kicker: 'Alle Standorte', h2: 'München, Landshut und Rosenheim.' }),

    /* Formular. Fließtext und Kontaktdaten stehen unabhängig davon zur Verfügung. */
    `<section class="mk-section" id="formular">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">Kontaktformular</p>
        <h2 style="margin-bottom:16px">Schreiben Sie uns, was Sie vorhaben.</h2>
        <p class="mk-lead" style="margin-bottom:40px">Je genauer Sie Werkstoff, Blechdicke und vorhandenen Stromanschluss beschreiben, desto konkreter fällt unsere Antwort aus.</p>

        <form class="mk-form" action="mailto:info@merkle-muenchen.de" method="post" enctype="text/plain">
          <div class="mk-field">
            <label for="k-name">Name <span class="mk-req" aria-hidden="true">*</span></label>
            <input type="text" id="k-name" name="name" autocomplete="name" required>
          </div>
          <div class="mk-field">
            <label for="k-firma">Firma</label>
            <input type="text" id="k-firma" name="firma" autocomplete="organization">
          </div>
          <div class="mk-field">
            <label for="k-mail">E-Mail <span class="mk-req" aria-hidden="true">*</span></label>
            <input type="email" id="k-mail" name="email" autocomplete="email" required>
          </div>
          <div class="mk-field">
            <label for="k-tel">Telefon</label>
            <input type="tel" id="k-tel" name="telefon" autocomplete="tel">
            <span class="mk-field__hint" id="k-tel-hint">Für Rückfragen — meist schneller als eine Mail.</span>
          </div>
          <div class="mk-field mk-field--full">
            <label for="k-thema">Worum geht es?</label>
            <select id="k-thema" name="thema">
              <option>Beratung zu einem Schweißgerät</option>
              <option>Zusatzwerkstoffe und Zubehör</option>
              <option>Gas und Tauschflaschen</option>
              <option>Werkstatt, Reparatur oder UVV-Prüfung</option>
              <option>Mietgerät oder Gebrauchtanlage</option>
              <option>Rechnung und Finanzierung</option>
              <option>Etwas anderes</option>
            </select>
          </div>
          <div class="mk-field mk-field--full">
            <label for="k-text">Ihre Nachricht <span class="mk-req" aria-hidden="true">*</span></label>
            <textarea id="k-text" name="nachricht" required></textarea>
          </div>
          <div class="mk-checkrow">
            <input type="checkbox" id="k-dsgvo" name="datenschutz" required>
            <label for="k-dsgvo">Ich habe die <a href="/datenschutz/">Datenschutzerklärung</a> gelesen und bin mit der Verarbeitung meiner Angaben zur Bearbeitung der Anfrage einverstanden. <span class="mk-req" aria-hidden="true">*</span></label>
          </div>
          <div class="mk-field mk-field--full">
            <p class="mk-note">Ihre Anfrage geht an <a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a>. Beim Absenden öffnet sich Ihr E-Mail-Programm mit den ausgefüllten Angaben — so liegt die Anfrage auch in Ihrem gesendeten Ordner. Lieber direkt sprechen? <a href="${TEL.zentrale.href}">${TEL.zentrale.text}</a>.</p>
            <div class="mk-btnrow" style="margin-top:20px">
              <button class="mk-btn mk-btn--primary" type="submit">Anfrage senden</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>`,

    `<section class="mk-section mk-wash">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">Anfahrt</p>
        <h2 style="margin-bottom:32px">Anton-Böck-Straße 31, 81249 München.</h2>
        ${ui.embed({
          src: 'https://www.openstreetmap.org/export/embed.html?bbox=11.4058%2C48.1325%2C11.4218%2C48.1396&layer=mapnik&marker=48.136052%2C11.413829',
          title: 'Karte: Anton-Böck-Straße 31, 81249 München',
          note: 'Die Karte wird von OpenStreetMap geladen. Dabei wird Ihre IP-Adresse an OpenStreetMap übertragen. Adresse und Öffnungszeiten stehen auch ohne die Karte auf dieser Seite.',
          button: 'Karte laden'
        })}
        <p style="margin-top:20px"><a class="mk-textlink" href="${MUC.maps}" target="_blank" rel="noopener">Route mit Google Maps planen</a></p>
      </div>
    </div>
  </div>
</section>`
  ].join('\n\n');

  return {
    url: '/kontakt/',
    title: 'Kontakt Merkle München | Merkle Schweißtechnik GmbH',
    description: 'Merkle Schweißtechnik GmbH, Anton-Böck-Straße 31, 81249 München. Telefon +49 89 897717-0, info@merkle-muenchen.de — mit allen Durchwahlen der Abteilungen.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
    localBusiness: true,
    crumbs, body
  };
}

/* ============================================================== Aktuelles */
const NEWS_ITEMS = [
  {
    title: 'Service-Techniker (m/w/d) für UVV-Prüfungen gesucht',
    href: '/jobs/',
    text: 'Vollzeit oder Teilzeit am Standort München-Freiham, Einsatzgebiet im Umkreis von rund 50&nbsp;km, Firmenauto inklusive privater Nutzung. Für den ersten Schritt genügt eine Mail mit Lebenslauf.'
  },
  {
    title: 'Merkle-Tauschsystem: der Kostenvergleich über zehn Jahre',
    href: '/gas/#tauschsystem',
    text: 'Miete zum Tagessatz, Miet-Abo oder Eigentumsflasche — was eine 20-Liter-Flasche Mischgas&nbsp;18 über zehn Jahre wirklich kostet, steht jetzt als Tabelle auf der Gas-Seite.'
  },
  {
    title: 'Wasserdurchfluss-Wächter statt Wassermangelschalter',
    href: '/durchfluss-waechter/',
    text: 'Ein abgeknickter Schlauch erzeugt keinen Druckabfall, lässt aber zu wenig Wasser durch. Der Durchflusswächter reagiert schon unter 0,5&nbsp;Litern pro Minute — und schützt Brenner und Strom-Wasser-Kabel.'
  }
];

function aktuelles() {
  const crumbs = [CRUMB_HOME, { label: 'Aktuelles', href: '/aktuelles/' }];
  const body = [
    ui.pageHero({
      kicker: 'Aktuelles', h1: 'Was gerade bei uns ansteht',
      sub: 'Aktionen, Neuheiten, offene Stellen und Hinweise aus der Werkstatt.'
    }),
    ui.breadcrumbs(crumbs),
    ui.news({ kicker: 'Meldungen', h2: 'Aktuelle Meldungen.', items: NEWS_ITEMS }),
    ui.prose({
      wash: true,
      kicker: 'Hinweis',
      h2: 'Ohne Datum, dafür aktuell.',
      body: `<p>Die Meldungen auf dieser Seite tragen bewusst kein Datum: Wir pflegen sie ein, wenn es etwas zu sagen gibt — eine Aktion, ein neues Gerät, eine offene Stelle — und nicht nach einem Redaktionsplan. Was hier steht, gilt.</p>
      <p>Sie möchten nichts verpassen? Rufen Sie uns an oder schreiben Sie uns kurz, wir melden uns.</p>`
    }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/aktuelles/',
    title: 'Aktuelles | Merkle Schweißtechnik München',
    description: 'Aktionen, Neuheiten, offene Stellen und Hinweise aus der Werkstatt von Merkle Schweißtechnik in München-Freiham.',
    crumbs, body
  };
}

/* ============================================================== Bewertung */
function bewertung() {
  const crumbs = [CRUMB_HOME, { label: 'Bewertung abgeben', href: '/bewertung/' }];
  /* Direktlink in das Google-Bewertungsformular des jeweiligen Standorts.
     Die Place-IDs hat der Betreiber am 19.10.2026 bestätigt. */
  const writeReview = s => 'https://search.google.com/local/writereview?placeid=' + s.placeId;

  const body = [
    ui.pageHero({
      kicker: 'Feedback', h1: 'Bewerten Sie unseren Service',
      sub: 'Sagen Sie uns, was gut lief — und was nicht. Beides hilft.'
    }),
    ui.breadcrumbs(crumbs),

    ui.cards({
      kicker: 'Drei Standorte',
      h2: 'Wählen Sie den Standort,<br>an dem Sie zuletzt waren.',
      items: STANDORTE.map(s => ({
        href: writeReview(s),
        img: s.id === 'muenchen'
          ? '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg'
          : (s.id === 'landshut'
            ? '20241022-merkle-landshut-filiale-und-mitarbeiter-team-1-dsc02020.jpg'
            : '20241022-merkle-rosenheim-filiale-und-mitarbeiter-team-vor-container-2.jpg'),
        alt: 'Standort Merkle ' + s.name,
        title: 'Merkle ' + s.name,
        text: s.street + ', ' + s.zip + ' ' + s.city + '. Öffnet direkt das Bewertungsformular bei Google.'
      }))
    }),

    ui.reviews({
      wash: true,
      kicker: 'Was andere schreiben',
      h2: 'Bewertungen bei Google.'
    }),

    ui.prose({
      kicker: 'Hinweis',
      h2: 'Lieber direkt zu uns?',
      body: `<p>Wenn etwas schiefgelaufen ist, ist uns ein Anruf lieber als ein Stern weniger. Unter <a href="${TEL.zentrale.href}">${TEL.zentrale.text}</a> erreichen Sie die Zentrale, unter <a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a> die Geschäftsleitung.</p>
      <p>Die drei Karten oben führen direkt in das Bewertungsformular des jeweiligen Standorts — ohne Umweg über die Suche.</p>`
    }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/bewertung/',
    title: 'Bewertung abgeben | Merkle Schweißtechnik',
    description: 'Bewerten Sie den Service von Merkle Schweißtechnik in München, Landshut oder Rosenheim — oder sagen Sie uns direkt, was besser laufen sollte.',
    crumbs, body
  };
}

/* ================================================================ Glossar */
const GLOSSAR = [
  ['BiPowerPLUS', 'Funktion, mit der eine Anlage wahlweise an 400&nbsp;V-Drehstrom oder an 230&nbsp;V-Wechselstrom betrieben werden kann.'],
  ['EN/IEC 60 974-4', 'Norm für die wiederkehrende Prüfung von Lichtbogenschweißeinrichtungen. Wir führen diese Prüfung in unserer Werkstatt oder in Ihrem Betrieb durch.'],
  ['Formiergas', 'Gemisch aus Stickstoff und Wasserstoff, unter anderem 85/15, 80/20 oder 90/10, das beim Schweißen von Edelstahl die Wurzel vor Oxidation schützt.'],
  ['LiftTIG-Zündung', 'Zündverfahren, bei dem die Elektrode das Werkstück berührt und beim Abheben den Lichtbogen zieht — im Gegensatz zur Hochfrequenzzündung ohne Störstrahlung.'],
  ['Leitwert', 'Maß für die elektrische Leitfähigkeit der Kühlflüssigkeit. Er sollte 150&nbsp;Mikrosiemens nicht überschreiten, im WIG-Bereich sind maximal 100 empfehlenswert.'],
  ['MAG-Schweißen', 'Metall-Aktivgas-Schweißen. Wird vornehmlich bei Stahl und Edelstahl angewandt.'],
  ['MIG-Schweißen', 'Metall-Inertgas-Schweißen. Wird bei Nichteisen-Metallen angewandt.'],
  ['Plasmaschneiden', 'Trennverfahren, bei dem ein Plasmastrahl von etwa 13.000&nbsp;°C das Werkstück schmilzt. Mit Druckluft als Plasmagas eine wirtschaftliche Alternative zum Autogen-Schneiden.'],
  ['Pulse-Arc', 'Schweißverfahren mit pulsierendem Lichtbogen, das den Einsatz verhältnismäßig dicker Drahtelektroden erlaubt.'],
  ['TEDAC', 'Merkle-System zur stufenlosen Energiefernregelung mit Anzeige direkt am Schweißbrenner. In der Ausbaustufe TEDAC DIGITAL® mit alphanumerischem Display.'],
  ['UVV-Prüfung', 'Prüfung ortsveränderlicher elektrischer Betriebsmittel nach den Unfallverhütungsvorschriften. Für Schweißanlagen nach EN/IEC 60&nbsp;974-4.'],
  ['VE-Wasser', 'Vollentsalztes, demineralisiertes Wasser ohne die im Quell- und Leitungswasser vorkommenden Salze. Zum Spülen des Kühlkreislaufs vor der Erstbefüllung.'],
  ['WIG-Schweißen', 'Wolfram-Inertgas-Schweißen, international TIG. Schutzgasschweißen mit reduzierter Wärme, geeignet für jedes schmelzschweißbare Metall.'],
  ['Wasserdurchfluss-Wächter', 'Sicherheitseinrichtung, die auslöst, sobald der Kühlmitteldurchfluss unter 0,5&nbsp;Liter pro Minute sinkt — anders als ein Wassermangelschalter, der auf Druck reagiert.']
];

function glossar() {
  const crumbs = [CRUMB_HOME, { label: 'Glossar', href: '/glossary/' }];
  const body = [
    ui.pageHero({
      kicker: 'Nachschlagen', h1: 'Glossar',
      sub: 'Begriffe aus der Schweiß- und Schneidtechnik, wie wir sie auf dieser Website verwenden.'
    }),
    ui.breadcrumbs(crumbs),
    ui.table({
      kicker: 'Begriffe',
      h2: 'Vierzehn Begriffe, kurz erklärt.',
      head: ['Begriff', 'Bedeutung'],
      rows: GLOSSAR
    }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/glossary/',
    title: 'Glossar Schweißtechnik | Merkle Schweißtechnik München',
    description: 'Begriffe aus der Schweiß- und Schneidtechnik kurz erklärt: MIG, MAG, WIG, Pulse-Arc, Plasmaschneiden, UVV-Prüfung, Leitwert, VE-Wasser und mehr.',
    crumbs, body
  };
}

/* ============================================================ Coolant (EN) */
function water() {
  const crumbs = [CRUMB_HOME, { label: 'Coolant', href: '/water/' }];
  const body = [
    ui.pageHero({
      img: 'kuehlfluessigkeit-10-kg.png',
      alt: 'Canister of Merkle coolant ME 30-100.2-ECO',
      kicker: 'Product information', h1: 'Coolant ME 30-100.2-ECO',
      sub: 'pH 7.8, conductivity below 25 microsiemens, frost protection down to −30 °C.'
    }),
    ui.breadcrumbs(crumbs),

    ui.prose({
      kicker: 'Why it matters',
      h2: 'The wrong coolant costs you the pump —<br>and the torch along with it.',
      body: `<h3>Why is it inherently important to use only the ME 30-100.2-ECO coolant?</h3>
      <p>Since a welding or cutting system is not of little value and every user is interested in it doing its work for a long time without great expense, the use of the right coolant is of extreme importance. The ME 30-100.2-ECO coolant ensures that the high level of corrosion protection it contains optimally protects all important components, especially the susceptible non-ferrous heavy metals used in welding and cutting systems.</p>

      <h3>Why is a proper coolant especially important in the TIG area?</h3>
      <p>For the operational lifetime of a TIG torch it is very important which coolant is used. Perfect ignition requires a very low conductivity combined with an optimally balanced pH value of 7.8. This is the case with the Merkle coolant. Coolant with a pH value of less than 6 is considered acidic and aggressive and primarily destroys components in the pump and in the torch.</p>

      <h3>What does the water pump have to do with the coolant?</h3>
      <p>The operational lifetime depends to a large extent on which coolant is used. Using the wrong coolant will cause damage to seal and shaft in a very short time. A leaking water pump causes system failures with expensive downtime and high repair costs.</p>`
    }),

    ui.featureGrid({
      wash: true,
      kicker: 'Properties',
      h2: 'Six figures that make the difference.',
      items: [
        { title: 'pH value 7.8', text: 'Optimally balanced for perfect ignition in the TIG area. Values below 6 are considered acidic and aggressive.' },
        { title: 'Conductivity below 25 microsiemens', text: 'Attacks neither the current-water cable nor the water pump. The recommended maximum is 100 to 150 microsiemens.' },
        { title: 'Frost protection to −30 °C', text: 'Usable in unheated vehicles and containers.' },
        { title: 'No flash or ignition point', text: 'Declaring one is not legally required — a considerable advantage for storage and transport.' },
        { title: 'No dangerous goods labelling', text: 'Meets all transport regulations worldwide without labelling, for example ADR, ADN and IMDG.' },
        { title: 'Biodegradable', text: 'Biodegradable according to OECD criteria. No health hazard under EC Regulation 1272/2008 CLP.' }
      ]
    }),

    ui.downloads({
      kicker: 'Documents',
      h2: 'Safety data sheets.',
      items: [
        { label: 'Safety data sheet ME 30-100.2-ECO (English)', href: 'http://merkle-muenchen.server24.merkle-pages.de/wp-content/uploads/sites/2/2019/10/sicherheitsdatenblatt-me-30-100.2-eco-en.pdf', meta: 'PDF' },
        { label: 'Sicherheitsdatenblatt ME 30-100.2-ECO (deutsch)', href: 'http://merkle-muenchen.server24.merkle-pages.de/wp-content/uploads/sites/2/2019/10/sicherheitsdatenblatt-me-30-100.2-eco-de.pdf', meta: 'PDF' },
        { label: 'Kühlwasser — diese Seite auf Deutsch', href: '/wasser/', meta: 'Seite' }
      ]
    }),
    ui.contactband({
      h2: 'Questions about the coolant?<br>Call us.',
      text: 'Our sales team will tell you which container size fits your workshop and how to change over from your current coolant.'
    })
  ].join('\n\n');

  return {
    url: '/water/',
    lang: 'en',
    title: 'Coolant ME 30-100.2-ECO | Merkle Schweißtechnik München',
    description: 'The biggest benefit of our coolant ME 30-100.2-ECO is reduced costs from water pump failure and label-free storage and transport.',
    ogImage: 'kuehlfluessigkeit-10-kg.png',
    crumbs, body
  };
}

module.exports = [
  service, laden, ueberUns, standortMuenchen, jobs, kontakt,
  aktuelles, bewertung, glossar, water
];
module.exports.NEWS_ITEMS = NEWS_ITEMS;
