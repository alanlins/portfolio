import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import ptBR from './pt-BR.json'
import enUS from './en-US.json'
import esES from './es-ES.json'

export const supportedLanguages = ['pt-BR', 'en-US', 'es-ES'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'pt-BR': { translation: ptBR },
      'en-US': { translation: enUS },
      'es-ES': { translation: esES },
    },
    fallbackLng: 'pt-BR',
    supportedLngs: supportedLanguages,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'portfolio-language',
      caches: ['localStorage'],
    },
  })

function syncHtmlLang(lng: string) {
  if (typeof document !== 'undefined') document.documentElement.lang = lng
}

i18n.on('languageChanged', syncHtmlLang)
if (i18n.resolvedLanguage) syncHtmlLang(i18n.resolvedLanguage)

export default i18n
