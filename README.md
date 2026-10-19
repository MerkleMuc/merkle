# Relaunch merkle-muenchen.de

Statische Neuauflage der Website der Wilhelm Merkle Schweißtechnik GmbH.
Inhalt, Seitenstruktur und Informationsarchitektur folgen
`01-designanalyse-und-briefing.md` und `02-MASTERPROMPT-relaunch.md`.
Die visuelle Gestaltung folgt dem nachgereichten Athlete2-Designbriefing —
ausschließlich als Neugestaltung der Oberfläche, ohne einen einzigen Eingriff
in Inhalt, Reihenfolge oder Seitenlogik.

Das Ergebnis in `site/` ist **reines statisches HTML** — kein Framework, keine
Laufzeitabhängigkeit, kein Build-Schritt auf dem Server. Der Generator dient
nur dazu, Header, Footer und Sektionen über 33 Seiten konsistent zu halten.

---

## Aufbau

```
build.js            Generator: Bildderivate, Seiten, Sitemap, robots.txt, Redirects
qa.js               Härtung: Playwright-Screenshots, axe-core, Kontrast, Linkprüfung
lighthouse.js       Lighthouse mobil über dieselbe Chromium-Instanz
.htmlvalidate.json  Regelsatz der HTML-Validierung
server.js           Vorschau-Server für ./site (nur lokal)

src/
  data.js           Stammdaten: Standorte, Durchwahlen, Navigation, Verfahren, Kennzahlen
  ui.js             Sektionsbibliothek (Abschnitt 6 des Masterprompts)
  doc.js            Dokumenthülle: <head>, Meta, JSON-LD
  pages/
    home.js         Startseite
    sortiment.js    Schweißgeräte (5 Unterseiten), Zusatzwerkstoffe (3), Zubehör, Gas, Wasser, Durchflusswächter
    unternehmen.js  Service, Laden, Über uns, Standort München, Jobs, Kontakt, Aktuelles, Bewertung, Glossar, Coolant (EN)
    legal.js        Impressum, Datenschutz, AGB, EKB, Nutzungsbedingungen — Wortlaut unverändert

site/               ← Deployment-Verzeichnis
  assets/css/merkle.css     ein Stylesheet, 23,6 kB gzip
  assets/js/merkle.js       Interaktionen inklusive Reveal und Parallax, 8,0 kB gzip
  assets/js/suche.js        Websuche über einen Build-Index
  assets/fonts/             Poppins 400/500/600/700/800, self-hosted, latin
  assets/img/               nur die Logos
  assets/img/d/             AVIF-, WebP- und JPEG/PNG-Derivate in bis zu 6 Breiten
  assets/pdf/               Broschüren und Stellenausschreibungen
  .htaccess / _redirects    301-Regeln, 404-Zuordnung, www-Kanonisierung

_bestand/           Bestandsaufnahme: 31 gespiegelte Seiten, extrahierte Texte,
                    verbatim gesicherte Rechtstexte, Bildmanifest
  img-original/     129 unbearbeitete Originalbilder — Quelle der Derivate,
                    bewusst außerhalb des Deployment-Verzeichnisses
docs/
  ABNAHME.md        Abnahmekriterien mit Belegen
  TODO.md           Übergabedokument, 22 offene Punkte
  redirects.csv     Redirect-Liste
  qa-report.json    Rohdaten der Härtung
  screenshots/      99 Aufnahmen: 33 Seiten × 375 / 768 / 1440 px
```

## Kommandos

```bash
npm run build
```

```bash
npm run build:images
```

```bash
npm run qa
```

```bash
npm run lighthouse
```

```bash
npm run validate
```

`build` erzeugt die Seiten neu und verwendet das gespeicherte Bildmanifest.
`build:images` erzeugt zusätzlich alle Bildderivate neu (dauert einige Minuten).
`qa` und `lighthouse` setzen einen laufenden Vorschau-Server auf Port 4321
voraus, den `npm start` bereitstellt. `lighthouse` misst ohne Argument sechs
Stichproben, mit `--all` jede gebaute Seite. `validate` prüft das erzeugte
HTML offline gegen den Regelsatz „recommended".

