'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import {
  SUPPORTED_LANGUAGES,
  translations,
  isRTL,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type TranslationKey,
  type LanguageInfo,
} from '@/lib/i18n'

// Re-export for backwards compatibility
export { SUPPORTED_LANGUAGES, isRTL }
export type LanguageCode = string

interface TranslationCache {
  [key: string]: string // key format: "text::targetLang"
}

interface TranslationContextValue {
  currentLanguage: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  translate: (text: string) => Promise<string>
  translateBatch: (texts: string[]) => Promise<string[]>
  isTranslating: boolean
  t: (key: string, params?: Record<string, string | number>) => string // Translation function (supports typed keys and raw text fallback)
  isRTL: boolean // Whether current language is RTL
  getCachedTranslation: (text: string) => string | null
}

const TranslationContext = createContext<TranslationContextValue | undefined>(undefined)

const STORAGE_KEY = LANGUAGE_STORAGE_KEY
const CACHE_STORAGE_KEY = 'bizy_translation_cache'

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE)
  const [cache, setCache] = useState<TranslationCache>({})
  const [isTranslating, setIsTranslating] = useState(false)

  // Load saved language and cache on mount
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const savedLang = localStorage.getItem(STORAGE_KEY) as LanguageCode
    if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
      setCurrentLanguage(savedLang)
    }

    const savedCache = localStorage.getItem(CACHE_STORAGE_KEY)
    if (savedCache) {
      try {
        setCache(JSON.parse(savedCache))
      } catch {
        // Invalid cache, ignore
      }
    }
  }, [])

  // Save language preference
  const setLanguage = useCallback((lang: LanguageCode) => {
    setCurrentLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [])

  // Save cache periodically
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cacheString = JSON.stringify(cache)
    // Only save if cache has changed and isn't too large (< 5MB)
    if (cacheString.length < 5 * 1024 * 1024) {
      localStorage.setItem(CACHE_STORAGE_KEY, cacheString)
    }
  }, [cache])

  // Get cache key
  const getCacheKey = useCallback(
    (text: string, lang: LanguageCode = currentLanguage) => `${text}::${lang}`,
    [currentLanguage]
  )

  // Get cached translation (for dynamic text that was previously translated via API)
  const getCachedTranslation = useCallback(
    (text: string): string | null => {
      if (currentLanguage === 'en') return text
      const key = getCacheKey(text)
      return cache[key] || null
    },
    [cache, currentLanguage, getCacheKey]
  )

  // Typed translation function using static translation files
  // Also supports raw text fallback for backward compatibility
  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      // Get translation from typed translation files
      const langTranslations = translations[currentLanguage] || translations[DEFAULT_LANGUAGE]
      
      // Try to find the key in translations, otherwise return the key as-is (for raw text)
      let text = (langTranslations as unknown as Record<string, string>)[key] 
        || (translations[DEFAULT_LANGUAGE] as unknown as Record<string, string>)[key] 
        || key
      
      // Replace parameters like {year} with actual values
      if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
          text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value))
        })
      }
      
      return text
    },
    [currentLanguage]
  )

  // Async translation with API call
  const translate = useCallback(
    async (text: string): Promise<string> => {
      if (currentLanguage === 'en') return text
      if (!text.trim()) return text

      // Check cache first
      const cached = getCachedTranslation(text)
      if (cached) return cached

      setIsTranslating(true)
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            targetLanguage: currentLanguage,
          }),
        })

        if (!response.ok) {
          console.error('Translation failed')
          return text
        }

        const data = await response.json()
        const translated = data.translatedText || text

        // Cache the result
        setCache((prev) => ({
          ...prev,
          [getCacheKey(text)]: translated,
        }))

        return translated
      } catch (error) {
        console.error('Translation error:', error)
        return text
      } finally {
        setIsTranslating(false)
      }
    },
    [currentLanguage, getCachedTranslation, getCacheKey]
  )

  // Batch translation for efficiency
  const translateBatch = useCallback(
    async (texts: string[]): Promise<string[]> => {
      if (currentLanguage === 'en') return texts

      // Filter out already cached texts
      const uncachedTexts: string[] = []
      const results: (string | null)[] = texts.map((text) => {
        const cached = getCachedTranslation(text)
        if (cached) return cached
        uncachedTexts.push(text)
        return null
      })

      if (uncachedTexts.length === 0) {
        return results as string[]
      }

      setIsTranslating(true)
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            texts: uncachedTexts,
            targetLanguage: currentLanguage,
          }),
        })

        if (!response.ok) {
          return texts
        }

        const data = await response.json()
        const translations: string[] = data.translations || uncachedTexts

        // Cache all translations
        const newCache: TranslationCache = {}
        uncachedTexts.forEach((text, i) => {
          newCache[getCacheKey(text)] = translations[i]
        })
        setCache((prev) => ({ ...prev, ...newCache }))

        // Fill in the results
        let uncachedIndex = 0
        return results.map((result, i) => {
          if (result !== null) return result
          return translations[uncachedIndex++] || texts[i]
        })
      } catch (error) {
        console.error('Batch translation error:', error)
        return texts
      } finally {
        setIsTranslating(false)
      }
    },
    [currentLanguage, getCachedTranslation, getCacheKey]
  )

  // Calculate if current language is RTL
  const currentIsRTL = isRTL(currentLanguage)

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        translate,
        translateBatch,
        isTranslating,
        t,
        isRTL: currentIsRTL,
        getCachedTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}

// Helper to get language info
export function getLanguageInfo(code: LanguageCode) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)
}
