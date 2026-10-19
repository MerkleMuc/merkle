'use strict';
const ui = require('../ui');
const { EXTERN, TEL, VERFAHREN } = require('../data');

const CRUMB_HOME = { label: 'Startseite', href: '/' };

/* Geschwister im Sortiment */
const GERAETE_SIBLINGS = [
  { href: '/schweissgeraete/mig-mag/', label: 'MIG/MAG', note: 'Schutzgas für Stahl, Edelstahl und NE-Metalle' },
  { href: '/schweissgeraete/wig/', label: 'WIG', note: 'Reduzierte Wärme, jedes schmelzschweißbare Metall' },
  { href: '/schweissgeraete/elektroden-schweissanlagen/', label: 'Elektrode', note: 'Montagetauglich, tragbar ab 5,0 kg' },
  { href: '/schweissgeraete/pulse-arc/', label: 'Pulse-Arc', note: 'Pulsierender Lichtbogen, dicke Drahtelektroden' },
  { href: '/schweissgeraete/plasma-schneidanlagen/', label: 'Plasmaschneiden', note: 'Druckluft als Plasmagas, schmale Schnittfuge' }
];

const WERKSTOFF_SIBLINGS = [
  { href: '/zusatzwerkstoffe/stahl/', label: 'Für Stahl', note: 'Draht, Fass, Elektroden, Stäbe' },
  { href: '/zusatzwerkstoffe/edelstahl/', label: 'Für Edelstahl', note: 'Draht, Fass, Elektroden, Stäbe' },
  { href: '/zusatzwerkstoffe/aluminium/', label: 'Für Aluminium', note: 'Draht, Elektroden, Stäbe' },
  { href: '/schweisszubehoer/', label: 'Schweißzubehör', note: 'Masken, Schutzkleidung, Reinigung' }
];

const SORTIMENT_SIBLINGS = [
  { href: '/schweissgeraete/', label: 'Schweißgeräte', note: 'Fünf Verfahren, alle Leistungsklassen' },
  { href: '/zusatzwerkstoffe/', label: 'Zusatzwerkstoffe', note: 'Stahl, Edelstahl, Aluminium' },
  { href: '/gas/', label: 'Gas', note: 'Zwölf Gase, Tauschflaschensystem' },
  { href: '/wasser/', label: 'Kühlwasser', note: 'ME 30-100.2-ECO' }
];

/* Downloads je Geräteseite */
const dl = (label, file, meta) => ({ label, href: '/assets/pdf/' + file, meta });

/* ========================================================================= */
function schweissgeraete() {
  const crumbs = [CRUMB_HOME, { label: 'Schweißgeräte', href: '/schweissgeraete/' }];
  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
      alt: 'Mehrere türkisfarbene Merkle-Schweißgeräte auf Fahrwagen im Ausstellungsraum in München-Freiham',
      kicker: 'Sortiment',
      h1: 'Schweißgeräte',
      sub: 'Funktionalität und Leistung — ausgereifte Technik im Detail.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Nach Schweißverfahren sortiert',
      h2: 'Erst das Verfahren, dann das Gerät.',
      body: `<p>Je nach Schweißverfahren eignen sich verschiedene Geräte. Wir führen für jedes Verfahren passende Anlagen — von der tragbaren Handstromquelle bis zur automatisierten Sonderlösung. Welches Gerät zu Ihrem Werkstück, Ihrer Stromversorgung und Ihrem Budget passt, klären wir vorher am Telefon oder im Vorführraum.</p>
      <p>Nahezu alle Maschinen- und Brennerteile werden in der betriebseigenen Fräserei und Dreherei gefertigt. Ein modernes Qualitätssystem sichert die Verfügbarkeit bei Maschinen, Zubehör- und Ersatzteilen.</p>`
    }),

    ui.register({
      id: 'verfahren',
      kicker: 'Fünf Verfahren im Überblick',
      h2: 'Was die Verfahren unterscheidet —<br>und wofür Sie welches brauchen.',
      lead: 'Wählen Sie ein Verfahren aus, um Einsatzbereich und Geräteserien zu sehen.',
      tablistLabel: 'Schweiß- und Schneidverfahren'
    }),

    ui.services({
      kicker: 'Vor dem Kauf',
      h2: 'Jedes Gerät dürfen Sie ausgiebig testen —<br>bei uns oder bei Ihnen.',
      items: [
        { icon: 'eye', title: 'Vorführung', text: 'Testen Sie jedes Gerät in unserem Vorführraum oder direkt an Ihrem Werkstück im Betrieb.', href: '/service/#vorfuehrung', link: 'Vorführung vereinbaren' },
        { icon: 'euro', title: 'Finanzierung', text: 'Alle Anlagen finanzieren Sie bei uns direkt, ohne Bankeinschaltung.', href: '/service/#finanzierung', link: 'Finanzierung klären' },
        { icon: 'rent', title: 'Erst mieten', text: 'Sie sind unsicher? Mieten Sie die Anlage für den ersten Auftrag und entscheiden Sie danach.', href: '/service/#miete', link: 'Mietgeräte ansehen' },
        { icon: 'wrench', title: 'Danach Werkstatt', text: 'Reparatur aller Fabrikate und Prüfungen nach EN/IEC 60&nbsp;974-4 — bei uns oder bei Ihnen.', href: '/service/#werkstatt', link: 'Zur Werkstatt' }
      ]
    }),

    ui.siblings({ kicker: 'Direkt zum Verfahren', items: GERAETE_SIBLINGS }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/schweissgeraete/',
    title: 'Schweißgeräte München | Wilhelm Merkle Schweißtechnik GmbH',
    description: 'Unsere Schweißgeräte glänzen durch Funktionalität und Leistung. Merkle Schweißtechnik bietet für jedes Schweißverfahren das passende Gerät.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
    crumbs, body
  };
}

/* -------------------------------------------------------- Geräte-Unterseite */
function geraeteSeite(cfg) {
  const crumbs = [CRUMB_HOME, { label: 'Schweißgeräte', href: '/schweissgeraete/' }, { label: cfg.crumb, href: cfg.url }];
  const sib = GERAETE_SIBLINGS.filter(s => s.href !== cfg.url);

  const body = [
    ui.pageHero({
      img: cfg.heroImg, alt: cfg.heroAlt,
      kicker: 'Schweißgeräte', h1: cfg.h1, sub: cfg.sub
    }),
    ui.breadcrumbs(crumbs),
    ui.leadStatement({ kicker: cfg.leadKicker, h2: cfg.leadH2, body: cfg.leadBody }),
    cfg.series ? ui.seriesList({ wash: true, kicker: 'Die Serien', h2: cfg.seriesH2, items: cfg.series }) : '',
    ui.featureGrid({ kicker: 'Technik im Detail', h2: cfg.featuresH2, items: cfg.features }),
    cfg.extra || '',
    cfg.downloads ? ui.downloads({ wash: true, kicker: 'Broschüren', h2: 'Alles zum Nachlesen, als PDF.', items: cfg.downloads }) : '',
    ui.siblings({ kicker: 'Andere Verfahren', items: sib }),
    ui.contactband()
  ].filter(Boolean).join('\n\n');

  return {
    url: cfg.url, title: cfg.title, description: cfg.description,
    ogImage: cfg.heroImg, crumbs, body
  };
}