## Deployment

`site/` auf einen beliebigen Webserver kopieren. Die Redirect-Regeln liegen als
`.htaccess` (Apache) und `_redirects` (Netlify/Cloudflare Pages) bei.
Empfohlene Header: lange `Cache-Control` für `/assets/`, `no-cache` für HTML.

---

## Umsetzung gegen die Vorgaben

### Design-Tokens

Alle Farb-, Flächen-, Schatten-, Radius- und Bewegungswerte stehen als CSS
Custom Properties in `site/assets/css/merkle.css`. Im Komponentencode steht
kein einziges Hex-Literal.

Das Verhältnis ist rund 88 Prozent neutrale Flächen zu 12 Prozent Akzent.
Neutral sind `#FFFFFF`, `#F8FAFB`, `#F2F5F6`, `#ECEFF1` und die dunkle Bühne
`#111827`. Der Akzent erscheint auf Buttons, Markern, Icons, aktiven Zuständen,
den Kennzahlen und genau einer Fläche, dem Shop-Band.

`--mk-ember` erscheint pro Seite exakt einmal, als 2-px-Marker am
Notdienst-Block.

#### Kontrast des Markentürkis

`#21B2BA` erreicht auf Weiß nur **2,58:1**. Es ist damit als Textfarbe und als
Fläche hinter weißer Schrift unbrauchbar und wird ausschließlich dekorativ
eingesetzt: Marker, Haarlinien, Glows, Icons auf dunklem Grund, Verlaufsende.

Für Text, Links und gefüllte Flächen gilt `--mk-teal-deep` `#116173` mit
7,05:1. Der CTA-Verlauf läuft von `--mk-teal-mid` `#15737F` nach `#116173`;
weiße Schrift erreicht dort am hellen Ende noch 5,55:1. `qa.js` prüft
automatisch, dass `#21B2BA` auf keiner Seite Textfarbe ist.

### Typografie

Poppins in fünf Schnitten, self-hosted im Latin-Subset, `font-display: swap`,
die drei sichtbaren Schnitte 400, 600 und 700 preloaded. Keine
Google-Fonts-CDN. Alle fünf Dateien zusammen wiegen 40 kB und damit weniger
als die zuvor eingesetzten zwei Variable Fonts.

Display läuft in 800 mit `-0.03em` Laufweite und 0,98 Zeilenhöhe, Überschriften
in 700, Zwischenüberschriften in 600, Fließtext in 400 bei 1,65 Zeilenhöhe.

Kein ALL-CAPS: Kicker stehen in Satzschreibung, davor ein 32 px breiter Marker
im Markenverlauf. Überschriften sind ganze Sätze mit gesetzten Umbrüchen.

#### Schriftwechsel ohne Layoutsprung

Zwei metrisch angeglichene Fallback-Schriften auf Basis von Arial überbrücken
die Zeit, bis Poppins geladen ist: eine für 100 bis 500, eine für 600 bis 900.
Gemessen an derselben Textprobe weichen sie in allen drei sichtbaren Schnitten
um höchstens 1,3 Prozent von Poppins ab. Ohne diese Angleichung lief der
Fallback bis zu 8 Prozent schmaler, Überschriften brachen anders um, und
Seiten sprangen beim Laden.

Die Brotkrumenleiste steht mobil einzeilig und scrollt bei langen Pfaden
horizontal. Auf `/durchfluss-waechter/` lag sie genau an der Umbruchkante und
wuchs beim Schriftwechsel um eine Zeile, was einen Layoutsprung von 0,075
erzeugte. Die aktuelle Seite steht ohnehin als Überschrift darüber.

### Tiefe, Glas und Radius

