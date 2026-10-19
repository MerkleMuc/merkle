'use strict';
/* Geografie für die Karte.
   Grundlage sind die amtlichen Umrisse der Bundesländer aus
   _bestand/bundeslaender.geo.json (deutschlandGeoJSON, mittlere Auflösung).
   Projiziert wird orthografisch — also so, wie man einen Globus von außen
   sieht. Daher die leichte Wölbung der Ränder. */

const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', '_bestand', 'bundeslaender.geo.json');

/* Mittelpunkt der Projektion und Kugelradius in SVG-Einheiten.
   Der Radius bestimmt, wie stark die Wölbung ausfällt. */
const LON0 = 10.45, LAT0 = 51.0, R = 1090;
const CX = 80, CY = 62;

const rad = d => d * Math.PI / 180;

/* Orthografische Projektion auf die Kugel. */
function project(lon, lat) {
  const dl = rad(lon - LON0), p = rad(lat), p0 = rad(LAT0);
  const x = R * Math.cos(p) * Math.sin(dl);
  const y = -R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(dl));
  return [CX + x, CY + y];
}

/* Punkte, die enger als tol beieinander liegen, fallen weg. Das halbiert
   die Pfadlänge, ohne dass man am Bildschirm einen Unterschied sieht. */
function simplify(points, tol) {
  const out = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const a = out[out.length - 1], b = points[i];
    if (Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) >= tol) out.push(b);
  }
  out.push(points[points.length - 1]);
  return out;
}

function ringToPath(ring, tol) {
  const pts = simplify(ring.map(c => project(c[0], c[1])), tol);
  if (pts.length < 3) return '';
  return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
}

/* Ein Bundesland kann aus mehreren Flächen bestehen (Inseln, Exklaven). */
function featurePath(feature, tol) {
  const g = feature.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  let d = '';
  polys.forEach(poly => poly.forEach((ring, i) => {
    /* Nur Außenringe und größere Löcher, winzige Ringe fallen weg. */
    if (ring.length < 8) return;
    d += ringToPath(ring, i === 0 ? tol : tol * 1.6);
  }));
  return d;
}

let cache = null;
function laender() {
  if (cache) return cache;
  const geo = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const out = {};
  geo.features.forEach(f => {
    const name = f.properties.name;
    out[name] = featurePath(f, name === 'Bayern' ? 0.22 : 1.15);
  });
  cache = out;
  return out;
}

/* Orte, an denen etwas passiert. Koordinaten gerundet aus offenen Quellen. */
const ORTE = {
  muenchen:    [11.576, 48.137],
  landshut:    [12.157278, 48.557185], /* Meisenstraße 11a, Ergolding */
  rosenheim:   [12.127332, 47.880787], /* Weidestraße 5A */
  nuernberg:   [11.078, 49.452],
  regensburg:  [12.101, 49.013],
  augsburg:    [10.898, 48.371],
  passau:      [13.431, 48.567],
  wuerzburg:   [9.932,  49.791],
  ingolstadt:  [11.426, 48.766],
  kempten:     [10.317, 47.726],
  bayreuth:    [11.578, 49.948],
  memmingen:   [10.181, 47.988],
  deggendorf:  [12.961, 48.836],
  straubing:   [12.574, 48.881],
  traunstein:  [12.643, 47.868],
  badtoelz:    [11.561, 47.761],
  dachau:      [11.434, 48.260],
  erding:      [11.907, 48.306],
  schweinfurt: [10.221, 50.044],
  garmisch:    [11.095, 47.492],
  rosenheimland:[12.35, 47.95],
  landsberg:   [10.874, 48.048],
  freising:    [11.748, 48.402],
  wasserburg:  [12.231, 48.059],
  neuulm:      [10.000, 48.393],
  amberg:      [11.862, 49.445],
  hof:         [11.916, 50.313],
  aschaffenburg:[9.146, 49.974],
  rosenheimsued:[12.10, 47.75]
};

function ortXY(key) {
  const o = ORTE[key];
  if (!o) throw new Error('Unbekannter Ort: ' + key);
  const p = project(o[0], o[1]);
  return { x: +p[0].toFixed(2), y: +p[1].toFixed(2) };
}

/* ------------------------------------------------- Nachbarländer -------- */
/* Nur angedeutet: grob abgefahrene Staatsgrenzen in Grad, bewusst wenige
   Stützpunkte. Sie werden mit derselben Projektion gezeichnet wie die
   Bundesländer und liegen als Haarlinie hinter allem anderen. Für eine
   dekorative Karte reicht das; eine amtliche Grenzdarstellung ist es nicht. */
