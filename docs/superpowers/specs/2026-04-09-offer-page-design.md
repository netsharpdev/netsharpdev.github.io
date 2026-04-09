# Offer Page Design Spec

**Date:** 2026-04-09  
**Status:** Approved

## Context

Paweł Pindel is a Principal Software Engineer with 10+ years of cloud and AI experience. He wants to target the SME market with AI transformation consulting services. The goal is a dedicated offer page that positions him as a trusted AI partner for small and medium businesses, drives enquiries via a Contact page CTA, and is fully SEO-optimised.

Two pages are needed: an English version (`/offer/`) in the main nav, and a Polish translation (`/oferta/`) linked from the footer only — both indexed by Google via `hreflang` cross-linking.

## Pages

| | English | Polish |
|---|---|---|
| URL | `/offer/` | `/oferta/` |
| File | `src/app/offer/page.tsx` | `src/app/oferta/page.tsx` |
| Navigation | Added to main nav links array in `Navigation.tsx` | Added to `Footer.tsx` footer links |
| Content | Original English copy | Direct Polish translation |
| `hreflang` | `en` → links to `/oferta/` | `pl` → links to `/offer/` |

## Page Structure (both pages, same layout)

### 1. Page Header
- Consistent with About/Portfolio pages using `.post-header` + `.container` classes
- Eyebrow label: "AI TRANSFORMATION" (uppercase, teal `#00D4AA`)
- H1: "AI Transformation for Your Business" / "Transformacja AI dla Twojego Biznesu"
- Subtitle: "Practical AI consulting for small and medium businesses — from first steps to full implementation."

### 2. The Problem — Narrative hook
- Opening: "Your competitors are already using AI. Most SMEs aren't."
- 2–3 paragraphs: relatable SME pain — manual workflows, time lost to repetition, customer experience falling behind, overwhelmed by AI hype but unsure where to start
- Closing blockquote: "You don't need to rebuild your business around AI. You need to find the right places where AI saves you time, improves your customer experience, and gives you a competitive edge."

### 3. My Approach — 3 principles
Three cards in a grid row:
- **Understand First** — Your business, your processes, your constraints
- **Practical, Not Hype** — No buzzwords. Real tools that solve real problems
- **Built to Last** — Your team understands and can maintain what we build together

### 4. Services — 4 full narrative sections
Each section has: eyebrow label (SERVICE 01–04), heading, 2–3 paragraph description, and a "What you get" summary line. Alternating teal/blue left-border accent.

1. **AI Readiness Audit** — Maps workflows, surfaces highest-impact AI opportunities before any implementation spend. *What you get: written report + prioritised opportunity map + recommendation call*
2. **AI Workshop & Team Training** — Hands-on session teaching practical AI tool usage, prompting, and safe daily workflow integration. *What you get: custom half/full-day workshop + follow-up materials + Q&A*
3. **AI Integration & Implementation** — Design, build, and deploy AI integrations (LLM features, workflow automation, customer-facing AI) fitted to the client's stack. *What you get: working solution + documentation + handover + 30-day support*
4. **Ongoing AI Advisory** — Monthly retainer for strategic guidance, tool evaluation, architecture decisions. *What you get: monthly strategy calls + async Q&A + priority access*

### 5. Credentials & Trust
Two-column layout:

**Experience**
- 10+ years building cloud-native products
- Principal Software Engineer at Verisk Analytics
- Azure, AWS, .NET, TypeScript
- AI projects since 2019 (IqScreen — Polish Innovation Award 2019)

**Recent Training**
- Developer Jutra — edu.devstyle.pl
- Architekt Jutra — edu.devstyle.pl
- Building Agentic Platforms with AWS

### 6. CTA Section
- Heading: "Ready to bring AI into your business?" / "Gotowy na AI w swoim biznesie?"
- Subtext: "Let's talk about your situation. No commitment, no sales pitch — just an honest conversation."
- Button: gradient (`#00D4AA` → `#3B82F6`), text "Get in Touch →", links to `/contact` (placeholder — Contact page created in next iteration)

## SEO

### English `/offer/`
```
title: "AI Transformation for SMEs | Paweł Pindel"
description: "Practical AI consulting for small and medium businesses — readiness audit, team training, implementation, and advisory. Let's transform your workflows with AI."
canonical: /offer/
hreflang: en → /offer/, pl → /oferta/
```

### Polish `/oferta/`
```
title: "Transformacja AI dla MŚP | Paweł Pindel"
description: "Praktyczny consulting AI dla małych i średnich firm — audyt gotowości, szkolenia, wdrożenie i doradztwo. Wprowadź AI do swoich procesów."
canonical: /oferta/
hreflang: pl → /oferta/, en → /offer/
```

### JSON-LD Schema (both pages)
`Service` schema wrapping each of the 4 services, nested under a `Person` schema for Paweł Pindel. Added via `<script type="application/ld+json">` in the page component, following the pattern used in `src/app/page.tsx` and `src/app/about/page.tsx`.

### Target keywords
- AI consulting for SME / konsulting AI dla MŚP
- AI transformation / transformacja AI
- AI workshop / warsztaty AI
- LLM integration
- Agentic AI

## Navigation Changes

**`src/components/Navigation.tsx`** — add to `links` array:
```ts
{ text: 'Offer', url: '/offer' }
```

**`src/components/Footer.tsx`** — add link to `/oferta` in footer nav (Polish label: "Oferta").

## Critical Files
- `src/components/Navigation.tsx` — add Offer to nav links
- `src/components/Footer.tsx` — add /oferta footer link
- `src/app/offer/page.tsx` — new English page
- `src/app/oferta/page.tsx` — new Polish page
- `src/styles/globals.css` — reuse existing classes; add `.offer-service` card styles if needed

## Verification
1. `npm run dev` — visit `/offer` and `/oferta`, check layout matches all 6 sections
2. Check nav shows "Offer" link; check footer shows "Oferta" link
3. View page source — confirm JSON-LD schema present, hreflang tags in `<head>`, meta title/description correct
4. `npm run build` — static export must succeed with no errors
5. Check CTA button routes to `/contact` (renders 404 for now — expected until Contact page is built)
