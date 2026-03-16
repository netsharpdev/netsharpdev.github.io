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
  return {
    title: `${post.title} | Paweł Pindel`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  return (
    <article>
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
