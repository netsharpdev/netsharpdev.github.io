import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Paweł Pindel',
  description: 'These are projects I have created or worked on in my career.',
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

        <h2>American Homes 4 Rent Portal</h2>
        <img src="/images/ah4r.png" alt="ah4r" />
        <p>
          In cooperation with <a href="https://gravity9solutions.com">Gravity9</a>{' '}
          I am creating web applicatin for American Homes 4 Rent. The goal of the
          tool is to make house leasing easy and contactless. We are working on
          great experience for applicant but also for current resident. It is
          simple to get into property without an agent, using &quot;Let Yourself
          In&quot; flow that provides you with access code to the doors of a house
          you dream of. From resident perspective you can manage your service
          request in case your pipe is broken or anything else goes wrong.
          Everything in one place.
        </p>

        <hr />

        <h2>ABB Library</h2>
        <img src="/images/abblibrary.png" alt="ABB Library" />
        <p>
          While I was been working for Sii Poland I was delegated to ABB Global
          Business Services to design and develop project called{' '}
          <a href="https://library.abb.com/">Library</a>. It is full text search
          solution within company. It stores documents, manuals and many different
          types of files which are shared accros company and also to the
          customers. I was responsible not only for a product but also DevOps
          processes around that.
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
          I am co-creator of IqScreen application, inteligent commercials
          provider, Polish Innovation Award 2019 laureatee. Application is
          responsible for showing commercials to taxi passangers based on the AI.
          It reads lot of parameters from your face and presents only commercials
          which suits to your age, gender, localization and time of a day. I
          prepared full backend solution in cooperation with Mobile Developer who
          created mobile applicaiton part, contracted by In1 AI Sp z o.o.
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
