export default function AuthorCard() {
  return (
    <div className="author-card">
      <img
        src="/images/author.png"
        alt="Paweł Pindel"
        className="author-card__avatar"
      />
      <div>
        <div className="author-card__name">Pawe&#322; Pindel</div>
        <p className="author-card__bio">
          Principal Software Engineer and Technical Leader, Microsoft Technologies
          enthusiast and Public Speaker. Working currently at Verisk Analytics. Sharing
          knowledge and discussing modern software development.
        </p>
        <span className="author-card__location">Krak&oacute;w, Poland</span>
      </div>
    </div>
  );
}
