# Blog Playbook

Tool-agnostic instructions for creating a blog post for this site. Any AI assistant
(or human) should be able to follow this without extra context. No vendor-specific
steps are required; tool shortcuts are listed at the bottom as optional conveniences.

## When to use this
Whenever someone asks to "write / create / draft a blog post" for one of the apps.

## Inputs you need
- The **topic** (if not given, take the next unchecked item from `content-ops/backlog.md`).
- The **app** the post supports (Click to Censor or Herald).

## Hard rules (do not break)
1. **Accuracy:** only state facts found in the app's facts sheet (`content-ops/facts-<app>.md`).
   Never invent features, platforms, prices, integrations, stats, or reviews.
2. **Voice:** follow `content-ops/voice.md` (first person, casual, ultra-short
   paragraphs, punchy). Concise, no fluff. **Never use em-dashes** anywhere.
3. **One internal link minimum:** link to the app's page (`/click-to-censor` or `/herald`).
4. **SEO required:** unique title + meta description, one H1, logical heading order,
   alt text on every image.
5. **Quality over volume:** the post must genuinely help the reader. No filler.

## Steps
1. Confirm topic + app. Pull from `backlog.md` if no topic given.
2. Open the app facts sheet (`content-ops/facts-<app>.md`) and use the Post structure
   below.
3. Write the draft following the structure and the hard rules.
4. Choose a URL slug: short, lowercase, hyphenated, keyword-first
   (e.g. `hide-data-before-screen-sharing`).
5. Create the file at `src/content/blog/<slug>.md` with valid frontmatter
   (see Post structure). `date` is today in `YYYY-MM-DD`.
6. Add images per the Images section below: generate the AI cover, plus any in-body
   step screenshots. Set `image:` in frontmatter and write descriptive alt text.
7. Add at least one internal link to the app page, plus links to related posts where natural.
8. Self-check against the Definition of done below.
9. Present the draft for review, with a screenshot of the rendered page (see "Show the
   rendered page"). Do not publish until approved.
10. On approval: commit and push to `main` (the site auto-deploys), then check the
    topic off in `backlog.md`.

## Show the rendered page
Reviewers (and you) should see the post actually rendered, not just a file path. Capture it:
```
npm run dev                                  # if not already running (port 4321)
npm run shot:page -- blog/<slug> ../<slug>.png   # full-page PNG you can view/attach
```
`shot:page` drives Playwright directly (`scripts/shot-gen/page.mjs`) and works on any route
or URL. It warns if any image on the page is broken. Use this instead of editor/IDE
preview-screenshot tools, which have hung on capture on this machine.
(`npm run shot` is different: it captures dev-only `/mock/*` scenes into the asset library,
clipped to `.mock`. See `MOCKS-PLAYBOOK.md`.)

## Post structure

### Frontmatter (required)

```yaml
---
title: "[Specific, keyword-first title, ~50-60 chars]"
description: "[Unique summary that earns the click, under ~155 chars]"
date: "[YYYY-MM-DD]"
image: "/images/blog/[slug]/cover.png"
---
```

### Body

```markdown
[1-2 sentence hook: the painful moment the reader recognizes.]

## The problem
[What's at stake. Make it concrete and specific to the reader's situation.]

## Why the usual fixes fall short
[The slow / manual / risky ways people try, and why they fail.]

## The fast way
[The solution, in 2-4 concrete steps. This is where the app naturally fits.
Link to the app page here: [App Name](/app-page).]

## Why it's safe / why it works
[Reassurance grounded in the facts sheet, e.g. runs locally, persists, etc.]

## Takeaway
[One-line summary + a clear next step / CTA linking to the app.]
```

## Images
**Pick the image for the point first, then the source.** Decide what the image must
*prove* (e.g. "this post is about hiding an email + phone, so show an email + phone being
hidden"), then choose where it comes from. If the library (`content-ops/screenshots.md`)
already has a shot of *that exact scenario*, reuse it. If not, build a mock and capture it
(`MOCKS-PLAYBOOK.md`). Do not settle for an approximate library shot just because it's faster;
a near-miss image on the post's core scenario is the wrong image.

Three kinds, different sources:
- **Cover (AI-generated):** one per post, 1200x630 (also the social/OG preview).
  Compose the brand style from `content-ops/cover-style.md` + the post subject, then run
  `npm run cover -- <slug> "<prompt>"` (Cloudflare Workers AI). Output lands at
  `public/images/blog/<slug>/cover.webp`. Keep covers text-free.
- **In-body (real screenshots):** real shots of the app/extension that illustrate a step.
  Reuse from the library in `content-ops/screenshots.md`; capture new ones only when a post
  needs something not there. No stock.
- **In-body (mock scenes):** for staged scenarios you can't safely screenshot for real
  (balances, customer data, API keys), build a mock and capture it. Follow
  `content-ops/MOCKS-PLAYBOOK.md`.

- **Never stack images back-to-back.** Always put explanatory text between two images;
  each image should follow the sentence it illustrates.
- **Not every section or list item needs an image.** Spread visuals out (e.g. roughly every
  other point in a listicle). A few strong, well-placed images beat one per section; too many
  similar screenshots dilute each other and bury the live demo / real screenshots.
- **Format:** cover is `.webp`; screenshots `.webp`/`.png`/`.jpg`.
- **Location + naming:** `public/images/blog/<slug>/`, named `cover.webp`, `step-1.<ext>`, etc.
- **Alt text:** describe what the image shows, never "cover image".

## Product CTA (Click to Censor articles)
For posts about Click to Censor, place the shared CTA twice (keeps every article
consistent). The post must be `.mdx`.
- Import it: `import CensorCTA from '../../components/CensorCTA.astro';`
- Place `<CensorCTA />` **just before the first heading** (after the intro hook).
- Place `<CensorCTA />` **just before the last heading**.
- The CTA links to `/click-to-censor` and says "coming soon" until the extension ships;
  swap the link/label in `src/components/CensorCTA.astro` (one place) when it launches.

## Definition of done
- [ ] Frontmatter valid: title, description, date, image.
- [ ] One H1 (the title); H2/H3 in logical order.
- [ ] Every claim traces to the facts sheet.
- [ ] No em-dashes. Concise voice.
- [ ] >= 1 internal link to the app page.
- [ ] Meta description is unique and under ~155 characters.
- [ ] Header image present with descriptive alt text.
- [ ] The post's core scenario is shown by at least one screenshot of *that scenario* (built a mock if the library lacked it), not an approximate stand-in.
- [ ] No two images back-to-back; text separates every image.
- [ ] (Censor posts) CTA placed before the first heading and before the last heading.
- [ ] Reads as genuinely useful, not filler.

## File map
- Topics: `content-ops/backlog.md`
- Writing voice: `content-ops/voice.md`
- Cover style + generator: `content-ops/cover-style.md`, `scripts/cover-gen/generate.mjs`
- Screenshot library: `content-ops/screenshots.md`
- App ground truth: `content-ops/facts-click-to-censor.md`, `content-ops/facts-herald.md`
- Published posts: `src/content/blog/*.md`
- Images: `public/images/blog/<slug>/`

## Optional tool shortcuts (not required)
- Claude Code: a thin skill can wrap this file so a request auto-triggers the playbook.
- Image generation, keyword research, and SEO checks can use whatever tool is available;
  the rules above are what matters, not the tool.