Vier Ebenen: Seitengrund, Inhaltsfläche, erhöhte Karte, schwebendes
Glaselement. Tiefe entsteht über Flächenkontrast, Position und weiche
Schatten, nicht über kräftige Rahmen. Rahmen liegen bei
`1px solid rgba(20,30,35,.06)`.

Drei Schattenstufen von `0 8px 30px rgba(15,25,30,.05)` bis
`0 28px 80px rgba(15,25,30,.14)`.

Glas kommt gezielt an vier Stellen zum Einsatz: der Header ab 40 px
Scrollposition, das Suchpanel, die Kontaktkarte vor dem Footer und die
Sekundärbuttons über Bildern. Es ist bewusst nicht die Standardfläche.

Radius bleibt technisch zurückhaltend: 5 px für kleine Bedienelemente, 6 px
für Buttons, 10 px für Karten, 12 px für Glas, Pillenform nur für Marker und
Statusetiketten. `qa.js` prüft, dass kein Element außerhalb dieser Skala liegt.

### Ausbaustufe 3 — Standortband, Karte, Feinschliff

| Thema | Entscheidung |
|---|---|
| Standortband | Zweispaltig ab 1024 px: links die drei Standorte untereinander, jeder mit einer Miniaturkarte seines Orts, rechts die animierte Bayern-Karte. Die Karte klebt beim Scrollen (`position:sticky`), die Liste zieht daran vorbei. Unter 1024 px entfällt die Karte und die Standorte stehen als Liste. |
| Kartengrafik | Feineres Punktraster (2,6 statt 4,6 Einheiten Abstand, Radius 0,3), Haarlinien statt Striche, Anthrazit `#0E1116` statt Grau, Farbakzente nur für Pin-Kern, Route, Fahrzeugstreifen und die Höfe der eigenen Standorte. Zusätzlich ruhende Städtepunkte, damit die Karte auch ohne laufenden Vorgang Dichte hat. |
| Kundenanfahrten | 18 Vorgänge, davon acht **Anfahrten** aus ganz Bayern zu einem der drei Standorte: das Fahrzeug fährt dabei herein statt hinaus, in einer eigenen Farbgewichtung. Reihenfolge abwechselnd, damit über einen Durchlauf immer Bewegung in beide Richtungen zu sehen ist. |
| Leere Flächen | `.mk-pattern` legt zwei diagonale Haarlinienraster hinter ruhige Sektionen (FAQ, Downloads, Geschwisterkarten). Reines CSS, nach außen auslaufend maskiert, auf Mobilgeräten nach unten statt nach rechts. |
| Top-Leiste | Schrift auf 12 px, Standortlabel als Versalien, jeder Standort mit Pin-Symbol, der aktive türkis. Rechts Headset und Telefonnummer in einer Zeile. |
| Untere Leiste | Verlauf von hellem Anthrazit links nach `#111` rechts. |
| Notdienst | Auf Wunsch des Auftraggebers als Leistung entfernt. Betroffen waren Startseite, Service, Ladengeschäft, Standortseite, Kontaktband, FAQ und die englische Fassung. An seine Stelle treten die Öffnungszeiten. Rechtstexte blieben unberührt. |

### Ausbaustufe 5 — Halbton-Karte, Flaschen-Slider, bestätigte Angaben

