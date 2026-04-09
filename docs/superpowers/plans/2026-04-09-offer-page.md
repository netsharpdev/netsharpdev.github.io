# Offer Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an English `/offer/` page (main nav) and a Polish `/oferta/` page (footer only) promoting Paweł's AI transformation consulting services to the SME market, with full SEO metadata and hreflang cross-linking.

**Architecture:** Two new Next.js App Router page components under `src/app/offer/` and `src/app/oferta/`. Navigation and Footer components are modified to add the new links. Shared CSS utility classes are added to `globals.css` for the offer-page layout grid. No shared component is extracted — the two pages are similar but independently maintained translations.

**Tech Stack:** Next.js 14 App Router (static export), TypeScript, CSS (globals.css), JSON-LD schema via `<script>` tag (same pattern as `src/app/page.tsx`).

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `src/styles/globals.css` | Add `.offer-grid-3`, `.offer-grid-2`, `.offer-service-card` |
| Modify | `src/components/Navigation.tsx` | Add `{ text: 'Offer', url: '/offer' }` to `links` array |
| Modify | `src/components/Footer.tsx` | Add `/oferta` link to Navigation column |
| Create | `src/app/offer/page.tsx` | English offer page |
| Create | `src/app/oferta/page.tsx` | Polish offer page (translation) |

---

### Task 1: Add CSS utility classes for the offer page layout

**Files:**
- Modify: `src/styles/globals.css` (append after existing rules)

No test suite — verify with `npm run dev` after each task.

- [ ] **Step 1: Append these CSS classes to `src/styles/globals.css`**

```css
/* Offer page layout */
.offer-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.offer-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.offer-service-card {
  background: #0A0A0F;
  border: 1px solid #0d1e2a;
  border-radius: 12px;
  padding: 2rem;
}

.offer-approach-card {
  background: #0A0A0F;
  border: 1px solid #0d1e2a;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.offer-approach-card h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.offer-approach-card p {
  font-size: 0.875rem;
  color: #71717A;
  margin: 0;
}

.offer-approach-icon {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
}

.offer-cta-section {
  text-align: center;
  padding: 5rem 0;
  background: linear-gradient(180deg, transparent, rgba(0, 212, 170, 0.03));
}

.offer-cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.offer-cta-section p {
  color: #71717A;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.offer-btn {
  display: inline-block;
  background: linear-gradient(135deg, #00D4AA, #3B82F6);
  color: #050507;
  font-weight: 700;
  font-size: 1rem;
  padding: 0.875rem 2.5rem;
  border-radius: 9999px;
  transition: opacity 0.2s ease, transform 0.2s ease;
  text-decoration: none;
}

.offer-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  color: #050507;
}

.offer-eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #00D4AA;
  margin-bottom: 1rem;
}

.offer-what-you-get {
  margin-top: 1.25rem;
  padding: 0.875rem 1.25rem;
  background: rgba(0, 212, 170, 0.05);
  border-left: 3px solid #00D4AA;
  border-radius: 0 8px 8px 0;
  font-size: 0.875rem;
  color: #71717A;
}

.offer-what-you-get strong {
  color: #00D4AA;
}

@media (max-width: 768px) {
  .offer-grid-3 {
    grid-template-columns: 1fr;
  }

  .offer-grid-2 {
    grid-template-columns: 1fr;
  }

  .offer-cta-section h2 {
    font-size: 1.75rem;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/globals.css
git commit -m "style: add offer page layout utility classes"
```

---

### Task 2: Add "Offer" to main navigation

**Files:**
- Modify: `src/components/Navigation.tsx:7-11`

- [ ] **Step 1: Update the `links` array to include the Offer page**

Current code at lines 7–11 in `src/components/Navigation.tsx`:
```ts
const links = [
  { text: 'Home', url: '/' },
  { text: 'About', url: '/about' },
  { text: 'Portfolio', url: '/portfolio' },
];
```

Replace with:
```ts
const links = [
  { text: 'Home', url: '/' },
  { text: 'About', url: '/about' },
  { text: 'Portfolio', url: '/portfolio' },
  { text: 'Offer', url: '/offer' },
];
```

