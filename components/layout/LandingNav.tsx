'use client'

import Link from 'next/link'
import { LanguageSelector, useTranslation } from '@/components/translation'

interface LandingNavProps {
  isLoggedIn: boolean
}

export function LandingNav({ isLoggedIn }: LandingNavProps) {
  const { t } = useTranslation()

  return (
    <div className="absolute top-0 inset-x-0 z-50 py-6">
      <nav className="flex items-center justify-between lg:grid lg:grid-cols-3 px-6 lg:px-10 max-w-screen-2xl mx-auto">
        {/* Left: Links */}
        <div className="hidden lg:flex items-center gap-8 justify-start">
          <Link href="#features" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors tracking-wide">
            {t('Features')}
          </Link>
          <Link href="#how-it-works" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors tracking-wide">
            {t('How It Works')}
          </Link>
          <Link href="#use-cases" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors tracking-wide">
            {t('Use Cases')}
          </Link>
          <Link href="#pricing" className="text-[15px] font-medium text-white/80 hover:text-white transition-colors tracking-wide">
            {t('Pricing')}
          </Link>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-start lg:justify-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-white text-brand-primary flex items-center justify-center font-bold text-lg leading-none">
              B
            </div>
            <span className="text-2xl font-heading font-bold tracking-tight text-white group-hover:text-white/90 transition-colors">
              Bizy
            </span>
          </Link>
        </div>

        {/* Right: Auth */}
        <div className="flex items-center gap-6 justify-end">
          <div className="hidden lg:block">
            <LanguageSelector variant="compact" theme="dark" />
          </div>
          {isLoggedIn ? (
            <>
              <Link href="/api/auth/logout" className="hidden sm:block text-[15px] font-medium text-white/80 hover:text-white transition-colors">
                {t('Logout')}
              </Link>
              <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white text-brand-primary hover:bg-gray-100 transition-colors font-medium text-[15px]">
                {t('Dashboard')}
              </Link>
            </>
          ) : (
            <>
              <Link href="/api/auth/login?returnTo=/onboarding" className="hidden sm:block text-[15px] font-medium text-white/80 hover:text-white transition-colors">
                {t('Login')}
              </Link>
              <Link href="/api/auth/login?returnTo=/onboarding" className="px-6 py-2.5 rounded-full bg-white text-brand-primary hover:bg-gray-100 transition-colors font-medium text-[15px]">
                {t('Sign Up')}
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
