import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const plain = content
        .split('<!--more-->')[0]
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
        .replace(/#{1,6}\s+/g, '')
        .replace(/[*_`~]/g, '')
        .replace(/\n+/g, ' ')
        .trim();
      const excerpt = plain.length > 160 ? plain.slice(0, 160) + '...' : plain;

      return {
        slug,
        title: data.title,
        date:
          data.date instanceof Date
            ? data.date.toISOString().split('T')[0]
            : String(data.date),
        excerpt,
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const posts = getAllPosts();

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NETSHARPDEV - Paweł Pindel</title>
    <link>https://netsharpdev.com/</link>
    <description>Developer blog about Azure, .NET and Architecture by Paweł Pindel</description>
    <language>en</language>
    <atom:link href="https://netsharpdev.com/feed.xml" rel="self" type="application/rss+xml"/>
${posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://netsharpdev.com/posts/${post.slug}/</link>
      <guid>https://netsharpdev.com/posts/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

const outputPath = path.join(process.cwd(), 'public/feed.xml');
fs.writeFileSync(outputPath, rss, 'utf8');
console.log(`RSS feed generated: ${outputPath}`);
