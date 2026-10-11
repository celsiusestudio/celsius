import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.svg'
import dcPhoto from '../assets/dc.webp'
import LangToggle from '../components/LangToggle'
import '../App.css'
import './Nosotros.css'

const team = [
  {
    name: 'Nombre Apellido',
    role: 'CEO & Founder',
    bio: 'Especialista en interfaces y experiencias digitales. Enfocado en la claridad y la intención detrás de cada decisión visual.',
    img: dcPhoto,
  },
  {
    name: 'Nombre Apellido',
    role: 'CTO',
    bio: 'Responsable de la identidad de marca y la coherencia visual en cada proyecto. Apasionado por el diseño como herramienta de comunicación.',
  },
  {
    name: 'Nombre Apellido',
    role: 'Creative Director',
    bio: 'Construye las interfaces que el equipo diseña. Cree que el código bien escrito es tan importante como un buen trazo.',
  },
]

export default function Nosotros() {
  const { t } = useTranslation('global')

  return (
    <div className="nosotros-page">
      <header className="navbar nosotros-navbar">
        <div className="navbar__logo">
          <Link to="/"><img src={logo} alt="Celsius Studio" className="logo-img" /></Link>
        </div>
        <nav className="navbar__nav">
          <Link to="/">{t('nav.inicio')}</Link>
          <Link to="/nosotros">{t('nav.nosotros')}</Link>
          <a href="/#galeria">{t('nav.galeria')}</a>
          <a href="/#umbral">{t('nav.umbral')}</a>
          <a href="/#contacto">{t('nav.contacto')}</a>
        </nav>
        <LangToggle />
      </header>

      <div className="nosotros-hero">
        <h1 className="nosotros-hero__title">{t('nosotros.heroTitle')}</h1>
        <p className="nosotros-hero__sub">{t('nosotros.heroSub')}</p>
      </div>

      <section className="nosotros-section">
        <p className="nosotros-section__label">{t('nosotros.whoLabel')}</p>
        <p className="nosotros-section__body">{t('nosotros.whoBody')}</p>
      </section>

      <section className="nosotros-section nosotros-section--alt">
        <p className="nosotros-section__label">{t('nosotros.howLabel')}</p>
        <p className="nosotros-section__body">{t('nosotros.howBody')}</p>
      </section>

      <section className="nosotros-team">
        <div className="nosotros-team__header">
          <p className="nosotros-section__label">{t('nosotros.teamLabel')}</p>
        </div>
        <div className="nosotros-team__grid">
          {team.map((member, i) => (
            <div className="team-card" key={i}>
              <div className="team-card__photo">
                {member.img && <img src={member.img} alt={member.name} className="team-card__photo-img" />}
              </div>
              <div className="team-card__info">
                <p className="team-card__role">{member.role}</p>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
