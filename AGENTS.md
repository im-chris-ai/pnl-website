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

Either way, apply the working-style and SEO rules above.
