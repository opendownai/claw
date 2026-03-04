'use client'

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { Language, translations, Translations, detectLanguage } from './i18n'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  isLanguageLoaded: boolean
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh')
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false)

  useEffect(() => {
    const lang = detectLanguage()
    setLanguageState(lang)
    setIsLanguageLoaded(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = useMemo(() => translations[language], [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    isLanguageLoaded
  }), [language, t, isLanguageLoaded])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
