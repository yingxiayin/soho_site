import { Suspense } from 'react'
import ContactForm from './ContactForm'

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-primary-50 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <ContactForm />
    </Suspense>
  )
}
