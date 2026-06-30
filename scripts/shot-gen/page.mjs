// Full-page screenshot of ANY rendered page, for reviewing a post/page in chat or a PR.
// This is the reliable way to "show the running result": it drives Playwright's own
// Chromium directly, so it does not depend on any editor/IDE preview-screenshot
// integration (those have been unreliable on this machine, hanging on capture).
//
// Usage: npm run shot:page -- <route-or-url> <out-path> [width]
//   route-or-url  e.g. blog/my-post   OR   http://localhost:4321/blog/my-post
//   out-path      where to write the PNG, e.g. ../shot.png or an absolute path
//   width         viewport width in px (default 900)
// Requires the dev server running (npm run dev, port 4321) when passing a bare route.
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const [target, out, width = '900'] = process.argv.slice(2);
if (!target || !out) {
  console.error('Usage: node scripts/shot-gen/page.mjs <route-or-url> <out-path> [width]');
  process.exit(1);
}

const url = target.startsWith('http') ? target : `http://localhost:4321/${target.replace(/^\/+/, '')}`;
const outPath = resolve(out);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 1200 } });
await page.goto(url, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: 'astro-dev-toolbar{display:none!important}' });

const broken = await page.evaluate(() =>
  Array.from(document.images).filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src)
);
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved ${outPath}`);
if (broken.length) console.warn(`WARNING: ${broken.length} broken image(s): ${broken.join(', ')}`);