- [ ] **Step 2: Start dev server and confirm "Offer" appears in the nav**

```bash
npm run dev
```

Open `http://localhost:3000` — confirm "Offer" link appears in the top navigation and is active when visiting `/offer` (page will 404 until Task 4, that's fine).

- [ ] **Step 3: Commit**

```bash
git add src/components/Navigation.tsx
git commit -m "feat: add Offer link to main navigation"
```

---

### Task 3: Add "Oferta" to footer navigation

**Files:**
- Modify: `src/components/Footer.tsx:70-80`

- [ ] **Step 1: Add the `/oferta` link to the Navigation column in the footer**

Current code at lines 68–81 in `src/components/Footer.tsx`:
```tsx
<div className="footer__nav">
  <div className="footer__heading">Navigation</div>
  <ul className="footer__links">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/about">About</Link>
    </li>
    <li>
      <Link href="/portfolio">Portfolio</Link>
    </li>
  </ul>
</div>
```

Replace with:
```tsx
<div className="footer__nav">
  <div className="footer__heading">Navigation</div>
  <ul className="footer__links">
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/about">About</Link>
    </li>
    <li>
      <Link href="/portfolio">Portfolio</Link>
    </li>
    <li>
      <Link href="/oferta">Oferta</Link>
    </li>
  </ul>
</div>
```

- [ ] **Step 2: Verify in dev server**

Open `http://localhost:3000` — confirm "Oferta" link appears in the footer navigation column. Link will 404 until Task 5, that's expected.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Oferta link to footer navigation"
```

---

### Task 4: Create English offer page `/offer/`

**Files:**
- Create: `src/app/offer/page.tsx`

- [ ] **Step 1: Create `src/app/offer/page.tsx` with the following content**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Transformation for SMEs | Paweł Pindel',
  description:
    'Practical AI consulting for small and medium businesses — readiness audit, team training, implementation, and advisory. Let\'s transform your workflows with AI.',
  alternates: {
    canonical: '/offer/',
    languages: {
      en: '/offer/',
      pl: '/oferta/',
    },
  },
  openGraph: {
    title: 'AI Transformation for SMEs | Paweł Pindel',
    description:
      'Practical AI consulting for small and medium businesses — readiness audit, team training, implementation, and advisory.',
    url: '/offer/',
  },
};

export default function OfferPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paweł Pindel',
    jobTitle: 'Principal Software Engineer',
    url: 'https://netsharpdev.com/',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'AI Transformation Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Readiness Audit',
            description:
              'Maps your workflows and surfaces the highest-impact AI opportunities before any implementation spend.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Workshop & Team Training',
            description:
              'Hands-on workshop teaching practical AI tool usage, prompting, and safe daily workflow integration.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI Integration & Implementation',
            description:
              'Design and implementation of AI-powered features: LLM integrations, workflow automation, customer-facing AI.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Ongoing AI Advisory',
            description:
              'Monthly retainer for strategic AI guidance, tool evaluation, and architecture decisions.',
          },
        },
      ],
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Page Header */}
      <header className="post-header">
        <div className="container">
          <span className="offer-eyebrow">AI Transformation</span>
          <h1 className="post-header__title">
            AI Transformation<br />for Your Business
          </h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            Practical AI consulting for small and medium businesses —<br />
            from first steps to full implementation.
          </p>
        </div>
      </header>

      <div className="page-content">

        {/* 2 · The Problem */}
        <h3>The AI Gap Is Widening</h3>
        <p>
          Every week, businesses around the world are replacing manual workflows with
          AI-powered automation. They&apos;re drafting emails faster, answering customer
          questions instantly, processing data without human intervention, and making
          better decisions with AI-assisted analytics.
        </p>
        <p>
          Most small and medium businesses know AI is important. But between the hype,
          the jargon, and the sheer number of tools available, it&apos;s hard to know
          where to start — or whether it&apos;s even worth it for a company your size.
        </p>
        <p>It is. And it doesn&apos;t have to be complicated.</p>
        <blockquote>
          <p>
            You don&apos;t need to rebuild your business around AI. You need to find the
            right places where AI saves you time, improves your customer experience, and
            gives you a competitive edge.
          </p>
        </blockquote>

        {/* 3 · My Approach */}
        <h3>How I Work</h3>
        <div className="offer-grid-3" style={{ marginBottom: '3rem' }}>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🔍</div>
            <h4>Understand First</h4>
            <p>
              Before recommending anything, I take the time to understand your business —
              your workflows, your team, and your constraints. No generic solutions.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">⚡</div>
            <h4>Practical, Not Hype</h4>
            <p>
              I focus on tools and techniques that solve real problems today. No buzzwords,
              no over-engineered systems, no vendor lock-in for its own sake.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🤝</div>
            <h4>Built to Last</h4>
            <p>
              Everything I build or recommend, your team can understand, maintain, and
              build on. Knowledge transfer is part of every engagement.
            </p>
          </div>
        </div>

        {/* 4 · Services */}
        <h3>What I Offer</h3>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Service 01</span>
          <h4>AI Readiness Audit</h4>
          <p>
            Where does AI fit in your business? That&apos;s the question this engagement answers.
          </p>
          <p>
            I map your current workflows, identify repetitive tasks, review your data and
            tooling, and surface the highest-impact opportunities for AI — before you spend
            a cent on implementation. You leave with a clear picture of where AI can move
            the needle, in what order, and what it would take.
          </p>
          <div className="offer-what-you-get">
            <strong>What you get:</strong> a written report, a prioritised opportunity map,
            and a recommendation call.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Service 02</span>
          <h4>AI Workshop &amp; Team Training</h4>
          <p>
            Your team is your biggest asset. This hands-on workshop closes the gap between
            knowing AI exists and actually using it every day.
          </p>
          <p>
            Whether your team uses AI tools passively or not at all, I design a custom
            workshop around your industry and workflows. We cover practical prompting, tool
            selection, safe and responsible usage, and how to build AI habits that stick.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>What you get:</strong> a custom half-day or
            full-day workshop, follow-up materials, and a live Q&amp;A session.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Service 03</span>
          <h4>AI Integration &amp; Implementation</h4>
          <p>
            Sometimes you need more than advice — you need something built.
          </p>
          <p>
            I design and implement AI-powered features and workflows tailored to your
            business: LLM integrations, automated internal processes, customer-facing AI
            assistants, agentic workflows, and more. Built to fit your existing stack,
            documented so your team can own it.
          </p>
          <div className="offer-what-you-get">
            <strong>What you get:</strong> a working solution, full documentation, a handover
            session, and 30 days of post-launch support.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '3rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Service 04</span>
          <h4>Ongoing AI Advisory</h4>
          <p>
            AI is moving fast. What&apos;s state-of-the-art today may be outdated in six months.
            A retainer keeps you ahead.
          </p>
          <p>
            As your ongoing AI partner, I help you evaluate new tools, make the right
            architectural decisions, avoid expensive mistakes, and continuously improve your
            AI adoption. Think of it as having a senior AI engineer on call — without the
            overhead of a full-time hire.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>What you get:</strong> monthly strategy calls,
            async Q&amp;A, tool evaluation, and priority access.
          </div>
        </div>

        {/* 5 · Credentials */}
        <h3>Why Work With Me</h3>
        <div className="offer-grid-2" style={{ marginBottom: '3rem' }}>
          <div>
            <h4>Experience</h4>
            <ul>
              <li>10+ years building cloud-native products</li>
              <li>Principal Software Engineer at Verisk Analytics</li>
              <li>Azure, AWS, .NET, TypeScript</li>
              <li>
                AI projects since 2019 — co-creator of IqScreen
                (Polish Innovation Award 2019)
              </li>
            </ul>
          </div>
          <div>
            <h4>Recent Training</h4>
            <ul>
              <li>Developer Jutra — edu.devstyle.pl</li>
              <li>Architekt Jutra — edu.devstyle.pl</li>
              <li>Building Agentic Platforms with AWS</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 6 · CTA */}
      <div className="offer-cta-section">
        <div className="container">
          <h2>Ready to bring AI into your business?</h2>
          <p>
            Let&apos;s talk about your situation. No commitment, no sales pitch —
            just an honest conversation.
          </p>
          <Link href="/contact" className="offer-btn">
            Get in Touch →
          </Link>
        </div>
      </div>

    </article>
  );
}
```

- [ ] **Step 2: Verify in dev server**

Open `http://localhost:3000/offer` — confirm all 6 sections render correctly:
- Header with eyebrow label, H1, subtitle
- Problem narrative with blockquote
- 3-card approach grid
- 4 service cards with alternating teal/blue left border
- 2-column credentials section
- CTA section with gradient button (link to `/contact` will 404 — expected)

- [ ] **Step 3: Commit**

```bash
git add src/app/offer/page.tsx
git commit -m "feat: add English offer page at /offer"
```

---

### Task 5: Create Polish offer page `/oferta/`

**Files:**
- Create: `src/app/oferta/page.tsx`

- [ ] **Step 1: Create `src/app/oferta/page.tsx` with the following content**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transformacja AI dla MŚP | Paweł Pindel',
  description:
    'Praktyczny consulting AI dla małych i średnich firm — audyt gotowości, szkolenia, wdrożenie i doradztwo strategiczne. Wprowadź AI do swoich procesów.',
  alternates: {
    canonical: '/oferta/',
    languages: {
      pl: '/oferta/',
      en: '/offer/',
    },
  },
  openGraph: {
    title: 'Transformacja AI dla MŚP | Paweł Pindel',
    description:
      'Praktyczny consulting AI dla małych i średnich firm — audyt gotowości, szkolenia, wdrożenie i doradztwo strategiczne.',
    url: '/oferta/',
  },
};

