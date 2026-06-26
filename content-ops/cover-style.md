# Cover image style

Reusable brand style for AI-generated blog covers (Cloudflare Workers AI).
Site-wide: the same look applies to every app's posts so the blog feels cohesive.

The final prompt = this brand style + the post's specific subject.

## Brand style prompt
> TODO: paste the brand style prompt here. It should describe the consistent look
> (aesthetic, color palette, composition, mood) and end with "no text, landscape".

## How it's used
Compose: `<brand style prompt>. Subject: <post-specific scene>.`
Then generate:

```bash
node scripts/cover-gen/generate.mjs <slug> "<composed prompt>"
```

Output: `public/images/blog/<slug>/cover.webp` (1200x630).

## Notes
- Keep covers **text-free**. The title lives on the page, not baked into the image.
- Same brand style every post = a cohesive blog.
- Optional later: a per-app flavor (e.g. Censor cooler/blue, Herald warmer).
