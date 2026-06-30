# Project Guidance

Canonical, tool-agnostic rules for this repo. Any AI assistant or human follows these.
Apply on every request, in code and in chat.

## Working style
- Optimize for speed and brevity. Prefer the fewest lines of code that do the job.
- Be concise. No walls of text. Bullets over paragraphs, short sentences.
- Never use em-dashes anywhere: code, copy, commits, or chat. Use commas, periods, colons, or parentheses instead.

## Websites
SEO is mandatory on every page:
- Unique `<title>` and meta description per page.
- One `<h1>`; semantic heading order below it.
- Descriptive `alt` text on images.
- Sensible internal links; keep the sitemap current.
- Use semantic HTML and accessible markup.

## Blog posts
Two workflows, both end with a Markdown file in `src/content/blog/`:

- **Generate from a topic** (write a new post from scratch): follow
  `content-ops/BLOG-PLAYBOOK.md`. Topics live in `content-ops/backlog.md`;
  app facts (the accuracy guardrail) live in `content-ops/facts-<app>.md`.
- **Import an uploaded document** (`.docx`, `.pdf`, `.md` → blog post): follow
  `scripts/blog-importer/instructions.md` and run `scripts/blog-importer/importer.py`.

Either way, apply the working-style and SEO rules above, plus the writing voice in
`content-ops/voice.md`.

## Showing a rendered page
To prove a page/post actually renders (for review or a PR), screenshot it with the repo's
own command: `npm run shot:page -- <route> <out-path>` (full-page Playwright capture; dev
server must be running). Do NOT rely on editor/IDE preview-screenshot integrations: they have
hung on capture here. See `content-ops/BLOG-PLAYBOOK.md` ("Show the rendered page").
