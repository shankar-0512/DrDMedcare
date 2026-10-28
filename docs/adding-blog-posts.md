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

**Categories and their badge styles** (set in `BlogGrid.tsx` and `BlogPostLayout.tsx`):
| Category | Style |
|---|---|
| Awareness | Soft mint |
| Education | Gold |
| Our story | Teal |
| Devices & conditions | Deep gold |

---

### 2. Generate the OG image
Add an entry to `scripts/generate-og-images.mjs` following the pattern of existing posts, then run:

```bash
node scripts/generate-og-images.mjs
```

The image is saved to `public/og/[slug].jpg` (JPG, not PNG). It is also used as the article's cover on the Journal cards, the article header and the "Read next" card, so it must exist before you publish.

Set `_ogImage` in the page file to:
```
https://drdmedcare.com/og/[slug].jpg
```

---

### 3. Add to the blog index
`src/app/blog/posts.ts` - add an entry to the `POSTS` array (not `page.tsx` or `BlogGrid.tsx`; both read from here):

```ts
{
  slug: 'your-slug',
  title: 'Your Title',
  excerpt: 'One sentence summary.',
  category: 'Education',
  readTime: '5 min read',
  date: 'March 2026',
  cover: 'Short label',   // required: small label shown on the cover
  featured: true, // optional - only one post should have this
}
```

If setting as featured, remove `featured: true` from the previous featured post.

---

### 4. Add to the sitemap
`src/app/sitemap.ts` - add an entry:

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
git commit -m "feat: add blog post - [title]"
git push
```

---

### 6. Google Search Console
- Go to URL Inspection
- Paste the full URL of the new post
- Click **Request Indexing**

(Only needed for new URLs. Existing, already-indexed pages are recrawled automatically.)

---

## File locations at a glance

| What | Where |
|---|---|
| Blog posts | `src/app/blog/[slug]/page.tsx` |
| Blog posts list (POSTS array) | `src/app/blog/posts.ts` |
| Blog index page and cards | `src/app/blog/page.tsx`, `src/app/blog/_components/BlogGrid.tsx` |
| OG image generator | `scripts/generate-og-images.mjs` |
| Generated OG images | `public/og/` |
| Sitemap | `src/app/sitemap.ts` |
| Blog layout component | `src/components/BlogPostLayout.tsx` |
