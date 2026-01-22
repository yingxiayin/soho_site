'use client'

import Link from 'next/link'
import Script from 'next/script'
import { FiDollarSign, FiSettings, FiTruck, FiAward, FiArrowRight, FiFileText } from 'react-icons/fi'
import HeroCarousel from '@/components/HeroCarousel'
import { getFeaturedProducts } from '@/data/products'

const features = [
  {
    icon: FiDollarSign,
    title: 'Wholesale Pricing',
    description: 'Competitive wholesale rates with volume discounts. Flexible MOQ options to suit your business needs.',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/features_img/office.jpg',
    fallbackBg: 'bg-gradient-to-br from-primary-600 to-primary-700',
  },
  {
    icon: FiSettings,
    title: 'OEM & Customization',
    description: 'Full OEM capabilities with custom branding, colors, and specifications. Private label options available.',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/features_img/faculty.png',
    fallbackBg: 'bg-gradient-to-br from-primary-700 to-primary-800',
  },
  {
    icon: FiTruck,
    title: 'Global Logistics',
    description: 'Efficient international shipping and logistics support. FOB, CIF, and DDP terms available.',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/features_img/logistic.png',
    fallbackBg: 'bg-gradient-to-br from-primary-800 to-primary-700',
  },
  {
    icon: FiAward,
    title: 'Eco-Friendly Materials',
    description: 'Environmentally responsible materials that protect outdoor environments. Sustainable manufacturing practices.',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/features_img/eco.jpg',
    fallbackBg: 'bg-gradient-to-br from-primary-500 to-primary-600',
  },
]

export default function Home() {
  const featuredProducts = getFeaturedProducts()
  const baseUrl = 'https://www.hailifechairs.com'
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HaiLife',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'B2B supplier of premium outdoor chairs. Wholesale pricing, OEM services, private label, and custom manufacturing solutions for businesses worldwide.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+852-94717295',
      contactType: 'Sales',
      email: 'hello@hailifechairs.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Chinese'],
    },
    sameAs: [
      'https://www.facebook.com/hailifechairs/',
      'https://www.instagram.com/hailife',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'HK',
    },
  }
  
  return (
    <>
      {/* Structured Data - Organization */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div>
        {/* Hero Carousel Section */}
        <HeroCarousel />

        {/* Features Section */}
        <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Partner with HaiLife?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your trusted B2B partner for wholesale outdoor furniture, OEM manufacturing, and custom solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`relative ${feature.fallbackBg} rounded-lg border border-primary-200 overflow-hidden h-[250px]`}
                  style={{
                    backgroundImage: `url(${feature.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/75 to-primary-700/80"></div>
                  {/* Additional dark overlay at bottom for text area */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-900/90 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative p-6 h-full flex flex-col">
                    {/* Icon - fixed at top */}
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 flex-shrink-0">
                      <Icon className="text-white text-2xl" />
                    </div>
                    
                    {/* Title - fixed position from icon */}
                    <h3 className="text-xl font-semibold text-white mb-3 flex-shrink-0">
                      {feature.title}
                    </h3>
                    
                    {/* Description - flexible, can grow */}
                    <p className="text-white/90 text-sm leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bestselling Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular outdoor chairs, trusted by businesses worldwide for quality and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
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

          <div className="mt-8 text-center">
            <Link
              href="/products"
              className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition"
            >
              View All Products
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            We're Excited to Partner with You
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's build a successful business partnership together. We're committed to providing you with quality products, competitive pricing, and exceptional service. Explore our catalog and let's discuss how we can help grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              View Product Catalog
            </Link>
            <Link
              href="/contact"
              className="inline-block bg-primary-200 text-primary-800 px-8 py-3 rounded-lg font-semibold hover:bg-primary-300 transition"
            >
              Request Quote & Download Catalog
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            * Product catalog available after submitting a quote request
          </p>
        </div>
      </section>
      </div>
    </>
  )
}