| Thema | Entscheidung |
|---|---|
| Karte | Die Flächen sind jetzt Halbton-Raster: ein Rechteck je Ebene, das Punktmuster kommt aus einer SVG-Maske. Das ist billiger als tausende Kreise und erlaubt echte Farbverläufe — Bayern läuft von tiefem Petrol im Westen nach hellem Türkis im Osten, der aufgehellte Kern liegt als zweite Maske darüber. Der Rest Europas bleibt ein leises Raster mit Haarlinien. |
| Kartenbewegung | Gezogen wird nicht mehr. Die Karte folgt dem Zeiger ein kleines Stück und geht beim Verlassen zurück, gedrosselt auf ein Bild je Bildwiederholung. Nur bei echtem Zeiger (`hover:hover and pointer:fine`), bei reduzierter Bewegung aus. |
| Gasflaschen-Slider | Breites Band auf `/gas/`: ab 1024 px mindestens sechs Flaschen nebeneinander, Scroll-Snap in der Mitte, die mittlere Flasche größer mit Bezeichnung und Text. Welche das ist, rechnet die JS beim Scrollen; ohne JavaScript bleibt es eine vollständige, lesbare Liste. Pfeiltasten bewegen das Band ebenfalls. |
| Kopfzeile | Die obere Leiste trägt denselben Verlauf wie die untere Schnellzugriffsleiste (hell links nach `#111` rechts). |
| Logo | Die weiße Platte ist weg. Über der dunklen Bühne wird die Marke umgekehrt, entsättigt und im Screen-Modus gezeichnet — so verschwindet der deckend weiße Grund der Datei. Eine echte Negativfassung als SVG bleibt die bessere Lösung, siehe TODO 31. |
| Startseite | Der Hero ist 50 px höher und endet weiter unter den Schaltflächen; das Kennzahlenband schiebt sich 132 px nach oben und schwebt sichtbar zwischen Bühne und Bildzäsur. |
| Bewertungsleiste | Kein Schließer mehr — sie begleitet die Sitzung. Unter 768 px schrumpft sie auf einen runden Punkt mit Google-G, Wert und einem Stern. |
| Navigation | Icons nur noch im Mega-Menü und in der mobilen Navigation, die Hauptleiste trägt reine Wortmarken. |
| Bestätigte Angaben | 3.800+ Lagerartikel, „50+ Jahre Schweiß- und Schneidtechnischer Fachhandel“, Preisstand und Flaschengrößen bestätigt (19 kg entfällt), Kontaktanfragen an info@merkle-muenchen.de, drei Google-Place-IDs. Damit steht **kein `{{TODO}}`-Marker mehr im Build**. |

### Ausbaustufe 4 — Karte mit echten Grenzen, Header, Navigation

| Thema | Entscheidung |
|---|---|
| Kartengrundlage | Die Umrisse sind jetzt echt: `_bestand/bundeslaender.geo.json` (deutschlandGeoJSON, mittlere Auflösung) wird im Build gelesen, **orthografisch** projiziert und als SVG-Pfad ausgegeben (`src/geo.js`). Orthografisch heißt: so, wie man eine Kugel von außen sieht — daher die leichte Wölbung der Grenzen. Bayern bleibt fein aufgelöst, die übrigen Länder werden stärker vereinfacht, zusammen rund 28 kB. |
| Darstellung | Flächen sind mit einem SVG-`<pattern>` aus Punkten gefüllt, nicht aus Einzelkreisen: beliebig fein, ohne das DOM zu belasten. Bayern dichter und in `#116173`, der Rest Deutschlands licht in `#9FADB5`. |
| Globus | Die Karte lässt sich mit der Maus ein Stück kippen (maximal 7 Grad seitlich, 5 Grad hoch) und federt beim Loslassen zurück. Umgesetzt über `rotateX`/`rotateY` mit Perspektive, also reines Transform. Bei reduzierter Bewegung ist das Kippen aus. |
| Platzierung | Die Karte liegt hinter der gesamten Sektion und läuft links und rechts in Weiß aus (`mask-image`). Die Standortkarten stehen in der linken Spalte darüber. |
| Ereignisse | 26 Vorgänge an echten Orten, darunter zehn Anfahrten zu den drei Standorten, Lieferungen, Anrufe, Shop-Bestellungen, Anfragen per E-Mail und zwei Google-Bewertungen mit fünf Sternen. Die Koordinaten stammen aus `src/geo.js`. |
| Header | Über einer dunklen Bühne steht er oben durchsichtig mit weißer Schrift, nach 40 px Scrollen wird er weiß. Seiten ohne dunkle Bühne bekommen den weißen Header sofort — gesteuert über die Body-Klasse `mk-dark-top`, die der Build setzt. Der Header ist jetzt `position:fixed`, der erste Block bekommt dessen Höhe als Polster. |
| Logo | Oben steht die Wort-Bild-Marke auf einer weißen Platte. Ein Farbfilter würde sie zu einer weißen Fläche machen, weil sie selbst weiße Innenflächen hat. Der Innenabstand bleibt in beiden Zuständen gleich, damit beim Scrollen nichts springt. |
| Navigation | Jeder Hauptpunkt, jeder Mega-Menü-Eintrag und jeder Punkt der mobilen Navigation trägt ein passendes Vektor-Icon aus `src/icons.js`. Die Zuordnung übernimmt `iconForHref()`. |
| Standortkoordinaten | Für alle drei Standorte liegen jetzt exakte Koordinaten vor, am 16.10.2026 über OpenStreetMap zur jeweiligen Adresse ermittelt. Damit ist das `geo`-Feld im `LocalBusiness`-Markup vollständig. |

