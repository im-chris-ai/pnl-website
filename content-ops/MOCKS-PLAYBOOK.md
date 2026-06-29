# Mocks Playbook

How to build a fake "scene" (dashboard, inbox, CRM, etc.), screenshot it, and use it in a
blog post. Goal: consistent, on-brand, repeatable across articles. Pairs with
`BLOG-PLAYBOOK.md` (post structure) and `screenshots.md` (the asset library).

## When to use a mock
- **Mock scene:** staged sensitive scenarios you can't safely screenshot for real (balances,
  customer PII, API keys). Full control, no real data, on-brand.
- **Real screenshot:** the extension working on a real site (Drive, Gmail). Use for "it
  actually works" credibility. Keep at least one real shot per post where it fits.
- **AI cover:** the one text-free hero image per post. See `BLOG-PLAYBOOK.md` + `cover-style.md`.

## Where things live
- Scene components: `src/components/mocks/<Scene>.astro` (e.g. `FinanceScene.astro`)
- Dev-only render route: `src/pages/mock/[scene].astro` (one dynamic route serves every scene)
- Capture script: `scripts/shot-gen/capture.mjs`  (run via `npm run shot`)
- Output assets: `public/images/blog/shared/click-to-censor/<name>.webp`

## Build a scene
1. Create `src/components/mocks/<Scene>.astro`. Wrap everything in one root element that
   carries the shared class `mock` (plus its own, e.g. `<div class="crm mock">`). The capture
   clips to `.mock` by default, so every scene works with no extra args.
2. **Design rules:**
   - Generic and unbranded. Evoke "a payments dashboard", never clone Stripe/Gmail/etc.
   - Use the site design tokens (`--color-*`, `--space-*`, fonts) so it matches the brand.
   - Realistic but fake data (fake names, emails, amounts).
3. **Register two states in the dynamic route** (`src/pages/mock/[scene].astro`). Accept a
   `censor` prop on the component, then add it to that route:
   - Import the component.
   - Add two entries to the `SCENES` map: a clean key and a censored key, e.g.
     `'crm': { Comp: CrmScene, censor: false }`, `'crm-censored': { Comp: CrmScene, censor: true }`.
   - Add those same keys to the array inside `getStaticPaths` (it can't read `SCENES`, see Gotchas).
   They then serve at `/mock/crm` and `/mock/crm-censored`. Don't use `?censor=1`: static builds
   ignore query params. Censor treatment mirrors the extension: blackout = solid box, blur = `filter: blur()`.
4. **Dev-only exclusion is automatic.** `getStaticPaths` returns `[]` when `import.meta.env.PROD`,
   so zero mock pages are emitted into the build, and the route carries `<meta name="robots" content="noindex">`.
   Do NOT use an `if (PROD) return new Response(404)` guard: it does NOT exclude a page from a
   static build (Astro still writes the file). See Gotchas.

## Capture
Dev server must be running (`npm run dev`, port 4321). Then:
```
npm run shot -- mock/<route> <out-name> [selector]
```
- `route`   path WITHOUT leading slash, e.g. `mock/finance` (see Gotchas)
- `out-name` saved as `public/images/blog/shared/click-to-censor/<out-name>.webp`
- `selector` element to clip to (default `.mock`)

The script: launches headless Chromium, hides the Astro dev toolbar, clips to the selector,
caps width at **800px**, writes webp. Example pair:
```
npm run shot -- mock/finance          finance-dashboard
npm run shot -- mock/finance-censored finance-dashboard-censored
```

## Log it
Add a row per asset to `screenshots.md` (file, what it shows, suggested alt text). Always
write descriptive alt text; never "screenshot".

## Use it in the post (placement)
- Before/after = a **stacked pair**: clean image, a line of text, censored image. Never put
  two images back-to-back (a `BLOG-PLAYBOOK.md` rule). Keep the pair together under the
  relevant heading.
- A draggable before/after slider was considered and declined for posts: the live
  `CensorSandbox` already covers interaction, and stacked images are simpler, accessible,
  and work in RSS/OG/no-JS. (A slider belongs on the `/click-to-censor` landing hero instead.)

## Before deploy
Confirm the dev-only routes are excluded from the build:
```
npm run build && ls dist/mock 2>/dev/null   # should NOT exist
```

## Gotchas (these bit us; don't repeat)
- **Git Bash mangles leading-slash args.** `npm run shot -- /mock/finance ...` becomes
  `C:/Program Files/Git/mock/finance`. Pass the route WITHOUT the leading slash.
- **Static sites ignore query params.** `?censor=1` won't reach a prerendered page; use a
  separate route per state.
- **A `return new Response(404)` guard does NOT exclude a page from a static build.** Astro
  still emits the HTML file (it leaks publicly). Exclude via the dynamic `[scene].astro` route
  whose `getStaticPaths` returns `[]` in PROD. Verify with the dist check below.
- **`getStaticPaths` runs in its own hoisted scope.** It cannot read consts from the frontmatter
  body (like the `SCENES` map), referencing one throws "X is not defined". Keep its scene list
  as an inline array literal, in sync with `SCENES`.
- **Astro dev toolbar** sneaks into captures; the script hides it (`astro-dev-toolbar{display:none}`).
- **Resolution:** cap at 800px (column is 720px). Bigger is wasted bytes.
