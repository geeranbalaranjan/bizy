'use client'

import Image from 'next/image'

export function SocialProof() {
  const logos = [
    { name: 'Stripe', url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg' },
    { name: 'Shopify', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
    { name: 'Intercom', url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Intercom_logo.svg' },
    { name: 'Vercel', url: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' },
    { name: 'Gusto', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Gusto_logo_2016.png' },
  ]

  return (
    <section className="py-12 border-y border-white/5 bg-brand-primary relative z-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">
          Trusted by founders building businesses across Canada
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {/* For the sake of the mockup, substituting real logos with text if images fail, or using placeholders. */}
          {logos.map((logo) => (
            <div key={logo.name} className="relative h-8 w-24 sm:h-10 sm:w-32 flex items-center justify-center font-heading font-bold text-xl text-white/50 hover:text-white transition-colors">
               {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
