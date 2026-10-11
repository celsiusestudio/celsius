import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.svg'
import LangToggle from './LangToggle'

export default function GlassNavbar() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation('global')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const scrollingUp = y < lastY
      const pastLanding = y > window.innerHeight * 0.4
      setVisible(scrollingUp && pastLanding)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`glass-nav${visible ? ' glass-nav--visible' : ''}`}>
      <div className="glass-nav__logo">
        <Link to="/"><img src={logo} alt="Celsius Studio" className="glass-nav__logo-img" /></Link>
      </div>
      <div className="glass-nav__links">
        <Link to="/">{t('nav.inicio')}</Link>
        <Link to="/nosotros">{t('nav.nosotros')}</Link>
        <a href="/#galeria">{t('nav.galeria')}</a>
        <a href="/#umbral">{t('nav.umbral')}</a>
        <a href="/#contacto">{t('nav.contacto')}</a>
      </div>
      <div className="glass-nav__lang">
        <LangToggle />
      </div>
    </nav>
  )
}