const migmag = () => geraeteSeite({
  url: '/schweissgeraete/mig-mag/', crumb: 'MIG/MAG',
  title: 'MIG/MAG Schweißgeräte München | Merkle Schweißtechnik GmbH',
  description: 'Eine Übersicht der in unserem Laden vorhandenen MIG/MAG Schweißgeräte München. Unsere MIG/MAG Schweißgeräte überzeugen durch Kompaktheit und Robustheit.',
  heroImg: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
  heroAlt: 'Reihe von Merkle MIG/MAG-Schweißgeräten auf Fahrwagen im Ausstellungsraum',
  h1: 'MIG/MAG Schweißgeräte', sub: 'Kompakt und robust.',
  leadKicker: 'Wofür MIG/MAG',
  leadH2: 'Ein Gerät, zwei Schweißarten.',
  leadBody: `<p>MAG-Schweißen wird vornehmlich bei Edelstahl und Stahl angewandt, MIG-Schweißen bei Nichteisen-Metallen. Unsere Schutzgasgeräte beherrschen beide Schweißarten. Damit lassen sich dünne Bleche ebenso verschweißen wie große Körper.</p>
  <p>Fünf Serien decken den Bedarf vom Hobbybereich bis zur Industrieanlage ab. Welche Leistungsklasse Sie brauchen, hängt von Blechdicke, Einschaltdauer und verfügbarem Anschluss ab — dazu beraten wir Sie vor dem Kauf.</p>`,
  seriesH2: 'Fünf Serien, von wirtschaftlich bis Industrie.',
  series: [
    { img: 'schweissgeraete-serie-mig-mag-1.jpg', alt: 'Merkle RedMIG Schweißgerät', title: 'RedMIG', text: 'Die wirtschaftliche Linie.' },
    { img: 'schweissgeraete-serie-mig-mag-2.jpg', alt: 'Merkle CompactMIG Schweißgerät', title: 'CompactMIG', text: 'Die professionelle MIG/MAG-Universalklasse.' },
    { img: 'schweissgeraete-serie-mig-mag-3.jpg', alt: 'Merkle OptiMIG Schweißanlage', title: 'OptiMIG', text: 'Die MIG/MAG-Industrieanlagen.' },
    { img: 'schweissgeraete-serie-mig-mag-4.jpg', alt: 'Merkle MobiMIG tragbares Schweißgerät', title: 'MobiMIG', text: 'Die tragbaren Multitalente.' },
    { img: 'schweissgeraete-serie-mig-mag-5.jpg', alt: 'Merkle SpeedMIG Schweißanlage', title: 'SpeedMIG', text: 'Die Revolution des MIG/MAG-Schweißens.' }
  ],
  featuresH2: 'Was die Anlagen im Alltag ausmacht.',
  features: [
    { title: '4-Rollen-Präzisions-Flanschgetriebe DV-26', text: 'Reproduzierbarer und präzise einstellbarer Anpressdruck. Serienmäßig bei RedMIG 2800/3000&nbsp;K.' },
    { title: 'Austauschbare Steuerelektronik', text: 'Ein einfacher, schneller Austausch der gesamten Steuerelektronik ist jederzeit möglich.' },
    { title: 'Staubfilter', text: 'Mit wenigen Handgriffen ist der Filtervorsatz montiert und die Filtermatte ausgetauscht.' },
    { title: 'Kompaktanlagen', text: 'Die Kompaktanlagen (Version KW) sind übersichtlich und platzsparend im Aufbau.' },
    { title: 'Getrenntes Drahtvorschubgerät', text: 'Das Verbindungskabel ist in der Anlage und am Drahtvorschubgerät klemm- und steckbar montiert. Längen bis 20&nbsp;m verfügbar.' },
    { title: 'BiPowerPLUS', text: 'Mit 400&nbsp;V-Drehstrom schweißen und beim Schweißjob das Gerät einfach an 230&nbsp;V-Wechselstrom anschließen.' },
    { title: 'Stufenlose Energieregelung', text: 'Das Merkle-TEDAC-System bietet stufenlose Energiefernregelung und Anzeige direkt am Schweißbrenner.' },
    { title: 'Übersichtliche Anzeige', text: 'Strom, Spannung, Drahtvorschubgeschwindigkeit sowie das a-Maß werden dargestellt. Viele erprobte Schweißprogramme sind integriert.' },
    { title: 'Vielseitige Montage', text: 'Waagerechte Montage des Drahtvorschubgeräts, alternativ mit wenigen Handgriffen in senkrechter Position.' }
  ],
  downloads: [
    dl('RedMIG-Broschüre', 'merkle_redmig.pdf', 'PDF'),
    dl('CompactMIG-Broschüre', 'merkle_compactmic.pdf', 'PDF'),
    dl('OptiMIG-Broschüre', 'merkle_optimig.pdf', 'PDF'),
    dl('MobiMIG-Broschüre', 'merkle_mobimig.pdf', 'PDF'),
    dl('SpeedMIG-Broschüre', 'merkle_speedmig.pdf', 'PDF')
  ]
});

const wig = () => geraeteSeite({
  url: '/schweissgeraete/wig/', crumb: 'WIG',
  title: 'WIG Schweißgeräte München | Merkle Schweißtechnik GmbH',
  description: 'WIG Schweißgeräte München bei uns auf Lager. Mobile und leichte TIG (WIG)-DC Kraftpakete — von LiteTIG bis zur Industrielinie Insquare.',
  heroImg: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
  heroAlt: 'WIG-Schweißbrenner mit Keramikdüse in der Halterung vor einem rot beleuchteten Schweißvorhang',
  h1: 'WIG Schweißgeräte', sub: 'Mobile und leichte TIG (WIG)-DC Kraftpakete.',
  leadKicker: 'Wofür WIG',
  leadH2: 'Weniger Wärme, mehr Kontrolle.',
  leadBody: `<p>Beim WIG-Schweißen handelt es sich ebenfalls um Schutzgas-Schweißen, allerdings mit deutlich reduzierter Wärme. Dabei wird inertes, also reaktionsschwaches Gas verwendet. Damit ist das WIG-Schweißen für jedes Metall geeignet, das durch Schmelzschweißen bearbeitet werden kann.</p>
  <p>Die Geräte LiteTIG&nbsp;190&nbsp;DC, MobiTIG&nbsp;194&nbsp;DC mobil und MobiTIG&nbsp;304&nbsp;DC sind für die DC-Schutzgasschweißung und die Elektroden-Schweißung ausgelegt: Inverterstromquellen mit stufenloser Regelung, 2-Takt/4-Takt-Betrieb, HF- und LiftTIG-Zündung, Fuß- und Handfernregler-Anschluss, Jobspeicher, zwei getrennt einstellbare Schweißströme und serienmäßiges TIG-Pulsen.</p>`,
  seriesH2: 'Von tragbar bis Industrielinie.',
  series: [
    { img: 'schweissgeraete-serie-wig-1.jpg', alt: 'Merkle LiteTIG und MobiTIG Schweißgeräte', title: 'LiteTIG / MobiTIG', text: 'Die kompakte ProfiPower mit Digitalanzeige.' },
    { img: 'schweissgeraete-serie-wig-2.jpg', alt: 'Merkle MobiTIG 180 AC/DC Schweißgerät', title: 'MobiTIG 180 AC/DC', text: 'Das kleine Kraftpaket.' },
    { img: 'schweissgeraete-serie-wig-3.jpg', alt: 'Merkle LogiTIG Schweißgerät', title: 'LogiTIG', text: 'Tragbare TIG-AC-Schweißgeräte.' },
    { img: 'schweissgeraete-serie-wig-4.jpg', alt: 'Merkle HighTIG Schweißanlage', title: 'HighTIG', text: 'TIG (WIG) Schweißen auf Höchstniveau.' },
    { img: 'schweissgeraete-serie-wig-5.jpg', alt: 'Merkle Insquare Schweißanlage', title: 'Insquare', text: 'Die leistungsstarke Industrielinie.' }
  ],
  featuresH2: 'Was die Geräte im Alltag ausmacht.',
  features: [
    { title: 'Kompaktformat', text: 'Kompaktes, schlankes Design mit robusten seitlichen Öffnungsschnallen.' },
    { title: 'Digitaldisplay', text: 'Prozess-Anzeige, HF-Zündung, TIG-Pulsen, Elektroden-Schweißen.' },
    { title: 'Profi-Anschlüsse', text: 'Große 50&nbsp;mm² Profianschlüsse für das Merkle Schweißzubehör.' },
    { title: 'Optimales Handling', text: 'Maximale Mobilität durch verstellbaren Trage- und Schultergurt. Klein, leicht, handlich, tragbar, nur 5,0&nbsp;kg.' },
    { title: 'BiPowerPLUS', text: 'Mit 400&nbsp;V-Drehstrom schweißen und beim Schweißjob das Gerät einfach an 230&nbsp;V-Wechselstrom anschließen.' },
    { title: 'TCG-Anschluss', text: 'Kleine Baugröße, geringes Gewicht, Brennerwechsel ohne Werkzeug. Minus-Buchse für TIG-Brenner und Elektrodenkabel, Gasdichtigkeit durch zwei Dichtringe.' }
  ],
  downloads: [
    dl('LiteTIG / MobiTIG-Broschüre', 'merkle_mobitig.pdf', 'PDF'),
    dl('MobiTIG 180 AC/DC-Broschüre', 'merkle_mobitig_180_ac_dc.pdf', 'PDF'),
    dl('LogiTIG-Broschüre', 'merkle_logitig.pdf', 'PDF'),
    dl('Insquare-Broschüre', 'merkle_pro_insquare.pdf', 'PDF')
  ]
});

