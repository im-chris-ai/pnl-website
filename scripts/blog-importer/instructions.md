# AI Importer Instructions: Document to Astro Blog Post

This guide instructs the AI coding assistant on how to convert a user's uploaded `.docx` article file into a production-ready Astro blog post.

---

## The Workflow Procedure

Whenever a user requests: *"Convert my article `[filename]` to a blog post"*:

### 1. Execute Extraction Script
Run the extraction Python script from the website project directory:
```bash
python scripts/blog-importer/importer.py "[path_to_docx]" "[project_root_path]"
```
This script will:
- Extract all images embedded in the document.
- Save them under `public/images/blog/[slug]/` as `image-1.png`, `image-2.png`, etc.
- Output raw text and reference maps to `scripts/blog-importer/temp_raw_text.txt`.

### 2. Parse raw text and construct Markdown
Read `scripts/blog-importer/temp_raw_text.txt` and perform semantic translation:
- **Title & Slug:** Use the extracted title and slug from the metadata header.
- **Description:** Craft a clean 1-2 sentence description suitable for the card previews.
- **Date:** Use today's date (`YYYY-MM-DD`) unless a date is explicitly specified in the document text.
- **Cover Image:** Set the `image` field in frontmatter to the first extracted image (e.g. `/images/blog/[slug]/image-1.png`), or leave empty if no images were extracted.
- **Body Content:** Convert the raw body text to clean Markdown.
  - Convert headings (often capitalized lines or bold lines in raw text) to markdown `##` or `###`.
  - Format bullet points, bold sections, and paragraphs.
  - Insert extracted images (`![Caption](/images/blog/[slug]/image-X.png)`) where they make semantic sense in the text context.

### 3. Create the Markdown file
Write the formatted content to:
`src/content/blog/[slug].md`

Example template:
```markdown
---
title: "[Post Title]"
description: "[1-2 sentence summary]"
date: "YYYY-MM-DD"
image: "/images/blog/[slug]/image-1.jpg"
---

## First Section

Body text here...

![Caption](/images/blog/[slug]/image-2.png)

More body text here...
```

### 4. Cleanup & Verify
- **Delete** the temporary raw text file `scripts/blog-importer/temp_raw_text.txt`.
- Make sure the Astro development server is running and builds the page successfully with no errors.
- Respond to the user with a confirmation and the link to view the post: `http://localhost:4321/blog/[slug]`.
