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
6. Add a header image: place it at `public/images/blog/<slug>/cover.<ext>` and set
   `image:` in frontmatter. Give it descriptive alt text in the body if used inline.
7. Add at least one internal link to the app page, plus links to related posts where natural.
8. Self-check against the Definition of done below.
9. Present the draft for review. Do not publish until approved.
10. On approval: commit and push to `main` (the site auto-deploys), then check the
    topic off in `backlog.md`.

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

## Definition of done
- [ ] Frontmatter valid: title, description, date, image.
- [ ] One H1 (the title); H2/H3 in logical order.
- [ ] Every claim traces to the facts sheet.
- [ ] No em-dashes. Concise voice.
- [ ] >= 1 internal link to the app page.
- [ ] Meta description is unique and under ~155 characters.
- [ ] Header image present with descriptive alt text.
- [ ] Reads as genuinely useful, not filler.

## File map
- Topics: `content-ops/backlog.md`
- Writing voice: `content-ops/voice.md`
- App ground truth: `content-ops/facts-click-to-censor.md`, `content-ops/facts-herald.md`
- Published posts: `src/content/blog/*.md`
- Images: `public/images/blog/<slug>/`

## Optional tool shortcuts (not required)
- Claude Code: a thin skill can wrap this file so a request auto-triggers the playbook.
- Image generation, keyword research, and SEO checks can use whatever tool is available;
  the rules above are what matters, not the tool.
