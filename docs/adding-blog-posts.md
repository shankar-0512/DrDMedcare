# Adding a New Blog Post

## Checklist

### 1. Create the page file
`src/app/blog/[slug]/page.tsx`

Copy the structure from an existing post (e.g. `src/app/blog/clinical-pharmacist-vs-pharmacist/page.tsx`).

Things to update:
- `_title`, `_desc`, `_ogImage` constants at the top
- `metadata` export: title, description, openGraph, twitter, and `alternates: { canonical: '/blog/your-slug' }`
- `jsonLd` object: headline, description, datePublished, url
- `<BlogPostLayout>` props: title, excerpt, category, readTime, date
- Post content

**Categories and their colours:**
| Category | Colour |
|---|---|
| Awareness | Sky blue |
| Education | Amber |
| Our story | Teal (brand) |
| Devices & conditions | Violet |

---

### 2. Generate the OG image
Add an entry to `scripts/generate-og-images.mjs` following the pattern of existing posts, then run:

```bash
node scripts/generate-og-images.mjs
```

The PNG will be saved to `public/og/[slug].png` automatically.

Set `_ogImage` in the page file to:
```
https://drdmedcare.com/og/[slug].png
```

---

### 3. Add to the blog index
`src/app/blog/page.tsx` — add an entry to the `POSTS` array:

```ts
{
  slug: 'your-slug',
  title: 'Your Title',
  excerpt: 'One sentence summary.',
  category: 'Education',
  readTime: '5 min read',
  date: 'March 2026',
  featured: true, // optional — only one post should have this
}
```

If setting as featured, remove `featured: true` from the previous featured post.

---

### 4. Add to the sitemap
`src/app/sitemap.ts` — add an entry:

```ts
{
  url: `${BASE_URL}/blog/your-slug`,
  lastModified: new Date('2026-03-XX'),
  changeFrequency: 'monthly',
  priority: 0.6,
},
```

---

### 5. Commit and push
```bash
git add .
git commit -m "feat: add blog post — [title]"
git push
```

---

### 6. Google Search Console
- Go to URL Inspection
- Paste the full URL of the new post
- Click **Request Indexing**

---

## File locations at a glance

| What | Where |
|---|---|
| Blog posts | `src/app/blog/[slug]/page.tsx` |
| Blog index | `src/app/blog/page.tsx` |
| OG image generator | `scripts/generate-og-images.mjs` |
| Generated OG images | `public/og/` |
| Sitemap | `src/app/sitemap.ts` |
| Blog layout component | `src/components/BlogPostLayout.tsx` |
