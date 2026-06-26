# Cover image style

Reusable brand style for AI-generated blog covers (Cloudflare Workers AI).
Site-wide: the same look applies to every app's posts so the blog feels cohesive.

Two parts: a **concept** (varies per post) + the **DNA** (fixed style, every cover inherits it).
Final image prompt = concept + DNA.

Model: `@cf/leonardo/lucid-origin` (default in the generator; switchable anytime).

## 1. Concept prompt
Use this to turn a post topic into the concept phrase:

> You turn a blog post topic into a SHORT visual concept for a striking, conceptual
> cover illustration. Reply with ONLY a brief phrase (under 18 words) naming ONE bold
> central subject (a figure, object, or scene) that clearly SYMBOLIZES the post's topic,
> plus a mood or setting. No proper nouns, no brand names, no quotes. Never mention text,
> letters, words, titles, or signs.

## 2. DNA (fixed style, always appended)

> Surreal conceptual editorial illustration, modern tech-magazine style. One bold,
> striking central subject. Bold saturated colors, strong duotone palette with a confident
> blue lean, dramatic cinematic lighting, high contrast, clean simple background, polished
> 3D render and digital-art aesthetic, artistic and eye-catching. Absolutely NO text, no
> words, no letters, no numbers, no typography, no captions, no signs.

## 3. How to use
Compose `<concept>. <DNA>` then generate:

```bash
npm run cover -- <slug> "<concept>. <DNA>"
```

Output: `public/images/blog/<slug>/cover.webp` (1200x630).

## Notes
- Keep covers **text-free**. The title lives on the page, not baked into the image.
- Same DNA every post = a cohesive blog.
- Tunable later: blue intensity (the "blue lean"), realistic vs more illustrative, model.
