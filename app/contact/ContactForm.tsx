'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FiMail, FiMessageCircle, FiMapPin, FiSend, FiCheckCircle, FiDownload, FiFacebook, FiInstagram } from 'react-icons/fi'

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  whatsapp: '',
  subject: 'wholesale-quote',
  message: '',
}

export default function ContactForm() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const productName = searchParams.get('productName')
  
  const [formData, setFormData] = useState(initialFormState)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if user has already submitted a quote
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('quoteSubmitted') === 'true'
    if (hasSubmitted) {
      setIsSubmitted(true)
    }
    
    // Pre-fill form if product is specified
    if (productId && productName) {
      setFormData(prev => ({
        ...prev,
        subject: 'wholesale-quote',
        message: `I'm interested in getting a quote for: ${decodeURIComponent(productName)} (Product ID: ${productId})\n\nPlease provide wholesale pricing and MOQ information.`,
      }))
    }
  }, [productId, productName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      // Success - save submission status
      localStorage.setItem('quoteSubmitted', 'true')
      setIsSubmitted(true)
    } catch (err: any) {
      console.error('Contact form error:', err)
      setError(err.message || 'Failed to send your message. Please try again later or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewInquiry = () => {
    // Allow user to submit another inquiry
    localStorage.removeItem('quoteSubmitted')
    setIsSubmitted(false)

    // Reset form while keeping any product pre-fill context for subject/message if user navigated from a product
    setFormData((prev) => ({
      ...initialFormState,
      subject: prev.subject,
      message: prev.message,
    }))
  }

  const handleDownloadCatalog = () => {
    // Create a temporary link and trigger download
    const link = document.createElement('a')
    link.href = '/product-catalog.pdf'
    link.download = 'HaiLife-Product-Catalog.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-primary-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Our Sales Team
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interested in wholesale pricing, OEM services, or custom manufacturing? Our B2B sales team is ready to assist with quotes, catalogs, and partnership opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-primary-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FiMail className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <a
                      href="mailto:hello@hailifechairs.com"
                      className="text-gray-900 hover:text-primary-600 transition"
                    >
                      hello@hailifechairs.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FiMessageCircle className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">WhatsApp</h3>
                    <a
                      href="https://wa.me/85294717295"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-primary-600 transition"
                    >
                      +852 94717295
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <FiMapPin className="text-primary-600 text-xl" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">Shipping</h3>
                    <p className="text-gray-900">
                      Global shipping available
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/hailifechairs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg hover:bg-primary-200 transition text-primary-700"
                    aria-label="Facebook"
                  >
                    <FiFacebook size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/hailife"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg hover:bg-primary-200 transition text-primary-700"
                    aria-label="Instagram"
                  >
                    <FiInstagram size={24} />
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  B2B Services
                </h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Wholesale Pricing</li>
                  <li>• OEM Manufacturing</li>
                  <li>• Private Label</li>
                  <li>• Custom Specifications</li>
                  <li>• Volume Discounts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-primary-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Request a Quote or Inquiry
              </h2>
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-primary-800 flex items-start">
                  <FiDownload className="mr-2 mt-0.5 flex-shrink-0 text-primary-600" />
                  <span>
                    <strong>Note:</strong> After submitting your inquiry, you'll be able to download our product catalog and quote information.
                  </span>
                </p>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <FiCheckCircle className="text-green-600 text-4xl mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Thank you for your inquiry!
                    </h3>
                    <p className="text-green-700 mb-4">
                      We've received your quote request and will get back to you as soon as possible. You can now download our product catalog and quote information.
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-green-300">
                    <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                      <FiDownload className="mr-2 text-primary-600" />
                      Download Product Catalog & Quote Information
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Download our complete product catalog with detailed specifications, product images.
                    </p>
                    <button
                      onClick={handleDownloadCatalog}
                      className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center"
                    >
                      <FiDownload className="mr-2" />
                      Download Product Catalog & Quote (PDF)
                    </button>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      File size: ~10MB | Format: PDF | Includes product catalog and product models
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={handleNewInquiry}
                      className="inline-flex items-center px-4 py-2 rounded-lg border border-primary-300 text-primary-700 text-sm font-medium hover:bg-primary-50 transition"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                        WhatsApp
                      </label>
                      <input
                        type="text"
                        id="whatsapp"
                        name="whatsapp"
                        placeholder="+852 94717295"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="wholesale-quote">Wholesale Quote Request</option>
                      <option value="oem-inquiry">OEM & Custom Manufacturing</option>
                      <option value="private-label">Private Label Inquiry</option>
                      <option value="product-inquiry">Product Specification Inquiry</option>
                      <option value="catalog-request">Product Catalog Request</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other Business Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center"
                  >
                    <FiSend className="mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-700 text-center">
                        {error}
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
