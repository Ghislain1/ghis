export const languages = ['en', 'de', 'fr'] as const

export type Language = (typeof languages)[number]
export type TranslationLanguage = Exclude<Language, 'en'>

export const defaultLanguage: Language = 'en'
export const languageStorageKey = 'ghis-language'

export const languageNames: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && (languages as readonly string[]).includes(value)
}

export function languageFromUrl(search: string, hash = ''): Language | undefined {
  const query = new URLSearchParams(search).get('lang')
  if (isLanguage(query)) return query

  const fragment = hash.replace(/^#\/?/, '')
  return isLanguage(fragment) ? fragment : undefined
}

export function initialLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage

  const fromUrl = languageFromUrl(window.location.search, window.location.hash)
  if (fromUrl) return fromUrl

  const stored = window.localStorage.getItem(languageStorageKey)
  if (isLanguage(stored)) return stored

  const browserLanguage = (window.navigator.languages?.[0] ?? window.navigator.language ?? '')
    .slice(0, 2)
    .toLowerCase()

  return isLanguage(browserLanguage) ? browserLanguage : defaultLanguage
}