const elektrode = () => geraeteSeite({
  url: '/schweissgeraete/elektroden-schweissanlagen/', crumb: 'Elektrode',
  title: 'Elektrodenschweißgerät München | Merkle Schweißtechnik GmbH',
  description: 'Elektrodenschweißgerät München: klein und leicht, aber leistungsstark. MobiARC und LiteArc 180 bei uns auf Lager.',
  heroImg: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
  heroAlt: 'Merkle-Ladengeschäft mit Schweißgeräten, Schweißerjacke und Schutzhelmen an der Wand',
  h1: 'Elektrodenschweißgeräte', sub: 'Klein und leicht, aber leistungsstark.',
  leadKicker: 'Wofür Elektrode',
  leadH2: 'Das älteste Verfahren — und auf Montage immer noch das praktischste.',
  leadBody: `<p>Das Elektrodenhandschweißen, kurz E-Handschweißen, ist eines der ältesten Schweißverfahren und wird heute noch hauptsächlich auf Montage angewandt. Grundsätzlich lassen sich damit dieselben Arbeiten ausführen wie beim MAG-Schweißen — eher grobe Arbeiten, kein dünnes Blech.</p>`,
  seriesH2: 'Zwei Geräte, ein Koffer voll Leistung.',
  series: [
    { img: 'mobiarc.jpg', alt: 'Merkle MobiARC Elektroden-Schweißgerät', title: 'MobiARC', text: 'Volle Leistung bis 160&nbsp;A Schweißstrom.' },
    { img: 'lightarc180.jpg', alt: 'Merkle LiteArc 180 Elektroden-Schweißgerät', title: 'LiteArc 180', text: 'Kompakt, handlich, leistungsstark.' }
  ],
  featuresH2: 'Was die Geräte im Alltag ausmacht.',
  features: [
    { title: 'Digitalanzeige für Schweißstrom', text: 'Stufenlose Verstellung des Schweißstroms bis 170&nbsp;A (Elektrode) beziehungsweise 180&nbsp;A (TIG) mit digitaler Anzeige.' },
    { title: 'LiftTIG-Zündung', text: 'TIG-(WIG-)Schweißen bis 180&nbsp;A mit LiftTIG-Zündung.' },
    { title: 'Stabil, robust und schlagfest', text: 'Das neue Metall-/Kunststoffgehäuse.' },
    { title: 'Optimales Handling', text: 'Maximale Mobilität durch verstellbaren Trage- und Schultergurt. Klein, leicht, handlich, tragbar, nur 5,0&nbsp;kg.' },
    { title: 'Profi-Anschlüsse', text: 'Große Profianschlüsse für den Einsatz des Merkle Standard-Zubehörs.' },
    { title: 'Weitreichender Einsatz', text: 'Extra langes Anschlusskabel: 5&nbsp;m lang.' }
  ],
  downloads: [
    dl('MobiARC 160/164 mobil', 'merkle_pro_mobiarc160.pdf', 'PDF'),
    dl('MobiARC 284cel', 'merkle_mobiarc_284cel.pdf', 'PDF'),
    dl('LiteARC 180', 'merkle_litearc180.pdf', 'PDF')
  ]
});

const pulsearc = () => geraeteSeite({
  url: '/schweissgeraete/pulse-arc/', crumb: 'Pulse-Arc',
  title: 'Pulse-Arc Schweißgerät München | Merkle Schweißtechnik GmbH',
  description: 'Pulse-Arc Schweißanlagen aus München: HighPULSE-Serie, Sonderlösungen für Schiffbau und Produktionslinien, TEDAC DIGITAL und NFC-Freischaltung.',
  heroImg: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09881-hdr.jpg',
  heroAlt: 'Ausstellungsraum mit mehreren Merkle-Schweißanlagen vor der Verkaufstheke',
  h1: 'Pulse-Arc Schweißanlagen', sub: 'Qualität und Design, gepaart mit wirtschaftlichen Vorteilen.',
  leadKicker: 'Wofür Pulse-Arc',
  leadH2: 'Der pulsierende Lichtbogen erlaubt dickere Drahtelektroden.',
  leadBody: `<p>Das Pulse-Arc-Schweißverfahren ist durch einen pulsierenden Lichtbogen gekennzeichnet. Besonders vorteilhaft ist, dass sich mit diesem Verfahren verhältnismäßig dicke Drahtelektroden nutzen lassen. Unser Produktspektrum reicht von der tragbaren Handstromquelle bis zur automatisierten Sonderlösung.</p>`,
  seriesH2: 'Serie und Sonderlösung.',
  series: [
    { img: 'schweissgeraete-serien-pulse-arc-1.jpg', alt: 'Merkle HighPULSE Schweißanlage', title: 'HighPULSE', text: 'Die Revolution des Pulse-Arc-Schweißens.' },
    { img: 'schweissgeraete-serien-pulse-arc-2.jpg', alt: 'Merkle Spezial-Schweißanlage für den Schiffbau', title: 'Für den Schiffbau', text: 'Spezial-Schweißanlagen, entwickelt für den Schiffbau.' },
    { img: 'schweissgeraete-serien-pulse-arc-3.jpg', alt: 'Kompakte gaskühlte HighPULSE Anlage für Produktionslinien', title: 'Für Produktionslinien', text: 'Kompakte Bauweise einer HighPULSE mit Gaskühlung.' }
  ],
  featuresH2: 'Was die Anlagen im Alltag ausmacht.',
  features: [
    { title: 'Bedienkomfort', text: 'Selbsterklärende Bedienelemente mit extra großen Funktionsknöpfen.' },
    { title: 'Handfernregler MFR 20 und Fernsteller MRC 50', text: 'Bedienen Sie die Schweißmaschine dort, wo Sie arbeiten.' },
    { title: 'Doppel-Drahtvorschub DV-31 TWIN', text: 'Das Wechseln der Drahtrolle und gegebenenfalls der Brennerschlauchpakete entfällt.' },
    { title: 'Kompakt und tragbar', text: 'HighPULSE-Leistung für unterwegs, optional mit anschließbarem Wasserkühlgerät.' },
    { title: 'TEDAC DIGITAL®', text: 'Die Energieregelung erfolgt direkt am Schweißbrenner, die Anzeige über ein gut lesbares alphanumerisches Digitaldisplay.' },
    { title: 'NFC-Userkarte', text: 'Userkarte zum Freischalten der Anlage, Supervisorkarte für erweiterte Einstellungen.' },
    { title: 'Energiespar-Funktion', text: 'Automatische Abschaltung, zeitgesteuert mit programmierbarer Abschaltzeit.' },
    { title: 'Zwischenantrieb DV-26 PP', text: 'Sorgt für zusätzlichen Aktionsradius.' },
    { title: 'Einfacher Drahtspulenwechsel', text: 'Mit wenigen Handgriffen über eine weit öffnende Tür auszuwechseln.' }
  ],
  downloads: null
});

const plasma = () => geraeteSeite({
  url: '/schweissgeraete/plasma-schneidanlagen/', crumb: 'Plasmaschneiden',
  title: 'Plasma-Schneidgerät München | Merkle Schweißtechnik GmbH',
  description: 'Plasma-Schneidgeräte aus München für Stahlbau, Montage, Reparatur und Kfz-Sektor. Wirtschaftliche Alternative zum Autogen-Schneiden.',
  heroImg: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
  heroAlt: 'Überdachtes Gasflaschenlager von Merkle München mit Flaschen in Gitterboxen',
  h1: 'Plasma-Schneidanlagen', sub: 'Die wirtschaftliche Alternative.',
  leadKicker: 'Wofür Plasmaschneiden',
  leadH2: 'Druckluft als Plasmagas — und fast jedes leitfähige Metall lässt sich schneiden.',
  leadBody: `<p>Mit Plasma-Schneidanlagen lassen sich sämtliche elektrisch leitfähigen sowie lackierten und galvanisierten Metalle schneiden: Baustähle, hochlegierte Chrom-Nickel-Stähle, gehärtete und ungehärtete Werkzeugstähle, Aluminium und Aluminium-Legierungen, Messing, Kupfer, Grauguss oder Titan. Einsatzbereiche sind Stahlbau, Montage, Reparatur und der Kfz-Sektor.</p>
  <p>Der Erfolg des Plasma-Schneidens basiert auf der Eigenschaft des Plasmastrahls, im Werkstück einen extrem intensiven und eng begrenzten Wärmefluss zu erzeugen. Die Temperatur des Lichtbogens beträgt dabei etwa 13.000&nbsp;°C. Die Wärme wird sehr schnell eingebracht, sodass die seitliche Wärmeableitung gering bleibt — es entsteht eine schmale, saubere Schnittfuge bei geringem Verzug.</p>`,
  seriesH2: 'Handlich und tragbar.',
  series: [
    { img: 'plasmaschneider-c82.jpg', alt: 'Merkle C82 Plasma-Schneidgerät', title: 'C82', text: 'Handlich und tragbar.' },
    { img: 'plasmaschneider-aircut.jpg', alt: 'Merkle Plasma-Schneidanlage mit Wasserumlauf-Kühleinrichtung', title: 'Mit Wasserkühlung', text: 'Funktionalität und Bedienkomfort mit integrierter Wasserumlauf-Kühleinrichtung.' }
  ],
  featuresH2: 'Was für Plasma spricht.',
  features: [
    { title: 'Betriebskosten', text: 'Durch den geringen Verbrauch ist das Plasma-Schneiden mit Druckluft ein wirtschaftliches und kostengünstiges Verfahren.' },
    { title: 'Brenneranschluss', text: 'Im Seitenraum der Anlage: übersichtlich, leicht zugänglich, mit Sicherheitsabschaltung.' },
    { title: 'Geringer Materialverbrauch', text: 'Schmale Schnittfugen bei hoher Schnittgeschwindigkeit bedeuten weniger Verschnitt.' },
    { title: 'Geringe Energiekosten', text: 'Druckluft statt Brenngas — die laufenden Kosten bleiben niedrig.' },
    { title: 'Wenig Abfall', text: 'Weniger Anfall von Abfallprodukten gegenüber dem Autogen-Schneiden.' },
    { title: 'Geringer Verzug', text: 'Die Wärmekonzentration hält den Wärmeverzug der Werkstücke gering.' }
  ],
  downloads: [dl('Plasma-Schneidanlagen', 'mekle_plasma_schneideanlagen.pdf', 'PDF')]
});

