'use strict';
/* Englische Fassung der Kernseiten.
   Übersetzt, nicht neu geschrieben: jede Aussage steht so auch auf der
   deutschen Seite. Rechtstexte bleiben verbindlich auf Deutsch und sind
   mit sichtbarem Hinweis verlinkt. */

const ui = require('../ui');
const { icon } = require('../icons');
const { EXTERN, TEL, STANDORTE, WHATSAPP, GOOGLE } = require('../data');
const { esc, attr } = ui;

const MUC = STANDORTE[0];

function crumbs(trail) { trail.lang = 'en'; return trail; }

/* Hinweis auf den deutschen Teil der Seite — steht auf jeder englischen Seite
   einmal, damit niemand ins Leere läuft. */
function germanNote(text) {
  return `<p class="mk-note">${text}</p>`;
}

function contactEn(o) {
  o = o || {};
  return `<section class="mk-section mk-wash mk-contactband">
  <div class="mk-container">
    <div class="mk-contactband__grid">
      <div>
        <p class="mk-kicker">Talk to us</p>
        <h2>${o.h2 || 'Not sure which machine fits?<br>Give us a call.'}</h2>
        <p>${o.text || 'We advise you in our shop in Munich-Freiham, on the phone or at your site. Every machine can be tested beforehand — in our showroom or in your own workshop.'}</p>
        <div class="mk-btnrow">
          <a class="mk-btn mk-btn--primary" href="${TEL.verkauf.href}">${icon('phone')}Sales: ${esc(TEL.verkauf.text)}</a>
          <a class="mk-btn mk-btn--outline" href="/en/contact/">${icon('mail')}Contact form</a>
          <a class="mk-btn mk-btn--outline" href="${attr(WHATSAPP)}" target="_blank" rel="noopener">${icon('whatsapp')}WhatsApp</a>
        </div>
      </div>
      <div class="mk-contactcard">
        <dl>
          <dt>Reception</dt><dd><a href="${TEL.zentrale.href}">${esc(TEL.zentrale.text)}</a></dd>
          <dt>Sales</dt><dd><a href="${TEL.verkauf.href}">${esc(TEL.verkauf.text)}</a></dd>
          <dt>Repairs</dt><dd><a href="${TEL.reparatur.href}">${esc(TEL.reparatur.text)}</a></dd>
          <dt>Gases</dt><dd><a href="${TEL.gase.href}">${esc(TEL.gase.text)}</a></dd>
          <dt>E-mail</dt><dd><a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a></dd>
          <dt>Address</dt><dd>Anton-Böck-Straße 31<br>81249 München, Germany</dd>
        </dl>
        <div class="mk-emergency">
          <p class="mk-emergency__title">Shop in Munich-Freiham</p>
          <p>Monday to Friday 6:30 to 18:00, Saturday 8:00 to 12:00. Parking right outside.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

/* ------------------------------------------------------------- Startseite */
function homeEn() {
  const body = [
    ui.hero({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc00623.jpg',
      alt: 'TIG welding torch with ceramic nozzle in its holder, a red welding curtain behind it',
      kicker: 'Welding and cutting technology since 1976',
      h1: 'Everything a welder needs.<br>In stock, in Munich-Freiham.',
      sub: 'Machines, filler metals, accessories, gases and coolant — plus a workshop, rental machines and advice from people who weld themselves.',
      cta1: { label: 'To the online shop', href: EXTERN.shop },
      cta2: { label: 'Call us: ' + TEL.zentrale.text, href: TEL.zentrale.href }
    }),

    ui.figures({
      items: [
        { value: 1976, raw: '1976', label: 'Started in Munich — a limited company since 1980', count: false },
        { value: 3, raw: '3', label: 'Locations in Bavaria: Munich, Landshut, Rosenheim', count: true },
        { value: 5, raw: '5', label: 'Welding and cutting processes under one roof', count: true },
        { value: 2008, raw: '2008', label: 'In our own building in Munich-Freiham', count: false }
      ]
    }),

    ui.caesura({
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
      alt: 'Merkle Schweißtechnik building in Munich-Freiham with a delivery van and gas cylinders outside'
    }),

    ui.statement({
      kicker: 'Family-run, succession settled',
      h2: '“Once Merkle, always Merkle.”',
      text: 'We do not simply deliver products. We solve problems around welding and cutting — whether it is a tricky welding job, a rental machine you need within hours, or an express delivery to Bolzano. The future needs a past.',
      link: { label: 'Read the company history', href: '/en/about/' }
    }),

    ui.services({
      kicker: 'What happens after the purchase',
      h2: 'Selling a machine is easy.<br>Keeping it running is the work.',
      items: [
        { icon: 'wrench', title: 'Workshop and repair', text: 'We repair faulty machines of all makes and carry out the prescribed tests to EN/IEC 60&nbsp;974-4 — in our workshop or at your site.', href: '/en/service/', link: 'See the workshop' },
        { icon: 'rent', title: 'Rental machines', text: 'We rent out almost every welding and cutting machine. While yours is being repaired we can provide a replacement.', href: '/en/service/', link: 'See rental machines' },
        { icon: 'recycle', title: 'Used machines', text: 'Tested used machines at a fair price. Ask our staff which ones are currently available.', href: '/en/service/', link: 'See used machines' },
        { icon: 'cylinder', title: 'Cylinder exchange system', text: 'Empty for full, straight away. You pay for the filling only — no rental contract, no inspection dates to worry about.', href: '/gas/#tauschsystem', link: 'How the system works' }
      ]
    }),

    ui.cards({
      kicker: 'Three ways to reach us',
      h2: 'Come by, call or order online.',
      items: [
        { href: '/en/locations/munich/', img: 'laden-1200-x700.png', alt: 'Sales assistant showing two welding helmets to a customer at the Merkle counter', title: 'Shop in Freiham', text: 'Monday to Friday from 6:30 to 18:00, Saturday from 8:00 to 12:00. Parking right outside.' },
        { href: '/gas/', img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09808.jpg', alt: 'Covered gas cylinder storage at Merkle Munich', title: 'Gas and exchange cylinders', text: 'Acetylene, argon, carbon dioxide, forming gas, propane and more — collect, have delivered or exchange. German page.' },
        { href: EXTERN.kurse, img: 'merkle-gaslieferant-waehrend-der-arbeit1.png', alt: 'Merkle delivery vehicle advertising welding courses, gas cylinders in front of it', title: 'Welding courses', text: 'MIG/MAG, TIG and stick for beginners and advanced welders — with a TÜV examination on request. German page.' }
      ]
    }),

    ui.reviews({
      kicker: 'What customers write',
      h2: 'Reviews on Google.',
      wash: true,
      limit: 10
    }),

    ui.shopband()
  ].join('\n\n');

  return {
    url: '/en/',
    lang: 'en',
    title: 'Merkle Schweißtechnik Munich | Welding and gas',
    description: 'Merkle Schweißtechnik in Munich: welding machines, filler metals, accessories, gases and coolant, with a workshop, rental machines and advice.',
    localBusiness: true,
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09971.jpg',
    body
  };
}

/* --------------------------------------------------------- Schweißgeräte */
function machinesEn() {
  const trail = crumbs([{ label: 'Home', href: '/en/' }, { label: 'Welding machines', href: '/en/welding-machines/' }]);
  const body = [
    ui.pageHero({
      kicker: 'Welding machines',
      h1: 'Five processes, one supplier.',
      sub: 'From thin sheet metal to structural steel: we stock machines for every process — and you may try each of them before you buy.',
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
      alt: 'Row of turquoise Merkle MIG/MAG welding machines in the showroom in Munich-Freiham'
    }),
    ui.breadcrumbs(trail),

    ui.featureGrid({
      kicker: 'The processes',
      h2: 'Which process suits your workpiece.',
      lead: 'The detailed German pages list every series. The machine finder is available in German as well.',
      items: [
        { title: 'MIG/MAG', text: 'MAG welding is mainly used on steel and stainless steel, MIG welding on non-ferrous metals. Our shielding gas machines handle both — from thin sheet to large components. Five series, from the economical RedMIG to the SpeedMIG.' },
        { title: 'TIG', text: 'Shielding gas welding with markedly less heat and an inert gas. That makes TIG suitable for every metal that can be fusion welded. From portable DC machines of 5.0&nbsp;kg up to the Insquare industrial line.' },
        { title: 'Stick (MMA)', text: 'Manual metal arc welding is one of the oldest processes and is used mainly on site today. Small, light and powerful: MobiARC and LiteArc&nbsp;180 with LiftTIG ignition and a digital display, only 5.0&nbsp;kg.' },
        { title: 'Pulse-Arc', text: 'The pulsed arc allows comparatively thick wire electrodes. The range runs from a portable power source to automated special solutions, for shipbuilding or a production line.' },
        { title: 'Plasma cutting', text: 'With compressed air as the plasma gas you cut almost any conductive metal — mild steel, chrome-nickel steel, aluminium, brass, copper, cast iron or titanium. An economical alternative to oxy-fuel cutting, with a narrow kerf and little distortion.' },
        { title: 'Try before you buy', text: 'Test any machine in our showroom or on your own workpiece in your workshop. Machines can also be rented first and bought afterwards.' }
      ]
    }),

    `<section class="mk-section mk-wash"><div class="mk-container"><div class="mk-grid"><div class="mk-col-8">
      ${germanNote('The full catalogue of series, technical details and accessories is on the German pages: <a href="/schweissgeraete/">welding machines</a>, <a href="/zusatzwerkstoffe/">filler metals</a>, <a href="/schweisszubehoer/">accessories</a> and <a href="/gas/">gases</a>. Our <a href="/schweissgeraete/finder/">machine finder</a> is in German too — or simply call us, we speak English.')}
    </div></div></div></section>`,

    ui.siblings({
      kicker: 'Next',
      items: [
        { href: '/en/service/', label: 'Service', note: 'Workshop, rental, financing' },
        { href: '/en/locations/munich/', label: 'Munich', note: 'Opening hours and directions' },
        { href: '/water/', label: 'Coolant', note: 'ME 30-100.2-ECO' },
        { href: EXTERN.shop, label: 'Online shop', note: 'Order around the clock' }
      ]
    }),

    contactEn()
  ].join('\n\n');

  return {
    url: '/en/welding-machines/',
    lang: 'en',
    title: 'Welding machines in Munich | Merkle',
    description: 'MIG/MAG, TIG, stick, Pulse-Arc and plasma cutting: welding machines from Merkle Schweißtechnik in Munich, with advice, demonstration and service.',
    crumbs: trail,
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc01021-hdr.jpg',
    body
  };
}

/* ---------------------------------------------------------------- Service */
function serviceEn() {
  const trail = crumbs([{ label: 'Home', href: '/en/' }, { label: 'Service', href: '/en/service/' }]);
  const body = [
    ui.pageHero({
      kicker: 'Service',
      h1: 'Repair, rental, testing, financing.',
      sub: 'Everything that keeps a machine running — for every make, not only for ours.',
      img: 'schweisskurse-1200x500-1.png',
      alt: 'Workshop employee in a welding jacket with torch and protective helmet in the Merkle workshop'
    }),
    ui.breadcrumbs(trail),

    ui.alternating({
      kicker: 'What we do',
      h2: 'Repair, rental and financing — for every make.',
      items: [
        {
          img: 'schweisskurse-1200x500-1.png',
          alt: 'Workshop employee with a welding torch in the Merkle workshop',
          title: 'Workshop and repair',
          body: '<p>We repair faulty machines of all makes and carry out the prescribed tests to EN/IEC 60&nbsp;974-4 — in our workshop in Munich-Freiham or at your site. While your machine is with us we can provide a rental machine.</p>',
          link: { label: 'Repairs: ' + TEL.reparatur.text, href: TEL.reparatur.href }
        },
        {
          img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09881-hdr.jpg',
          alt: 'Showroom with several Merkle welding machines in front of the sales counter',
          title: 'Rent, test, finance',
          body: '<p>We rent out almost every welding and cutting machine, so you can take on a job before you decide to buy. Tested used machines are available as well — ask us what is in stock.</p><p>Machines can be financed directly through us, without involving a bank.</p>',
          link: { label: 'Sales: ' + TEL.verkauf.text, href: TEL.verkauf.href }
        }
      ]
    }),

    ui.featureGrid({
      wash: true,
      kicker: 'Good to know',
      h2: 'Four things people ask us often.',
      items: [
        { title: 'All makes', text: 'Our workshop repairs machines of every manufacturer, not only Merkle machines.' },
        { title: 'Testing to EN/IEC 60 974-4', text: 'The prescribed recurring test for welding equipment, in our workshop or at your premises.' },
        { title: 'Replacement during repair', text: 'On request we provide a rental machine for the duration of the repair.' },
        { title: 'Advice before you buy', text: 'Test any machine in our showroom or on your own workpiece before you decide.' }
      ]
    }),

    `<section class="mk-section"><div class="mk-container"><div class="mk-grid"><div class="mk-col-8">
      ${germanNote('Details on rental machines, used machines and welding courses are on the German pages: <a href="/service/">service</a>, <a href="https://www.schweissgeraete-mieten.de/" target="_blank" rel="noopener">rental</a>, <a href="https://www.gebrauchte-schweissgeraete.de/" target="_blank" rel="noopener">used machines</a> and <a href="https://www.schweisskurse-merkle.de/" target="_blank" rel="noopener">welding courses</a>.')}
    </div></div></div></section>`,

    contactEn({ h2: 'A machine down?<br>Call the workshop directly.', text: 'The workshop line gets you straight to the people who repair the machines, not to a call centre.' })
  ].join('\n\n');

  return {
    url: '/en/service/',
    lang: 'en',
    title: 'Service and workshop in Munich | Merkle',
    description: 'Repair of all makes, testing to EN/IEC 60 974-4, rental machines, used machines and financing at Merkle Schweißtechnik in Munich.',
    crumbs: trail,
    ogImage: 'schweisskurse-1200x500-1.png',
    body
  };
}

/* -------------------------------------------------------------- Standort */
function locationEn() {
  const trail = crumbs([{ label: 'Home', href: '/en/' }, { label: 'Munich', href: '/en/locations/munich/' }]);
  const hours = MUC.hours.map(h => `<div><dt>${h.d === 'Montag bis Freitag' ? 'Monday to Friday' : 'Saturday'}</dt><dd>${esc(h.t.replace('Uhr', '').trim())}</dd></div>`).join('');

  const body = [
    ui.pageHero({
      kicker: 'Location',
      h1: 'Merkle Munich-Freiham',
      sub: 'Anton-Böck-Straße 31, 81249 München — sales, workshop, gases and warehouse under one roof.',
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
      alt: 'Merkle Schweißtechnik building in Munich-Freiham'
    }),
    ui.breadcrumbs(trail),

    `<section class="mk-section"><div class="mk-container">
      <div class="mk-contactband__grid">
        <div>
          <p class="mk-kicker">Opening hours and directions</p>
          <h2>In the Munich west, with parking at the door.</h2>
          <p class="mk-lead" style="margin-top:18px">We have been in our own building in Anton-Böck-Straße since 2008. Sales, workshop, gas storage and warehouse are all on site, so most things can be taken away straight away.</p>
          <div class="mk-btnrow" style="margin-top:28px">
            <a class="mk-btn mk-btn--primary" href="${TEL.zentrale.href}">${icon('phone')}${esc(TEL.zentrale.text)}</a>
            <a class="mk-btn mk-btn--outline" href="${attr(MUC.maps)}" target="_blank" rel="noopener">${icon('route')}Plan your route</a>
          </div>
        </div>
        <div class="mk-contactcard">
          <dl class="mk-hours">${hours}</dl>
          <p style="margin-top:18px">Anton-Böck-Straße 31<br>81249 München, Germany</p>
          <p style="margin-top:14px"><a href="mailto:${esc(MUC.mail)}">${esc(MUC.mail)}</a></p>
          <div class="mk-emergency">
            <p class="mk-emergency__title">Everything under one roof</p>
            <p>Sales, workshop, gas storage and warehouse are all on site.</p>
          </div>
        </div>
      </div>
    </div></section>`,

    ui.locations({
      wash: true,
      kicker: 'Three locations in Bavaria',
      h2: 'Munich, Landshut and Rosenheim —<br>the same warehouse behind all of them.'
    }),

    ui.embed({
      src: 'https://www.openstreetmap.org/export/embed.html?bbox=11.400%2C48.130%2C11.428%2C48.142&layer=mapnik&marker=48.136052%2C11.413829',
      title: 'Map of Munich-Freiham',
      note: 'The map is loaded from OpenStreetMap. Your IP address is transmitted to OpenStreetMap when you load it.',
      button: 'Load map'
    }),

    contactEn()
  ].join('\n\n');

  return {
    url: '/en/locations/munich/',
    lang: 'en',
    title: 'Merkle Munich-Freiham | Address and hours',
    description: 'Merkle Schweißtechnik in Munich-Freiham: Anton-Böck-Straße 31, open Monday to Friday 6:30 to 18:00 and Saturday 8:00 to 12:00.',
    crumbs: trail,
    localBusinessOnly: 'muenchen',
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
    body
  };
}

/* -------------------------------------------------------------- Über uns */
function aboutEn() {
  const trail = crumbs([{ label: 'Home', href: '/en/' }, { label: 'About us', href: '/en/about/' }]);
  const TIMELINE = [
    ['1976', 'The beginning of Merkle Munich: Bartholomäus Burghart starts travelling the Munich area.'],
    ['1980', 'The first milestone: our first shop in Peslmüllerstraße.'],
    ['1994', 'Space became tight: we move into a larger building in Bodenseestraße.'],
    ['2008', 'Now we build ourselves: we move into our own building in Anton-Böck-Straße.'],
    ['2013', 'Siegfried Awissus is named entrepreneur of the year at the CSU ball in Bavaria.']
  ];

  const body = [
    ui.pageHero({
      kicker: 'About us',
      h1: 'A family business since 1976.',
      sub: 'Three locations in Bavaria, one warehouse behind them, and people who have been doing this for decades.',
      img: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
      alt: 'Merkle Schweißtechnik building in Munich-Freiham'
    }),
    ui.breadcrumbs(trail),

    ui.leadStatement({
      kicker: 'Who we are',
      h2: 'We do not simply deliver products.',
      body: '<p>Merkle Schweißtechnik began in 1976, when Bartholomäus Burghart started covering the Munich area. The limited company followed in 1980. Today the company is family-run with its succession settled, and it supplies welding and cutting technology from three locations in Bavaria.</p><p>We see ourselves as problem solvers in all questions around welding and cutting — whether it is a tricky welding job, a rental machine needed within hours or an express delivery to Bolzano.</p>'
    }),

    `<section class="mk-section mk-wash">
  <div class="mk-container">
    <div class="mk-grid" style="margin-bottom:48px">
      <div class="mk-col-8">
        <p class="mk-kicker">Company history</p>
        <h2>Five years in which everything<br>was decided.</h2>
      </div>
    </div>
    <div class="mk-timeline">
      ${TIMELINE.map(([y, t]) => `<div class="mk-timeline__item">
        <p class="mk-timeline__year">${y}</p>
        <p class="mk-timeline__text">${esc(t)}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`,

    ui.reviews({ kicker: 'What customers write', h2: 'Reviews on Google.', limit: 8 }),

    `<section class="mk-section mk-wash"><div class="mk-container"><div class="mk-grid"><div class="mk-col-8">
      ${germanNote('The full company history, the teams and our job openings are on the German pages: <a href="/ueber-uns/">about us</a> and <a href="/jobs/">jobs</a>.')}
    </div></div></div></section>`,

    contactEn()
  ].join('\n\n');

  return {
    url: '/en/about/',
    lang: 'en',
    title: 'About Merkle Schweißtechnik Munich',
    description: 'Merkle Schweißtechnik: a family-run welding technology supplier in Munich since 1976, with three locations in Bavaria.',
    crumbs: trail,
    ogImage: '20241021-merkle-munchen-filiale-und-mitarbeiter-dsc09786.jpg',
    body
  };
}

/* --------------------------------------------------------------- Kontakt */
function contactPageEn() {
  const trail = crumbs([{ label: 'Home', href: '/en/' }, { label: 'Contact', href: '/en/contact/' }]);
  const body = [
    ui.pageHero({
      kicker: 'Contact',
      h1: 'Write, call or come by.',
      sub: 'We answer in English. The quickest way is the phone — the people who answer are the people who know the machines.'
    }),
    ui.breadcrumbs(trail),

    `<section class="mk-section" id="form">
  <div class="mk-container">
    <div class="mk-grid">
      <div class="mk-col-8">
        <p class="mk-kicker">Message</p>
        <h2 style="margin-bottom:28px">Send us your question.</h2>
        <form class="mk-form" method="post" action="mailto:info@merkle-muenchen.de" enctype="text/plain">
          <div class="mk-field"><label for="en-name">Name <span class="mk-req">*</span></label><input id="en-name" name="name" type="text" required autocomplete="name"></div>
          <div class="mk-field"><label for="en-company">Company</label><input id="en-company" name="company" type="text" autocomplete="organization"></div>
          <div class="mk-field"><label for="en-mail">E-mail <span class="mk-req">*</span></label><input id="en-mail" name="email" type="email" required autocomplete="email"></div>
          <div class="mk-field"><label for="en-phone">Phone</label><input id="en-phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="mk-field mk-field--full"><label for="en-msg">Your message <span class="mk-req">*</span></label><textarea id="en-msg" name="message" required></textarea></div>
          <div class="mk-checkrow">
            <input id="en-privacy" name="privacy" type="checkbox" required>
            <label for="en-privacy">I agree that my data will be used to answer my enquiry. Our privacy policy is available in German only: <a href="/datenschutz/">Datenschutzerklärung</a>.</label>
          </div>
          <div class="mk-field mk-field--full">
            ${germanNote('Your enquiry goes to <a href="mailto:info@merkle-muenchen.de">info@merkle-muenchen.de</a>. On submit your mail programme opens with the details filled in, so a copy stays in your sent folder. Prefer to talk? <a href="' + TEL.zentrale.href + '">' + esc(TEL.zentrale.text) + '</a>.')}
            <button class="mk-btn mk-btn--primary" type="submit" style="margin-top:18px">${icon('mail')}Send message</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>`,

    ui.locations({
      wash: true,
      kicker: 'Three locations in Bavaria',
      h2: 'Munich, Landshut and Rosenheim.'
    }),

    contactEn({ h2: 'Prefer to talk?<br>Here are the direct lines.', text: 'Reception connects you to anyone. If you already know who you need, the direct numbers are listed on the right.' })
  ].join('\n\n');

  return {
    url: '/en/contact/',
    lang: 'en',
    title: 'Contact Merkle Schweißtechnik Munich',
    description: 'Contact Merkle Schweißtechnik in Munich: phone numbers for sales, workshop and gases, e-mail address, contact form and opening hours.',
    crumbs: trail,
    body
  };
}

module.exports = [homeEn, machinesEn, serviceEn, locationEn, aboutEn, contactPageEn];