export default function OfertaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paweł Pindel',
    jobTitle: 'Principal Software Engineer',
    url: 'https://netsharpdev.com/',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Usługi Transformacji AI',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audyt Gotowości na AI',
            description:
              'Mapowanie procesów i identyfikacja obszarów o największym potencjale AI przed jakimikolwiek wydatkami na wdrożenie.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Warsztaty AI i Szkolenie Zespołu',
            description:
              'Praktyczne warsztaty z użytkowania narzędzi AI, promptowania i bezpiecznej integracji z codziennymi procesami.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Integracja i Wdrożenie AI',
            description:
              'Projektowanie i wdrażanie funkcji opartych na AI: integracje LLM, automatyzacja procesów, asystenci AI dla klientów.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Stałe Doradztwo AI',
            description:
              'Miesięczny retainer: doradztwo strategiczne, ocena narzędzi i wsparcie w decyzjach architektonicznych.',
          },
        },
      ],
    },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1 · Nagłówek */}
      <header className="post-header">
        <div className="container">
          <span className="offer-eyebrow">Transformacja AI</span>
          <h1 className="post-header__title">
            Transformacja AI<br />dla Twojego Biznesu
          </h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            Praktyczny consulting AI dla małych i średnich firm —<br />
            od pierwszych kroków do pełnego wdrożenia.
          </p>
        </div>
      </header>

      <div className="page-content">

        {/* 2 · Problem */}
        <h3>Luka AI się Powiększa</h3>
        <p>
          Każdego tygodnia firmy na całym świecie zastępują ręczne procesy
          automatyzacją opartą na AI. Piszą e-maile szybciej, odpowiadają na pytania
          klientów natychmiast, przetwarzają dane bez udziału człowieka i podejmują
          lepsze decyzje dzięki analizie wspieranej przez sztuczną inteligencję.
        </p>
        <p>
          Większość małych i średnich firm wie, że AI jest ważne. Ale między szumem
          informacyjnym, żargonem technicznym a ogromną liczbą dostępnych narzędzi
          trudno wiedzieć, od czego zacząć — i czy w ogóle warto dla firmy takiej
          jak Twoja.
        </p>
        <p>Warto. I nie musi to być skomplikowane.</p>
        <blockquote>
          <p>
            Nie musisz przebudowywać swojego biznesu wokół AI. Musisz znaleźć
            odpowiednie miejsca, gdzie AI oszczędza Twój czas, poprawia doświadczenie
            klienta i daje Ci przewagę konkurencyjną.
          </p>
        </blockquote>

        {/* 3 · Podejście */}
        <h3>Jak Pracuję</h3>
        <div className="offer-grid-3" style={{ marginBottom: '3rem' }}>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🔍</div>
            <h4>Najpierw Zrozumienie</h4>
            <p>
              Zanim cokolwiek zarekomenduję, poświęcam czas na zrozumienie Twojego
              biznesu — procesów, zespołu i ograniczeń. Żadnych gotowych rozwiązań.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">⚡</div>
            <h4>Praktyczność, nie Hype</h4>
            <p>
              Skupiam się na narzędziach i technikach, które rozwiązują prawdziwe
              problemy już dziś. Bez buzzwordów, bez nadmiernie skomplikowanych
              systemów, bez uzależnienia od dostawcy.
            </p>
          </div>
          <div className="offer-approach-card">
            <div className="offer-approach-icon">🤝</div>
            <h4>Zbudowane na Lata</h4>
            <p>
              Wszystko, co buduję lub rekomenduję, Twój zespół może zrozumieć,
              utrzymać i rozwijać. Przekazanie wiedzy jest częścią każdego
              zaangażowania.
            </p>
          </div>
        </div>

        {/* 4 · Usługi */}
        <h3>Co Oferuję</h3>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Usługa 01</span>
          <h4>Audyt Gotowości na AI</h4>
          <p>
            Gdzie AI pasuje do Twojego biznesu? Na to pytanie odpowiada to zaangażowanie.
          </p>
          <p>
            Mapuję Twoje obecne procesy, identyfikuję powtarzalne zadania, przeglądam
            dane i narzędzia, i wskazuję możliwości o największym wpływie — zanim
            wydasz złotówkę na wdrożenie. Wychodzisz z jasnym obrazem, gdzie AI może
            zrobić różnicę, w jakiej kolejności i co to wymaga.
          </p>
          <div className="offer-what-you-get">
            <strong>Co otrzymujesz:</strong> pisemny raport, priorytetyzowaną mapę
            możliwości i rozmowę z rekomendacjami.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Usługa 02</span>
          <h4>Warsztaty AI i Szkolenie Zespołu</h4>
          <p>
            Twój zespół to Twój największy atut. Te warsztaty zamykają lukę między
            wiedzą o istnieniu AI a codziennym korzystaniem z niej.
          </p>
          <p>
            Niezależnie od tego, czy Twój zespół korzysta z narzędzi AI pasywnie czy
            wcale, projektuję warsztaty dostosowane do Twojej branży i procesów.
            Omawiamy praktyczne promptowanie, wybór narzędzi, bezpieczne i odpowiedzialne
            użytkowanie oraz budowanie nawyków AI.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>Co otrzymujesz:</strong> dostosowane
            warsztaty na pół lub cały dzień, materiały uzupełniające i sesję Q&amp;A.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #00D4AA' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem' }}>Usługa 03</span>
          <h4>Integracja i Wdrożenie AI</h4>
          <p>
            Czasem potrzebujesz czegoś więcej niż porady — potrzebujesz czegoś
            zbudowanego.
          </p>
          <p>
            Projektuję i wdrażam funkcje i przepływy pracy oparte na AI, dopasowane
            do Twojego biznesu: integracje LLM, zautomatyzowane procesy wewnętrzne,
            asystentów AI dla klientów, agentic workflows i więcej. Zbudowane pod Twój
            istniejący stack, udokumentowane tak, by Twój zespół mógł to przejąć.
          </p>
          <div className="offer-what-you-get">
            <strong>Co otrzymujesz:</strong> działające rozwiązanie, pełną dokumentację,
            sesję przekazania i 30 dni wsparcia po uruchomieniu.
          </div>
        </div>

        <div className="offer-service-card" style={{ marginBottom: '3rem', borderLeft: '4px solid #3B82F6' }}>
          <span className="offer-eyebrow" style={{ marginBottom: '0.5rem', color: '#3B82F6' }}>Usługa 04</span>
          <h4>Stałe Doradztwo AI</h4>
          <p>
            AI rozwija się szybko. To, co jest najlepszym rozwiązaniem dziś, może
            być przestarzałe za sześć miesięcy. Retainer pozwala Ci być o krok do przodu.
          </p>
          <p>
            Jako Twój stały partner AI pomagam oceniać nowe narzędzia, podejmować
            właściwe decyzje architektoniczne, unikać kosztownych błędów i stale
            poprawiać adopcję AI. To jak posiadanie starszego inżyniera AI na
            telefon — bez kosztów pełnego etatu.
          </p>
          <div className="offer-what-you-get" style={{ borderLeftColor: '#3B82F6' }}>
            <strong style={{ color: '#3B82F6' }}>Co otrzymujesz:</strong> miesięczne
            rozmowy strategiczne, asynchroniczne Q&amp;A, ocenę narzędzi i
            priorytetowy dostęp.
          </div>
        </div>

        {/* 5 · Referencje */}
        <h3>Dlaczego Warto Współpracować</h3>
        <div className="offer-grid-2" style={{ marginBottom: '3rem' }}>
          <div>
            <h4>Doświadczenie</h4>
            <ul>
              <li>10+ lat budowania produktów cloud-native</li>
              <li>Principal Software Engineer w Verisk Analytics</li>
              <li>Azure, AWS, .NET, TypeScript</li>
              <li>
                Projekty AI od 2019 — współtwórca IqScreen
                (Polska Nagroda Innowacyjności 2019)
              </li>
            </ul>
          </div>
          <div>
            <h4>Ostatnie Szkolenia</h4>
            <ul>
              <li>Developer Jutra — edu.devstyle.pl</li>
              <li>Architekt Jutra — edu.devstyle.pl</li>
              <li>Building Agentic Platforms with AWS</li>
            </ul>
          </div>
        </div>

      </div>

      {/* 6 · CTA */}
      <div className="offer-cta-section">
        <div className="container">
          <h2>Gotowy na AI w swoim biznesie?</h2>
          <p>
            Porozmawiajmy o Twojej sytuacji. Bez zobowiązań, bez sprzedaży —
            tylko szczera rozmowa.
          </p>
          <Link href="/contact" className="offer-btn">
            Skontaktuj się →
          </Link>
        </div>
      </div>

    </article>
  );
}
```

- [ ] **Step 2: Verify in dev server**

Open `http://localhost:3000/oferta` — confirm all sections render in Polish with correct layout. Check `http://localhost:3000` footer — confirm "Oferta" link is visible.

