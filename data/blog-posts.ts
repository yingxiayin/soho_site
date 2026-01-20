import { blogPostsData } from './blog-posts-data'

// Blog post data type definition
export interface BlogPost {
  id: number
  title: string
  excerpt: string
  slug: string
  heroImage?: string
  content: string
  date: string
  category: string
  author: string
}

// Blog post list type (simplified for listing page)
export interface BlogPostListItem {
  id: number
  title: string
  excerpt: string
  slug: string
  heroImage?: string
  date: string
  category: string
}

// Load blog posts from generated TypeScript file (generated from blog-posts-meta.json + data/blog-posts/*.md)
// Convert to Record<number, BlogPost> for proper typing
const blogPosts: Record<number, BlogPost> = blogPostsData as unknown as Record<number, BlogPost>

// Get all blog posts as an array (for listing page)
export function getAllBlogPosts(): BlogPostListItem[] {
  return Object.values(blogPosts).map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    heroImage: post.heroImage,
    date: post.date,
    category: post.category,
  }))
}

// Get blog post by ID
export function getBlogPostById(id: number): BlogPost | undefined {
  return blogPosts[id]
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return Object.values(blogPosts).find((p) => p.slug === slug)
}

// Get all unique categories
export function getAllBlogCategories(): string[] {
  const categories = Array.from(new Set(Object.values(blogPosts).map(p => p.category)))
  return categories.sort()
}
