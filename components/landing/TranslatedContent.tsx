'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileCheck, Map, Store, Zap } from 'lucide-react'
import { useTranslation } from '@/components/translation'

interface TranslatedLandingContentProps {
  isLoggedIn: boolean
}

export function TranslatedHero({ isLoggedIn }: TranslatedLandingContentProps) {
  const { t } = useTranslation()
  
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
      <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight mb-6">
        {t('hero.headline1')}
        <br />
        <span className="text-[var(--brand-highlight)]">{t('hero.headline2')}</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
        {t('hero.subheadline')}
      </p>
      <Link
        href={isLoggedIn ? "/onboarding" : "/api/auth/login?returnTo=/onboarding"}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--brand-accent)] hover:opacity-90 transition-opacity font-semibold text-lg"
      >
        {t('hero.cta.start')}
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  )
}

export function TranslatedSteps() {
  const { t } = useTranslation()
  
  const steps = [
    {
      step: '01',
      icon: Zap,
      titleKey: 'features.viability.title' as const,
      descKey: 'features.viability.description' as const,
    },
    {
      step: '02',
      icon: Map,
      titleKey: 'features.roadmap.title' as const,
      descKey: 'features.roadmap.description' as const,
    },
    {
      step: '03',
      icon: FileCheck,
      titleKey: 'features.compliance.title' as const,
      descKey: 'features.compliance.description' as const,
    },
    {
      step: '04',
      icon: Store,
      titleKey: 'features.storefront.title' as const,
      descKey: 'features.storefront.description' as const,
    },
  ]

  return (
    <section className="relative py-24 bg-[var(--brand-secondary)]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          {t('features.headline')}
        </h2>
        <p className="text-gray-400 text-center max-w-xl mx-auto mb-16">
          {t('features.subheadline')}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ step, icon: Icon, titleKey, descKey }) => (
            <div
              key={step}
              className="relative p-6 rounded-2xl bg-[var(--brand-primary)]/60 border border-white/10 hover:border-[var(--brand-accent)]/50 transition-colors"
            >
              <span className="text-sm font-mono text-[var(--brand-highlight)]">
                {step}
              </span>
              <div className="mt-4 p-3 w-fit rounded-xl bg-[var(--brand-accent)]/20">
                <Icon className="w-6 h-6 text-[var(--brand-accent)]" />
              </div>
              <h3 className="text-xl font-heading font-semibold mt-4 mb-2">
                {t(titleKey)}
              </h3>
              <p className="text-gray-400 text-sm">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