/* ============================================================ Zusatzwerkstoffe */
function zusatzwerkstoffe() {
  const crumbs = [CRUMB_HOME, { label: 'Zusatzwerkstoffe', href: '/zusatzwerkstoffe/' }];
  const body = [
    ui.pageHero({
      img: 'zusatzstoffe-teaser-1.jpg',
      alt: 'Schweißdrahtrollen und Zusatzwerkstoffe im Merkle-Lager',
      kicker: 'Sortiment', h1: 'Zusatzwerkstoffe',
      sub: 'Eine große Auswahl an Schweißzusatzwerkstoffen für jedes Verfahren.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Warum der Zusatzwerkstoff zählt',
      h2: 'Neben dem Gerät entscheidet der Zusatzwerkstoff<br>über die Qualität der Naht.',
      body: `<p>Schon die Schweißlage bestimmt mit, welche Zusatzwerkstoffe idealerweise verwendet werden sollten. Auch die Anforderungen an Schweißgut und Schweißnaht spielen eine wichtige Rolle bei der Wahl. Man unterscheidet in drei Kategorien: Stahl, Edelstahl und Aluminium.</p>
      <p>Als Pionier für innovative Schweißzusätze bietet Böhler Welding weltweit ein Produktportfolio für das Verbindungsschweißen. Die über 2.000 Produkte werden kontinuierlich an aktuelle Industriespezifikationen und Kundenanforderungen angepasst und sind von renommierten Institutionen zertifiziert.</p>`
    }),

    ui.cards({
      wash: true,
      kicker: 'Drei Kategorien',
      h2: 'Stahl, Edelstahl, Aluminium.',
      items: [
        { href: '/zusatzwerkstoffe/stahl/', img: 'rolle-stahl.png', alt: 'Schweißdrahtrolle für Stahl', title: 'Für Stahl', text: 'Schweißdraht, Fass, Schweißelektroden und Schweißstäbe für unlegierte und niedriglegierte Stähle.' },
        { href: '/zusatzwerkstoffe/edelstahl/', img: 'rolle-edelstahl.png', alt: 'Schweißdrahtrolle für Edelstahl', title: 'Für Edelstahl', text: 'Schweißdraht, Fass, Schweißelektroden und Schweißstäbe für hochlegierte Stähle.' },
        { href: '/zusatzwerkstoffe/aluminium/', img: 'rolle-alu.png', alt: 'Schweißdrahtrolle für Aluminium', title: 'Für Aluminium', text: 'Schweißdraht, Schweißelektroden und Schweißstäbe für Aluminium und Aluminium-Legierungen.' }
      ]
    }),

    ui.disclosures({
      kicker: 'Aus der Praxis',
      h2: 'Die richtige Elektrode wählen für Materialien,<br>die verzinkt werden müssen.',
      items: [{
        title: 'Feuerverzinken von Schweißkonstruktionen',
        sub: 'Schmelztauchverfahren bei etwa 450 °C',
        teaser: 'In vielen Bereichen werden geschweißte Stahlbauwerke feuerverzinkt, um einen dauerhaften Korrosionsschutz zu erreichen. Das bereitet im Allgemeinen keine Schwierigkeiten, wenn die verfahrensspezifischen Besonderheiten und die daraus folgenden Anforderungen an die Schweißkonstruktion berücksichtigt werden.',
        body: `<p>In der Praxis kommt es verhältnismäßig häufig vor, dass die Schweißnähte aus konstruktiven oder optischen Gründen „blecheben“ sein müssen. Trotz sorgfältigen Bearbeitens kann es dann geschehen, dass sich die Nähte nach dem Feuerverzinken deutlich abheben.</p>
        <p>Verfärbt sich lediglich der Zinküberzug im Bereich der Schweißnaht grau und unterscheidet sich damit nur optisch von der sonst silbrigen feuerverzinkten Stahlkonstruktion, sind im Allgemeinen keine Probleme zu erwarten.</p>
        <p>Sprechen Sie uns an, bevor Sie die Elektrode festlegen — wir klären mit Ihnen, welcher Zusatzwerkstoff zu Ihrer Konstruktion und zum vorgesehenen Korrosionsschutz passt.</p>`
      }]
    }),

    ui.proof({
      wash: true,
      kicker: 'Nachweise',
      h2: 'Offizieller Händler dreier voestalpine-Marken.',
      note: 'Die Nachweise stammen aus dem Bestand von merkle-muenchen.de. Weitere Marken sind nicht aufgeführt, weil dafür kein Beleg vorlag.',
      items: [
        { img: 'boehler-2018.png', alt: 'Nachweis: Offizieller Händler von Böhler Welding by voestalpine', caption: 'Böhler Welding — Schweißzusätze für das Verbindungsschweißen' },
        { img: 'fontargen-2018.png', alt: 'Nachweis: Offizieller Händler von Fontargen Brazing by voestalpine', caption: 'Fontargen Brazing — Hart- und Weichlote' },
        { img: 'utp-2018.png', alt: 'Nachweis: Offizieller Händler von UTP Maintenance by voestalpine', caption: 'UTP Maintenance — Instandsetzung und Auftragschweißen' }
      ]
    }),

    ui.siblings({ kicker: 'Weiter im Sortiment', items: WERKSTOFF_SIBLINGS }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/zusatzwerkstoffe/',
    title: 'Zusatzwerkstoffe München | Merkle Schweißtechnik GmbH',
    description: 'Neben der Qualität Ihres Schweißgerätes sind beim hochwertigen Schweißen vor allem die Eigenschaften der verwendeten Zusatzwerkstoffe entscheidend.',
    ogImage: 'zusatzstoffe-teaser-1.jpg',
    crumbs, body
  };
}

function werkstoffSeite(cfg) {
  const crumbs = [CRUMB_HOME, { label: 'Zusatzwerkstoffe', href: '/zusatzwerkstoffe/' }, { label: cfg.crumb, href: cfg.url }];
  const sib = WERKSTOFF_SIBLINGS.filter(s => s.href !== cfg.url);
  const body = [
    ui.pageHero({
      img: cfg.heroImg, alt: cfg.heroAlt,
      kicker: 'Zusatzwerkstoffe', h1: cfg.h1,
      sub: 'Eine große Auswahl an Schweißzusatzwerkstoffen.'
    }),
    ui.breadcrumbs(crumbs),
    ui.leadStatement({
      kicker: 'Auswahl',
      h2: cfg.leadH2,
      body: `<p>Neben der Qualität Ihres Schweißgerätes sind beim hochwertigen Schweißen vor allem die Eigenschaften der verwendeten Zusatzwerkstoffe entscheidend. Schon die Schweißlage bestimmt mit, welche Zusatzwerkstoffe idealerweise verwendet werden sollten. Natürlich spielen auch die Anforderungen an Schweißgut und Schweißnaht eine wichtige Rolle. Im Laden erhalten Sie zu jedem Produkt detaillierte Beschreibungen.</p>`
    }),
    ui.seriesList({ wash: true, kicker: 'Lieferformen', h2: 'In diesen Formen bekommen Sie den Zusatzwerkstoff.', items: cfg.forms }),
    ui.siblings({ kicker: 'Weiter im Sortiment', items: sib }),
    ui.contactband()
  ].join('\n\n');

  return { url: cfg.url, title: cfg.title, description: cfg.description, ogImage: cfg.heroImg, crumbs, body };
}

const FORM_DRAHT = { img: 'rolle-stahl.png', alt: 'Schweißdrahtrolle', title: 'Schweißdraht', text: 'Auf Spulen in gängigen Durchmessern.' };
const FORM_FASS = { img: 'fassdraht.png', alt: 'Fassdraht-Gebinde', title: 'Fass', text: 'Fassdraht für lange Einschaltdauern ohne Spulenwechsel.' };
const FORM_ELEK = { img: 'schweisselektrode.png', alt: 'Stabelektroden', title: 'Schweißelektroden', text: 'Stabelektroden für das E-Handschweißen.' };
const FORM_STAB = { img: 'schweissstab.png', alt: 'WIG-Schweißstäbe', title: 'Schweißstab', text: 'Stäbe für das WIG-Schweißen.' };

const stahl = () => werkstoffSeite({
  url: '/zusatzwerkstoffe/stahl/', crumb: 'Für Stahl',
  title: 'Zusatzwerkstoffe Stahl München | Merkle Schweißtechnik GmbH',
  description: 'Bei uns finden Sie eine große Auswahl an Zusatzwerkstoffen für Stahl, um hochwertige Schweißarbeiten mühelos durchführen zu können.',
  heroImg: 'rolle-stahl.png', heroAlt: 'Schweißdrahtrolle für Stahl',
  h1: 'Zusatzwerkstoffe für Stahl',
  leadH2: 'Hochwertige Stahl-Zusatzwerkstoffe für jedes Schweißverfahren.',
  forms: [FORM_DRAHT, FORM_FASS, FORM_ELEK, FORM_STAB]
});

const edelstahl = () => werkstoffSeite({
  url: '/zusatzwerkstoffe/edelstahl/', crumb: 'Für Edelstahl',
  title: 'Zusatzwerkstoffe Edelstahl München | Merkle Schweißtechnik',
  description: 'Bei uns finden Sie eine große Auswahl an Zusatzwerkstoffen für Edelstahl, um hochwertige Schweißarbeiten mühelos durchführen zu können.',
  heroImg: 'rolle-edelstahl.png', heroAlt: 'Schweißdrahtrolle für Edelstahl',
  h1: 'Zusatzwerkstoffe für Edelstahl',
  leadH2: 'Hochwertige Edelstahl-Zusatzwerkstoffe für jedes Schweißverfahren.',
  forms: [
    Object.assign({}, FORM_DRAHT, { img: 'rolle-edelstahl.png', alt: 'Schweißdrahtrolle für Edelstahl' }),
    FORM_FASS, FORM_ELEK, FORM_STAB
  ]
});

const aluminium = () => werkstoffSeite({
  url: '/zusatzwerkstoffe/aluminium/', crumb: 'Für Aluminium',
  title: 'Zusatzwerkstoffe Aluminium München | Merkle Schweißtechnik',
  description: 'Bei uns finden Sie eine große Auswahl an Zusatzwerkstoffen für Aluminium, um hochwertige Schweißarbeiten mühelos durchführen zu können.',
  heroImg: 'rolle-alu.png', heroAlt: 'Schweißdrahtrolle für Aluminium',
  h1: 'Zusatzwerkstoffe für Aluminium',
  leadH2: 'Hochwertige Aluminium-Zusatzwerkstoffe für jedes Schweißverfahren.',
  forms: [
    Object.assign({}, FORM_DRAHT, { img: 'rolle-alu.png', alt: 'Schweißdrahtrolle für Aluminium' }),
    FORM_ELEK, FORM_STAB
  ]
});

/* ============================================================ Schweißzubehör */
function schweisszubehoer() {
  const crumbs = [CRUMB_HOME, { label: 'Schweißzubehör', href: '/schweisszubehoer/' }];
  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
      alt: 'Wand mit Schweißhelmen, Schweißerjacke und Schlauchpaketen im Merkle-Ladengeschäft',
      kicker: 'Sortiment', h1: 'Schweißzubehör',
      sub: 'Auf das richtige Zubehör kommt es an.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Alles, was ein Schweißer braucht',
      h2: 'Kein erfolgreiches Projekt ohne das richtige Zubehör.',
      body: `<p>Zum Schweißzubehör gehört alles, was an einem Schweißarbeitsplatz nicht fehlen darf: Arbeitshilfen, Schweißspiegel, Elektrodenhalter, Schlackenhämmer und die richtigen Schweißkabel.</p>
      <p>Besonders wichtig ist die Qualität. Bei uns finden Sie ausgewähltes Zubehör, das die Leistungsfähigkeit und Zuverlässigkeit Ihres Brenners erhöht. Ob WIG, MIG, MAG oder E-Hand-Schweißen — im Laden haben Sie das passende Zubehör parat.</p>`
    }),

    ui.cards({
      wash: true,
      kicker: 'Sieben Bereiche',
      h2: 'Vom Schutzhelm bis zur Absauganlage.',
      items: [
        { href: EXTERN.shop, img: 'schweisszubehoer-1.png', alt: 'Schweißhelme und Schutzvisiere', title: 'Schutzmasken', text: 'Schutzmasken, Visiere, Brillen und Schweißhelme.' },
        { href: EXTERN.shop, img: 'merkle-gehoerschutz.png', alt: 'Gehörschutzstöpsel und Kapselgehörschutz', title: 'Gehörschutz', text: 'Stöpsel-, Bügel- und Kapselgehörschutz.' },
        { href: EXTERN.shop, img: 'schweisszubehoer-2.png', alt: 'Schweißerhandschuhe und Hitzeschutzjacke', title: 'Schutzkleidung', text: 'Vom Schweißerhandschuh bis zur Hitzeschutzjacke.' },
        { href: EXTERN.shop, img: 'merkle-reinigungsmittel.png', alt: 'Reinigungsmittel und Elektrolyte für Schweißnähte', title: 'Reinigungsmittel', text: 'Elektrolyte, Polisher und Ex-Clean-Reinigungssystem samt Zubehör.' },
        { href: EXTERN.shop, img: 'schweisszubehoer-4.png', alt: 'Autogentechnik mit Druckminderer und Schneiddüse', title: 'Autogentechnik', text: 'Komplettausstattung von der Gasflasche bis zur Schneiddüse.' },
        { href: EXTERN.shop, img: 'schweisszubehoer-5.png', alt: 'Absaug- und Filteranlage für Schweißrauch', title: 'Absaugtechnik', text: 'Absaug- und Filteranlagen sowie passendes Zubehör.' },
        { href: EXTERN.shop, img: 'schweisszubehoer-6.png', alt: 'Ausrüstung zum Bolzenschweißen', title: 'Widerstandstechnik', text: 'Alles zum Bolzenschweißen, was das Herz begehrt.' },
        { href: '/wasser/', img: 'kuehlfluessigkeit-10-kg.png', alt: 'Kanister Merkle Kühlflüssigkeit ME 30-100.2-ECO', title: 'Kühlflüssigkeit', text: 'ME 30-100.2-ECO in 4, 10, 25 und 200 kg.' }
      ]
    }),

    ui.siblings({ kicker: 'Weiter im Sortiment', items: SORTIMENT_SIBLINGS }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/schweisszubehoer/',
    title: 'Schweißzubehör München | Wilhelm Merkle Schweißtechnik GmbH',
    description: 'Ob WIG, MIG, MAG oder E-Hand-Schweißen — bei Merkle in München finden Sie immer das passende Schweißzubehör: Masken, Schutzkleidung, Absaugtechnik.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01022-hdr.jpg',
    crumbs, body
  };
}

