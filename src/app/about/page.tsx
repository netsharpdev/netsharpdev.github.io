import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About me',
  description:
    'Principal Software Engineer Paweł Pindel on product engineering, AI-augmented development, and cloud architecture.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About me',
    description:
      'Principal Software Engineer Paweł Pindel on product engineering, AI-augmented development, and cloud architecture.',
    url: '/about/',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paweł Pindel',
    jobTitle: 'Principal Software Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Verisk Analytics',
      url: 'https://www.verisk.com/',
    },
    url: 'https://netsharpdev.com/',
    email: 'pawel.pindel@netsharpdev.com',
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="post-header">
        <div className="container">
          <h1 className="post-header__title">About me</h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            Principal Software Engineer, Azure Developer, and product engineer focused on clear,
            scalable software.
          </p>
        </div>
      </header>

      <div className="page-content">
        <h3>About Me</h3>
        <p>
          I’m Pawe&#322; Pindel, a Principal Software Engineer, Azure Developer, and
          full-spectrum Product Engineer from Poland. For more than a decade,
          I’ve been building cloud-native applications, distributed systems, and
          data-driven products using Microsoft technologies, .NET, Azure, and
          modern software architecture practices.
        </p>
        <p>
          Today, I work at <a href="https://www.verisk.com/">Verisk Analytics</a>,
          where I operate at the intersection of product engineering, solution
          architecture, and AI-augmented development. My mission is simple: build
          software that is clear, scalable, and genuinely useful — and help
          teams deliver it faster and smarter.
        </p>

        <h3>What I Do</h3>
        <p>
          My role spans the full product lifecycle — from shaping requirements
          to designing architecture to writing production code.
        </p>

        <h4>AI Transformation &amp; LLM-Assisted Development</h4>
        <ul>
          <li>Introducing LLM-assisted coding with tools like GitHub Copilot and Claude Code.</li>
          <li>Evaluating AI development tools and agentic workflows.</li>
          <li>Helping teams adopt AI-augmented engineering practices.</li>
          <li>Improving productivity across the entire SDLC.</li>
        </ul>
        <p>I believe AI is not replacing developers — it’s amplifying them.</p>

        <h4>Cloud &amp; Software Architecture</h4>
        <ul>
          <li>Azure and AWS cloud-native architectures.</li>
          <li>Microservices, APIs, and event-driven systems.</li>
          <li>.NET, C#, TypeScript, Angular.</li>
          <li>PostgreSQL, Snowflake, and modern data platforms.</li>
          <li>Automation, DevOps, and scalable infrastructure.</li>
        </ul>
        <p>I enjoy turning complex business problems into clean, maintainable solutions.</p>

        <h4>Product Engineering</h4>
        <p>
          I work closely with stakeholders to translate domain-heavy requirements
          into actionable engineering work. My approach blends product thinking,
          UX awareness, architectural clarity, and hands-on coding — delivering
          features that are technically sound and aligned with real user needs.
        </p>

        <h4>Technical Leadership</h4>
        <p>
          I mentor developers, lead code reviews, and help teams grow their
          engineering maturity. I care deeply about clean code, automation,
          continuous improvement, knowledge sharing, and building a healthy
          engineering culture.
        </p>

        <h3>How I Think</h3>
        <p>
          I’m a Microsoft technologies enthusiast, but I’m not tied to any
          single stack. I choose tools based on the problem — not the other way
          around. I automate everything I can. I value clarity over cleverness.
          And I try to live by a motto that has shaped my career:
        </p>
        <blockquote>
          <p>
            Learn something about everything and everything about something.{' '}
            <cite>&mdash; Thomas Henry Huxley</cite>
          </p>
        </blockquote>

        <h3>Beyond Engineering</h3>
        <p>
          Outside of work, I’m an amateur chef, traveler, and someone who finds
          peace in the Polish countryside. Forests are my favorite place to
          reset, think, and recharge.
        </p>

        <h3>Why I Write</h3>
        <p>
          I created this blog to share what I learn about Azure, .NET, cloud
          architecture, AI-assisted development, and modern engineering
          practices. Writing helps me think more clearly — and publishing invites
          discussion. If something here sparks your curiosity or challenges your
          thinking, feel free to reach out or leave a comment. I’m always happy
          to learn from others.
        </p>

        <h3>Contact me</h3>
        <p>
          You can reach me at{' '}
          <a href="mailto:pawel.pindel@netsharpdev.com">
            <strong>pawel.pindel@netsharpdev.com</strong>
          </a>
          .
        </p>
      </div>
    </article>
  );
}
