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
} from 'lucide-react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useBusinessProfile } from '@/hooks/useBusinessProfile'
import { useTranslation } from '@/context/TranslationContext'
import type { TranslationKey } from '@/lib/i18n'

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

  const cards: Array<{
    titleKey: TranslationKey
    descriptionKey: TranslationKey
    href: string
    icon: typeof Zap
    color: string
    bgColor: string
  }> = [
    {
      titleKey: 'dashboard.card.viability.title',
      descriptionKey: 'dashboard.card.viability.description',
      href: '/dashboard/viability',
      icon: Zap,
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10',
    },
    {
      titleKey: 'dashboard.card.roadmap.title',
      descriptionKey: 'dashboard.card.roadmap.description',
      href: '/dashboard/roadmap',
      icon: Map,
      color: 'text-brand-highlight',
      bgColor: 'bg-brand-highlight/10',
    },
    {
      titleKey: 'dashboard.card.cra.title',
      descriptionKey: 'dashboard.card.cra.description',
      href: '/dashboard/compliance/cra',
      icon: FileText,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      titleKey: 'dashboard.card.licenses.title',
      descriptionKey: 'dashboard.card.licenses.description',
      href: '/dashboard/compliance/licenses',
      icon: Award,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      titleKey: 'dashboard.card.hr.title',
      descriptionKey: 'dashboard.card.hr.description',
      href: '/dashboard/compliance/hr',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      titleKey: 'dashboard.card.calculator.title',
      descriptionKey: 'dashboard.card.calculator.description',
      href: '/dashboard/calculator',
      icon: Calculator,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      titleKey: 'dashboard.card.taxCalendar.title',
      descriptionKey: 'dashboard.card.taxCalendar.description',
      href: '/dashboard/tax-calendar',
      icon: CalendarClock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      titleKey: 'dashboard.card.nameGenerator.title',
      descriptionKey: 'dashboard.card.nameGenerator.description',
      href: '/dashboard/name-generator',
      icon: Sparkles,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
    },
    {
      titleKey: 'dashboard.card.competitorMap.title',
      descriptionKey: 'dashboard.card.competitorMap.description',
      href: '/dashboard/competitor-map',
      icon: MapPin,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      titleKey: 'dashboard.card.analytics.title',
      descriptionKey: 'dashboard.card.analytics.description',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
    },
    {
      titleKey: 'dashboard.card.grants.title',
      descriptionKey: 'dashboard.card.grants.description',
      href: '/dashboard/grants',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      titleKey: 'dashboard.card.storefront.title',
      descriptionKey: 'dashboard.card.storefront.description',
      href: '/dashboard/storefront',
      icon: Store,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ]

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-500">{t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name || 'User'}
              className="w-12 h-12 rounded-full border-2 border-brand-accent"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-heading font-bold text-brand-primary">
              {t('dashboard.welcomeBack')}{businessProfile?.businessName ? `, ${businessProfile.businessName}` : ''}
            </h1>
            {user?.email && (
              <p className="text-gray-500 text-sm">{user.email}</p>
            )}
          </div>
        </div>
        
        {/* Business Profile Summary */}
        {businessProfile && (
          <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm">
              <div>
                <span className="text-gray-500">{t('dashboard.businessType')}:</span>{' '}
                <span className="font-medium text-brand-primary capitalize">
                  {businessProfile.businessType}
                </span>
              </div>
              <div>
                <span className="text-gray-500">{t('dashboard.location')}:</span>{' '}
                <span className="font-medium text-brand-primary">
                  {businessProfile.city}, {businessProfile.province}
                </span>
              </div>
              <div>
                <span className="text-gray-500">{t('dashboard.stage')}:</span>{' '}
                <span className="font-medium text-brand-primary capitalize">
                  {businessProfile.stage}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Feature Cards */}
      <h2 className="text-xl font-heading font-semibold text-brand-primary mb-4">
        {t('dashboard.whatToDo')}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map(({ titleKey, descriptionKey, href, icon: Icon, color, bgColor }) => (
          <Link
            key={href}
            href={href}
            className="p-5 rounded-xl border border-gray-200 bg-white hover:border-brand-accent/50 hover:shadow-md transition-all group"
          >
            <div className={`p-2.5 w-fit rounded-lg ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-base font-heading font-semibold text-brand-primary mt-3 mb-1">
              {t(titleKey)}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2">{t(descriptionKey)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