/* ==================================================================== Gas */
const GASE = [
  { img: 'acetylen.png', title: 'Acetylen', text: 'Brenngas für Autogenschweißen und -schneiden.' },
  { img: 'arcox.png', title: 'Arcox', text: 'Mischgas für das MAG-Schweißen.' },
  { img: 'argon.png', title: 'Argon 4.6 / 4.8 / 5.0', text: 'Inertgas für WIG und MIG, in drei Reinheitsgraden.' },
  { img: 'ballongas.png', title: 'Ballongas', text: 'Helium-Gemisch zum Füllen von Luftballons.' },
  { img: 'biergas.png', title: 'Biergas', text: 'Für Zapfanlagen und Getränkeausschank.' },
  { img: 'druckluft.png', title: 'Druckluft', text: 'Plasmagas für das Plasma-Schneiden.' },
  { img: 'formiergas.png', title: 'Formiergas 85/15, 80/20, 90/10', text: 'Wurzelschutz beim Schweißen von Edelstahl.' },
  { img: 'helium.png', title: 'Helium', text: 'Für tiefen Einbrand und hohe Schweißgeschwindigkeit.' },
  { img: 'kohlensaeure.png', title: 'Kohlensäure', text: 'CO₂ für das MAG-Schweißen und für Zapfanlagen.' },
  { img: 'propan.png', title: 'Propan', text: 'Brenngas zum Wärmen, Löten und Schneiden.' },
  { img: 'sauerstoff.png', title: 'Sauerstoff', text: 'Für Autogenschweißen, Brennschneiden und Wärmen.' },
  { img: 'techn.-stickstoff.png', title: 'Stickstoff', text: 'Technischer Stickstoff, unter anderem zum Spülen.' }
];

