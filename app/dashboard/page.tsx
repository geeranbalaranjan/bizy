// DASHBOARD ONLY - safe to merge
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Zap,
  Map,
  Store,
  User,
  FileText,
  Award,
  Users,
  Calculator,
  CalendarClock,
  Sparkles,
  MapPin,
  BarChart3,
  DollarSign,
  Bell,
  Search,
} from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/components/translation'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useUser()
  const { businessProfile, loading, needsOnboarding } = useBusinessProfile()
  const { t } = useTranslation()

  // Redirect to onboarding if no profile
  useEffect(() => {
    if (!loading && needsOnboarding) {
      router.push('/onboarding')
    }
  }, [loading, needsOnboarding, router])

  const cards = [
    {
      title: t('Viability Scan'),
      description: t('Validate your business idea'),
      href: '/dashboard/viability',
      icon: Zap,
      color: 'text-[#2563EB]',
      bgColor: 'bg-[#2563EB]/10',
    },
    {
      title: t('Launch Roadmap'),
      description: t('Your step-by-step launch checklist'),
      href: '/dashboard/roadmap',
      icon: Map,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
    },
    {
      title: t('CRA Document Hub'),
      description: t('Tax forms and CRA resources'),
      href: '/dashboard/compliance/cra',
      icon: FileText,
      color: 'text-[#EF4444]',
      bgColor: 'bg-[#EF4444]/10',
    },
    {
      title: t('License Navigator'),
      description: t('Required permits and licenses'),
      href: '/dashboard/compliance/licenses',
      icon: Award,
      color: 'text-[#F59E0B]',
      bgColor: 'bg-[#F59E0B]/10',
    },
    {
      title: t('HR Onboarding'),
      description: t('Employee setup and compliance'),
      href: '/dashboard/compliance/hr',
      icon: Users,
      color: 'text-[#2563EB]',
      bgColor: 'bg-[#2563EB]/10',
    },
    {
      title: t('Break-Even Calculator'),
      description: t('Calculate your profitability'),
      href: '/dashboard/calculator',
      icon: Calculator,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
    },
    {
      title: t('Tax Calendar'),
      description: t('Important tax deadlines'),
      href: '/dashboard/tax-calendar',
      icon: CalendarClock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: t('Name Generator'),
      description: t('AI-powered business names'),
      href: '/dashboard/name-generator',
      icon: Sparkles,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
    {
      title: t('Competitor Map'),
      description: t('Find nearby competitors'),
      href: '/dashboard/competitor-map',
      icon: MapPin,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('Analytics'),
      description: t('Business insights and metrics'),
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
    },
    {
      title: t('Grants & Funding'),
      description: t('Find funding opportunities'),
      href: '/dashboard/grants',
      icon: DollarSign,
      color: 'text-[#22C55E]',
      bgColor: 'bg-[#22C55E]/10',
    },
    {
      title: t('Storefront'),
      description: t('Build your online presence'),
      href: '/dashboard/storefront',
      icon: Store,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ]

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh] font-['Inter',sans-serif]">
        <div className="animate-pulse text-gray-500">{t('Loading...')}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row w-full font-['Inter',sans-serif]">
      {/* Main Area (Off-white Grey) - Now Full Width */}
      <div className="flex-1 bg-[#F1F5F9] flex flex-col w-full">
        
        {/* Top Header Banner */}
        <div className="bg-white px-8 py-6 flex sm:flex-row flex-col sm:justify-between items-start sm:items-center gap-6 border-b border-[#E2E8F0]">
          {/* Welcome Info */}
          <div className="flex items-center gap-5">
            {user?.picture ? (
              <img
                src={user.picture}
                alt={user.name || 'User'}
                className="w-16 h-16 rounded-full border-2 border-[#E2E8F0] shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 border border-[#E2E8F0] shadow-sm flex items-center justify-center">
                <User className="w-7 h-7 text-gray-400" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500 mb-0.5">{t('Welcome back')},</p>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight flex items-center gap-3">
                {businessProfile?.businessName || t('Bizy User')}
              </h1>
              
              {/* Inline Profile Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {businessProfile?.businessType && (
                  <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200/60">
                    <Store className="w-3.5 h-3.5 text-gray-500" />
                    <span className="capitalize">{businessProfile.businessType}</span>
                  </div>
                )}
                {businessProfile?.city && (
                  <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200/60">
                    <MapPin className="w-3.5 h-3.5 text-gray-500" />
                    <span>{businessProfile.city}, {businessProfile.province}</span>
                  </div>
                )}
                {businessProfile?.stage && (
                  <div className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200/60">
                    <Zap className="w-3.5 h-3.5 text-gray-500" />
                    <span className="capitalize">{businessProfile.stage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <div className="absolute top-0 right-0.5 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-white"></div>
            </div>
            
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search here" 
                className="w-full pl-4 pr-10 py-2.5 rounded-full border border-[#E2E8F0] bg-[#F1F5F9] text-sm font-normal text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2563EB] focus:border-[#2563EB] transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Main Content Actions */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">
            {t('What would you like to do?')}
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="p-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map(({ title, description, href, icon: Icon, color, bgColor }) => (
            <Link
              key={href}
              href={href}
              className="bg-white p-5 rounded-xl border border-[#E2E8F0] hover:shadow-md transition-all group flex flex-col gap-4 hover:-translate-y-0.5"
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${bgColor} ${color} transition-transform group-hover:scale-105`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900 mb-0.5">
                  {title}
                </h2>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

