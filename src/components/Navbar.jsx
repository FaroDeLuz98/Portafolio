import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRightIcon,
  CloseIcon,
  MenuIcon,
  SlidersIcon,
} from './Icons.jsx';
import Magnetic from './Magnetic.jsx';
import ScrambleText from './ScrambleText.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

/**
 * Enlaces del menú principal.
 * El `id` debe coincidir con el id de cada <section>.
 */
const NAV_ITEMS = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'actividad', label: 'GitHub' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'contacto', label: 'Contacto' },
];

/**
 * Detecta qué sección está visible para marcar el enlace activo.
 * Usa IntersectionObserver (nativo y muy liviano) en lugar de escuchar
 * el scroll constantemente.
 */
function useActiveSection() {
  const [active, setActive] = useState('inicio');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);
    const home = document.getElementById('inicio');
    if (home) sections.unshift(home);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * NAVBAR · Barra de navegación fija con acceso al Estudio Visual
 * --------------------------------------------------------------
 * - Se vuelve más opaca al scrollear (clase .is-scrolled).
 * - Marca la sección activa con una píldora animada (layoutId).
 * - Incluye acceso rápido para personalizar letras, animaciones y 3D.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const { isMinimalMotion, setCustomizerOpen } = usePreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 861px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <motion.header
      className={`topbar${scrolled ? ' is-scrolled' : ''}`}
      initial={isMinimalMotion ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="top-inner shell">
        {/* Marca personal con efecto scramble al pasar el mouse */}
        <a className="mark" href="#inicio" aria-label="Ir al inicio">
          <span className="mark-icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span className="mark-text">
            <ScrambleText text="fernando" speed={30} />
            <span className="muted">.dev</span>
          </span>
        </a>

        {/* Navegación de escritorio */}
        <nav className="main-nav" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={isActive ? 'active' : ''}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    className="nav-pill"
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="nav-label">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-studio-btn"
            onClick={() => setCustomizerOpen((v) => !v)}
            title="Configurar letras, animaciones y 3D"
          >
            <SlidersIcon size={14} />
            <span>Ajustar vista</span>
          </button>

          <Magnetic strength={0.22}>
            <a className="header-cta" href="#contacto">
              Hablemos
              <ArrowUpRightIcon size={14} />
            </a>
          </Magnetic>
        </div>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`mobile-backdrop${open ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <nav
        id="mobile-nav"
        className={`mobile-nav${open ? ' is-open' : ''}`}
        aria-label="Navegación móvil"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="mobile-nav-inner">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <ArrowUpRightIcon size={16} />
            </a>
          ))}

          <button
            type="button"
            className="btn ghost mobile-studio-trigger"
            onClick={() => {
              setOpen(false);
              setCustomizerOpen(true);
            }}
          >
            <SlidersIcon size={16} />
            Configurar letras, 3D y animaciones
          </button>

          <a
            className="btn primary mobile-cta"
            href={`mailto:${contact.email}`}
            onClick={() => setOpen(false)}
          >
            Escribime un correo
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