function gas() {
  const crumbs = [CRUMB_HOME, { label: 'Gas', href: '/gas/' }];
  const faqItems = [
    {
      q: 'Eigentumsflasche oder Mietflasche — was ist günstiger?',
      a: '<p>Das hängt vom Verbrauch ab. Bei geringem Verbrauch liefern wir das Gas in Eigentumsflaschen, bei größerem Verbrauch in Mietflaschen — je nachdem, ob Sie eine Füllung oder zehn Füllungen im Jahr benötigen. Sprechen Sie uns an, wir erklären Ihnen den Unterschied.</p>'
    },
    {
      q: 'Was kostet eine 20-Liter-Flasche Mischgas 18 über zehn Jahre?',
      a: '<p>Nach unserem Kostenvergleich: Miete rund 1.300&nbsp;Euro, Miet-Abo rund 550&nbsp;Euro, Merkle-Tauschsystem rund 180&nbsp;Euro.</p>'
    },
    {
      q: 'Muss ich mich beim Tauschsystem um den TÜV kümmern?',
      a: '<p>Nein. Sie bekommen immer eine andere Flasche und zahlen nur die Füllung. Auch ein undichtes Ventil ist damit nicht Ihr Problem.</p>'
    },
    {
      q: 'Liefern Sie Gas auch auf die Baustelle?',
      a: '<p>Ja. Über ein bundesweit vorhandenes Netz liefern wir überall in Deutschland — in die Werkstatt oder auf die Baustelle. Zu unseren Öffnungszeiten, auch samstags, können Sie das Gas selbstverständlich auch selbst abholen.</p>'
    },
    {
      q: 'Bekomme ich außerhalb der Öffnungszeiten Gas?',
      a: '<p>Montag bis Freitag von 6:30 bis 18:00 Uhr und samstags von 8:00 bis 12:00 Uhr in München-Freiham. Wer regelmäßig Gas braucht, legt sich eine zweite Flasche hin.</p>'
    }
  ];

  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
      alt: 'Überdachtes Gasflaschenlager von Merkle München mit Flaschen in Gitterboxen und Hinweisschild zum Tauschflaschensystem',
      kicker: 'Sortiment', h1: 'Gas und Tauschflaschen',
      sub: 'Für jeden Verbrauch das passende Gas — zum Abholen, Liefern oder Tauschen.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Zwölf Gase am Lager',
      h2: 'Eigentumsflasche oder Mietflasche —<br>das entscheidet Ihr Verbrauch.',
      body: `<p>Bei geringem Verbrauch liefern wir Ihnen das Gas in Eigentumsflaschen, bei größerem Verbrauch in Mietflaschen. Ob Sie eine Füllung oder zehn Füllungen im Jahr benötigen, macht den Unterschied — sprechen Sie uns an, wir erklären ihn Ihnen.</p>
      <p>Über ein bundesweit vorhandenes Netz liefern wir überall in Deutschland direkt zu Ihnen in die Werkstatt oder auf die Baustelle.</p>`
    }),

    ui.prose({
      id: 'tauschsystem',
      kicker: 'Das Merkle-Tauschsystem',
      h2: 'Eigentumsflaschen nach dem Merkle-Tauschsystem.',
      body: `<p>Es gibt viele Möglichkeiten, wie Sie zu einer Gasflasche kommen. Sie können sich eine mieten zu teuren Tagessätzen, Sie können einen Miet-Abo-Vertrag abschließen und sich damit für mehrere Jahre an einen Gaseanbieter binden — oder Sie kaufen eine Stahlflasche nach dem Merkle-Tauschsystem.</p>
      <p>Sie denken jetzt sicherlich, dass eine Kaufflasche viel zu teuer ist und es beim Tauschen nur Probleme gibt. Der Kostenvergleich zeigt etwas anderes.</p>`
    }),

    ui.table({
      wash: true,
      kicker: 'Kostenvergleich',
      h2: 'Eine 20-Liter-Flasche Mischgas 18 über zehn Jahre.',
      caption: 'Angaben aus dem Bestandsinhalt von merkle-muenchen.de, Preisstand vom Betreiber bestätigt. Preisänderungen bleiben vorbehalten.',
      head: ['Beschaffungsweg', 'Kosten über 10 Jahre', 'Bindung'],
      rows: [
        ['Miete zum Tagessatz', 'ca. 1.300,— Euro', 'jederzeit kündbar'],
        ['Miet-Abo', 'ca. 550,— Euro', 'mehrjährige Bindung an einen Anbieter'],
        ['Merkle-Tauschsystem', 'ca. 180,— Euro', 'keine Bindung, Flasche gehört Ihnen']
      ]
    }),

    ui.featureGrid({
      kicker: 'So funktioniert es',
      h2: 'Leer gegen voll — sofort und ohne Wartezeit.',
      flow: [
        { icon: 'cylinder', label: 'Flasche kaufen' },
        { icon: 'recycle', label: 'Leer abgeben' },
        { icon: 'truck', label: 'Volle mitnehmen' },
        { icon: 'shield', label: 'Kein TÜV nötig' }
      ],
      items: [
        { title: 'Ungeprägte Eigentumsflasche kaufen', text: 'Der Vorteil fängt schon beim Kauf an: Sie erwerben eine ungeprägte Eigentumsflasche.' },
        { title: 'Leere Flasche abgeben', text: 'Ist Ihre Flasche leer, bringen Sie diese zu uns oder zu einem unserer flächendeckend vorhandenen Händler.' },
        { title: 'Sofort eine volle bekommen', text: 'Sie erhalten ohne Wartezeit eine andere befüllte Flasche und bezahlen nur die Füllung, sonst nichts.' },
        { title: 'Kein TÜV, keine Ventilsorgen', text: 'Sie bekommen immer eine andere Flasche. Um Prüffristen oder ein undichtes Ventil müssen Sie sich nicht kümmern.' }
      ]
    }),

    ui.table({
      id: 'flaschengroessen',
      wash: true,
      kicker: 'Flaschengrößen',
      h2: 'Diese Flaschen tauschen wir leer gegen voll.',
      caption: 'Sortiment und Größen vom Betreiber bestätigt. Einzelne Größen können je nach Standort abweichen — fragen Sie im Zweifel kurz nach.',
      head: ['Gas', 'Größen', 'Hinweis'],
      rows: [
        ['Propan und Butan', '2,5 · 3,0 · 5 · 8 · 10 · 11 · 33&nbsp;kg', 'Stahl- und Kompositflaschen'],
        ['Propan im Leichtgebinde', '6 · 11&nbsp;kg', 'Alugas, deutlich leichter als Stahl'],
        ['Campingaz', 'R&nbsp;904 · R&nbsp;907', 'für Camping- und Freizeitgeräte'],
        ['Kohlensäure (CO₂)', '0,425 · 0,5 · 1,5 · 2,0 · 6,0 · 10,0 · 20,0 · 30,0 · 37,0&nbsp;kg', 'für Schweißen und für Zapfanlagen']
      ]
    }),

    ui.bottles({
      id: 'gase',
      kicker: 'Unsere Gase',
      h2: 'Zwölf Gase für Schweißen, Schneiden und mehr.',
      railLabel: 'Zwölf Gasflaschen zum Durchblättern',
      items: GASE
    }),

    ui.faq({ h2: 'Häufige Fragen zu Gas und Flaschen.', items: faqItems }),
    ui.siblings({ kicker: 'Weiter im Sortiment', items: SORTIMENT_SIBLINGS }),
    ui.contactband({
      h2: 'Fragen zu Gasen und Flaschen?<br>Die Gase-Abteilung hat die Antwort.',
      text: 'Welches Gas zu Ihrem Verfahren passt, welche Flaschengröße sich rechnet und ob sich das Tauschsystem für Sie lohnt — das klären wir am Telefon in wenigen Minuten.'
    })
  ].join('\n\n');

  return {
    url: '/gas/',
    title: 'Gas München | Gase zum Schweißen | Merkle Schweißtechnik',
    description: 'Für jeden Kunden das passende Gas: Wir liefern in Eigentums- oder Mietflaschen, je nach Verbrauch — plus Merkle-Tauschsystem.',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg',
    crumbs, faq: faqItems, body
  };
}

