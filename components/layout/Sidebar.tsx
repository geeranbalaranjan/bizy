'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/components/translation'
import {
  LayoutDashboard,
  Zap,
  Map,
  BarChart3,
  DollarSign,
  Store,
  FileText,
  Award,
  Users,
  Calculator,
  CalendarClock,
  Sparkles,
  MapPin,
  Home,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/viability', label: 'Viability Scan', icon: Zap },
  { href: '/dashboard/roadmap', label: 'Launch Roadmap', icon: Map },
  { href: '/dashboard/compliance/cra', label: 'CRA Document Hub', icon: FileText },
  { href: '/dashboard/compliance/licenses', label: 'License Navigator', icon: Award },
  { href: '/dashboard/compliance/hr', label: 'HR Onboarding', icon: Users },
  { href: '/dashboard/calculator', label: 'Break-Even Calculator', icon: Calculator },
  { href: '/dashboard/tax-calendar', label: 'Tax Calendar', icon: CalendarClock },
  { href: '/dashboard/name-generator', label: 'Name Generator', icon: Sparkles },
  { href: '/dashboard/competitor-map', label: 'Competitor Map', icon: MapPin },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/grants', label: 'Grants & Funding', icon: DollarSign },
  { href: '/dashboard/storefront', label: 'Storefront', icon: Store },
]

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <aside className="w-64 min-h-screen bg-brand-primary border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="text-xl font-heading font-bold text-white">
          Bizy
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-brand-accent/20 text-brand-accent'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="font-medium">{t(item.label)}</span>
          </Link>
        ))}
      </nav>
      {/* Back to Home */}
      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <Home className="w-5 h-5 shrink-0" />
          <span className="font-medium">{t('Back to Home')}</span>
        </Link>
      </div>
    </aside>
  )
}
