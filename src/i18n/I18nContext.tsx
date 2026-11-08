import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultLanguage,
  initialLanguage,
  languageStorageKey,
  type Language,
} from './language'
import { translate, type UiKey, type UiParams } from './ui'

type I18nValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: UiKey, params?: UiParams) => string
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem(languageStorageKey, language)
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)

    const url = new URL(window.location.href)
    if (next === defaultLanguage) {
      url.searchParams.delete('lang')
    } else {
      url.searchParams.set('lang', next)
    }
    window.history.replaceState(null, '', url.toString())
  }, [])

  const value = useMemo<I18nValue>(
    () => ({
      language,
      setLanguage,
      t: (key, params) => translate(language, key, params),
    }),
    [language, setLanguage],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}
