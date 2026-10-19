# Übergabedokument — offene Punkte

Stand: 19.10.2026 · Relaunch merkle-muenchen.de

Am 19.10.2026 hat der Betreiber die offenen Angaben geliefert. **Im Build
steht seitdem kein einziger `{{TODO}}`-Marker mehr.** Die erledigten Punkte
bleiben durchgestrichen stehen, damit nachvollziehbar ist, woher ein Wert
kommt. Keiner dieser Werte wurde geschätzt oder erfunden.

---

## 1. Unbestätigte Kennzahlen (blockierend für Live-Gang)

| # | Ort | Offen | Marker im Build |
|---|---|---|---|
| 1 | ~~Startseite, Kennzahlenband: Anzahl Lagerartikel~~ | **Erledigt am 19.10.2026.** Vom Betreiber bestätigt: 3.800+ Artikel dauerhaft am Lager. | — |
| 2 | ~~Startseite, Kennzahlenband: „30+ Jahre Ausbildungsbetrieb"~~ | **Erledigt am 19.10.2026.** Die Kennzahl nennt jetzt die belegte Angabe des Betreibers: „50+ Jahre Schweiß- und Schneidtechnischer Fachhandel". | — |
| 3 | ~~/ueber-uns/: „seit 20 Jahren Merkle-Cup"~~ | **Teilweise erledigt am 19.10.2026.** Der Absatz schließt jetzt mit der bestätigten Angabe „seit über 50 Jahren am Markt". Die beiden Zeitangaben aus dem Bestandstext (Ausbildung, Merkle-Cup) stehen unverändert als Zitat der Firmengeschichte. → Bei Gelegenheit auf den heutigen Stand bringen. |
| 4 | ~~/gas/: Preisstand des Kostenvergleichs~~ | **Erledigt am 19.10.2026.** Vom Betreiber bestätigt; die Beschriftung weist Preisänderungen als vorbehalten aus. |

## 2. Werbeaussagen ohne Beleg

Der Masterprompt verbietet unbelegte Superlative. Folgende Formulierungen
stehen im Bestand und wurden **nicht** in neue Marketingtexte übernommen:

| Aussage | Fundort im Bestand | Umgang im Neubau |
|---|---|---|
| „einer der größten schweißtechnischen Händler Bayerns" | /ueber-uns/ | **entfernt.** Der übrige Text der Firmengeschichte ist unverändert. |
| „Als führender schweißtechnischer Fachhändler …" | Startseite, /laden/ | **entfernt.** Ersetzt durch belegbare Aussagen (Sortiment, Öffnungszeiten, Notdienst). |
| „Der führende Fachhandel für Schweißen & Schneiden" | Wort-Bild-Marke im Logo | **belassen** — Bestandteil der eingetragenen Marke, keine neue Werbeaussage. |
| „wirklich einmalig in unserer Branche" (Notdienst) | /laden/, /service/ | **entfernt**, Sachverhalt bleibt: Notdienst rund um die Uhr gegen Aufschlag. |
| „Flaschentausch leer gegen voll in nur 4 Minuten – nur bei Merkle!" | Verkaufsgrafik auf /gas/ | **nicht übernommen.** Aus der Grafik wurden nur die Flaschengrößen als Tabelle übernommen, die Zeitzusage nicht. |

→ Entscheidung nötig: sollen die entfernten Aussagen mit Beleg zurück?

**Übernommen wurde dagegen** der Nachweis „Offizieller Händler" für Böhler
Welding, Fontargen Brazing und UTP Maintenance. Die drei Signets liegen als
Bestandsassets vor und stehen jetzt auf `/zusatzwerkstoffe/`. Böhler Welding
ist zusätzlich im Bestandstext derselben Seite namentlich genannt.

**Nicht übernommen** wurde `bio-logo-weiss.png`, ein selbstgestaltetes
Recycling-Signet mit Baum und Merkle-Schriftzug. Es sieht aus wie ein
Prüfsiegel, ist aber keines. Die belegte Aussage „biologisch nach
OECD-Kriterien abbaubar" steht als Text auf `/wasser/`.

## 3. Assets

