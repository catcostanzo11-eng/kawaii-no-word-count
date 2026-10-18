// Generates the app icons (web app + Windows installer) from one SVG design.
// Run with: npm run icons
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const sparkle = (x, y, s) =>
  `<path transform="translate(${x} ${y}) scale(${s})" fill="#fff" d="M0-28C4-6 6-4 28 0 6 4 4 6 0 28-4 6-6 4-28 0-6-4-4-6 0-28Z"/>`;

// `maskable` icons get a full-bleed background and the artwork shrunk into the safe zone.
function iconSvg({ maskable = false } = {}) {
  const art = maskable ? 'translate(256 256) scale(0.78) translate(-256 -256)' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ff9cc8"/>
      <stop offset="1" stop-color="#b79dff"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${maskable ? 0 : 112}" fill="url(#bg)"/>
  <g transform="${art}">
    <g transform="translate(256 272) rotate(-4)">
      <rect x="-134" y="-156" width="268" height="306" rx="38" fill="#ffffff"/>
      <rect x="-94" y="-112" width="188" height="16" rx="8" fill="#ffd0e4"/>
      <rect x="-94" y="-74" width="136" height="16" rx="8" fill="#e3d8ff"/>
      <circle cx="-50" cy="12" r="17" fill="#5a3a4a"/>
      <circle cx="50" cy="12" r="17" fill="#5a3a4a"/>
      <circle cx="-44" cy="6" r="5" fill="#fff"/>
      <circle cx="56" cy="6" r="5" fill="#fff"/>
      <ellipse cx="-86" cy="50" rx="24" ry="14" fill="#ffb3d1"/>
      <ellipse cx="86" cy="50" rx="24" ry="14" fill="#ffb3d1"/>
      <path d="M-24 40Q0 66 24 40" fill="none" stroke="#5a3a4a" stroke-width="11" stroke-linecap="round"/>
    </g>
    ${sparkle(418, 104, 1.4)}
    ${sparkle(96, 412, 1)}
    ${sparkle(436, 420, 0.7)}
  </g>
</svg>`;
}

await mkdir('icons', { recursive: true });
await mkdir('build', { recursive: true });

const regular = Buffer.from(iconSvg());
const maskable = Buffer.from(iconSvg({ maskable: true }));

await writeFile('icons/icon.svg', regular);
await sharp(regular).resize(192, 192).png().toFile('icons/icon-192.png');
await sharp(regular).resize(512, 512).png().toFile('icons/icon-512.png');
await sharp(maskable).resize(512, 512).png().toFile('icons/icon-maskable-512.png');
await sharp(maskable).resize(180, 180).png().toFile('icons/apple-touch-icon.png');
await sharp(regular).resize(512, 512).png().toFile('build/icon.png');

console.log('Icons written to icons/ and build/');
