import Hero from '@/components/Hero';
import PostCard from '@/components/PostCard';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      <Hero />
      <section className="section" id="latest-articles">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <div className="grid grid--posts">
            {posts.map((post) => (
              <PostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={post.date}
                banner_image={post.banner_image}
                tags={post.tags}
                excerpt={post.excerpt}
                readTime={post.readTime}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