| # | Punkt | Detail |
|---|---|---|
| 5 | **Katalog-PDF ist 114 MB** | Wird deshalb **nicht** mitgeliefert, sondern auf die Bestands-URL verlinkt; die Größe steht im CTA („Katalog öffnen (PDF, 114 MB)"). Vor dem Live-Gang komprimieren — 114 MB sind auf Mobilfunk unbenutzbar. |
| 6 | **Produktbilder nur 230 × 145 px** | Alle Geräte-, Serien- und Gasbilder liegen auf der Bestandsseite nur in dieser Größe vor. Sie werden deshalb bewusst klein gesetzt (Serienliste, Zubehörkacheln). Für große Flächen wurden ausschließlich die Fotos von 2024/25 (1920 × 1280) verwendet. → Herstellerbilder oder Neuaufnahmen anfordern. |
| 6a | **55 Detailbilder bleiben ungenutzt** | Die Bestandsseiten illustrieren ihre Vorteilslisten mit je einem 230 × 145 px kleinen Detailfoto. Diese Größe trägt in keinem sinnvollen Layout, die Merkmale stehen deshalb als reines Textraster. Die Dateien liegen weiterhin in `_bestand/img-original/`. → Mit brauchbaren Auflösungen ließe sich das Merkmalsraster bebildern. |
| 6b | **QR-Code ohne bekanntes Ziel** | `barcoide.jpg` stand auf `/durchfluss-waechter/`. Wohin der Code führt, ließ sich nicht feststellen; er wurde deshalb nicht übernommen. |
| 7 | **Portraitfotos je Bereich fehlen** | Der Abschnitt „Ansprechpartner" verlangt ein Portrait je Bereich. Vorhanden sind nur Gruppen- und Situationsfotos; diese sind ersatzweise eingesetzt. → Vier Portraits (Verkauf, Werkstatt, Schweißkurse, Buchhaltung). |
| 8 | Favicon | Auf der Bestandsseite liefern `/favicon.ico` und alle Varianten 404. Es wurde ein schlichtes SVG-Favicon in `--mk-steel-900`/`--mk-teal-light` erzeugt. → Durch das Markenzeichen ersetzen. |
| 8a | **Logo in Negativfassung fehlt** | Die Wort-Bild-Marke liegt nur als blaue Fassung auf transparentem Grund vor (`logo2x.png`, 314 × 86). Im dunklen Footer steht sie deshalb auf einer weißen Platte. `logo-sticky.png` aus dem Bestandstheme ist ein grauer Platzhalter („Logo") und wird nicht verwendet. → Weiße oder einfarbige Negativfassung als SVG liefern. |
| 8b | **Logo nur als PNG** | Der Masterprompt sieht ein SVG-Logo vor; im Bestand existiert keines. Das PNG wird in 314 × 86 ausgeliefert und auf 196 × 54 skaliert, ist auf hochauflösenden Displays also knapp. → SVG nachliefern. |

## 4. Technische Anbindungen

| # | Punkt | Detail |
|---|---|---|
| 9 | **Kontaktformular-Endpunkt** | **Zwischenlösung seit 19.10.2026:** Das Formular sendet per `mailto:` an info@merkle-muenchen.de — es öffnet also das E-Mail-Programm des Absenders. Das funktioniert ohne Server, hat aber zwei Nachteile: ohne eingerichtetes Mail-Programm passiert nichts, und die Felder landen als reiner Text in der Mail. → Für einen echten Versand braucht es einen Endpunkt (Formulardienst oder PHP-Skript beim Hoster); dann wird nur das `action`-Attribut getauscht. |
| 10 | ~~Google-Place-IDs~~ | **Erledigt am 19.10.2026.** Vom Betreiber geliefert: München `ChIJX68Zh8HXnUcRppq3vUDfgVs`, Landshut `ChIJs-ca55klnkcRKQCtSPjgqwc`, Rosenheim `ChIJW2FmBf4adkcRXsupqn_-Mns`. `/bewertung/` führt damit direkt in das Bewertungsformular des jeweiligen Standorts. |
| 11 | ~~Geo-Koordinaten Landshut und Rosenheim~~ | **Erledigt am 16.10.2026.** Über OpenStreetMap zur jeweiligen Adresse ermittelt: Landshut 48.557185 / 12.157278 (der Betrieb ist dort namentlich verzeichnet), Rosenheim 47.880787 / 12.127332. München unverändert. |
| 12 | **Google Tag Manager (GTM-WVF4V8C)** | Wurde **nicht** übernommen. Vor dem Wiedereinbau Consent-Lösung festlegen — der Container darf erst nach Einwilligung laden. Der eingebaute Content-Blocker (OpenStreetMap-Karte) ist davon unabhängig und blockiert nur Drittinhalte, keinen Fließtext. |
| 13 | **Amazon-Store-URL** | Der Bestand verlinkt `https://amazon.de/merkle`. Ziel prüfen. |
| 14 | **Suche** | Client-seitig über einen zur Bauzeit erzeugten Index (`/assets/js/suche-index.json`). Für größere Inhaltsmengen später auf eine Serversuche umstellen. |

## 5. Inhaltliche Widersprüche im Bestand

| # | Punkt | Detail |
|---|---|---|
| 15 | **Landshut: Kumhausen oder Ergolding?** | Die Firmengeschichte nennt die Gründung 1985 „in Kumhausen bei Landshut", die Kontaktseite nennt „Meisenstraße 11a, 84030 Ergolding bei Landshut". Beides steht so im Bestand. Im Neubau ist die aktuelle Adresse (Ergolding) verwendet, der historische Satz unverändert. |
| 16 | **Gründungsjahr** | Zeitleiste: 1976 Beginn München (Bartholomäus Burghart), Fließtext: 1980 Gründung der GmbH. Beides übernommen, im Kennzahlenband als „1976 — Beginn in München, seit 1980 als eigene GmbH" aufgelöst. |
| 17 | **Firmierung in den Nutzungsbedingungen** | Der Text nennt durchgehend „MERKLE Schweißanlagen-Technik GmbH", nicht „Wilhelm Merkle Schweißtechnik GmbH". Wortlaut wurde **unverändert** übernommen (harte Vorgabe). → Juristisch prüfen. |
| 18 | **Bildnachweise im Impressum** | Es sind acht Fotolia-Bilder gelistet. Ein Teil davon ist im Neubau nicht mehr im Einsatz, dafür kommen die Aufnahmen von 2024/25 hinzu. → Nachweise aktualisieren. |
| 19 | **Öffnungszeiten** | Aus /service/ übernommen: München Mo–Fr 6:30–18:00, Sa 8:00–12:00; Landshut Mo–Fr 7:00–12:00 und 13:00–17:30; Rosenheim Mo–Do 7:00–12:00 und 13:00–17:30, Fr 7:00–12:00 und 13:00–15:00. → Vor Live-Gang bestätigen, sie stehen jetzt auch im `LocalBusiness`-Markup. |
| 20 | ~~/aktuelles/~~ | **Geklärt am 19.10.2026.** Die Seite bekommt bewusst keinen Redaktionsplan und keine Datumsangaben: Der Betreiber pflegt sie bei Bedarf per Prompt. Die Datumszeile ist deshalb aus dem Modul entfernt, der Hinweistext erklärt das. |

## 6. Bewusste Abweichungen vom Briefing

| Stelle | Vorgabe | Umsetzung | Grund |
|---|---|---|---|
| Shop-Band | „gefüllt Türkis, Text in Weiß" | Fläche in `--mk-teal-dark` statt `--mk-teal` | Weiß auf `--mk-teal` erreicht nur 3,5:1 und verfehlt AA. Auf `--mk-teal-dark` sind es 5,1:1. Das Briefing verlangt ausdrücklich die Kontrastprüfung. |
| Primärer Button | „gefüllt Türkis" | Füllung `--mk-teal-dark`, Hover `--mk-steel-900` | Gleicher Grund. Ein Hover nach `--mk-teal` würde den Kontrast unter AA drücken. |
| Startseite, Reihenfolge | Ansprechpartner weiß → Aktuelles weiß | Aktuelles auf `--mk-steel-050` | Zwei helle Blöcke in Folge widersprechen dem Grundsatz „Kein Block sieht aus wie der davor". |
| Signalfarbe `--mk-ember` | „markiert genau eine Sache pro Seite" | Nur als 2-px-Linie am Notdienst-Block, Text daneben in `--mk-steel-900` | `--mk-ember` erreicht auf Weiß nur 4,33:1 und taugt damit nicht für Fließtext. Als Linie erfüllt es die 3:1-Anforderung für Nicht-Text. |
| Bilder | „AVIF mit WebP-Fallback" | AVIF + WebP + JPEG/PNG-Fallback, je 1–6 Breiten | Zusätzlicher JPEG/PNG-Fallback für alte Clients; erzeugt mit `sharp` im Build. |

---

## 7. Offene Punkte aus der Ausbaustufe 2

Stand: 16.10.2026

| # | Punkt | Detail |
|---|---|---|
| 21 | ~~Gerätepreise im Finder~~ | **Erledigt.** Die Karten zeigen dauerhaft „Preis auf Anfrage“. → Sobald Preise vorliegen, ersetzen. |
| 22 | **Deep-Links in den Webshop** | Der Knopf „Details im Webshop“ führt auf die Startseite von merkle-shop.de, weil es für die einzelnen Serien keine bekannten Produkt-URLs gibt. → Je Gerät eine Shop-URL liefern. |
| 23 | **Google-Bewertungen** | Schnitt 4,8 und 78 Bewertungen wurden am 16.10.2026 vom Nutzer übergeben, 20 Rezensionen sind wörtlich übernommen. Gekürzte Rezensionen sind sichtbar als gekürzt markiert und verlinken zu Google. Eine Rezension wurde ausgelassen, weil sie inhaltlich eine Frage und keine Bewertung ist. → Der Schnitt ist ein Momentwert und veraltet; später entweder regelmäßig pflegen oder über die Google-Places-API live holen. Dafür wird die Place-ID aus Punkt 10 benötigt. |
| 24 | **Beraterkarte** | Siegfried Awissus ist im Bestand nur als „Unternehmer des Jahres 2013“ belegt, eine Funktionsbezeichnung ist nicht belegt. Deshalb steht neutral „Ihr Ansprechpartner“. Als Nummer ist die Zentrale hinterlegt, eine persönliche Durchwahl liegt nicht vor. Ein Portraitfoto fehlt, bis dahin steht ein neutrales Signet statt eines fremden Gesichts. → Funktion, Durchwahl und Foto liefern. |
| 25 | **Englische Fassung** | Übersetzt sind Startseite, Schweißgeräte, Service, Standort München, Über uns und Kontakt. Alle übrigen Seiten bleiben deutsch und sind aus der englischen Navigation mit sichtbarem Hinweis verlinkt. Rechtstexte bleiben verbindlich deutsch. → Entscheiden, ob der Rest übersetzt wird; die Rechtstexte bräuchten dafür eine juristisch geprüfte Übersetzung. |
| 26 | **Englisches Kontaktformular** | Hat dieselbe `mailto:`-Zwischenlösung wie das deutsche, siehe Punkt 9. |
| 27 | ~~Bayern-Karte~~ | **Erledigt.** Seit dem 16.10.2026 liegen die amtlichen Umrisse zugrunde (`_bestand/bundeslaender.geo.json`, orthografisch projiziert in `src/geo.js`); seit dem 19.10.2026 sind die Flächen als Halbton-Raster über SVG-Masken gefüllt und Bayern trägt den Farbverlauf der Hausfarben. Die Karte bleibt dekorativ und `aria-hidden`. |
| 28 | **Finder-Logik** | Die Zuordnung von Antworten zu Verfahren steht in `site/assets/js/finder.js` in einer einzigen, lesbaren Funktion. Sie bildet die Faustregeln der Verfahrensseiten ab. → Einmal von der Schweißtechnik gegenlesen lassen, besonders die Fälle Aluminium und wechselnde Werkstoffe. |

| 29 | **Notdienst entfernt** | Der Notdienst war im Bestand an sieben Stellen als Leistung ausgewiesen. Er wurde am 16.10.2026 auf Wunsch entfernt: Startseite, Service, Ladengeschäft, Standortseite, Kontaktband, FAQ auf /gas/ und die englische Fassung. An seine Stelle treten die Öffnungszeiten. → Falls der Notdienst weiter angeboten wird, muss er wieder aufgenommen werden; die Rechtstexte wurden nicht angefasst. |
| 30 | **Standortfotos** | Die Standortkarten zeigen jetzt die vorhandenen Aufnahmen von 2024: München das Gebäude, Landshut und Rosenheim jeweils das Team. Wenn es Gebäudeaufnahmen der beiden anderen Standorte gibt, passen die besser zur Reihe. |

---

## 8. Stand nach der Ausbaustufe 5

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 31 | **Logo in Negativfassung** (ersetzt 8a) | Über der dunklen Bühne steht die Marke jetzt ohne weiße Platte: Sie wird umgekehrt, entsättigt und im Screen-Modus gezeichnet, dadurch verschwindet der deckend weiße Grund der Datei. Das Ergebnis trägt, ist aber eine Notlösung — der Schriftzug „MERKLE“ erscheint als helle Fläche mit dunklen Buchstaben statt umgekehrt. → Eine echte Negativfassung als SVG löst das endgültig. |
| 32 | **Gasflaschen-Slider** | Zwölf Flaschen zum Durchswipen, ab 1024 px mindestens sechs nebeneinander, die mittlere größer mit Bezeichnung und Text. Welche in der Mitte steht, rechnet die JS beim Scrollen. Die Produktbilder liegen nur in 230 × 145 px und auf deckend weißem Grund vor; das Band steht deshalb auf Weiß. → Mit freigestellten Herstellerbildern ließe sich das Band auf jede Fläche setzen. |
| 33 | **Karte bewegt sich beim Überfahren** | Gezogen wird nicht mehr. Die Karte folgt dem Zeiger ein kleines Stück (maximal 4,5 Grad seitlich, 14 px Versatz) und geht beim Verlassen zurück. Nur auf Geräten mit echtem Zeiger, nur Transform, bei reduzierter Bewegung aus. |
| 34 | **Bewertungsleiste bleibt stehen** | Der Schließer ist entfernt; die Leiste begleitet die ganze Sitzung. Unter 768 px schrumpft sie auf einen runden Punkt mit Google-G, Wert und einem Stern. |
| 35 | **Icons nur noch im Untermenü** | Die Hauptnavigation trägt reine Wortmarken, Mega-Menü und mobile Navigation behalten ihre Vektor-Icons. |

---

## 9. Stand nach der Ausbaustufe 6

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 36 | **Zuordnung der Portraits prüfen** | Die acht gelieferten Portraits wurden ohne Namensangabe übergeben. Zugeordnet wurde nach Augenschein: `portrait-siegfried-awissus.jpg` (Zentrale), `portrait-thomas-wagner.jpg` (Vertrieb), `portrait-bef-dagim.jpg` (Gase), `portrait-benjamin-awissus.jpg` (Reparaturen), `portrait-vanessa-mendes.jpg` (Schweißkurse), `portrait-manuel-maier.jpg` und `portrait-eric-dietrich.webp` (Webshop). → **Muss gegengelesen werden.** Ein achtes Bild blieb ungenutzt. |
| 37 | **Kontaktkarte mit Themenschaltern** | Die Sprechblase ist entfallen. Statt dessen: eine halb so große Zeile „Wir sind für dich verfügbar“, darunter sechs Schalter (Zentrale, Vertrieb, Gase, Reparatur, Schweißkurse, Webshop), die die Ansprechperson samt Durchwahl austauschen. Ohne JavaScript bleibt die Zentrale sichtbar. Die Karte ist rundum abgerundet (26 px). |
| 38 | **Durchwahlen** | Neu aufgenommen: Reparaturen −20, Schweißkurse −28, Webshop −12 und −31. Die älteren `tel:`-Einträge in `src/data.js` tragen eine Ziffer zu viel (`tel:+4989897717016` statt `tel:+498989771716`); die neuen Einträge sind korrekt. → Die alten sollten bei Gelegenheit nachgezogen werden. |
| 39 | **Nachbarländer auf der Karte** | Österreich, Schweiz, Tschechien, Polen, Frankreich, Belgien, Niederlande, Luxemburg, Dänemark, Italien, Slowenien und die Slowakei sind als Haarlinie angedeutet. Die Umrisse in `src/geo.js` (`NACHBARN`) sind grob abgefahren und bewusst stützpunktarm — eine amtliche Grenzdarstellung sind sie nicht. Für Deutschland gelten weiterhin die amtlichen Umrisse. |
| 40 | **Gasflaschen-Slider verschoben** | Das Band steht jetzt unter der Tabelle „Diese Flaschen tauschen wir leer gegen voll“ (`#flaschengroessen`) statt vor dem Tauschsystem. |

---

## 10. Stand nach der Ausbaustufe 7

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 41 | **Portraits zugeordnet** (löst 36 ab) | Vom Betreiber bestätigt: Zentrale Siegfried Awissus und Jan Krafft, Vertrieb Thomas Wagner, Gase Bef Dagim, Reparatur Benjamin Awissus, Schweißkurse Vanessa Mendes, Webshop Manuel Maier und Eric Dietrich. |
| 42 | **Kontaktkarte: Schließer und Blätterpfeile** | Das Kreuz verkleinert die Karte wieder auf die Miniatur. Themen mit mehreren Ansprechpersonen (Zentrale, Webshop) tragen ein Pfeilpaar mit Zähler; Name, Rolle und Durchwahl wechseln mit, die E-Mail bleibt info@. |
| 43 | **Durchwahlen bereinigt** | Werkstatt −18, Einkauf −19, Buchhaltung −21 und Mahnwesen −22 sind von der Seite genommen. −20 heißt jetzt Reparatur statt Schweißtechnik, Schweißkurse laufen über −28 statt −11. Die Abschnitte Werkstatt und Buchhaltung verweisen jetzt auf die Zentrale −0, damit dort ein erreichbarer Anschluss steht. Sämtliche `tel:`-Ziele sind auf die korrekte Form gebracht (Punkt 38 erledigt). |
| 44 | **Nachbarländer aus echten Geodaten** (löst 39 ab) | Grundlage ist jetzt Natural Earth 110 m (gemeinfrei), eingedampft auf die zwölf Nachbarn im sichtbaren Ausschnitt: `_bestand/nachbarlaender.geo.json`, rund 8 KB, wird nur beim Bauen gelesen. Die handgesetzten Umrisse sind entfallen. |
| 45 | **Karte bewegt sich schwächer** | Die Zeigerbewegung ist auf etwa ein Drittel zurückgenommen: höchstens 1,5 Grad seitlich, 1 Grad in der Neigung, 4,5 px Versatz. |
| 46 | **Schaltfläche „Speichere uns direkt in Google"** | Steht über der Bewertungsleiste, in denselben Maßen, Ziel `https://google.com/preferences/source?q=merkle-shop.de` in einem neuen Tab. Mobil schrumpft sie wie die Bewertung auf einen runden Punkt. → Das Ziel ist eine Google-Einstellungsseite; ob sie in jedem Konto so greift, ist nicht geprüft. |
| 47 | **Kundenlogos** | Neun Logos im freien Weiß unter dem Kennzahlenband, Überschrift „Langjährige Kundenbeziehungen". Kein Karussell, feste Reihen, alle entsättigt und auf gleiche Höhe gebracht; beim Überfahren kommt die Farbe zurück. BayWa und Hochland liegen auf deckender Fläche und stehen deshalb etwas kleiner. → Die Logos stammen aus den gelieferten Dateien; eine Freigabe der jeweiligen Markeninhaber liegt uns nicht vor. |

---

## 11. Stand nach der Ausbaustufe 8

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 48 | **Kontaktkarte startet eingeklappt** | Im Standard erscheint nur die Miniatur — mit dem Portrait der ersten Ansprechperson der Zentrale, den Öffnungszeiten des Tages und dem grünen Punkt. Erst ein Klick öffnet die volle Karte, das Kreuz klappt sie wieder ein. Die Karte erscheint weiterhin nur innerhalb der Öffnungszeiten des Ladens in München. |
| 49 | **Gelbe Schaltfläche angeglichen** | Beschriftung jetzt „Webseite speichern". Sie liegt in Breite und Höhe exakt auf der Bewertungspille darunter (178 × 33 zu 178 × 31 px bei 1440 px) und schwebt darüber. |
| 50 | **Karte: feineres Raster, größere Ereignisse** | Die Punkte sind halbiert (0,11 und 0,18 statt 0,22 und 0,36), die Abstände blieben unverändert — das Muster tritt zurück. Nadeln, Sprechzeilen und Fahrzeuge sind um die Hälfte größer. |
| 51 | **Fünf Kundenlogos fehlen noch** | SWM, Bundeswehr, TUM, Schandl und SD Hirsch sind in der gewünschten Reihenfolge vorgesehen, die Dateien haben uns aber nicht erreicht. Die Lücken stehen als Kommentar in `src/data.js` an der richtigen Stelle. |

---

## 12. Stand nach der Ausbaustufe 9

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 52 | **Vierzehn Kundenlogos** (löst 51 ab) | Reihenfolge nach Vorgabe: Maurer, Siemens, SWM, Bundeswehr, TUM, MTU, Landeshauptstadt München, BayWa, Eaton, dann Convotherm, Lausser, Hochland, Schandl, SD Hirsch. Das Feld bricht um und zentriert die letzte Reihe. Bundeswehr steht hochformatig und deshalb etwas kleiner, BayWa und Hochland liegen auf deckender Fläche. → Freigaben der Markeninhaber liegen uns weiterhin nicht vor. |
| 53 | **Mehr Ruhe auf der Bühne** | Die Bühne ist um 180 px gewachsen: rund 260 px zwischen Kopfzeile und Kicker, rund 100 px zwischen den Schaltflächen und dem Kennzahlenband. Am Handy nur die Hälfte, sonst rutscht die Überschrift aus dem Bild. |
| 54 | **Film hinter der Bühne — liegt, lädt aber nicht** | Markup, CSS und Steuerung stehen (`[data-herovideo]`, `site/assets/js/merkle.js`). Der Film startet stumm, läuft in Schleife und spielt nur die ersten 12 Sekunden, damit der Browser über Bereichsanfragen nicht die ganze Datei zieht. Er kommt nur bei mindestens 1024 px, ohne Sparmodus, ohne langsame Leitung und ohne reduzierte Bewegung; schlägt etwas fehl, entfernt sich das Element und das Standbild bleibt. **Zwei Hindernisse:** das Zertifikat von `verwaltung.merkle-allinclusive.de` ist am 30.04.2026 abgelaufen, jeder Browser blockt die Datei (`ERR_CERT_DATE_INVALID`); und die Datei ist 112 MB groß, als Hintergrundfilm unbrauchbar. → Zertifikat erneuern und den Film auf rund 1280 px, 10–15 Sekunden und wenige MB bringen, dann greift alles von selbst. |

---

## 13. Stand nach der Ausbaustufe 10

Stand: 19.10.2026

| # | Punkt | Detail |
|---|---|---|
| 55 | **Logohöhen je Marke** | Grundhöhe 52 px, die Breite richtet sich selbst danach. SWM und TUM stehen bei 32 px, Bundeswehr bei 62, BayWa und Hochland bei 64. **Landeshauptstadt München bleibt bei 31 px** — die Wortmarke ist so breit, dass die Spalte die Höhe begrenzt, bevor die Vorgabe greift. Höher ginge nur mit einer doppelt breiten Zelle, die das Raster aufbricht. Alle Kacheln stehen auf Weiß. |
| 56 | **Karte: helle Sprechzeilen** | Statt der dunklen Platte ein Verlauf von Türkiswasser nach Weiß mit Haarlinie, dunkler Schrift und Icons in den Hausfarben. Die Breite rechnet jetzt ohne Kappe (3,6 + 0,68 je Zeichen), der längste Text steht mit 35 px Luft im Kasten. |
| 57 | **Fahrzeug als Linienzeichnung** | Das selbstgebaute Fahrzeug ist durch das Linien-Icon aus der Icon-Sammlung ersetzt, im selben Strichstil wie der Rest. |
| 58 | **Startseite: Gase statt Werkstatt** | Die dritte Karte unter den vier Durchwahlen führt jetzt das Gasgeschäft mit Durchwahl −17 und info@merkle-muenchen.de. Buchhaltung steht wieder auf −21. |
| 59 | **Bewertung in Gold** | Der Wert steht in einem Goldverlauf (#8A6508 → #E8B84B) über `background-clip`. Der Vorlesetext daneben bleibt unverändert, die Zahl ist also auch ohne Farbe zugänglich. |
| 60 | **Fußzeile: Auszeichnungen** | Schmale Leiste über den Rechtstexten mit fünf gestrichelten Platzhaltern „Logo folgt". → Sobald die echten Label-Logos vorliegen, treten sie an ihre Stelle. |
| 61 | **Footer-Logo ohne weiße Platte** | Dieselbe Umkehrung wie in der Kopfzeile. Die Einschränkung aus Punkt 31 gilt weiter: eine echte Negativfassung als SVG löst das endgültig. |
| 62 | **Über uns: Film und drei Jahreszahlen** | Die Luftaufnahme bekommt denselben Film wie die Startseite, hier durchlaufend statt im Zwölf-Sekunden-Fenster. 2018, 2024 und 2026 sind in der Zeitleiste ergänzt, die Überschrift nennt jetzt acht Jahreszahlen. Der Film lädt weiterhin nicht, solange das Zertifikat der Quelle abgelaufen ist (Punkt 54). |
