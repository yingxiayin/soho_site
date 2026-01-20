'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const slides = [
  {
    id: 1,
    title: 'Premium Outdoor Chairs',
    subtitle: 'Wholesale, OEM, and Custom Manufacturing Solutions',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/hero_img/premium_outdoor_chairs.png',
    fallbackBg: 'bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800',
  },
  {
    id: 2,
    title: 'Quality Craftsmanship Worldwide',
    subtitle: 'Global shipping with competitive wholesale pricing and flexible MOQ',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/hero_img/quality_craftsmanship_worldwide.jpeg',
    fallbackBg: 'bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600',
  },
  {
    id: 3,
    title: 'Custom OEM Solutions',
    subtitle: 'Private label, custom branding, and tailored specifications for your business',
    image: 'https://pub-3b2acdbe1fa34455859f328488a06e3e.r2.dev/hero_img/custom_oem_solutions.jpg',
    fallbackBg: 'bg-gradient-to-br from-primary-600 via-primary-800 to-primary-700',
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Auto-play every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[500px] md:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide 
                ? 'opacity-100 z-10' 
                : 'opacity-0 z-0 pointer-events-none'
            } ${slide.image ? '' : slide.fallbackBg}`}
            style={slide.image ? {
              backgroundImage: `url("${encodeURI(slide.image)}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            } : {}}
          >
            {/* Overlay for better text readability when using image */}
            {slide.image && (
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-primary-800/40 to-primary-700/50 z-0"></div>
            )}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
              <div className="text-white max-w-2xl w-full">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight whitespace-normal lg:whitespace-nowrap">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-primary-100 leading-tight whitespace-normal lg:whitespace-nowrap">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/products"
                    className="bg-white text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center justify-center gap-2 w-fit border border-primary-200"
                  >
                    View Product Catalog
                    <FiArrowRight />
                  </Link>
                  <Link
                    href="/contact"
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition w-fit"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm z-20"
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition backdrop-blur-sm z-20"
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide
                  ? 'bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
