'use strict';
/* SVG-Icons.
   Ein Satz, ein Raster (24 px), eine Strichstärke. Keine Icon-Schrift,
   keine Emoji: Emoji sind Text, werden von Screenreadern vorgelesen und
   sehen auf jedem Betriebssystem anders aus. */

/* Strichzeichnungen — erben die Farbe vom Elternelement. */
const STROKE = {
  arrowRight: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  chevronLeft: '<path d="M15 5 8 12l7 7"/>',
  chevronRight: '<path d="m9 5 7 7-7 7"/>',
  chevronDown: '<path d="m5 9 7 7 7-7"/>',
  close: '<path d="M6 6 18 18M18 6 6 18"/>',
  check: '<path d="m4 12.5 5 5L20 6.5"/>',
  phone: '<path d="M7.5 3.5h-2A2.5 2.5 0 0 0 3 6c0 8.3 6.7 15 15 15a2.5 2.5 0 0 0 2.5-2.5v-2l-4.5-2-2 2.5a15.6 15.6 0 0 1-5-5L11.5 10 9.5 5.5Z"/>',
  headset: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><path d="M4 14h2.5v6H5a1 1 0 0 1-1-1Zm16 0h-2.5v6H19a1 1 0 0 0 1-1Z"/><path d="M20 19a3 3 0 0 1-3 3h-3"/>',
  mail: '<path d="M3 6.5h18v11H3z"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4Z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/>',
  cart: '<path d="M3 4h2.2l2.3 11h10l2.5-8H6"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
  route: '<circle cx="6" cy="5.5" r="2.5"/><circle cx="18" cy="18.5" r="2.5"/><path d="M8.5 5.5H14a3.5 3.5 0 0 1 0 7h-4a3.5 3.5 0 0 0 0 7h5.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l4 2.5"/>',
  truck: '<path d="M2 6h12v11H2zM14 9.5h4l3 3V17h-7z"/><circle cx="7" cy="18.5" r="1.8"/><circle cx="17" cy="18.5" r="1.8"/>',
  wrench: '<path d="M15.5 3a5.5 5.5 0 0 0-5 7.7L3.6 17.6a2 2 0 0 0 2.8 2.8l6.9-6.9A5.5 5.5 0 1 0 15.5 3Z"/><path d="M6.2 18.2h.01"/>',
  cylinder: '<rect x="7.5" y="7" width="9" height="14" rx="2.5"/><path d="M10.5 7V4.5h3V7M12 2v2.5M7.5 11.5h9"/>',
  spark: '<path d="M13.5 2 6 13h5l-1 9 8-12h-5l.5-8Z"/>',
  drop: '<path d="M12 3s6.5 7 6.5 11.3A6.5 6.5 0 0 1 12 21a6.5 6.5 0 0 1-6.5-6.7C5.5 10 12 3 12 3Z"/>',
  euro: '<path d="M17.5 6.5a6.5 6.5 0 1 0 0 11"/><path d="M4.5 10h8.5M4.5 13.5h8.5"/>',
  eye: '<path d="M2 12s3.8-6 10-6 10 6 10 6-3.8 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
  recycle: '<path d="M12 3v5m0 0-2.5-2.5M12 8l2.5-2.5"/><path d="M20 12a8 8 0 1 1-8-8"/><path d="M16.5 6.5H20v3.5"/>',
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9.5 21v-7h5v7"/>',
  factory: '<path d="M3 21V10l6 4V10l6 4V6h6v15Z"/><path d="M7 17.5h.01M13 17.5h.01M18 17.5h.01"/>',
  helmet: '<path d="M4 15a8 8 0 0 1 16 0"/><path d="M2.5 15h19v2.5a1.5 1.5 0 0 1-1.5 1.5H4a1.5 1.5 0 0 1-1.5-1.5Z"/><path d="M9.5 7.5V15M14.5 7.5V15"/>',
  shield: '<path d="M12 3 5 5.5V12c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V5.5Z"/><path d="m9 12 2 2 4-4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3"/>',
  download: '<path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 18.5V21h16v-2.5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  book: '<path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v14h-6a3 3 0 0 0-2 1 3 3 0 0 0-2-1H4Z"/><path d="M12 5v14"/>',
  user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
  bolt: '<path d="M7 13.5h4L10 22l7-11.5h-4L14 2Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5Z"/><path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.5l8.5 4.7 8.5-4.7"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  sliders: '<path d="M5 21V14M5 10V3M12 21v-9M12 8V3M19 21v-5M19 12V3"/><path d="M2.5 14h5M9.5 8h5M16.5 16h5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>'
};

/* Flächenzeichnungen — eigene Farben oder currentColor als Füllung. */
const FILL = {
  star: '<path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9z"/>',
  whatsapp: '<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1a13.6 13.6 0 0 1-6.9-6c-.5-.9-.8-1.8-.8-2.6 0-.8.4-1.5.8-1.9.2-.2.4-.3.7-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.5.9 1.1 1.6 1.8 2.2.4.3.8.6 1.3.8.2.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l2 1c.2.1.3.2.4.3 0 .1 0 .4-.1.7z"/>',
  googleG: '<path d="M23 12.3c0-.8-.1-1.5-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z" fill="#4285F4"/><path d="M12 23.5c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3a11.5 11.5 0 0 0 10.2 6.3z" fill="#34A853"/><path d="M5.6 14.2a6.9 6.9 0 0 1 0-4.4v-3H1.8a11.5 11.5 0 0 0 0 10.4l3.8-3z" fill="#FBBC05"/><path d="M12 5.1c1.7 0 3.2.6 4.4 1.7l3.3-3.3A11.5 11.5 0 0 0 1.8 6.8l3.8 3c.9-2.7 3.4-4.7 6.4-4.7z" fill="#EA4335"/>'
};

/**
 * icon('pin', 'mk-icon--lg')
 * Dekorativ, deshalb immer aria-hidden. Bedeutung steht im Text daneben.
 */
function icon(name, cls) {
  const klass = 'mk-icon' + (cls ? ' ' + cls : '');
  if (FILL[name]) {
    const fill = name === 'googleG' ? '' : ' fill="currentColor"';
    return `<svg class="${klass}" viewBox="0 0 24 24"${fill} aria-hidden="true" focusable="false">${FILL[name]}</svg>`;
  }
  const d = STROKE[name];
  if (!d) throw new Error('Unbekanntes Icon: ' + name);
  return `<svg class="${klass}" viewBox="0 0 24 24" fill="none" stroke="currentColor"`
       + ` stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"`
       + ` aria-hidden="true" focusable="false">${d}</svg>`;
}

/* Icon in der Kachel — als Gestaltungselement vor Überschriften. */
function iconBox(name) {
  return `<span class="mk-iconbox" aria-hidden="true">${icon(name, 'mk-icon--lg')}</span>`;
}

function stars(count) {
  let out = '';
  for (let i = 0; i < count; i++) out += icon('star');
  return out;
}

module.exports = { icon, iconBox, stars, STROKE, FILL };
