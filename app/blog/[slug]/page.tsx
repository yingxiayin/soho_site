import type { Metadata } from 'next'
import Link from 'next/link'
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi'
import { notFound, redirect } from 'next/navigation'
import { getBlogPostById, getBlogPostBySlug } from '@/data/blog-posts'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { defaultSchema } from 'hast-util-sanitize'

const baseUrl = 'https://www.hailifechairs.com'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Legacy support: old URLs were /blog/{id}. If slug is numeric, redirect to the canonical slug URL.
  if (/^\d+$/.test(params.slug)) {
    const id = parseInt(params.slug, 10)
    const legacyPost = getBlogPostById(id)
    if (!legacyPost) {
      return {
        title: 'Blog Post Not Found',
      }
    }
    // Will redirect in component
  }

  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const description = post.excerpt || `Read about ${post.title} on HaiLife Chairs blog.`
  const image = post.heroImage || `${baseUrl}/og-image.jpg`

  return {
    title: post.title,
    description,
    keywords: [post.category, 'outdoor furniture', 'outdoor chairs', 'furniture tips', 'design ideas'],
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.slug}`,
    },
  }
}

function asPlugin<T>(mod: T): any {
  return (mod as any)?.default ?? mod
}

function looksLikeHtml(content: string) {
  return /^\s*</.test(content)
}

async function renderPostContentToHtml(content: string) {
  if (looksLikeHtml(content)) return content

  const schema = {
    ...defaultSchema,
    tagNames: Array.from(
      new Set([
        ...(defaultSchema.tagNames ?? []),
        'p',
        'br',
        'hr',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'pre',
        'code',
        'kbd',
        'strong',
        'em',
        'del',
        'ul',
        'ol',
        'li',
        'a',
      ])
    ),
    attributes: {
      ...(defaultSchema.attributes ?? {}),
      a: Array.from(new Set([...(defaultSchema.attributes?.a ?? []), 'href', 'title', 'target', 'rel'])),
      code: Array.from(new Set([...(defaultSchema.attributes?.code ?? []), 'className'])),
    },
  }

  const file = await unified()
    .use(asPlugin(remarkParse))
    .use(asPlugin(remarkGfm))
    .use(asPlugin(remarkRehype))
    .use(asPlugin(rehypeSanitize), schema)
    .use(asPlugin(rehypeStringify))
    .process(content)

  return String(file)
}

export default async function BlogPostBySlugPage({ params }: { params: { slug: string } }) {
  // Legacy support: old URLs were /blog/{id}. If slug is numeric, redirect to the canonical slug URL.
  if (/^\d+$/.test(params.slug)) {
    const id = parseInt(params.slug, 10)
    const legacyPost = getBlogPostById(id)
    if (!legacyPost) notFound()
    redirect(`/blog/${legacyPost.slug}`)
  }

  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const html = await renderPostContentToHtml(post.content)
  const image = post.heroImage || `${baseUrl}/og-image.jpg`

  return (
    <>
      {/* Structured Data - Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: image,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            publisher: {
              '@type': 'Organization',
              name: 'HaiLife',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/blog/${post.slug}`,
            },
            articleSection: post.category,
          }),
        }}
      />
      <div className="bg-primary-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>

        <article className="bg-white rounded-lg border border-primary-200 overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
            {post.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={encodeURI(post.heroImage)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Blog Image</span>
            )}
          </div>

          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm font-semibold text-primary-600 uppercase">{post.category}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center text-gray-600 text-sm mb-8 space-x-4">
              <div className="flex items-center">
                <FiCalendar className="mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <FiUser className="mr-2" />
                {post.author}
              </div>
            </div>

            <div
              className="prose prose-lg max-w-none prose-p:my-4 prose-li:my-1 prose-ul:my-4 prose-ol:my-4 prose-headings:mt-8 prose-headings:mb-3"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </article>
      </div>
      </div>
    </>
  )
}