### Bewegung

Beim Laden: die choreografierte Hero-Einblendung mit je 60 ms Versatz.

Beim Scrollen: Reveal mit `opacity 0 → 1` und `translateY(24px) → 0` über
700 ms, gestaffelt in Vierergruppen mit 70 ms Abstand. Bilder blenden
zusätzlich von `opacity .7` und `scale(1.04)` ein. Parallax bewegt
ausschließlich die Zäsur- und Seitenheroaufnahmen um maximal 18 px, mit
leichter Überskalierung, damit keine Kanten frei werden.

Bei Interaktion: Karten heben sich um 4 px, Bilder skalieren auf 1.035,
Textlinks ziehen ihre Unterlinie zusammen, der Header schrumpft, das
Register-Modul blendet über.

#### Absicherung des Reveals

Ein Scroll-Reveal kann Inhalte dauerhaft verstecken, wenn er nicht auslöst.
Deshalb gilt:

- **Ausgangszustand in der CSS.** Er hängt an der Klasse `mk-js`, die ein
  einzeiliges Skript im `head` setzt. Das Skript danach schaltet nur Klassen
  um und verändert das Layout nicht.
- **Ohne JavaScript** fehlt `mk-js`, jeder Inhalt ist sofort sichtbar.
- **Wenn `merkle.js` nicht lädt** oder vorher ein Fehler auftritt, entfernt
  das Skript im `head` nach drei Sekunden `mk-js` wieder.
- **Ohne IntersectionObserver** wird sofort alles gezeigt.
- **Nach einem Ankersprung** werden auch Inhalte oberhalb des Viewports
  gezeigt, die ihn nie gekreuzt haben.
- **Bei schnellem Scrollen** fängt eine Scrollprüfung Elemente ab, die
  zwischen zwei Messungen von unterhalb direkt nach oberhalb springen. Sie
  meldet sich ab, sobald nichts mehr verborgen ist.
- **Beim Drucken** wird alles gezeigt.

`qa.js` prüft jeden dieser Fälle und zählt auf jeder Seite in jeder Breite
Text- und Bildelemente mit effektiver Deckkraft null. Das ist auch für die
Barrierefreiheitsprüfung wichtig: axe überspringt unsichtbare Elemente beim
Kontrast, ein nicht ausgelöster Reveal hätte Verstöße also verdeckt.

`prefers-reduced-motion: reduce` schaltet Reveal, Parallax und alle
Transitions ab.

### Register-Modul

Echtes `role="tablist"` mit Pfeiltasten-, `Home`- und `End`-Navigation, aktiver
Reiter als erhöhte weiße Karte mit 2-px-Balken im Markenverlauf, inaktive in `--mk-muted`. **Alle
Panels bleiben im DOM**, inaktive tragen `hidden`. Unter 900 px werden die
Reiter zu einem `<details>`-Akkordeon — ebenfalls vollständig im DOM.

