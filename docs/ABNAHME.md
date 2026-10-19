# Abnahmekriterien — Stand der Umsetzung

Prüfliste aus Abschnitt 13 des Masterprompts, fortgeschrieben nach dem
Athlete2-Designbriefing. Vier Kriterien wurden dort bewusst überschrieben;
sie sind unten als **abgelöst** gekennzeichnet. Belege stammen aus
`npm run qa` (Playwright + axe-core) und `node lighthouse.js`.
Die Rohdaten liegen in `docs/qa-report.json`, `docs/qa-out.txt`,
`docs/lighthouse.json` und `docs/lh-out.txt`.

| | Kriterium | Stand | Beleg |
|---|---|---|---|
| ✅ | Alle Bestands-URLs erreichbar oder 301 | erfüllt | 31 von 31, 0 ungeklärt. Automatisch geprüft am Ende von `qa.js` gegen `_bestand/urls.txt`. |
| ✅ | Rechtsseiten wortgleich übernommen | erfüllt | `src/pages/legal.js` liest die verbatim gesicherten Blöcke aus `_bestand/legal-*.html`. Verändert werden nur: `<h1>` entfällt (die Überschrift trägt der Seiten-Hero), interne Links werden relativ, ein toter TYPO3-Downloadlink verliert sein `href`. Kein Wort geändert. |
| ✅ | Consent blockiert keine Fließtexte | erfüllt | Auf `/ueber-uns/`, `/kontakt/` und `/standorte/muenchen/` steht der gesamte Fließtext ohne Einwilligung. Geblockt wird ausschließlich das Kartenmodul. Live geprüft: 4 von 4 Absätzen sichtbar, `localStorage` unbenutzt. |
| ✅ | Keine unbelegte Zahl, kein unbelegter Claim | erfüllt | **Kein `{{TODO}}`-Marker mehr im Build.** Der Betreiber hat am 19.10.2026 alle offenen Angaben bestätigt; die Herkunft jedes Werts steht in `docs/TODO.md`. Vier Superlative aus dem Bestand entfernt und dort dokumentiert. |
| ✅ | Kontrastregel eingehalten | erfüllt, verschärft | Das neue Markentürkis `#21B2BA` erreicht auf Weiß nur 2,58:1 und ist deshalb in **keiner** Größe als Textfarbe zugelassen. `qa.js` prüft das über alle 33 Seiten: 0 Verstöße. Text und gefüllte Flächen laufen auf `#116173` (7,05:1) beziehungsweise dem Verlauf ab `#15737F` (5,55:1 mit Weiß). |
| ✅ | Register-Modul per Tastatur bedienbar, alle Panels im DOM | erfüllt | `role="tablist"`, Roving Tabindex, Pfeiltasten sowie `Home`/`End` geprüft. Alle fünf Panels im DOM, inaktive mit `hidden`. Mobil als `<details>`-Akkordeon, ebenfalls vollständig im DOM. |
| ↻ | Kein scroll-getriggertes Fade-up | **abgelöst** | Das Athlete2-Briefing verlangt in Abschnitt 30 ausdrücklich Scroll-Reveal mit `opacity 0 → 1` und `translateY(24px)` über 600 bis 750 ms sowie in Abschnitt 31 eine Staffelung. Beides ist umgesetzt. Der versteckte Ausgangszustand hängt an `mk-js`; ohne JavaScript ist jeder Inhalt sofort sichtbar. |
| ↻ | Kein Parallax | **abgelöst** | Abschnitt 33 des neuen Briefings erlaubt 10 bis 30 px. Umgesetzt sind maximal 18 px, ausschließlich auf Zäsur- und Seitenheroaufnahmen, ausschließlich per `transform`, erst ab 768 px Breite. |
| ✅ | `prefers-reduced-motion` respektiert | erfüllt | Globale Regel schaltet alle Animationen und Transitions ab; der Kennzahlen-Zähler springt dann direkt auf den Endwert, der ohnehin im DOM steht. |
| ↻ | `border-radius: 0` durchgängig | **abgelöst** | Abschnitt 14 des neuen Briefings gibt 4 bis 14 px vor. Umgesetzt sind 5 px für kleine Bedienelemente, 6 px für Buttons, 10 px für Karten, 12 px für Glas und Pillenform nur für Marker. `qa.js` prüft jetzt gegen diese Skala statt gegen Null: 0 Abweichungen. |
| ↻ | Keine Schatten außer der Header-Linie | **abgelöst** | Abschnitt 12 des neuen Briefings gibt ein dreistufiges Schattensystem vor. Umgesetzt wie dort angegeben, von `0 8px 30px rgba(15,25,30,.05)` bis `0 28px 80px rgba(15,25,30,.14)`. |
| ✅ | Lighthouse mobil ≥ 92 / Accessibility 100 | erfüllt | Alle 32 Seiten gemessen. Performance 99 bis 100 bei Median 100, Accessibility 100 auf jeder Seite. Tabelle unten. |
| ✅ | LocalBusiness-JSON-LD für alle drei Standorte | erfüllt | `HardwareStore` je Standort mit `openingHoursSpecification`, `telephone`, `address` und seit dem 16.10.2026 auch `geo` für alle drei — über OpenStreetMap zur Adresse ermittelt. JSON-LD parst auf allen 40 Seiten fehlerfrei. |
| ✅ | `og:locale` = `de_DE` | erfüllt | Auf allen deutschen Seiten; `/water/` trägt korrekt `en_US`. Im Bestand stand überall fälschlich `en_US`. |
| ✅ | Alt-Texte beschreibend | erfüllt | Automatisch geprüft: 0 Bilder ohne `alt`, 0 Alt-Texte, die einem Dateinamen oder dem Bestandsmuster „20241021 … DSC09971" entsprechen. |
| ✅ | Screenshots aller Seiten in drei Breiten | erfüllt | 120 Aufnahmen in `docs/screenshots/` (40 Seiten × 375 / 768 / 1440 px). |
| ✅ | Redirect-Liste als CSV | erfüllt | `docs/redirects.csv`, zusätzlich als fertige Serverregeln in `site/.htaccess` und `site/_redirects`. |
| ✅ | `{{TODO}}`-Liste als Übergabedokument | erfüllt | `docs/TODO.md`, 35 Punkte in acht Gruppen, erledigte durchgestrichen. |

