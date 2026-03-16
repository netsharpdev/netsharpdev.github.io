# Project
- Next.js 14 static site (App Router), migrated from Jekyll
- Deploy: GitHub Actions → GitHub Pages (static export)

# Commands
- `npm run build` - Build and verify (no test suite configured)
- `npm run dev` - Local dev server

# Structure
- `content/posts/` - Markdown blog posts with frontmatter
- `src/app/` - Next.js pages (home, about, portfolio, posts/[slug])
- `src/components/` - React components (Navigation, Footer, Hero, PostCard, etc.)
- `src/lib/posts.ts` - Markdown processing with unified/remark/rehype
- `src/styles/globals.css` - All styles (no CSS modules or preprocessor)
- `public/images/` - Static assets
