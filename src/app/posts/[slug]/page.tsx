import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import PostHeader from '@/components/PostHeader';
import AuthorCard from '@/components/AuthorCard';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  const bannerImage = post.banner_image
    ? `/images/posts/${post.banner_image}`
    : '/images/og-default.png';

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/posts/${post.slug}/`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/posts/${post.slug}/`,
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: bannerImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [bannerImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Paweł Pindel',
      url: 'https://netsharpdev.com/about/',
    },
    image: post.banner_image
      ? `https://netsharpdev.com/images/posts/${post.banner_image}`
      : 'https://netsharpdev.com/images/og-default.png',
    keywords: post.tags?.join(', '),
    url: `https://netsharpdev.com/posts/${post.slug}/`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://netsharpdev.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.title,
        item: `https://netsharpdev.com/posts/${post.slug}/`,
      },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PostHeader
        title={post.title}
        date={post.date}
        tags={post.tags}
        readTime={post.readTime}
      />

      {post.banner_image && (
        <div className="post-banner">
          <img src={`/images/posts/${post.banner_image}`} alt={post.title} />
        </div>
      )}

      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="post-footer">
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        )}
        <AuthorCard />
      </footer>
    </article>
  );
}
