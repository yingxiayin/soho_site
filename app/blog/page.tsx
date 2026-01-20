'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { FiCalendar, FiArrowRight, FiList } from 'react-icons/fi'
import { getAllBlogPosts } from '@/data/blog-posts'

const blogPosts = getAllBlogPosts()

// Group posts by year and month
function groupPostsByTime(posts: typeof blogPosts) {
  const grouped: { [key: string]: typeof blogPosts } = {}
  
  posts.forEach((post) => {
    const date = new Date(post.date)
    const year = date.getFullYear()
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const key = `${year}-${month}`
    
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(post)
  })
  
  // Sort keys in descending order (newest first)
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    const [yearA, monthA] = a.split('-')
    const [yearB, monthB] = b.split('-')
    const dateA = new Date(`${monthA} 1, ${yearA}`)
    const dateB = new Date(`${monthB} 1, ${yearB}`)
    return dateB.getTime() - dateA.getTime()
  })
  
  return { grouped, sortedKeys }
}

export default function BlogPage() {
  const { grouped, sortedKeys } = groupPostsByTime(blogPosts)
  const scrollToRef = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const scrollToSection = (key: string) => {
    const element = scrollToRef.current[key]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-primary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest tips, trends, and insights about outdoor furniture and design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-primary-200 p-3 sticky top-24">
              <div>
                <div className="flex items-center mb-3">
                  <FiList className="text-primary-600 mr-1.5" size={18} />
                  <h2 className="text-base font-semibold text-gray-900">Table of Contents</h2>
                </div>
                <div className="space-y-1">
                  {sortedKeys.map((key) => {
                    const [year, month] = key.split('-')
                    return (
                      <button
                        key={key}
                        onClick={() => scrollToSection(key)}
                        className="w-full text-left text-xs text-primary-600 hover:text-primary-700 hover:bg-primary-50 transition px-2 py-1.5 rounded"
                      >
                        {month} {year}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              {/* Contact Us Section */}
              <div className="pt-4 border-t border-primary-200 mt-4">
                <p className="text-gray-600 text-xs mb-3">
                  Have questions or want to discuss a business partnership?
                </p>
                <Link
                  href="/contact"
                  className="w-full inline-block bg-primary-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-primary-700 transition text-center text-xs"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>

          {/* Blog Posts by Time - Main Content */}
          <div className="lg:col-span-3 space-y-12">
          {sortedKeys.map((key) => {
            const [year, month] = key.split('-')
            const posts = grouped[key]
            
            return (
              <div
                key={key}
                ref={(el) => {
                  scrollToRef.current[key] = el
                }}
                className="scroll-mt-8"
              >
                {/* Time Header */}
                <div className="flex items-center mb-6 pb-3 border-b border-primary-300">
                  <FiCalendar className="text-primary-600 mr-2" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    {month} {year}
                  </h2>
                  <span className="ml-3 text-sm text-gray-500">
                    ({posts.length} {posts.length === 1 ? 'post' : 'posts'})
                  </span>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg border border-primary-200 overflow-hidden hover:border-primary-300 transition"
                    >
                      <div className="h-40 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center overflow-hidden">
                        {post.heroImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={encodeURI(post.heroImage)}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">Blog Image</span>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-primary-600 uppercase">
                            {post.category}
                          </span>
                          <div className="flex items-center text-gray-500 text-xs">
                            <FiCalendar className="mr-1" size={12} />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition text-sm"
                        >
                          Read More
                          <FiArrowRight className="ml-1" size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
