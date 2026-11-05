// Generates art-directed SVG placeholder images into src/assets/images.
// They are licence-free and local, so nothing breaks if a CDN disappears.
// Replace any file with a real .jpg/.webp and update the import in src/content or src/config.
//
//   npm run placeholders
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'images');
mkdirSync(out, { recursive: true });

// Seeded RNG so builds are reproducible
function rng(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const grain = (id) => `
  <filter id="g${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .07 0"/>
  </filter>`;

const label = (w, h, fg) =>
  `<text x="${w - 28}" y="${h - 26}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="${Math.round(w / 90)}" fill="${fg}" fill-opacity=".45">Placeholder image</text>`;

function wrap(w, h, id, bg, body, fg = '#000') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice">
<defs>${grain(id)}
  <radialGradient id="l${id}" cx="35%" cy="25%" r="85%"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>
</defs>
<rect width="100%" height="100%" fill="${bg}"/>
${body}
<rect width="100%" height="100%" fill="url(#l${id})"/>
<rect width="100%" height="100%" filter="url(#g${id})"/>
${label(w, h, fg)}
</svg>`;
}

// A product sitting on a coloured set: backdrop, floor, object, soft shadow.
function still(name, { w = 1600, h = 1067, bg, floor, obj, obj2, shape = 'pill' }) {
  const r = rng(name);
  const fy = h * (0.62 + r() * 0.08);
  const cx = w * (0.42 + r() * 0.16);
  let o = '';
  if (shape === 'pill') {
    const ow = w * 0.16, oh = h * 0.42;
    o = `<rect x="${cx - ow / 2}" y="${fy - oh + 10}" width="${ow}" height="${oh}" rx="${ow / 2}" fill="${obj}"/>
         <rect x="${cx + ow * 0.35}" y="${fy - oh * 0.55 + 10}" width="${ow * 0.8}" height="${oh * 0.55}" rx="${ow * 0.4}" fill="${obj2}"/>`;
  } else if (shape === 'sphere') {
    const rr = h * 0.2;
    o = `<circle cx="${cx}" cy="${fy - rr + 8}" r="${rr}" fill="${obj}"/>
         <circle cx="${cx + rr * 1.35}" cy="${fy - rr * 0.45 + 8}" r="${rr * 0.45}" fill="${obj2}"/>`;
  } else if (shape === 'bag') {
    const bw = w * 0.2, bh = h * 0.36;
    o = `<path d="M${cx - bw * 0.22} ${fy - bh} q0 -${bh * 0.35} ${bw * 0.22} -${bh * 0.35} q${bw * 0.22} 0 ${bw * 0.22} ${bh * 0.35}" fill="none" stroke="${obj2}" stroke-width="${w * 0.008}"/>
         <path d="M${cx - bw / 2} ${fy - bh} h${bw} l${bw * 0.06} ${bh} h-${bw * 1.12} z" fill="${obj}"/>`;
  } else if (shape === 'stack') {
    let y = fy;
    const cols = [obj, obj2, obj];
    for (let i = 0; i < 3; i++) {
      const bw = w * (0.24 - i * 0.04), bh = h * 0.1;
      y -= bh;
      o += `<rect x="${cx - bw / 2 + i * 14}" y="${y}" width="${bw}" height="${bh}" rx="6" fill="${cols[i]}"/>`;
    }
  }
  const shadow = `<ellipse cx="${cx + w * 0.03}" cy="${fy + 12}" rx="${w * 0.17}" ry="${h * 0.025}" fill="#000" fill-opacity=".22"/>`;
  return wrap(w, h, name, bg, `<rect y="${fy}" width="${w}" height="${h - fy}" fill="${floor}"/>${shadow}${o}`);
}

// A device on a coloured set with a simple UI inside.
function device(name, { w = 1600, h = 1067, bg, screen, ui, kind = 'laptop' }) {
  let body = '';
  if (kind === 'laptop') {
    const sw = w * 0.56, sh = sw * 0.62, sx = (w - sw) / 2, sy = h * 0.16;
    body = `<rect x="${sx - 14}" y="${sy - 14}" width="${sw + 28}" height="${sh + 28}" rx="22" fill="#1b1b1b"/>
      <rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="6" fill="${screen}"/>
      <rect x="${sx + sw * 0.07}" y="${sy + sh * 0.14}" width="${sw * 0.5}" height="${sh * 0.11}" rx="4" fill="${ui}"/>
      <rect x="${sx + sw * 0.07}" y="${sy + sh * 0.3}" width="${sw * 0.32}" height="${sh * 0.05}" rx="3" fill="${ui}" fill-opacity=".5"/>
      <rect x="${sx + sw * 0.07}" y="${sy + sh * 0.46}" width="${sw * 0.86}" height="${sh * 0.42}" rx="8" fill="${ui}" fill-opacity=".22"/>
      <path d="M${sx - w * 0.07} ${sy + sh + 14} h${sw + w * 0.14} l-${w * 0.02} ${h * 0.035} h-${sw + w * 0.1} z" fill="#d6d6d6"/>`;
  } else {
    const pw = w * 0.2, ph = pw * 2.05, px = (w - pw) / 2 - w * 0.1, py = (h - ph) / 2;
    const px2 = px + pw * 1.25;
    const phone = (x, y, a) => `<g transform="rotate(${a} ${x + pw / 2} ${y + ph / 2})">
      <rect x="${x}" y="${y}" width="${pw}" height="${ph}" rx="${pw * 0.16}" fill="#151515"/>
      <rect x="${x + 10}" y="${y + 10}" width="${pw - 20}" height="${ph - 20}" rx="${pw * 0.13}" fill="${screen}"/>
      <rect x="${x + pw * 0.14}" y="${y + ph * 0.12}" width="${pw * 0.6}" height="${ph * 0.05}" rx="4" fill="${ui}"/>
      <rect x="${x + pw * 0.14}" y="${y + ph * 0.24}" width="${pw * 0.72}" height="${ph * 0.3}" rx="12" fill="${ui}" fill-opacity=".3"/>
      <rect x="${x + pw * 0.14}" y="${y + ph * 0.6}" width="${pw * 0.72}" height="${ph * 0.08}" rx="10" fill="${ui}" fill-opacity=".6"/>
      <rect x="${x + pw * 0.14}" y="${y + ph * 0.72}" width="${pw * 0.72}" height="${ph * 0.08}" rx="10" fill="${ui}" fill-opacity=".35"/></g>`;
    body = phone(px, py, -6) + phone(px2, py + h * 0.04, 5);
  }
  return wrap(w, h, name, bg, body);
}

// An abstract figure (stand-in for portraits and team photos).
function figure(name, { w = 1200, h = 1500, bg, coat, skin, accent }) {
  const cx = w / 2;
  const body = `<circle cx="${w * 0.78}" cy="${h * 0.2}" r="${w * 0.16}" fill="${accent}" fill-opacity=".55"/>
    <path d="M${cx - w * 0.36} ${h} C${cx - w * 0.34} ${h * 0.62} ${cx - w * 0.2} ${h * 0.55} ${cx} ${h * 0.55} C${cx + w * 0.2} ${h * 0.55} ${cx + w * 0.34} ${h * 0.62} ${cx + w * 0.36} ${h} z" fill="${coat}"/>
    <rect x="${cx - w * 0.06}" y="${h * 0.44}" width="${w * 0.12}" height="${h * 0.14}" rx="${w * 0.05}" fill="${skin}"/>
    <ellipse cx="${cx}" cy="${h * 0.36}" rx="${w * 0.13}" ry="${h * 0.12}" fill="${skin}"/>`;
  return wrap(w, h, name, bg, body);
}

// Shapes on a grid (for brand-system / pattern imagery).
function pattern(name, { w = 1600, h = 1067, bg, cols }) {
  const r = rng(name);
  const n = 6, m = 4, cw = w / n, ch = h / m;
  let b = '';
  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++) {
      const c = cols[Math.floor(r() * cols.length)];
      const x = i * cw, y = j * ch, k = r();
      if (k < 0.33) b += `<circle cx="${x + cw / 2}" cy="${y + ch / 2}" r="${Math.min(cw, ch) * 0.42}" fill="${c}"/>`;
      else if (k < 0.66) b += `<path d="M${x} ${y + ch} A${cw} ${ch} 0 0 1 ${x + cw} ${y}" fill="none" stroke="${c}" stroke-width="${cw * 0.18}"/>`;
      else b += `<rect x="${x + cw * 0.1}" y="${y + ch * 0.1}" width="${cw * 0.8}" height="${ch * 0.8}" rx="${cw * 0.4}" fill="${c}"/>`;
    }
  return wrap(w, h, name, bg, b);
}

const files = {
  // Hero strip
  'hero-1.svg': figure('hero-1', { bg: '#c9d3e6', coat: '#8a8f99', skin: '#e3c3a6', accent: '#ffffff' }),
  'hero-2.svg': still('hero-2', { bg: '#efe2cf', floor: '#d8c6ad', obj: '#fbfaf6', obj2: '#e46a3c', shape: 'stack' }),
  'hero-3.svg': device('hero-3', { bg: '#202a5c', screen: '#f2efe8', ui: '#2f4bff', kind: 'laptop' }),
  'hero-4.svg': still('hero-4', { bg: '#ff8a5b', floor: '#e56f42', obj: '#2b2b2b', obj2: '#f6d34a', shape: 'sphere' }),
  'hero-5.svg': figure('hero-5', { bg: '#1f6f5c', coat: '#f0e7d8', skin: '#b98a68', accent: '#d7ff6b' }),
  'hero-6.svg': device('hero-6', { bg: '#f3c9d8', screen: '#ffffff', ui: '#7a2a52', kind: 'phone' }),
  'hero-7.svg': still('hero-7', { bg: '#a9d18e', floor: '#7fb563', obj: '#f6f1e6', obj2: '#355e2a', shape: 'bag' }),
  'hero-8.svg': pattern('hero-8', { bg: '#efe9de', cols: ['#2f4bff', '#ff8a5b', '#1f6f5c', '#f6d34a'] }),
  // Studio / about
  'studio-duo.svg': still('studio-duo', { w: 1800, h: 1100, bg: '#d9cfc1', floor: '#c4b7a4', obj: '#2f4bff', obj2: '#e46a3c', shape: 'pill' }),
  'about-1.svg': still('about-1', { bg: '#3550d8', floor: '#2a40b0', obj: '#5b74ff', obj2: '#9fb0ff', shape: 'stack' }),
  'about-2.svg': device('about-2', { bg: '#2c2a27', screen: '#e9e3d8', ui: '#ff8a5b', kind: 'laptop' }),
  'about-3.svg': figure('about-3', { bg: '#2a49d6', coat: '#111111', skin: '#c79a7a', accent: '#8fd3ff' }),
  'about-4.svg': still('about-4', { bg: '#e8dccb', floor: '#c8b59a', obj: '#3b3a37', obj2: '#c96c4a', shape: 'pill' }),
  'step-1.svg': pattern('step-1', { bg: '#1d1c1a', cols: ['#4a4741', '#6d675e', '#2f4bff'] }),
  'step-2.svg': device('step-2', { bg: '#d9e4f2', screen: '#ffffff', ui: '#1d1c1a', kind: 'phone' }),
  'step-3.svg': still('step-3', { bg: '#9ac7ff', floor: '#6fa9f0', obj: '#ffffff', obj2: '#2f4bff', shape: 'sphere' }),
  'value-1.svg': still('value-1', { w: 1200, h: 1500, bg: '#f2d9c4', floor: '#e1bfa2', obj: '#ffffff', obj2: '#e46a3c', shape: 'sphere' }),
  'value-2.svg': still('value-2', { w: 1200, h: 1500, bg: '#a9d18e', floor: '#7fb563', obj: '#f6f1e6', obj2: '#355e2a', shape: 'bag' }),
  'value-3.svg': pattern('value-3', { w: 1200, h: 1500, bg: '#e9e4da', cols: ['#e46a3c', '#2f4bff', '#f6d34a', '#1f6f5c'] }),
  'team-1.svg': figure('team-1', { bg: '#d8d2c8', coat: '#1a1a1a', skin: '#d2a582', accent: '#ffffff' }),
  'team-2.svg': figure('team-2', { bg: '#e1dbd1', coat: '#f7f5f1', skin: '#e2bfa0', accent: '#2f4bff' }),
  'team-3.svg': figure('team-3', { bg: '#d4cbbf', coat: '#7b5a44', skin: '#b88866', accent: '#f6d34a' }),
  'team-4.svg': figure('team-4', { bg: '#dcd5ca', coat: '#2f4bff', skin: '#8f6448', accent: '#ff8a5b' }),
  // Services
  'service-branding.svg': still('service-branding', { bg: '#f6d34a', floor: '#e6bf2e', obj: '#1d1c1a', obj2: '#ffffff', shape: 'stack' }),
  'service-websites.svg': device('service-websites', { bg: '#b9c7ff', screen: '#ffffff', ui: '#1d1c1a', kind: 'laptop' }),
  'service-apps.svg': device('service-apps', { bg: '#1f6f5c', screen: '#f0e7d8', ui: '#d7ff6b', kind: 'phone' }),
  // Projects
  'hisesne-cover.svg': pattern('hisesne-cover', { bg: '#14131f', cols: ['#ff5e3a', '#ffb547', '#7c5cff', '#2bd1c4'] }),
  'hisesne-1.svg': device('hisesne-1', { bg: '#2a2140', screen: '#14131f', ui: '#ffb547', kind: 'laptop' }),
  'hisesne-2.svg': still('hisesne-2', { bg: '#7c5cff', floor: '#5d40e0', obj: '#ffb547', obj2: '#ff5e3a', shape: 'sphere' }),
  'limelines-cover.svg': still('limelines-cover', { bg: '#d7ff6b', floor: '#b8e04a', obj: '#1d1c1a', obj2: '#f4f1ea', shape: 'pill' }),
  'limelines-1.svg': pattern('limelines-1', { bg: '#f4f1ea', cols: ['#9bd21e', '#1d1c1a', '#f6d34a'] }),
  'limelines-2.svg': device('limelines-2', { bg: '#1f6f5c', screen: '#f4f1ea', ui: '#d7ff6b', kind: 'laptop' }),
  'gigthree-cover.svg': device('gigthree-cover', { bg: '#2f4bff', screen: '#ffffff', ui: '#1d1c1a', kind: 'phone' }),
  'gigthree-1.svg': pattern('gigthree-1', { bg: '#e8ecff', cols: ['#2f4bff', '#1d1c1a', '#ff8a5b'] }),
  'gigthree-2.svg': still('gigthree-2', { bg: '#ff8a5b', floor: '#e56f42', obj: '#2f4bff', obj2: '#ffffff', shape: 'stack' }),
  // Blog
  'post-1.svg': still('post-1', { bg: '#7fb563', floor: '#5f9a43', obj: '#f6d34a', obj2: '#ffffff', shape: 'sphere' }),
  'post-2.svg': device('post-2', { bg: '#efe2cf', screen: '#ffffff', ui: '#2f4bff', kind: 'laptop' }),
  'post-3.svg': pattern('post-3', { bg: '#1d1c1a', cols: ['#ff8a5b', '#f6d34a', '#efe9de'] }),
  // Call-to-action background
  // Dihzahyenrs (creative work outside product design)
  'creative-poster.svg': pattern('creative-poster', { w: 1200, h: 1600, bg: '#f6d34a', cols: ['#1d1c1a', '#ff5e3a', '#2f4bff'] }),
  'creative-photo.svg': still('creative-photo', { w: 1600, h: 1067, bg: '#cfc6b8', floor: '#b3a896', obj: '#3b3a38', obj2: '#e9e2d6', shape: 'sphere' }),
  'creative-type.svg': pattern('creative-type', { w: 1200, h: 1200, bg: '#1d1c1a', cols: ['#f4f1ea', '#ff8a5b', '#7c5cff'] }),
  'creative-motion.svg': still('creative-motion', { w: 1600, h: 900, bg: '#7c5cff', floor: '#5d40e0', obj: '#2bd1c4', obj2: '#f6d34a', shape: 'stack' }),
  'creative-sketch.svg': figure('creative-sketch', { w: 1200, h: 1500, bg: '#e8e2d6', coat: '#3b3a38', skin: '#d9b9a0', accent: '#ff5e3a' }),
  'creative-objects.svg': still('creative-objects', { w: 1200, h: 1200, bg: '#2bd1c4', floor: '#1fb3a7', obj: '#ff5e3a', obj2: '#f4f1ea', shape: 'pill' }),
  'cta-bg.svg': pattern('cta-bg', { bg: '#2f4bff', cols: ['#ff8a5b', '#f6d34a', '#7c5cff', '#2bd1c4', '#1d1c1a'] }),
};

for (const [file, svg] of Object.entries(files)) writeFileSync(join(out, file), svg);
console.log(`Wrote ${Object.keys(files).length} placeholder images to src/assets/images`);
