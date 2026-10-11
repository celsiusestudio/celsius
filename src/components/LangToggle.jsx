import { useTranslation } from 'react-i18next'

export default function LangToggle() {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div className="lang-toggle">
      <button
        className={`lang-toggle__opt${lang === 'es' ? ' is-active' : ''}`}
        onClick={() => i18n.changeLanguage('es')}
      >
        ES
      </button>
      <span className="lang-toggle__sep" aria-hidden="true">|</span>
      <button
        className={`lang-toggle__opt${lang === 'en' ? ' is-active' : ''}`}
        onClick={() => i18n.changeLanguage('en')}
      >
        EN
      </button>
    </div>
  )
}
