// Screenshot a dev-only mock route to a webp asset for the blog screenshot library.
// Usage: node scripts/shot-gen/capture.mjs <route> <out-name> [selector]
//   route     e.g. /mock/finance
//   out-name  e.g. finance-dashboard  (saved under public/images/blog/shared/click-to-censor/)
//   selector  element to clip to (default: .fin)
// Requires the dev server running on http://localhost:4321 (npm run dev).
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const [route, outName, selector = '.mock'] = process.argv.slice(2);

if (!route || !outName) {
  console.error('Usage: node scripts/shot-gen/capture.mjs <route> <out-name> [selector]');
  process.exit(1);
}

const BASE = 'http://localhost:4321';
const OUT_DIR = resolve(ROOT, 'public/images/blog/shared/click-to-censor');
const outPath = resolve(OUT_DIR, `${outName}.webp`);
mkdirSync(OUT_DIR, { recursive: true });

const url = `${BASE}/${route.replace(/^\/+/, '')}`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle' });
// Hide Astro's dev toolbar so it never lands in the capture.
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });

const el = page.locator(selector).first();
await el.waitFor({ state: 'visible' });
const png = await el.screenshot({ type: 'png' });

// Cap at 800px wide (article column is 720px); keeps files small.
await sharp(png).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 85 }).toFile(outPath);
await browser.close();

console.log(`Saved ${outPath}`);
