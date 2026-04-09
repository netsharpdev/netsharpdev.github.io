import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact | netsharpdev',
  description:
    'Get in touch with Pawel Pindel — AI consulting, software engineering.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact | netsharpdev',
    description:
      'Get in touch with Pawel Pindel — AI consulting, software engineering.',
    url: '/contact/',
  },
};

export default function ContactPage() {
  return (
    <article>
      <header className="post-header">
        <div className="container">
          <span className="tag-pill" style={{ marginBottom: '1rem' }}>
            // get in touch
          </span>
          <h1 className="post-header__title gradient-text">
            Let&apos;s Work Together
          </h1>
          <p
            className="post-header__meta"
            style={{ display: 'block', textAlign: 'center' }}
          >
            Have a project in mind? Send me a message and I&apos;ll get back to
            you within 24 hours.
          </p>
        </div>
      </header>

      <div className="page-content">
        <div className="contact-split">
          {/* Left: contact info */}
          <div className="contact-info">
            <p className="contact-info__name">Pawe&#322; Pindel</p>
            <p className="contact-info__title">Principal Software Engineer</p>

            <ul className="contact-info__list">
              <li>
                <a
                  href="mailto:pawel.pindel@netsharpdev.com"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--teal">
                    ✉
                  </span>
                  <span>pawel.pindel@netsharpdev.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pawelpindel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--blue">
                    in
                  </span>
                  <span>linkedin.com/in/pawelpindel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/netsharpdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-info__link"
                >
                  <span className="contact-info__icon contact-info__icon--cyan">
                    gh
                  </span>
                  <span>github.com/netsharpdev</span>
                </a>
              </li>
            </ul>

            <p className="contact-info__location">
              Based in Poland &middot; Available for remote projects worldwide
            </p>
          </div>

          {/* Right: form */}
          <div className="contact-form-card">
            <ContactForm />
          </div>
        </div>
      </div>
    </article>
  );
}