### Navigation

Sticky Header mit Standortwechsler und Telefon in der Oberzeile. Ab 40 px
Scroll verschwindet die Oberzeile, der Header wird zu mattiertem Glas, schrumpft
von 88 auf 72 px Höhe, und das Logo skaliert auf 84 %.

Im Mega-Menü sind **Link und Aufklappen getrennt**: „Sortiment" und „Service"
führen als Link auf ihre Übersichtsseite, ein eigener Knopf daneben öffnet das
Panel. Ein kombiniertes Element hätte die Übersichtsseite per Klick
unerreichbar gemacht. Das Panel öffnet zusätzlich per Hover und per Fokus,
schließt mit `Esc` und gibt den Fokus an den Knopf zurück.

Unter 768 px entfällt die Oberzeile — für Standortwechsler und Telefon
nebeneinander reicht die Breite nicht. Beides steht im Vollbild-Overlay, das
akkordeongestaffelt ist und Telefon sowie Shop als feste Knöpfe unten führt.

### Consent

Der Bug auf `/ueber-uns/` ist gefixt: Fließtext ist immer sichtbar. Geblockt
wird ausschließlich der eingebettete Drittinhalt (Kartenmodul), und zwar mit
einem Platzhalter, der benennt, was beim Laden passiert. Keine
`localStorage`-Abhängigkeit für Kerninhalte — das Skript speichert nichts.

Der Google Tag Manager (GTM-WVF4V8C) wurde **nicht** übernommen, siehe
`docs/TODO.md`.

### URL-Bestand

Alle 31 Bestands-URLs sind erreichbar oder haben ein 301. Die Doppelung
`/service/` und `/service-2/` ist aufgelöst — `/service/` ist kanonisch.
Die Redirect-Liste liegt als `docs/redirects.csv` sowie als fertige
Serverregeln in `site/.htaccess` und `site/_redirects`.

Neu hinzugekommen: `/aktuelles/`, `/standorte/muenchen/`, `/suche/`.

### Nachweise statt Behauptungen

Auf `/zusatzwerkstoffe/` steht eine Nachweisreihe mit den drei Signets
„Offizieller Händler" für Böhler Welding, Fontargen Brazing und UTP
Maintenance. Sie stammen aus dem Bestand und tragen eine Aussage, deshalb
laufen sie ohne Graustufenfilter.

Auf `/gas/` sind die tauschbaren Flaschengrößen als Tabelle gesetzt. Im
Bestand standen sie ausschließlich als Text in einer Verkaufsgrafik und waren
damit weder durchsuchbar noch für Screenreader zugänglich. Die Zeitzusage aus
derselben Grafik wurde nicht übernommen, siehe `docs/TODO.md`.

### SEO

Titel und Descriptions der Bestandsseiten übernommen, nur wo schwach neu
geschrieben. Genau ein `<h1>` je Seite, lückenlose Überschriftenhierarchie.

JSON-LD: `Organization` und `WebSite` global, `HardwareStore` (Untertyp von
`LocalBusiness`) mit `openingHoursSpecification` für alle drei Standorte,
`geo` nur für München — für Landshut und Rosenheim liegen keine Koordinaten
vor und wurden nicht geschätzt. `BreadcrumbList` auf allen Unterseiten,
`FAQPage` auf `/gas/`, `/wasser/`, `/service/` und `/standorte/muenchen/`.

Die Geo-Meta des Bestands (`ICBM`, `geo.position`, `geo.region`,
`geo.placename`) ist beibehalten. `og:locale` steht auf `de_DE` — im Bestand
stand fälschlich `en_US`.

