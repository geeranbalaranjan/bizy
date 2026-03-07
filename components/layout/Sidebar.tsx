'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Zap,
  Map,
  Shield,
  BarChart3,
  DollarSign,
  Store,
  FileText,
  Award,
  Users,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/viability', label: 'Viability Scan', icon: Zap },
  { href: '/dashboard/roadmap', label: 'Launch Roadmap', icon: Map },
  {
    href: '/dashboard/compliance',
    label: 'Compliance Hub',
    icon: Shield,
    children: [
      { href: '/dashboard/compliance/cra', label: 'CRA Document Hub', icon: FileText },
      { href: '/dashboard/compliance/licenses', label: 'License Navigator', icon: Award },
      { href: '/dashboard/compliance/hr', label: 'HR Onboarding', icon: Users },
    ],
  },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/grants', label: 'Grants & Funding', icon: DollarSign },
  { href: '/dashboard/storefront', label: 'Storefront', icon: Store },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-brand-primary border-r border-white/10 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="text-xl font-heading font-bold text-white">
          Bizy
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-brand-accent/20 text-brand-accent'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium">{item.label}</span>
            </Link>
            {'children' in item &&
              item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors pl-12 ${
                    pathname === child.href
                      ? 'bg-brand-accent/20 text-brand-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <child.icon className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{child.label}</span>
                </Link>
              ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
