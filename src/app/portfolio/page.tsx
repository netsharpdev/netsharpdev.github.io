import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'These are projects I have created or worked on in my career.',
  alternates: {
    canonical: '/portfolio/',
  },
  openGraph: {
    title: 'Portfolio',
    description: 'These are projects I have created or worked on in my career.',
    url: '/portfolio/',
  },
};

export default function PortfolioPage() {
  return (
    <article>
      <header className="post-header">
        <div className="container">
          <h1 className="post-header__title">Portfolio</h1>
          <p className="post-header__meta" style={{ display: 'block', textAlign: 'center' }}>
            These are projects I have created or worked on in my career.
          </p>
        </div>
      </header>

      <div className="page-content">
        <p>Below you can find my portfolio.</p>

        <h2>AMH (American Homes) Portal</h2>
        <img src="/images/ah4r.png" alt="AMH" />
        <p>
          In cooperation with <a href="https://gravity9solutions.com">Gravity9</a>{' '}
          I created a web application for AMH (American Homes). The goal of the
          tool is to make house leasing easy and contactless. We worked on a
          great experience for applicants as well as for current residents. It is
          simple to get into a property without an agent, using the &quot;Let
          Yourself In&quot; flow that provides you with an access code to the
          doors of the house you dream of. From a resident&apos;s perspective you
          can manage your service requests in case a pipe is broken or anything
          else goes wrong. Everything in one place.
        </p>

        <hr />

        <h2>ABB Library</h2>
        <img src="/images/abblibrary.png" alt="ABB Library" />
        <p>
          While I was working for Sii Poland I was delegated to ABB Global
          Business Services to design and develop a project called{' '}
          <a href="https://library.abb.com/">Library</a>. It is a full-text
          search solution within the company. It stores documents, manuals and
          many different types of files which are shared across the company and
          also with customers. I was responsible not only for the product but
          also for the DevOps processes around it.
        </p>

        <hr />

        <h2>Talmundo Onboarding App</h2>
        <img src="/images/talmundo.jpg" alt="Talmundo" />
        <p>
          Talmundo&apos;s employee onboarding solution helps you easily build an
          inspiring onboarding journey for your employees. Our software blends HR
          best practices with your company&apos;s culture to deliver a great
          onboarding experience that will positively impact your business by
          getting your hires up and running and integrated faster. That&apos;s
          onboarding for the new digital world! Keep scrolling to see some
          highlights from an example digital journey as experienced by a new
          hire. As a consultant and backend developer I was responsible for
          coordinating DevOps and creating this application for over 3 years.
        </p>

        <hr />

        <h2>IqScreen</h2>
        <img src="/images/iq.jpg" alt="IqScreen" />
        <p>
          I am the co-creator of IqScreen, an intelligent commercial provider
          and Polish Innovation Award 2019 laureate. The application shows
          commercials to taxi passengers based on AI. It reads a lot of
          parameters from your face and presents only commercials that suit your
          age, gender, location and time of day. I prepared the full backend
          solution in cooperation with a mobile developer who created the mobile
          application, contracted by In1 AI Sp z o.o.
        </p>

        <hr />

        <h2>Art Monkey CMS System</h2>
        <p>
          Art Monkey is a personal full-stack project I built from scratch — a
          headless CMS powering a creative studio portfolio website at{' '}
          <a href="https://artmonkey.pl">artmonkey.pl</a>.
        </p>
        <p>
          The public website (<strong>artmonkey-stage</strong>) is a Next.js 15
          application featuring a portfolio gallery with lightbox, smooth
          animations via Framer Motion, and images served from Azure CDN. Content
          is fetched at build time from the CMS API and deployed automatically to
          Netlify via GitHub Actions.
        </p>
        <p>
          The CMS backend (<strong>art-monkey-cms</strong>) is a .NET 10 Azure
          Functions API with JWT authentication and Azure Blob Storage for image
          management. A GitHub Actions dispatch integration automatically triggers
          a site rebuild whenever content is saved. The admin UI is built with
          React 19, TailwindCSS 4, TipTap rich text editor, and drag-and-drop
          support via dnd-kit.
        </p>

        <hr />

        <h2>Other</h2>
        <p>
          In the past I have been working as well for PCMI Corporation - USA
          company offering policy claim management software. I have been part of
          development team creating this solution.
        </p>
      </div>
    </article>
  );
}
