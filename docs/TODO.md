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