/* ============================================================== Kühlwasser */
function wasser() {
  const crumbs = [CRUMB_HOME, { label: 'Kühlwasser', href: '/wasser/' }];
  const faqItems = [
    {
      q: 'Warum ist es wichtig, nur die Kühlflüssigkeit ME 30-100.2-ECO zu verwenden?',
      a: '<p>Ein Schweiß- oder Schneidgerät ist nicht gerade von geringem Wert, und jeder Anwender hat Interesse daran, dass es ohne große Kosten lange seine Arbeit verrichtet. Die Verwendung der Kühlflüssigkeit ME 30-100.2-ECO stellt sicher, dass der darin enthaltene hohe Anteil an Korrosionsschutz alle wichtigen Bauteile optimal schützt — vor allem die besonders anfälligen Buntmetalle in Schweiß- und Schneidanlagen.</p>'
    },
    {
      q: 'Warum ist die richtige Kühlflüssigkeit im WIG-Bereich am wichtigsten?',
      a: '<p>Für die Lebensdauer eines WIG-Brenners ist entscheidend, welche Kühlflüssigkeit eingesetzt wird. Für perfektes Zünden ist eine sehr geringe Leitfähigkeit verbunden mit einem optimal abgestimmten pH-Wert von 7,8 erforderlich. Das ist bei der Merkle-Kühlflüssigkeit der Fall.</p><p>Kühlflüssigkeit mit einem pH-Wert von unter 6 gilt als sauer und aggressiv und zerstört vor allem Bauteile in Pumpe und Brenner.</p>'
    },
    {
      q: 'Was hat die Wasserpumpe mit der Kühlflüssigkeit zu tun?',
      a: '<p>Die Lebensdauer einer Wasserpumpe hängt in hohem Maße davon ab, welche Kühlflüssigkeit verwendet wird. Eine falsche Kühlflüssigkeit führt in kurzer Zeit zu Schädigungen von Dichtung und Welle. Eine undichte Wasserpumpe führt zu Ausfällen mit teuren Standzeiten und hohen Reparaturkosten.</p>'
    },
    {
      q: 'Warum ist der Leitwert wichtig?',
      a: '<p>Je mehr Verunreinigungen sich in der Kühlflüssigkeit befinden, desto höher ist der Leitwert. Das erzeugt ein aggressives Wasser, das auf die Kupferlitze des Strom-Wasser-Kabels und auf die Messingteile in der Wasserpumpe negativ reagiert.</p><p>Der Leitwert sollte nicht höher als 150&nbsp;Mikrosiemens sein, im WIG-Bereich wären maximal 100&nbsp;Mikrosiemens empfehlenswert. Die Merkle-Kühlflüssigkeit hat einen Leitwert von unter 25&nbsp;Mikrosiemens.</p>'
    },
    {
      q: 'Wie hoch ist der Flammpunkt?',
      a: '<p>Nach den gesetzlichen Vorschriften ist für unsere Kühlflüssigkeit die Angabe eines Flamm- oder Zündpunkts nicht erforderlich — für Lagerung und Transport ein großer Vorteil.</p>'
    },
    {
      q: 'Ist eine Gefahrgut-Kennzeichnung für den Transport erforderlich?',
      a: '<p>Nein. Aufgrund der Zusammensetzung sind keinerlei Kennzeichnungen für den Transport erforderlich. Damit sind alle Transport-Vorgaben weltweit gemeint, also zum Beispiel ADR, ADN oder IMDG.</p>'
    },
    {
      q: 'Ist die Kühlflüssigkeit gesundheitsschädlich?',
      a: '<p>Aufgrund der Zusammensetzung liegt keine Gesundheitsgefährdung gemäß EG-Verordnung 1272/2008 CLP vor.</p>'
    },
    {
      q: 'Wie hoch ist der Frostschutz?',
      a: '<p>Der Frostschutz geht bis −30&nbsp;°C.</p>'
    }
  ];

  const body = [
    ui.pageHero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
      alt: 'WIG-Schweißbrenner mit Keramikdüse in der Halterung vor einem rot beleuchteten Schweißvorhang',
      kicker: 'Sortiment', h1: 'Kühlwasser',
      sub: 'Die Kühlflüssigkeit ME 30-100.2-ECO — pH 7,8, Leitwert unter 25 Mikrosiemens.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Warum das Kühlmittel zählt',
      h2: 'Die falsche Kühlflüssigkeit kostet Sie die Pumpe —<br>und den Brenner gleich mit.',
      body: `<p>Der größte Nutzen unserer Kühlflüssigkeit ME 30-100.2-ECO liegt in der Reduzierung der Kosten durch den Ausfall Ihrer Wasserpumpe und in der kennzeichnungsfreien Verwendung bei Lagerung und Transport.</p>
      <p>Durch den Einsatz immer hochwertigerer und digitaler Stromquellen sowie durch die Weiterentwicklung der Schweiß- und Schneidbrenner ist es erforderlich, darauf abgestimmte Kühlflüssigkeiten einzusetzen. Die Zeiten von Ethylenglykol und Spiritus in der Kühlflüssigkeit gehören der Vergangenheit an.</p>`
    }),

    ui.featureGrid({
      wash: true,
      kicker: 'Die Eigenschaften',
      h2: 'Sechs Werte, die den Unterschied machen.',
      items: [
        { title: 'pH-Wert 7,8', text: 'Optimal abgestimmt für perfektes Zünden im WIG-Bereich. Werte unter 6 gelten als sauer und aggressiv.' },
        { title: 'Leitwert unter 25 Mikrosiemens', text: 'Greift weder das Strom-Wasser-Kabel noch die Wasserpumpe an. Empfohlen sind maximal 100 bis 150 Mikrosiemens.' },
        { title: 'Frostschutz bis −30 °C', text: 'Auch im unbeheizten Fahrzeug oder Container einsetzbar.' },
        { title: 'Kein Flamm- oder Zündpunkt', text: 'Die Angabe ist gesetzlich nicht erforderlich — ein großer Vorteil bei Lagerung und Transport.' },
        { title: 'Ohne Gefahrgut-Kennzeichnung', text: 'Erfüllt alle weltweit gültigen Transport-Vorschriften ohne Kennzeichnung, etwa ADR, ADN und IMDG.' },
        { title: 'Biologisch abbaubar', text: 'Nach OECD-Kriterien abbaubar. Keine Gesundheitsgefährdung gemäß EG-Verordnung 1272/2008 CLP.' }
      ]
    }),

    ui.prose({
      id: 'erstbefuellung',
      kicker: 'Erstbefüllung',
      h2: 'So wechseln Sie richtig auf ME 30-100.2-ECO.',
      body: `<ol>
        <li>Das alte Kühlmittel aus dem Tank komplett ablassen.</li>
        <li>Sicherstellen, dass auch die Brenner-Schläuche entleert sind.</li>
        <li>Den gesamten Kühlkreislauf zweimal mit demineralisiertem beziehungsweise VE-Wasser spülen.</li>
        <li>Sicherstellen, dass die sich üblicherweise am Kühlerboden sammelnden Ablagerungen restlos entfernt werden.</li>
        <li>Erst dann den Kühler mit der neuen Merkle-Kühlflüssigkeit befüllen.</li>
      </ol>
      <p>Bitte achten Sie darauf, dass keine andere Kühlflüssigkeit eingefüllt, nachgefüllt oder vermischt wird. Auch normales Leitungswasser oder destilliertes Wasser ist zu vermeiden, da sonst die besonderen Eigenschaften verloren gehen.</p>
      <p class="mk-note">VE-Wasser (vollentsalztes, demineralisiertes Wasser) ist Wasser ohne die im normalen Quell- und Leitungswasser vorkommenden Salze.</p>`
    }),

    ui.cards({
      wash: true,
      kicker: 'Gebinde',
      h2: 'Vier Größen, vom Kanister bis zum Fass.',
      items: [
        { href: 'https://www.merkle-shop.de/wasser/kuehlfluessigkeit-me-30-100-2-eco-fuer-wassergekuehlte-schweissanlagen-im-handlichen-4-kg-kanister.html', img: 'kuehlfluessigkeit-4-kg.png', alt: 'Merkle Kühlflüssigkeit ME 30-100.2-ECO im 4-kg-Kanister', title: '4 kg', text: 'Der handliche Kanister für den Werkstattwagen.' },
        { href: 'https://www.merkle-shop.de/wasser/kuehlfluessigkeit-me-30-100-2-eco-fuer-wassergekuehlte-schweissanlagen-bis-30-c-10-kg-kanister.html', img: 'kuehlfluessigkeit-10-kg.png', alt: 'Merkle Kühlflüssigkeit ME 30-100.2-ECO im 10-kg-Kanister', title: '10 kg', text: 'Die gängige Größe für die Werkstatt.' },
        { href: 'https://www.merkle-shop.de/wasser/kuehlfluessigkeit-me-30-100-2-eco-fuer-wassergekuehlte-schweissanlagen-bis-30-c-25-kg-kanister.html', img: 'kuehlfluessigkeit-25-kg.png', alt: 'Merkle Kühlflüssigkeit ME 30-100.2-ECO im 25-kg-Kanister', title: '25 kg', text: 'Für Betriebe mit mehreren wassergekühlten Anlagen.' },
        { href: 'https://www.merkle-shop.de/wasser/kuehlfluessigkeit-me-30-100-2-eco-fuer-wassergekuehlte-schweissanlagen-bis-30-c-200-kg-kanister.html', img: 'kuehlfluessigkeit-200-kg.png', alt: 'Merkle Kühlflüssigkeit ME 30-100.2-ECO im 200-kg-Fass', title: '200 kg', text: 'Das Fass für die Serienfertigung.' }
      ]
    }),

    ui.faq({ h2: 'Häufige Fragen zur Kühlflüssigkeit.', items: faqItems }),

    ui.downloads({
      wash: true,
      kicker: 'Unterlagen',
      h2: 'Sicherheitsdatenblätter.',
      items: [
        { label: 'Sicherheitsdatenblatt ME 30-100.2-ECO (deutsch)', href: 'http://merkle-muenchen.server24.merkle-pages.de/wp-content/uploads/sites/2/2019/10/sicherheitsdatenblatt-me-30-100.2-eco-de.pdf', meta: 'PDF' },
        { label: 'Safety data sheet ME 30-100.2-ECO (English)', href: 'http://merkle-muenchen.server24.merkle-pages.de/wp-content/uploads/sites/2/2019/10/sicherheitsdatenblatt-me-30-100.2-eco-en.pdf', meta: 'PDF' },
        { label: 'Coolant — this page in English', href: '/water/', meta: 'Seite' }
      ]
    }),

    ui.siblings({
      kicker: 'Passend dazu',
      items: [
        { href: '/durchfluss-waechter/', label: 'Wasserdurchfluss-Wächter', note: 'Schützt Brenner und Strom-Wasser-Kabel' },
        { href: '/schweissgeraete/wig/', label: 'WIG Schweißgeräte', note: 'Dort zahlt sich die Kühlflüssigkeit besonders aus' },
        { href: '/schweisszubehoer/', label: 'Schweißzubehör', note: 'Brenner, Schlauchpakete, Verschleißteile' },
        { href: '/service/#werkstatt', label: 'Werkstatt', note: 'Wir spülen und befüllen Ihre Anlage' }
      ]
    }),
    ui.contactband()
  ].join('\n\n');

  return {
    url: '/wasser/',
    title: 'Kühlwasser München | Wilhelm Merkle Schweißtechnik GmbH',
    description: 'Der größte Nutzen der Kühlflüssigkeit ME 30-100.2-ECO ist die Reduzierung der Kosten durch Ausfall der Wasserpumpe und die kennzeichnungsfreie Verwendung.',
    ogImage: 'kuehlfluessigkeit-10-kg.png',
    crumbs, faq: faqItems, body
  };
}

