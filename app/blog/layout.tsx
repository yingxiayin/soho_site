import type { Metadata } from 'next'

const baseUrl = 'https://www.hailifechairs.com'

export const metadata: Metadata = {
  title: 'Blog - Outdoor Furniture Tips & Insights',
  description: 'Stay updated with the latest tips, trends, and insights about outdoor furniture, design ideas, and maintenance tips from HaiLife Chairs.',
  keywords: ['outdoor furniture blog', 'furniture tips', 'design ideas', 'outdoor chairs', 'furniture maintenance'],
  openGraph: {
    type: 'website',
    title: 'Blog | HaiLife Chairs',
    description: 'Stay updated with the latest tips, trends, and insights about outdoor furniture and design.',
    url: `${baseUrl}/blog`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'HaiLife Blog',
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
