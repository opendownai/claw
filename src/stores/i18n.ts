import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Language, Translations } from '@/utils/i18n'
import { translations, detectLanguage } from '@/utils/i18n'

export const useI18nStore = defineStore('i18n', () => {
  const language = ref<Language>(detectLanguage())

  const t = computed(() => translations[language.value])
  const isLanguageLoaded = computed(() => true)

  function setLanguage(lang: Language) {
    language.value = lang
    localStorage.setItem('language', lang)
  }

  function toggleLanguage() {
    setLanguage(language.value === 'zh' ? 'en' : 'zh')
  }

  return {
    language,
    t,
    isLanguageLoaded,
    setLanguage,
    toggleLanguage
  }
})