- [ ] **Step 3: Commit**

```bash
git add src/app/oferta/page.tsx
git commit -m "feat: add Polish offer page at /oferta"
```

---

### Task 6: Final build verification

**Files:** none — verification only

- [ ] **Step 1: Run the static build**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors or Next.js export warnings. Both `/offer` and `/oferta` should appear in the route output.

- [ ] **Step 2: Check hreflang tags in page source**

In the dev server (`npm run dev`), open `http://localhost:3000/offer` and view page source. Confirm these tags appear in `<head>`:

```html
<link rel="alternate" hreflang="en" href="/offer/" />
<link rel="alternate" hreflang="pl" href="/oferta/" />
<link rel="canonical" href="/offer/" />
```

Do the same for `http://localhost:3000/oferta` — confirm `hreflang="pl"` canonical and `hreflang="en"` alternate.

- [ ] **Step 3: Check JSON-LD in page source**

View source on `/offer` — confirm `<script type="application/ld+json">` is present and contains `hasOfferCatalog` with 4 services.

- [ ] **Step 4: Check active nav state**

Visit `http://localhost:3000/offer` — confirm "Offer" nav link has the active class (`.nav__link--active`). Visit other pages — confirm "Offer" is not active.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: verify offer pages build and SEO metadata"
```

> Note: The CTA button links to `/contact` which will return 404 until the Contact page is built in the next iteration. This is expected and documented.
