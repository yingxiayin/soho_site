'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-primary-50 sticky top-0 z-50 border-b border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              HaiLife
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                href="/" 
                className={`px-3 py-2 text-sm font-bold transition relative ${
                  pathname === '/' 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Home
                {pathname === '/' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700"></span>
                )}
              </Link>
              <Link 
                href="/products" 
                className={`px-3 py-2 text-sm font-bold transition relative ${
                  pathname?.startsWith('/products') 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Products
                {pathname?.startsWith('/products') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700"></span>
                )}
              </Link>
              <Link 
                href="/blog" 
                className={`px-3 py-2 text-sm font-bold transition relative ${
                  pathname?.startsWith('/blog') 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Blog
                {pathname?.startsWith('/blog') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700"></span>
                )}
              </Link>
              <Link 
                href="/contact" 
                className={`px-3 py-2 text-sm font-bold transition relative ${
                  pathname === '/contact' 
                    ? 'text-primary-700' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                Contact
                {pathname === '/contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700"></span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link
              href="/"
              className={`block px-3 py-2 text-base font-bold transition ${
                pathname === '/' 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`block px-3 py-2 text-base font-bold transition ${
                pathname?.startsWith('/products') 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/blog"
              className={`block px-3 py-2 text-base font-bold transition ${
                pathname?.startsWith('/blog') 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 text-base font-bold transition ${
                pathname === '/contact' 
                  ? 'text-primary-700 bg-primary-50' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
