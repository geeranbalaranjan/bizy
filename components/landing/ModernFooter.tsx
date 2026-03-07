'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'

export function ModernFooter() {
  const footerLinks = {
    Product: [
      { name: 'Viability Scan', href: '#' },
      { name: 'Launch Roadmap', href: '#' },
      { name: 'Compliance Hub', href: '#' },
      { name: 'Storefront Builder', href: '#' },
    ],
    Resources: [
      { name: 'Startup Guides', href: '#' },
      { name: 'Funding Database', href: '#' },
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
    ],
    Company: [
      { name: 'About Bizy', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ]
  }

  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-accent to-purple-600 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-heading font-black tracking-tight text-white">Bizy</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Your AI co-founder for launching businesses in Canada. Validating ideas, navigating compliance, and building storefronts.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-brand-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Bizy Inc. All rights reserved. Built in Canada.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Twitter</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</Link>
            <Link href="#" className="text-gray-500 hover:text-white transition-colors text-sm">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
