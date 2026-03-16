import Link from 'next/link';

export default function NotFound() {
  return (
    <article>
      <header className="post-header">
        <div className="container">
          <h1 className="post-header__title">Page Not Found</h1>
        </div>
      </header>
      <div className="page-content" style={{ textAlign: 'center' }}>
        <p>Apologies, but the page you requested could not be found.</p>
        <Link href="/" className="btn btn--primary" style={{ marginTop: '1rem' }}>
          Go to the front page &rarr;
        </Link>
      </div>
    </article>
  );
}
