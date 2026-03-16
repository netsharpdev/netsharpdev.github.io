import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  banner_image?: string;
  tags?: string[];
  content: string;
  excerpt: string;
  readTime: number;
}

export interface PostWithHtml extends Post {
  contentHtml: string;
}

function getExcerpt(content: string): string {
  const withoutMore = content.split('<!--more-->')[0];
  const plain = withoutMore
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_`~]/g, '')
    .replace(/\n+/g, ' ')
    .trim();
  return plain.length > 160 ? plain.slice(0, 160) + '...' : plain;
}

function calculateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  const mins = Math.ceil(words / 200);
  return mins < 1 ? 1 : mins;
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
        banner_image: data.banner_image || undefined,
        tags: data.tags || [],
        content,
        excerpt: getExcerpt(content),
        readTime: calculateReadTime(content),
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<PostWithHtml> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    title: data.title,
    date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
    banner_image: data.banner_image || undefined,
    tags: data.tags || [],
    content,
    excerpt: getExcerpt(content),
    readTime: calculateReadTime(content),
    contentHtml: result.toString(),
  };
}