## Weitere automatische Prüfungen

| Prüfung | Ergebnis |
|---|---|
| axe-core (WCAG 2.0/2.1/2.2 A + AA, Best Practice), 40 Seiten in 375 und 1440 px | 0 Verstöße |
| HTML-Validierung (`html-validate`, Regelsatz „recommended"), 40 Seiten | 0 Fehler |
| Defekte interne Links | 0 von 3637 geprüften Zielen |
| Genau ein `<h1>` je Seite | 40 von 40 |
| Lückenlose Überschriftenhierarchie | 40 von 40 |
| `width`/`height` auf allen generierten Bildern | erfüllt |
| Title ≤ 60 Zeichen, Description ≤ 155 Zeichen | 40 von 40 |
| JavaScript-Konsolenfehler | 0 |
| `node --check` auf allen Skripten | fehlerfrei |
| Türkis `#21B2BA` als Textfarbe | 0 Vorkommen |
| Radius außerhalb der Skala (0 px und Pille, Ausnahme Sprechblase) | 0 Vorkommen |
| Unsichtbarer Inhalt nach schnellem Durchscrollen, 40 Seiten × 3 Breiten | 0 Elemente |
| Reveal-Robustheit: Ankersprung, ohne JavaScript, `merkle.js` blockiert, ohne IntersectionObserver | 4 von 4 Fällen bestanden, jeweils 0 verborgene Elemente |

## Nachträglich gefundene und behobene Fehler

| Befund | Ursache | Behebung |
|---|---|---|
| Layoutsprung 0,075 auf `/durchfluss-waechter/` | Brotkrumenleiste lag mobil an der Umbruchkante und wuchs beim Laden von Poppins um eine Zeile | metrisch angeglichene Fallback-Schriften, Leiste mobil einzeilig |
| Inhalte blieben nach schnellem Scrollen unsichtbar | Scroll-Reveal meldete Elemente nicht, die zwischen zwei Messungen den Viewport übersprangen | Scrollprüfung als Absicherung, Anzeige auch oberhalb des Viewports, Sicherheitsnetz im `head` |
| Inhalte blieben ohne IntersectionObserver oder bei fehlendem `merkle.js` unsichtbar | versteckter Ausgangszustand ohne Rückfall | sofortige Anzeige ohne Observer, `mk-js` fällt nach drei Sekunden weg |
| Tabellen mobil nicht per Tastatur scrollbar | horizontaler Scrollbereich ohne fokussierbaren Inhalt | Tabellenrahmen als beschriftete `section` mit `tabindex="0"` |
| Grauer Balken unter dem Hero | Der negative Außenabstand der Kennzahlenkarte kollabierte durch die Sektion hindurch und zog deren hellen Hintergrund über den unteren Rand des Heros | `display:flow-root` auf `.mk-figures`: die Karte überlappt weiterhin, die Sektion bleibt stehen |
| Pins und Sprechblasen der Karte saßen in der linken oberen Ecke | Ein CSS-`transform` überschreibt das `transform`-Attribut eines SVG-Elements — die Skalierung der Einblendung löschte die Positionierung | Position und Animation auf zwei verschachtelte Gruppen aufgeteilt |
| Anfahrten auf der Karte bewegten sich nicht | Die Fahrlogik prüfte nur auf die Art „liefer" | Bedingung um „anfahrt" erweitert |
| Weiße Schrift auf weißem Grund möglich | Der durchsichtige Header galt auch für Seiten ohne dunkle Bühne, etwa die 404-Seite | Body-Klasse `mk-dark-top` aus dem Build, nur damit wird der Header oben durchsichtig |
| Dunkler Verlauf des Heros lag über dem Kennzahlenband | Hero und Seitenhero hatten keinen eigenen Stapelkontext, ihre Kinder mit `z-index:1` malten über die folgende Sektion | `isolation:isolate` auf beiden |
| Landmarken-Verstöße durch die schwebenden Leisten | Bewertungsleiste und Miniatur standen außerhalb jeder Landmarke | Bewertung als eigener Bereich, Karte und Miniatur in einem gemeinsamen Bereich mit Beschriftung |
| Tastflächen unter 24 px | Die Mini-Schließer der beiden Leisten waren 22 px groß | auf 26 px vergrößert |
| Messfehler im Lighthouse-Prüfstand | Playwrights gebündeltes Chromium meldete auf 13 Seiten keinen LCP-Kandidaten, Lighthouse lieferte für die ganze Kategorie null. Mit echtem Chrome messen dieselben Seiten einwandfrei. | Prüfstand auf `chrome-launcher` umgestellt, dazu eine einmalige Wiederholung mit frischem Browser, falls eine Messung doch einmal leer bleibt |
| Prüflücke im Testlauf | axe lief nur bei 1440 px, der Testlauf scrollte wegen `scroll-behavior:smooth` lange Seiten nie bis unten, unsichtbare Inhalte entgingen der Kontrastprüfung | axe zusätzlich bei 375 px, sofortiges Scrollen, Zählung unsichtbarer Elemente je Seite und Breite |

## Performance-Budget

Gemessen am 16.10.2026 mit `node lighthouse.js --all` (mobil, 4G-Drosselung,
echte Chrome-Instanz) über alle 39 Seiten mit eigener Adresse.

| Kriterium | Ziel | Stand |
|---|---|---|
| CSS gesamt | < 45 kB gzip | **23,6 kB** |
| JS gesamt | < 60 kB gzip | **8,0 kB** (+ 2,0 kB nur im Finder, + 1,2 kB nur auf `/suche/`) |
| Schriften gesamt | — | **48 kB** für eine variable Datei, die den gesamten Bereich 100 bis 900 abdeckt |
| CLS | < 0,02 | **0 auf jeder Seite** |
| INP | < 200 ms | Total Blocking Time 0 bis 90 ms, Spitzenwert auf der Startseite |
| LCP (4G, mobil) | < 2,5 s | **1,7 bis 2,3 s** |
| Lighthouse Performance | ≥ 92 mobil | **97 bis 100** |

| Kennzahl | Spanne über alle 39 Seiten |
|---|---|
| Performance | 97 bis 100, Median 100 |
| Accessibility | 100 auf jeder Seite |
| Best Practices | 100 auf jeder Seite |
| SEO | 100 auf jeder Seite außer `/suche/` (69, weil bewusst `noindex`) |
| LCP | 1,7 bis 2,3 s |
| CLS | 0 auf jeder Seite |
| TBT | 0 ms auf 34 Seiten, höchstens 90 ms |

Die schwächsten Werte stehen auf `/laden/` (98, LCP 2,3 s) und `/service/`
(97, LCP 2,1 s): beide tragen große Fotos über die volle Breite.
Rohdaten in `docs/lighthouse.json` und `docs/lh-out.txt`.
