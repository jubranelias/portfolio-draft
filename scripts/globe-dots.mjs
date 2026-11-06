import { geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'fs';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/land-110m.json'));
const land = feature(topo, topo.objects.land);
const out = [];
const step = 1.6;
for (let lat = -58; lat <= 78; lat += step) {
  const n = Math.max(1, Math.round((360 * Math.cos((lat * Math.PI) / 180)) / step));
  for (let i = 0; i < n; i++) {
    const lon = -180 + (i * 360) / n;
    if (geoContains(land, [lon, lat])) out.push(+lon.toFixed(1), +lat.toFixed(1));
  }
}
fs.writeFileSync('src/content/globe-dots.json', JSON.stringify(out));
console.log(out.length / 2, 'dots', fs.statSync('src/content/globe-dots.json').size, 'bytes');
