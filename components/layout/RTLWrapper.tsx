'use client'

import { useTranslation } from '@/context/TranslationContext'
import { useEffect } from 'react'

interface RTLWrapperProps {
  children: React.ReactNode
}

export function RTLWrapper({ children }: RTLWrapperProps) {
  const { currentLanguage, isRTL } = useTranslation()

  useEffect(() => {
    // Update document direction based on current language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = currentLanguage
  }, [currentLanguage, isRTL])

  return <>{children}</>
}
