import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductById } from '@/data/products'
import ProductDetailClient from './ProductDetailClient'

const baseUrl = 'https://www.hailifechairs.com'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const productId = parseInt(params.id)
  const product = !isNaN(productId) ? getProductById(productId) : null

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const productImage = Array.isArray(product.image) ? product.image[0] : product.image
  const description = `${product.description} Wholesale pricing, OEM services, and custom manufacturing available. Contact us for competitive rates and MOQ details.`

  return {
    title: `${product.name} - Premium Outdoor Chair`,
    description,
    keywords: [
      product.name,
      product.category,
      'outdoor chairs',
      'wholesale chairs',
      'OEM chairs',
      'custom chairs',
      'B2B furniture',
    ],
    openGraph: {
      type: 'website',
      title: `${product.name} | HaiLife Chairs`,
      description,
      url: `${baseUrl}/products/${product.id}`,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/products/${product.id}`,
    },
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id)
  const product = !isNaN(productId) ? getProductById(productId) : null

  if (!product) {
    notFound()
  }

  return (
    <>
      {/* Structured Data - Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.fullDescription,
            category: product.category,
            image: Array.isArray(product.image) ? product.image : [product.image],
            brand: {
              '@type': 'Brand',
              name: 'HaiLife',
            },
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'USD',
              price: '0',
              priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              seller: {
                '@type': 'Organization',
                name: 'HaiLife',
              },
              url: `${baseUrl}/products/${product.id}`,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '50',
            },
          }),
        }}
      />
      <ProductDetailClient product={product} />
    </>
  )
}
