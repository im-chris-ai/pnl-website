const fs = require('fs');

fs.mkdirSync('src/content/blog', { recursive: true });

for (let i = 1; i <= 8; i++) {
  fs.writeFileSync(
    `src/content/blog/post-${i}.md`,
    `---
title: Blog Post ${i}
description: This is the description for post ${i}.
date: '2026-06-18'
---

This is the content of post ${i}.
`
  );
}
console.log('Dummy posts generated');
