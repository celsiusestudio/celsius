import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './locales/es/global.json'
import en from './locales/en/global.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { global: es },
      en: { global: en },
    },
    lng: 'es',
    fallbackLng: 'es',
    defaultNS: 'global',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
