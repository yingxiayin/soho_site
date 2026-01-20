import Link from 'next/link'
import { FiMail, FiMessageCircle, FiMapPin, FiFacebook, FiInstagram } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">HaiLife</h3>
            <p className="text-primary-300 text-sm mb-6">
              B2B supplier of premium outdoor chairs. Wholesale pricing, OEM manufacturing, 
              private label, and custom solutions for businesses worldwide.
            </p>
            <div>
              <h4 className="text-sm font-semibold text-primary-200 mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-primary-300 hover:text-primary-50 transition">
                    Product Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-primary-300 hover:text-primary-50 transition">
                    Request Quote
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary-300 hover:text-primary-50 transition">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">B2B Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-300">Wholesale Pricing</span>
              </li>
              <li>
                <span className="text-primary-300">OEM Manufacturing</span>
              </li>
              <li>
                <span className="text-primary-300">Private Label</span>
              </li>
              <li>
                <span className="text-primary-300">Custom Specifications</span>
              </li>
              <li>
                <span className="text-primary-300">Volume Discounts</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-primary-300">
                <FiMail className="mr-2" />
                <a href="mailto:hello@hailifechairs.com" className="hover:text-primary-50 transition">
                  hello@hailifechairs.com
                </a>
              </li>
              <li className="flex items-center text-primary-300">
                <FiMessageCircle className="mr-2" />
                <a 
                  href="https://wa.me/85294717295" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-50 transition"
                >
                  WhatsApp: +852 94717295
                </a>
              </li>
              <li className="flex items-center text-primary-300">
                <FiMapPin className="mr-2" />
                <span>Global Shipping Available</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-primary-200 mb-3">Follow Us</h5>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/hailifechairs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-primary-800 rounded-lg hover:bg-primary-700 transition text-primary-50"
                  aria-label="Facebook"
                >
                  <FiFacebook size={20} />
                </a>
                <a
                  href="https://www.instagram.com/hailife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-primary-800 rounded-lg hover:bg-primary-700 transition text-primary-50"
                  aria-label="Instagram"
                >
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-primary-300">
          <p>&copy; {new Date().getFullYear()} SellAny. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
