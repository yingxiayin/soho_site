'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiCheck, FiMail, FiMessageCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Product } from '@/data/products'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Get images array
  const images = Array.isArray(product.image) ? product.image : [product.image]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="bg-primary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
        >
          <FiChevronLeft className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg border border-primary-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image Carousel */}
            <div>
              {/* Main Image */}
              <div className="relative aspect-w-16 aspect-h-12 bg-gray-200 rounded-lg overflow-hidden mb-4">
                {images.length > 0 ? (
                  <>
                    <img
                      src={images[currentImageIndex]}
                      alt={`${product.name} - Image ${currentImageIndex + 1}`}
                      className="w-full h-96 object-cover"
                    />
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
                          aria-label="Previous image"
                        >
                          <FiChevronLeft className="text-gray-800" size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition"
                          aria-label="Next image"
                        >
                          <FiChevronRight className="text-gray-800" size={20} />
                        </button>
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                        currentImageIndex === index
                          ? 'border-primary-600 ring-2 ring-primary-200'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="text-sm font-semibold text-primary-600 uppercase">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                  {product.name}
                </h1>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Wholesale Pricing Available:</strong> Contact us for competitive wholesale rates, volume discounts, and MOQ details.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Key Features</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Product Specifications</h2>
                <dl className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex">
                      <dt className="font-medium text-gray-700 w-32">{spec.label}:</dt>
                      <dd className="text-gray-600">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-3">Business Services</h2>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Wholesale Pricing:</strong> Competitive rates with volume discounts</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>OEM Services:</strong> Custom branding, colors, and specifications</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Private Label:</strong> Full private label options available</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Flexible MOQ:</strong> Accommodating minimum order quantities</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheck className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Global Shipping:</strong> International logistics support</span>
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Request Wholesale Quote</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Contact our sales team for wholesale pricing, MOQ details, OEM options, and custom specifications. Submit a quote request to access our complete product catalog.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/contact?product=${product.id}&productName=${encodeURIComponent(product.name)}`}
                    className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-center flex items-center justify-center"
                  >
                    <FiMail className="mr-2" />
                    Request Quote & Download Catalog
                  </Link>
                  <a
                    href="https://wa.me/85294717295"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary-200 text-primary-800 px-6 py-3 rounded-lg font-semibold hover:bg-primary-300 transition text-center flex items-center justify-center"
                  >
                    <FiMessageCircle className="mr-2" />
                    WhatsApp Us
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  * Product catalog available after submitting a quote request
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
