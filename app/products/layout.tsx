import type { Metadata } from 'next'

const baseUrl = 'https://www.hailifechairs.com'

export const metadata: Metadata = {
  title: 'Product Catalog - Premium Outdoor Chairs',
  description: 'Browse our comprehensive catalog of premium outdoor chairs. Available for wholesale, OEM, and custom manufacturing. Competitive pricing with flexible MOQ options.',
  keywords: ['outdoor chairs catalog', 'wholesale chairs', 'OEM chairs', 'outdoor furniture', 'B2B furniture', 'custom chairs'],
  openGraph: {
    type: 'website',
    title: 'Product Catalog | HaiLife Chairs',
    description: 'Browse our comprehensive catalog of premium outdoor chairs. Available for wholesale, OEM, and custom manufacturing.',
    url: `${baseUrl}/products`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'HaiLife Product Catalog',
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/products`,
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
