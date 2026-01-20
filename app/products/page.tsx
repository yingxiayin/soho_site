'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiFileText, FiList, FiX } from 'react-icons/fi'
import { getAllProducts, getAllCategories } from '@/data/products'

const allProducts = getAllProducts()
const categories = getAllCategories()

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter products based on selected category and featured status
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory
      const matchesFeatured = !showFeaturedOnly || product.isFeatured === true
      return matchesCategory && matchesFeatured
    })
  }, [selectedCategory, showFeaturedOnly])

  const clearFilters = () => {
    setSelectedCategory(null)
    setShowFeaturedOnly(false)
  }

  const hasActiveFilters = selectedCategory !== null || showFeaturedOnly

  return (
    <div className="bg-primary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Product Catalog
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of outdoor chairs available for wholesale, OEM, and custom manufacturing. All products are available with flexible MOQ and competitive pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-primary-200 p-3 sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FiList className="text-primary-600 mr-1.5" size={18} />
                  <h2 className="text-base font-semibold text-gray-900">Filters</h2>
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  {isFilterOpen ? <FiX size={18} /> : <FiList size={18} />}
                </button>
              </div>

              <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-4`}>
                {/* Featured Filter */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Product Type</h3>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                      className="w-3.5 h-3.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-xs text-gray-700">Bestselling Only</span>
                  </label>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Category</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                        selectedCategory === null
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-2 py-1.5 rounded text-xs transition ${
                          selectedCategory === category
                            ? 'bg-primary-100 text-primary-700 font-medium'
                            : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full text-xs text-primary-600 hover:text-primary-700 font-medium py-1.5 border-t border-primary-200 pt-3"
                  >
                    Clear All Filters
                  </button>
                )}

                {/* Results Count */}
                <div className="text-xs text-gray-500 pt-3 border-t border-primary-200">
                  Showing {filteredProducts.length} of {allProducts.length} products
                </div>

                {/* CTA Section */}
                <div className="pt-4 border-t border-primary-200">
                  <p className="text-gray-600 text-xs mb-3">
                    Interested in wholesale pricing, OEM services, or custom specifications?
                  </p>
                  <Link
                    href="/contact"
                    className="w-full inline-block bg-primary-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-primary-700 transition text-center text-xs"
                  >
                    Request Quote & Download Catalog
                  </Link>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    * Catalog available after quote request
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-primary-200 p-12 text-center">
                <p className="text-gray-600 mb-4">No products found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear filters to see all products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-primary-200 overflow-hidden hover:border-primary-300 transition group flex flex-col"
                  >
                    <Link href={`/products/${product.id}`} className="flex-1 flex flex-col">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">Product Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="mb-1.5">
                          <span className="text-xs font-semibold text-primary-600 uppercase">
                            {product.category}
                          </span>
                          {product.isFeatured && (
                            <span className="ml-2 text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded">
                              Bestselling
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        <div className="flex items-center text-primary-600 font-medium text-sm mb-2">
                          View Specifications
                          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition" size={16} />
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <Link
                        href={`/contact?product=${product.id}&productName=${encodeURIComponent(product.name)}`}
                        className="w-full border-2 border-primary-400 text-primary-700 bg-primary-50 px-3 py-2 rounded-lg font-medium hover:bg-primary-100 hover:border-primary-500 transition flex items-center justify-center gap-2 text-sm"
                      >
                        <FiFileText size={16} />
                        Request Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
