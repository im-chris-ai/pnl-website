// Generate a blog cover image via Cloudflare Workers AI and save it cropped to 1200x630.
// Usage: node scripts/cover-gen/generate.mjs <slug> "<full prompt>"
// Reads CF_ACCOUNT_ID and CF_API_TOKEN from .env (gitignored). Free tier covers daily use.
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Minimal .env loader (no dependency).
function loadEnv() {
  const p = resolve(ROOT, '.env');
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}
loadEnv();

const [slug, prompt] = process.argv.slice(2);
const MODEL = process.env.CF_IMAGE_MODEL || '@cf/black-forest-labs/flux-2-klein-9b';
const { CF_ACCOUNT_ID, CF_API_TOKEN } = process.env;

if (!slug || !prompt) {
  console.error('Usage: node scripts/cover-gen/generate.mjs <slug> "<prompt>"');
  process.exit(1);
}
if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
  console.error('Missing CF_ACCOUNT_ID or CF_API_TOKEN. Set them in .env (see .env.example).');
  process.exit(1);
}

const url = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/${MODEL}`;
const res = await fetch(url, {
  method: 'POST',
  headers: { Authorization: `Bearer ${CF_API_TOKEN}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt }),
});

if (!res.ok) {
  console.error(`Cloudflare API error ${res.status}: ${await res.text()}`);
  process.exit(1);
}

// Response is either raw image bytes or JSON { result: { image: <base64> } }.
let raw;
if ((res.headers.get('content-type') || '').includes('application/json')) {
  const json = await res.json();
  const b64 = json?.result?.image || json?.image || (typeof json?.result === 'string' ? json.result : null);
  if (!b64) {
    console.error('No image in JSON response: ' + JSON.stringify(json).slice(0, 300));
    process.exit(1);
  }
  raw = Buffer.from(b64, 'base64');
} else {
  raw = Buffer.from(await res.arrayBuffer());
}

const outDir = resolve(ROOT, 'public', 'images', 'blog', slug);
mkdirSync(outDir, { recursive: true });
const outPath = resolve(outDir, 'cover.webp');
await sharp(raw).resize(1200, 630, { fit: 'cover' }).webp({ quality: 82 }).toFile(outPath);

console.log(`Saved ${outPath}`);
