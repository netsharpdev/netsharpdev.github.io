interface PostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
  readTime: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostHeader({ title, date, tags, readTime }: PostHeaderProps) {
  return (
    <header className="post-header">
      <div className="container">
        {tags && tags.length > 0 && (
          <div className="post-header__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="post-header__title">{title}</h1>
        <div className="post-header__meta">
          <div className="post-header__author">
            <img
              src="/images/author.png"
              alt="Paweł Pindel"
              className="post-header__avatar"
            />
            <span className="post-header__author-name">Pawe&#322; Pindel</span>
          </div>
          <time className="post-header__date" dateTime={date}>
            {formatDate(date)}
          </time>
          <span className="post-header__readtime">{readTime} min read</span>
        </div>
      </div>
    </header>
  );
}