Alt-Texte beschreiben den Bildinhalt. Die Bestandsalts
(„20241021 Merkle München – DSC09971") sind ersatzlos ersetzt.

### Performance

| Ziel | Stand |
|---|---|
| CSS gesamt < 45 kB gzip | **13,4 kB** |
| JS gesamt < 60 kB gzip | **4,4 kB** (+ 1,2 kB Suche, nur auf `/suche/`) |
| Kein jQuery, kein Framework | erfüllt |
| AVIF mit Fallback, `srcset`, `sizes` | AVIF → WebP → JPEG/PNG, bis zu 6 Breiten |
| `width`/`height` gesetzt | auf allen generierten Bildern |
| `loading="lazy"` unterhalb des Folds | erfüllt; Hero `eager` + `fetchpriority="high"` |

Das Katalog-PDF (114 MB) ist bewusst **nicht** eingebunden, sondern verlinkt —
mit Größenangabe im CTA. Siehe `docs/TODO.md`.

---

## Ausbaustufe 2 — Interaktion, Bewertungen, Finder, Englisch

Diese Stufe baut auf dem Athlete2-Redesign auf. Inhalt und Reihenfolge der
bestehenden Seiten bleiben unverändert, dazu kommen neue Bausteine.

### Gestaltung

| Thema | Entscheidung |
|---|---|
| Schrift | **Inter** als variable Datei, 48 kB für den gesamten Bereich 100 bis 900. Ein Request statt fünf. Metrisch angeglichener Arial-Fallback (`size-adjust:107.12%`), damit beim Schriftwechsel nichts springt. |
| Gewichte | Überschriften 250 bis 300, Fließtext 400, Hervorhebung 500. Fett (600) nur für Zahlen und Preise. |
| Kanten | `--mk-r-card`, `--mk-r-sm` und `--mk-r-glass` stehen auf 0. Rund ist ausschließlich, was man anklickt: Buttons, Chips und die schwebenden Leisten (`--mk-r-pill`). Einzige begründete Ausnahme ist die Sprechblase der Beraterkarte. |
| Verläufe | Neue Tokens `--mk-grad-line` (auslaufende Linie), `--mk-grad-sheen` (Glanz auf dem Shop-Knopf), `--mk-mesh-light` und `--mk-mesh-dark` (zwei versetzte Farbwolken für Tiefe). |
| Tiefe | Dekorative Orbs (`.mk-orb`), Mesh-Verläufe auf dunklen Bühnen, Verlaufs-Haarlinie an der Oberkante jeder Karte, die beim Überfahren aufzieht. Alles nur `transform` und `opacity`. |
| Icons | Eigener SVG-Satz in `src/icons.js`: ein 24er-Raster, Strichstärke 1,4, 36 Zeichnungen plus zwei Markenzeichen (Google, WhatsApp). Keine Icon-Schrift, keine Emoji. |

### Neue Bausteine

| Baustein | Datei | Verhalten |
|---|---|---|
| Schwebende CTA-Leiste | `ui.dock()` | Mittig unten: Shop (hervorgehoben, Glanz alle acht Sekunden), Beratung, WhatsApp. Ab 900 px Breite als volle Leiste mit Kurzbeschriftung. |
| Google-Bewertungsleiste | `ui.ratingBar()` | Links unten, hell und klein, Schnitt 4,8 aus 78 Bewertungen, für die Sitzung wegklickbar. |
| Beraterkarte | `ui.beraterCard()` | Rechts unten, hell, erscheint nach sieben Sekunden und **nur innerhalb der Öffnungszeiten in München**. Die Zeiten kommen als Datenattribut aus `STANDORTE`, gerechnet wird im Browser. Weggeklickt bleibt eine Miniatur mit der heutigen Öffnungszeit, ein Klick holt die Karte zurück. |
| Bewertungskarten | `ui.reviews()` | Wörtliche Google-Rezensionen als horizontaler Slider. Gekürzte Rezensionen sind als gekürzt markiert und verlinken zu Google. |
| Horizontaler Slider | `ui.slider()` | Scroll-Snap, Pfeile ab 768 px, Fortschrittsbalken. Ohne JavaScript bleibt es eine normal scrollbare Fläche, per Tastatur erreichbar. |
| Bayern-Karte | `ui.bayernMap()` | Punktierte Umrisskarte hinter dem Standortband, ab 1100 px. Zehn Vorgänge aus dem Tagesgeschäft leuchten nacheinander auf, bei Lieferungen fährt ein Miniaturfahrzeug die Route ab. Rein dekorativ, `aria-hidden`, hält an, sobald sie aus dem Bild scrollt. |
| Schweißgeräte-Finder | `src/pages/finder.js` | Sechs Fragen, danach ein Verfahren und zwei Geräte. Alle Ergebnistexte und Gerätekarten entstehen im Build und liegen als `<template>` in der Seite — der Browser setzt nur zusammen. |
| Sprachschalter | `ui.langSwitch()` | DE/EN rechts im Menü. Die englische Fassung deckt Startseite, Schweißgeräte, Service, Standort, Über uns und Kontakt ab, inklusive eigener Navigation und `hreflang`-Paaren. |

### Bewegung

Alle Zustandswechsel laufen über `transform` und `opacity`, Dauer 150 bis 250 ms
für Bedienelemente, 420 bis 700 ms für Einblendungen, Kurve
`cubic-bezier(.16,1,.3,1)`. Bei `prefers-reduced-motion` entfallen Parallax,
Kartenanimation und Sprechblase; Einblendungen bleiben als reine Deckkraft.

### Absicherung des Scroll-Reveals

Der Reveal hat jetzt drei Standbeine, weil ein IntersectionObserver in
eingebetteten Ansichten zwar existieren, aber keine Meldung liefern kann:

1. IntersectionObserver für den Normalfall.
2. Eine Geometrieprüfung bei jedem Scrollen für schnelles Durchscrollen.
3. Eine Geometrieprüfung bei `load`, nach 900 ms und nach 2500 ms — sie deckt
   den Fall ab, dass gar keine Beobachtung eintrifft.

Zusätzlich entfernt ein Sicherheitsnetz im `<head>` nach drei Sekunden die
Klasse `mk-js`, falls das Skript überhaupt nicht lädt.

### Versionsstempel

CSS und JavaScript tragen einen Stempel aus Dateigröße und Änderungszeit
(`merkle.css?v=…`). Damit dürfen beide dauerhaft gecacht werden und sind nach
jedem Build trotzdem sofort neu.

## Prüfstand

| Prüfung | Ergebnis |
|---|---|
| axe-core über 33 Seiten | 0 Verstöße |
| HTML-Validierung über 33 Seiten | 0 Fehler |
| Defekte interne Links | 0 |
| Bestands-URLs erreichbar oder 301 | 31 von 31 |
| Radius außerhalb der Skala 0–14 px und Pille | 0 Abweichungen |
| Türkis `#21B2BA` als Textfarbe | 0 Vorkommen |
| Konsolenfehler | 0 |
| Lighthouse Performance mobil, 32 Seiten | 99 bis 100 |
| Lighthouse Accessibility, 32 Seiten | 100 |
| CLS, 32 Seiten | 0 |
| Unsichtbarer Inhalt nach schnellem Durchscrollen | 0 |

Details und Rohdaten in `docs/ABNAHME.md`.

## Bekannte Lücken

Seit dem 19.10.2026 steht **kein `{{TODO}}`-Marker mehr im Build**: Der
Betreiber hat die offenen Angaben geliefert. Was noch offen ist, steht in
`docs/TODO.md` — 35 Punkte, die erledigten durchgestrichen. Blockierend für
den Live-Gang ist davon nur noch der echte Formular-Endpunkt (Punkt 9); bis
dahin sendet das Formular per `mailto:` an info@merkle-muenchen.de.
Es wurde keine Zahl, kein Zertifikat und keine Referenz erfunden.
