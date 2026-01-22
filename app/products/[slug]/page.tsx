import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getProductById, getProductBySlug } from '@/data/products'
import ProductDetailClient from './ProductDetailClient'

const baseUrl = 'https://www.hailifechairs.com'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Legacy support: old URLs were /products/{id}. If slug is numeric, redirect to the canonical slug URL.
  if (/^\d+$/.test(params.slug)) {
    const id = parseInt(params.slug, 10)
    const legacyProduct = getProductById(id)
    if (!legacyProduct) {
      return {
        title: 'Product Not Found',
      }
    }
    // Will redirect in component
  }

  const product = getProductBySlug(params.slug)

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
      url: `${baseUrl}/products/${product.slug}`,
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
      canonical: `${baseUrl}/products/${product.slug}`,
    },
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  // Legacy support: old URLs were /products/{id}. If slug is numeric, redirect to the canonical slug URL.
  if (/^\d+$/.test(params.slug)) {
    const id = parseInt(params.slug, 10)
    const legacyProduct = getProductById(id)
    if (!legacyProduct) notFound()
    redirect(`/products/${legacyProduct.slug}`)
  }

  const product = getProductBySlug(params.slug)

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
              url: `${baseUrl}/products/${product.slug}`,
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
