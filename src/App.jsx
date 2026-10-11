import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LangToggle from './components/LangToggle'
import logo from './assets/logo.svg'
import starGreen from './assets/star-green.png'
import starBlack from './assets/star-black.png'
import bgVideo from './assets/vid.mp4'
import teapotRaw from './assets/teapot.svg?raw'
import './App.css'

const teapotMaskUrl = (() => {
  const white = teapotRaw.replace(/fill="url\([^)]+\)"/g, 'fill="white"')
  return `data:image/svg+xml;base64,${btoa(white)}`
})()

const VISIBLE = 3
const SLIDE_OFFSET = VISIBLE


export default function App() {
  const { t } = useTranslation('global')
  const phrases = t('home.phrases', { returnObjects: true })
  const clients = t('clients.items', { returnObjects: true })
  const extendedClients = [
    ...clients.slice(-VISIBLE),
    ...clients,
    ...clients.slice(0, VISIBLE),
  ]

  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [spinning, setSpinning] = useState(false)
  const heroRef = useRef(null)
  const teapotFillRef = useRef(null)
  const sectionRef = useRef(null)
  const [slideIdx, setSlideIdx] = useState(SLIDE_OFFSET)
  const [slideOn, setSlideOn] = useState(true)
  const [slidePaused, setSlidePaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSpinning(true)
      setTimeout(() => setSpinning(false), 750)

      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(interval)
  }, [])


  // Carousel: auto-advance
  const goNext = useCallback(() => setSlideIdx(i => i + 1), [])
  const goPrev = useCallback(() => setSlideIdx(i => i - 1), [])

  useEffect(() => {
    if (slidePaused) return
    const id = setInterval(goNext, 3500)
    return () => clearInterval(id)
  }, [slidePaused, goNext])

  // Carousel: boundary wrap (seamless clone technique)
  useEffect(() => {
    const realEnd = SLIDE_OFFSET + clients.length
    if (slideIdx >= realEnd) {
      const t = setTimeout(() => { setSlideOn(false); setSlideIdx(SLIDE_OFFSET) }, 520)
      return () => clearTimeout(t)
    }
    if (slideIdx < SLIDE_OFFSET) {
      const t = setTimeout(() => { setSlideOn(false); setSlideIdx(realEnd - 1) }, 520)
      return () => clearTimeout(t)
    }
  }, [slideIdx, clients.length])

  // Carousel: re-enable transition after snap
  useEffect(() => {
    if (!slideOn) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setSlideOn(true)))
      return () => cancelAnimationFrame(id)
    }
  }, [slideOn])

  // Mouse-follow glow inside teapot
  useEffect(() => {
    const section = sectionRef.current
    const fill = teapotFillRef.current
    if (!section || !fill) return
    const onMouseMove = (e) => {
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      section.style.setProperty('--mx', `${x}%`)
      section.style.setProperty('--my', `${y}%`)
    }
    section.addEventListener('mousemove', onMouseMove)
    return () => section.removeEventListener('mousemove', onMouseMove)
  }, [])

  // Fade out hero content as user scrolls
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.65), 1)
      heroRef.current.style.setProperty('--exit', progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])


  return (
    <div className="site">
      <div className="landing">
        <video className="bg-video" src={bgVideo} autoPlay muted loop playsInline />
        <header className="navbar">
          <div className="navbar__logo">
            <img src={logo} alt="Celsius Studio" className="logo-img" />
          </div>
          <nav className="navbar__nav">
            <a href="#inicio">{t('nav.inicio')}</a>
            <Link to="/nosotros">{t('nav.nosotros')}</Link>
            <a href="#galeria">{t('nav.galeria')}</a>
            <a href="#umbral">{t('nav.umbral')}</a>
            <a href="#contacto">{t('nav.contacto')}</a>
          </nav>
          <LangToggle />
        </header>

        <main className="hero" ref={heroRef}>
          <h1 className="hero__headline">
            <span className="hero__text-dark">{t('home.heroPrefix')}</span>
            <span className="hero__star-wrap">
              <img src={starGreen} alt="" className={`hero__star ${spinning ? 'star-spin' : ''}`} />
            </span>
            <span className="hero__phrase-wrap">
              <span className={`hero__text-green ${visible ? 'phrase-in' : 'phrase-out'}`}>
                {phrases[index]}
              </span>
            </span>
          </h1>
        </main>
      </div>

      <div className="stripe-green" />

      <section className="section-white" ref={sectionRef}>
        <div className="studio-tagline">
          <p className="studio-tagline__text">{t('home.quoteText')}</p>
          <span className="studio-tagline__author">{t('home.quoteAuthor')}</span>
        </div>
        <div className="teapot-hole" aria-hidden="true">
          <div
            ref={teapotFillRef}
            className="teapot-hole__fill"
            style={{ WebkitMaskImage: `url("${teapotMaskUrl}")`, maskImage: `url("${teapotMaskUrl}")` }}
          />
        </div>
      </section>

      <section
        className="section-clients"
        onMouseEnter={() => setSlidePaused(true)}
        onMouseLeave={() => setSlidePaused(false)}
      >
        <div className="section-clients__header">
          <p className="section-clients__label">{t('clients.label')}</p>
          <div className="carousel-nav">
            <button className="carousel-btn" onClick={goPrev} aria-label="Anterior">←</button>
            <button className="carousel-btn" onClick={goNext} aria-label="Siguiente">→</button>
          </div>
        </div>
        <div className="clients-carousel">
          <div
            className="clients-track"
            style={{
              transform: `translateX(calc(${-slideIdx} * (100% / ${VISIBLE})))`,
              transition: slideOn ? 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
            }}
          >
            {extendedClients.map((c, i) => (
              <div key={i} className="client-card">
                <div className="client-card__logo" aria-label="Logo de empresa" />
                <blockquote className="client-card__quote">"{c.quote}"</blockquote>
                <div className="client-card__author">
                  <div className="client-card__photo" aria-label="Foto de perfil" />
                  <div>
                    <p className="client-card__name">{c.name}</p>
                    <p className="client-card__role">{c.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="corner-icon" aria-hidden="true">
        <img src={starBlack} alt="" className={spinning ? 'star-spin' : ''} />
      </div>
    </div>
  )
}
