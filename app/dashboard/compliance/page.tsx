'use client'

import Link from 'next/link'
import { FileText, Award, Users } from 'lucide-react'

export default function CompliancePage() {
  const links = [
    { href: '/dashboard/compliance/cra', label: 'CRA Document Hub', icon: FileText },
    { href: '/dashboard/compliance/licenses', label: 'License Navigator', icon: Award },
    { href: '/dashboard/compliance/hr', label: 'HR Onboarding', icon: Users },
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-heading font-bold text-brand-primary mb-6">
        Compliance Hub
      </h1>
      <div className="flex flex-wrap gap-4">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-5 py-3 rounded-lg border border-gray-200 bg-white hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all"
          >
            <Icon className="w-5 h-5 text-brand-accent" />
            <span className="font-medium text-brand-primary">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
