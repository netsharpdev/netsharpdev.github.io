'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface PostCardProps {
  slug: string;
  title: string;
  date: string;
  banner_image?: string;
  tags?: string[];
  excerpt: string;
  readTime: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostCard({
  slug,
  title,
  date,
  banner_image,
  tags,
  excerpt,
  readTime,
}: PostCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="post-card" ref={ref}>
      {banner_image && (
        <Link href={`/posts/${slug}`} className="post-card__image">
          <img
            src={`/images/posts/${banner_image}`}
            alt={title}
            loading="lazy"
          />
        </Link>
      )}
      <div className="post-card__body">
        {tags && tags.length > 0 && (
          <div className="post-card__tags">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="post-card__title">
          <Link href={`/posts/${slug}`}>{title}</Link>
        </h3>
        <div className="post-card__excerpt">{excerpt}</div>
        <div className="post-card__meta">
          <span className="post-card__date">{formatDate(date)}</span>
          <span className="post-card__readtime">{readTime} min read</span>
        </div>
      </div>
    </article>
  );
}
