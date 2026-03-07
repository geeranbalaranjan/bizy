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
import { useTranslation } from '@/components/translation'

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
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10',
    },
    {
      title: t('Launch Roadmap'),
      description: t('Your step-by-step launch checklist'),
      href: '/dashboard/roadmap',
      icon: Map,
      color: 'text-brand-highlight',
      bgColor: 'bg-brand-highlight/10',
    },
    {
      title: t('CRA Document Hub'),
      description: t('Tax forms and CRA resources'),
      href: '/dashboard/compliance/cra',
      icon: FileText,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
    {
      title: t('License Navigator'),
      description: t('Required permits and licenses'),
      href: '/dashboard/compliance/licenses',
      icon: Award,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
    {
      title: t('HR Onboarding'),
      description: t('Employee setup and compliance'),
      href: '/dashboard/compliance/hr',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: t('Break-Even Calculator'),
      description: t('Calculate your profitability'),
      href: '/dashboard/calculator',
      icon: Calculator,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
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
      color: 'text-green-500',
      bgColor: 'bg-green-50',
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
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-gray-500">{t('Loading...')}</div>
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
              {t('Welcome back')}{businessProfile?.businessName ? `, ${businessProfile.businessName}` : ''}
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
                <span className="text-gray-500">{t('Business Type')}:</span>{' '}
                <span className="font-medium text-brand-primary capitalize">
                  {businessProfile.businessType}
                </span>
              </div>
              <div>
                <span className="text-gray-500">{t('Location')}:</span>{' '}
                <span className="font-medium text-brand-primary">
                  {businessProfile.city}, {businessProfile.province}
                </span>
              </div>
              <div>
                <span className="text-gray-500">{t('Stage')}:</span>{' '}
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
        {t('What would you like to do?')}
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map(({ title, description, href, icon: Icon, color, bgColor }) => (
          <Link
            key={href}
            href={href}
            className="p-5 rounded-xl border border-gray-200 bg-white hover:border-brand-accent/50 hover:shadow-md transition-all group"
          >
            <div className={`p-2.5 w-fit rounded-lg ${bgColor} ${color} group-hover:scale-110 transition-transform`}>
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-base font-heading font-semibold text-brand-primary mt-3 mb-1">
              {title}
            </h2>
            <p className="text-gray-500 text-sm line-clamp-2">{description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
