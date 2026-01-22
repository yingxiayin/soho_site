import type { Metadata } from 'next'

const baseUrl = 'https://www.hailifechairs.com'

export const metadata: Metadata = {
  title: 'Contact Us - Request Wholesale Quote',
  description: 'Contact HaiLife for wholesale pricing, OEM services, custom manufacturing, and product catalog. Get competitive rates and flexible MOQ options for your business.',
  keywords: ['contact HaiLife', 'wholesale quote', 'OEM inquiry', 'custom manufacturing', 'B2B contact'],
  openGraph: {
    type: 'website',
    title: 'Contact Us | HaiLife Chairs',
    description: 'Contact HaiLife for wholesale pricing, OEM services, and custom manufacturing solutions.',
    url: `${baseUrl}/contact`,
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Contact HaiLife',
      },
    ],
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
