import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Transformation for SMEs | Paweł Pindel',
  description:
    'Practical AI consulting for small and medium businesses — readiness audit, team training, implementation, and advisory. Let\'s transform your workflows with AI.',
  alternates: {
    canonical: '/offer/',
    languages: {
      'x-default': '/offer/',
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