/* ================================================= Wasserdurchfluss-Wächter */
function durchfluss() {
  const crumbs = [CRUMB_HOME, { label: 'Kühlwasser', href: '/wasser/' }, { label: 'Wasserdurchfluss-Wächter', href: '/durchfluss-waechter/' }];
  const body = [
    ui.pageHero({
      img: 'durchflusswaechter.jpg',
      alt: 'Eingebauter Wasserdurchfluss-Wächter an einer Merkle-Schweißanlage',
      kicker: 'Service', h1: 'Wasserdurchfluss-Wächter',
      sub: 'Reagiert beim Durchfluss, nicht erst beim Druckabfall.'
    }),
    ui.breadcrumbs(crumbs),

    ui.leadStatement({
      kicker: 'Das Problem',
      h2: 'Ein abgeknickter Schlauch erzeugt keinen Druckabfall —<br>aber zu wenig Kühlung.',
      body: `<p>Ein Wassermangelschalter ist auf Druck eingestellt und reagiert in der Regel erst dann, wenn der Druck unter 0,5&nbsp;bar abfällt. Da ein abgeknickter Wasserschlauch im Schlauchpaket jedoch keinen Druckabfall bewirkt, sehr wohl aber zu wenig Wasser durchlässt und somit die Kühlung des Brenners nicht mehr optimal ist, ist ein Wasserdurchfluss-Wächter die eindeutig bessere Lösung.</p>
      <p>Ein zu geringer Durchfluss, hervorgerufen durch Ablagerungen und Verunreinigungen des Kühlmittels, wird ebenfalls durch den Wasserdurchfluss-Wächter abgedeckt.</p>`
    }),

    ui.alternating({
      wash: true,
      kicker: 'Was passiert ohne Schutz',
      h2: 'Zwei typische Schäden, die wir jede Woche sehen.',
      items: [
        {
          img: 'brenner-defekt.jpg',
          alt: 'Defekter Schweißbrenner mit verschmortem Anschluss durch mangelnde Kühlung',
          title: 'Der Brenner',
          body: '<p>Bleibt die Kühlung aus, überhitzt der Brenner. Die Folge sind Reparaturen und Standzeiten — beides teurer als der Wächter.</p>'
        },
        {
          img: 'stromwasserkabel-defekt.jpg',
          alt: 'Defektes Strom-Wasser-Kabel mit korrodierter Kupferlitze',
          title: 'Das Strom-Wasser-Kabel',
          body: '<p>Vor allem das teure Strom-Wasser-Kabel im Wasservorlauf leidet. Aggressives Kühlmittel greift die Kupferlitze zusätzlich an.</p>'
        }
      ]
    }),

    ui.featureGrid({
      kicker: 'Der Wächter',
      h2: 'Er reagiert bei 0,5 Liter pro Minute.',
      items: [
        { title: 'Auslösung beim Durchfluss', text: 'Der von uns eingebaute Durchflusswächter reagiert, sobald der Wasserdurchfluss unter 0,5&nbsp;Liter pro Minute absinkt — und nicht erst, wenn zu wenig Druck vorhanden ist.' },
        { title: 'Weniger Brenner-Reparaturen', text: 'Dadurch sollte sich die Häufigkeit von Brenner-Reparaturen deutlich verringern und damit auch die verbundenen Kosten.' },
        { title: 'Kühlmittel gleich mitwechseln', text: 'Wir lassen bei der Nachrüstung die alte Kühlflüssigkeit ab, reinigen den Tank und befüllen mit ME 30-100.2-ECO bei pH 7,8.' }
      ]
    }),

    ui.siblings({
      kicker: 'Passend dazu',
      items: [
        { href: '/wasser/', label: 'Kühlwasser', note: 'ME 30-100.2-ECO, pH 7,8' },
        { href: '/service/#werkstatt', label: 'Werkstatt', note: 'Nachrüstung und UVV-Prüfung' },
        { href: '/schweissgeraete/wig/', label: 'WIG Schweißgeräte', note: 'Wassergekühlte Brenner' },
        { href: '/schweisszubehoer/', label: 'Schweißzubehör', note: 'Schlauchpakete und Verschleißteile' }
      ]
    }),
    ui.contactband({
      h2: 'Wächter nachrüsten lassen?<br>Die Werkstatt macht Ihnen einen Termin.',
      text: 'Wir bauen den Wasserdurchfluss-Wächter in Ihre bestehende Anlage ein, spülen den Kühlkreislauf und befüllen ihn mit der passenden Kühlflüssigkeit.'
    })
  ].join('\n\n');

  return {
    url: '/durchfluss-waechter/',
    title: 'Wasserdurchfluss-Wächter | Merkle Schweißtechnik München',
    description: 'Der Wasserdurchfluss-Wächter reagiert schon unter 0,5 Liter pro Minute und schützt Brenner und Strom-Wasser-Kabel besser als ein Wassermangelschalter.',
    ogImage: 'durchflusswaechter.jpg',
    crumbs, body
  };
}

module.exports = [
  schweissgeraete, migmag, wig, elektrode, pulsearc, plasma,
  zusatzwerkstoffe, stahl, edelstahl, aluminium,
  schweisszubehoer, gas, wasser, durchfluss
];
