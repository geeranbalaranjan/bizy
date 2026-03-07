'use client'

import Link from 'next/link'
import { Zap, Map, Shield, Store } from 'lucide-react'

export default function DashboardPage() {
  const cards = [
    {
      title: 'Viability',
      description: 'Validate your business idea',
      href: '/dashboard/viability',
      icon: Zap,
      color: 'text-brand-accent',
    },
    {
      title: 'Roadmap',
      description: 'Your launch checklist',
      href: '/dashboard/roadmap',
      icon: Map,
      color: 'text-brand-highlight',
    },
    {
      title: 'Compliance',
      description: 'CRA, licenses, HR',
      href: '/dashboard/compliance',
      icon: Shield,
      color: 'text-success',
    },
    {
      title: 'Storefront',
      description: 'Build your online presence',
      href: '/dashboard/storefront',
      icon: Store,
      color: 'text-brand-accent',
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">
        Dashboard
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ title, description, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className="p-6 rounded-xl border border-gray-200 bg-white hover:border-brand-accent/50 hover:shadow-md transition-all"
          >
            <div className={`p-2 w-fit rounded-lg bg-gray-100 ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-heading font-semibold text-brand-primary mt-4 mb-2">
              {title}
            </h2>
            <p className="text-gray-500 text-sm">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
