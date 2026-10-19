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

module.exports = { project, laender, ORTE, ortXY, CX, CY, R };
