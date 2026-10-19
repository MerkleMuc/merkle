'use strict';
/* Kopiert die gebaute Seite und setzt jedem Wurzelpfad ein Präfix voran.
   Gebraucht wird das nur für GitHub Pages: dort liegt ein Projekt-Repo unter
   https://<konto>.github.io/<repo>/, die Seite selbst rechnet aber überall
   mit dem Wurzelpfad — so wie später auf dem eigenen Server.

   Aufruf:  node tools/pages-prefix.js <quelle> <ziel> <praefix>
   Beispiel: node tools/pages-prefix.js site _site /merkle-relaunch

   Die Quelle bleibt unangetastet. Zusätzlich bekommt jede Seite der Kopie
   ein `noindex`, damit die Vorschau nicht neben der echten Seite in den
   Suchergebnissen landet. */

const fs = require('fs');
const path = require('path');

const [quelle, ziel, roh] = process.argv.slice(2);
if (!quelle || !ziel || !roh) {
  console.error('Aufruf: node tools/pages-prefix.js <quelle> <ziel> <praefix>');
  process.exit(1);
}
/* Führender Schrägstrich ja, abschließender nein: "/merkle-relaunch" */
const P = '/' + roh.replace(/^\/+|\/+$/g, '');

const TEXT = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest']);
let dateien = 0, ersetzt = 0;

/* Nur echte Wurzelpfade anfassen: `/…` ja, `//cdn…` (protokollrelativ) und
   bereits präfixierte Pfade nein. */
function umschreiben(s, ext) {
  const vorher = s;

  if (ext === '.html') {
    /* Attribute, die Pfade tragen. srcset enthält mehrere, durch Komma
       getrennte Kandidaten — deshalb getrennt behandelt. */
    s = s.replace(/\b(href|src|action|data-src|poster)="\/(?!\/)/g, (m, a) => a + '="' + P + '/');
    /* `imagesrcset` am Vorladen der Bühne zählt mit — es trägt dieselbe Liste. */
    s = s.replace(/\b(imagesrcset|srcset)="([^"]+)"/g, (m, name, liste) =>
      name + '="' + liste.split(',').map(k => k.trim().replace(/^\/(?!\/)/, P + '/')).join(', ') + '"');
    /* Kein Index für die Vorschau: eine vorhandene Angabe wird ersetzt,
       sonst eine neue hinter das Viewport-Meta gesetzt. */
    if (/<meta name="robots"[^>]*>/.test(s)) {
      s = s.replace(/<meta name="robots"[^>]*>/g, '<meta name="robots" content="noindex,nofollow">');
    } else {
      s = s.replace(/<meta name="viewport"[^>]*>/,
        m => m + '\n<meta name="robots" content="noindex,nofollow">');
    }
  }

  if (ext === '.css') s = s.replace(/url\((['"]?)\/(?!\/)/g, (m, q) => 'url(' + q + P + '/');

  if (ext === '.js') s = s.replace(/(['"])\/(assets|suche|kontakt|en)\//g, (m, q, w) => q + P + '/' + w + '/');

  if (ext === '.json' || ext === '.xml' || ext === '.txt') {
    s = s.replace(/"url":"\/(?!\/)/g, '"url":"' + P + '/');
  }

  if (s !== vorher) ersetzt++;
  return s;
}

function gehe(von, nach) {
  fs.mkdirSync(nach, { recursive: true });
  for (const e of fs.readdirSync(von, { withFileTypes: true })) {
    const a = path.join(von, e.name), b = path.join(nach, e.name);
    if (e.isDirectory()) { gehe(a, b); continue; }
    const ext = path.extname(e.name).toLowerCase();
    if (TEXT.has(ext)) fs.writeFileSync(b, umschreiben(fs.readFileSync(a, 'utf8'), ext));
    else fs.copyFileSync(a, b);
    dateien++;
  }
}

fs.rmSync(ziel, { recursive: true, force: true });
gehe(quelle, ziel);

/* GitHub Pages liefert ohne diese Datei für fehlende Pfade seine eigene
   404-Seite aus; mit ihr greift unsere. */
const vierNullVier = path.join(ziel, '404.html');
if (!fs.existsSync(vierNullVier) && fs.existsSync(path.join(ziel, '404', 'index.html'))) {
  fs.copyFileSync(path.join(ziel, '404', 'index.html'), vierNullVier);
}
/* Jekyll aus dem Weg räumen — sonst verschluckt Pages Ordner mit Unterstrich. */
fs.writeFileSync(path.join(ziel, '.nojekyll'), '');

console.log('Präfix "' + P + '" gesetzt · ' + dateien + ' Dateien kopiert, '
  + ersetzt + ' davon umgeschrieben · Ziel: ' + ziel);
