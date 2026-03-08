import type { TranslationKeys, TranslationKey } from './types'

// Import all translation files
import { en } from './translations/en'
import { fr } from './translations/fr'
import { zh } from './translations/zh'
import { hi } from './translations/hi'
import { pa } from './translations/pa'
import { tl } from './translations/tl'
import { ar } from './translations/ar'
import { es } from './translations/es'
import { pt } from './translations/pt'
import { ur } from './translations/ur'
import { ko } from './translations/ko'
import { vi } from './translations/vi'

// Language metadata type
export interface LanguageInfo {
  code: string
  name: string
  nativeName: string
  rtl: boolean
  flag: string
}

// All supported languages with metadata
export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', rtl: false, flag: '🇬🇧' },
  { code: 'fr', name: 'French', nativeName: 'Français', rtl: false, flag: '🇫🇷' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', rtl: false, flag: '🇨🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', rtl: false, flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', rtl: false, flag: '🇮🇳' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', rtl: false, flag: '🇵🇭' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true, flag: '🇸🇦' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', rtl: false, flag: '🇪🇸' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', rtl: false, flag: '🇧🇷' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', rtl: true, flag: '🇵🇰' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', rtl: false, flag: '🇰🇷' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', rtl: false, flag: '🇻🇳' },
]

// Language code type
export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

// All translations keyed by language code
export const translations: Record<string, TranslationKeys> = {
  en,
  fr,
  zh,
  hi,
  pa,
  tl,
  ar,
  es,
  pt,
  ur,
  ko,
  vi,
}

// RTL languages
export const RTL_LANGUAGES = ['ar', 'ur'] as const
export type RTLLanguage = typeof RTL_LANGUAGES[number]

// Check if a language is RTL
export function isRTL(languageCode: string): boolean {
  return RTL_LANGUAGES.includes(languageCode as RTLLanguage)
}

// Get translation for a specific key and language
export function getTranslation(
  key: TranslationKey,
  languageCode: string,
  fallback: string = ''
): string {
  const lang = translations[languageCode] || translations.en
  return lang[key] || translations.en[key] || fallback
}

// Get all translations for a language
export function getTranslations(languageCode: string): TranslationKeys {
  return translations[languageCode] || translations.en
}

// Get language info by code
export function getLanguageInfo(code: string): LanguageInfo | undefined {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code)
}

// Default language
export const DEFAULT_LANGUAGE = 'en'

// LocalStorage key for persisting language preference
export const LANGUAGE_STORAGE_KEY = 'bizy-language'

// Re-export types
export type { TranslationKeys, TranslationKey } from './types'
