export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg"></div>
      <div className="hero__content">
        <span className="hero__label">Paweł Pindel, Principal Enginner</span>
        <h1 className="hero__title">
          Building <span className="highlight">cloud-native</span> solutions
          with Azure &amp; .NET
        </h1>
        <p className="hero__description">
          Sharing insights on software architecture, Azure services, and modern
          .NET development. Opinions, thoughts, and real-world solutions.
        </p>
        <div className="hero__actions">
          <a href="#latest-articles" className="btn btn--primary">
            Read the Blog
          </a>
          <a href="/about" className="btn btn--ghost">
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}
