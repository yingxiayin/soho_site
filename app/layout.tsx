import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const openSans = Open_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.hailifechairs.com'),
  title: {
    default: 'HaiLife - Premium Outdoor Chairs Wholesale & OEM Manufacturing',
    template: '%s | HaiLife Chairs',
  },
  description: 'B2B supplier of premium outdoor chairs. Wholesale pricing, OEM services, private label, and custom manufacturing solutions for businesses worldwide.',
  keywords: ['outdoor chairs', 'wholesale chairs', 'OEM chairs', 'outdoor furniture', 'B2B furniture', 'custom chairs', 'private label chairs'],
  authors: [{ name: 'HaiLife Team' }],
  creator: 'HaiLife',
  publisher: 'HaiLife',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.hailifechairs.com',
    siteName: 'HaiLife Chairs',
    title: 'HaiLife - Premium Outdoor Chairs Wholesale & OEM Manufacturing',
    description: 'B2B supplier of premium outdoor chairs. Wholesale pricing, OEM services, private label, and custom manufacturing solutions for businesses worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HaiLife Premium Outdoor Chairs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HaiLife - Premium Outdoor Chairs Wholesale & OEM Manufacturing',
    description: 'B2B supplier of premium outdoor chairs. Wholesale pricing, OEM services, private label, and custom manufacturing solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 's1oLHarkmLtbFVlB', // From WW_verify_s1oLHarkmLtbFVlB.txt
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
