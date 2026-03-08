'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/context/TranslationContext'
import type { TranslationKey } from '@/lib/i18n'
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

const navItems: Array<{ href: string; labelKey: TranslationKey; icon: typeof LayoutDashboard }> = [
  { href: '/dashboard', labelKey: 'sidebar.dashboard', icon: LayoutDashboard },
  { href: '/dashboard/viability', labelKey: 'sidebar.viabilityScan', icon: Zap },
  { href: '/dashboard/roadmap', labelKey: 'sidebar.launchRoadmap', icon: Map },
  { href: '/dashboard/compliance/cra', labelKey: 'sidebar.craDocumentHub', icon: FileText },
  { href: '/dashboard/compliance/licenses', labelKey: 'sidebar.licenseNavigator', icon: Award },
  { href: '/dashboard/compliance/hr', labelKey: 'sidebar.hrOnboarding', icon: Users },
  { href: '/dashboard/calculator', labelKey: 'sidebar.breakEvenCalculator', icon: Calculator },
  { href: '/dashboard/tax-calendar', labelKey: 'sidebar.taxCalendar', icon: CalendarClock },
  { href: '/dashboard/name-generator', labelKey: 'sidebar.nameGenerator', icon: Sparkles },
  { href: '/dashboard/competitor-map', labelKey: 'sidebar.competitorMap', icon: MapPin },
  { href: '/dashboard/analytics', labelKey: 'sidebar.analytics', icon: BarChart3 },
  { href: '/dashboard/grants', labelKey: 'sidebar.grantsAndFunding', icon: DollarSign },
  { href: '/dashboard/storefront', labelKey: 'sidebar.storefront', icon: Store },
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
            <span className="font-medium">{t(item.labelKey)}</span>
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
          <span className="font-medium">{t('nav.backToHome')}</span>
        </Link>
      </div>
    </aside>
  )
}
