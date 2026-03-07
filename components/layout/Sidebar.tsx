// DASHBOARD ONLY - safe to merge
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/components/translation'
import { useUser } from '@auth0/nextjs-auth0/client'
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
  LogOut,
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
  const { user } = useUser()

  return (
    <aside className="w-[240px] shrink-0 min-h-screen bg-[#1E2A3B] flex flex-col font-['Inter',sans-serif]">
      <div className="p-6">
        <Link href="/dashboard" className="text-[22px] font-bold text-white flex items-center gap-2">
          {/* Mock V Logo from template */}
          <div className="w-6 h-6 bg-white text-[#2563EB] rounded-sm flex items-center justify-center font-black text-xs">B</div>
          Bizy
        </Link>
      </div>
      
      <nav className="flex-1 px-4 pb-4 space-y-1 overflow-y-auto mt-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-[#2563EB] text-white'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/10'
            }`}
          >
            <item.icon className="w-[18px] h-[18px] shrink-0" />
            <span className="text-sm font-medium">{t(item.label)}</span>
          </Link>
        ))}
      </nav>

      {/* User / Back to Home Section */}
      <div className="p-4 mt-auto space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
        >
          <Home className="w-[18px] h-[18px] shrink-0" />
          <span className="text-sm font-medium">{t('Back to Home')}</span>
        </Link>
        
        {/* User Dark Card Logout Button */}
        <a
          href="/api/auth/logout"
          className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </a>
      </div>
    </aside>
  )
}