const NACHBARN = {
  oesterreich: [[9.53,47.27],[10.45,47.55],[11.10,47.40],[12.20,47.70],[13.00,47.46],[13.05,48.26],[13.83,48.77],[14.70,48.59],[15.00,48.95],[16.00,48.75],[16.95,48.55],[17.16,48.00],[16.50,47.00],[16.10,46.87],[15.00,46.65],[14.50,46.42],[13.70,46.52],[12.40,46.68],[12.10,47.07],[11.00,46.77],[10.45,46.87],[10.10,46.85],[9.60,47.06]],
  schweiz:     [[8.60,47.80],[9.60,47.06],[9.48,46.84],[10.10,46.85],[10.45,46.87],[10.00,46.48],[9.00,45.82],[8.45,46.46],[7.85,45.92],[7.00,45.92],[6.80,46.13],[6.10,46.21],[6.02,46.45],[6.45,46.78],[7.00,47.33],[7.60,47.58]],
  tschechien:  [[12.10,50.30],[12.50,49.93],[13.40,49.10],[13.83,48.77],[14.70,48.59],[15.00,48.95],[16.00,48.75],[16.95,48.60],[17.90,48.86],[18.85,49.52],[18.40,49.90],[17.70,50.30],[16.60,50.20],[16.00,50.65],[15.00,51.00],[14.30,51.05],[14.00,50.90],[13.00,50.50]],
  polen:       [[14.30,51.05],[14.70,52.10],[14.12,52.88],[14.40,53.27],[14.27,53.74],[16.00,54.20],[18.30,54.80],[19.60,54.45],[22.80,54.37],[23.50,53.90],[23.20,52.30],[23.60,51.50],[24.10,50.85],[22.60,49.50],[21.00,49.40],[19.50,49.60],[18.85,49.52],[18.40,49.90],[17.70,50.30],[16.60,50.20],[16.00,50.65],[15.00,51.00]],
  frankreich:  [[8.23,48.97],[7.58,47.59],[7.00,47.33],[6.45,46.78],[6.02,46.45],[6.10,46.21],[6.80,46.13],[7.00,45.92],[7.00,44.25],[7.50,43.80],[6.00,43.10],[4.80,43.40],[3.00,43.00],[1.80,42.50],[-1.40,43.40],[-1.80,46.50],[-2.90,47.60],[-4.80,48.50],[-1.30,49.70],[1.60,50.90],[2.55,51.09],[3.00,50.50],[4.23,49.95],[5.00,49.50],[5.80,49.55],[6.37,49.47],[7.00,49.10],[7.60,49.05]],
  belgien:     [[2.55,51.09],[3.37,51.37],[4.23,51.35],[4.47,51.47],[5.08,51.47],[5.80,51.10],[6.00,50.75],[6.37,50.32],[5.80,49.55],[5.00,49.50],[4.23,49.95],[3.00,50.50]],
  luxemburg:   [[5.80,49.55],[6.37,49.47],[6.50,49.80],[6.13,50.13],[5.90,50.00]],
  niederlande: [[5.80,51.10],[6.00,51.85],[6.70,51.90],[7.05,52.24],[6.70,52.60],[7.20,53.25],[6.00,53.50],[5.00,53.30],[4.60,52.50],[4.05,51.85],[3.40,51.40],[4.23,51.35],[4.47,51.47],[5.08,51.47]],
  daenemark:   [[8.65,54.90],[8.50,55.50],[8.10,56.60],[9.00,57.10],[10.50,57.60],[10.90,57.10],[10.30,56.60],[10.60,56.20],[10.10,55.50],[12.00,55.30],[12.60,55.60],[12.10,54.90],[9.60,54.85]],
  italien:     [[6.80,46.13],[7.00,45.92],[8.45,46.46],[9.00,45.82],[10.00,46.48],[10.45,46.87],[11.00,46.77],[12.10,47.07],[12.40,46.68],[13.70,46.52],[13.60,45.90],[12.30,45.45],[10.50,45.10],[9.00,44.50],[8.00,44.20],[7.00,44.25]],
  slowenien:   [[13.70,46.52],[14.50,46.42],[15.00,46.65],[16.10,46.87],[16.50,46.50],[15.70,45.80],[15.30,45.45],[13.90,45.45],[13.60,45.90]],
  slowakei:    [[16.95,48.60],[17.90,48.86],[18.85,49.52],[19.50,49.60],[21.00,49.40],[22.60,49.50],[22.10,48.40],[20.50,48.50],[18.80,47.80],[17.16,48.00]]
};

/* Alle Nachbarn als ein einziger Pfad — ein Element statt zwölf. */
function nachbarn() {
  return Object.keys(NACHBARN).map(k => {
    const pts = NACHBARN[k].map(c => project(c[0], c[1]));
    return 'M' + pts.map(p => p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('L') + 'Z';
  }).join('');
}

module.exports = { project, laender, nachbarn, ORTE, ortXY, CX, CY, R };
