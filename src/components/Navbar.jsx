import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRightIcon,
  CloseIcon,
  InfoIcon,
  MenuIcon,
  SlidersIcon,
} from './Icons.jsx';
import Magnetic from './Magnetic.jsx';
import ScrambleText from './ScrambleText.jsx';
import GitHubAvatar from './GitHubAvatar.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

const NAV_ITEMS = [
  { id: 'sobre-mi', label: 'Perfil & Stack' },
  { id: 'proyectos', label: 'Sitios web' },
  { id: 'experiencia', label: 'Trayectoria' },
  { id: 'actividad', label: 'GitHub' },
  { id: 'contacto', label: 'Contacto' },
];

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
      { rootMargin: '-40% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

function useUruguayTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () => {
      try {
        const now = new Date();
        setTime(
          new Intl.DateTimeFormat('es-UY', {
            timeZone: 'America/Montevideo',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now)
        );
      } catch {
        setTime('');
      }
    };
    format();
    const id = window.setInterval(format, 30000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

/**
 * NAVBAR · Cápsula ejecutiva flotante con acceso a la Guía Simple IT
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const uyTime = useUruguayTime();
  const { isMinimalMotion, setCustomizerOpen, openTechExplainer } =
    usePreferences();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 901px)');
    const onChange = (e) => {
      if (e.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <motion.header
      className={`nav-wrapper${scrolled ? ' is-scrolled' : ''}`}
      initial={isMinimalMotion ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-capsule shell">
        <a className="brand" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-monogram" aria-hidden="true">
            <GitHubAvatar size={80} alt="" />
          </span>
          <span className="brand-wordmark">
            <ScrambleText text="fernando" speed={28} />
            <span className="brand-dot">.dev</span>
          </span>
        </a>

        <nav className="capsule-links" aria-label="Navegación principal">
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
                    className="capsule-active-pill"
                    layoutId="capsule-active-pill"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="capsule-link-text">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="capsule-right">
          {uyTime && (
            <span className="uy-clock" title="Hora local en Uruguay (UTC-3)">
              <i aria-hidden="true" /> UY {uyTime}
            </span>
          )}

          <button
            type="button"
            className="capsule-guide-btn"
            onClick={() => openTechExplainer('React')}
            title="¿No venís del área IT? Mirá qué hace cada tecnología en palabras simples"
          >
            <InfoIcon size={14} />
            <span>Guía IT</span>
          </button>

          <button
            type="button"
            className="capsule-studio-btn"
            onClick={() => setCustomizerOpen((v) => !v)}
            title="Configurar letras, animaciones y fondo 3D"
            aria-label="Abrir configurador visual"
          >
            <SlidersIcon size={15} />
          </button>

          <Magnetic strength={0.22}>
            <a className="capsule-cta" href="#contacto">
              <span>Contactar</span>
              <ArrowUpRightIcon size={14} />
            </a>
          </Magnetic>
        </div>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="mobile-drawer"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        className={`mobile-backdrop${open ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />

      <nav
        id="mobile-drawer"
        className={`mobile-drawer${open ? ' is-open' : ''}`}
        aria-label="Navegación móvil"
        aria-hidden={!open}
        inert={!open ? true : undefined}
      >
        <div className="mobile-drawer-inner">
          {NAV_ITEMS.map((item, idx) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <span className="mobile-idx">0{idx + 1}</span>
              <span>{item.label}</span>
              <ArrowUpRightIcon size={16} />
            </a>
          ))}

          <div className="mobile-drawer-actions">
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setOpen(false);
                openTechExplainer('React');
              }}
            >
              <InfoIcon size={16} />
              Guía simple de tecnologías
            </button>
            <button
              type="button"
              className="btn ghost"
              onClick={() => {
                setOpen(false);
                setCustomizerOpen(true);
              }}
            >
              <SlidersIcon size={16} />
              Personalizar letras y 3D
            </button>
            <a
              className="btn primary"
              href={`mailto:${contact.email}`}
              onClick={() => setOpen(false)}
            >
              Escribime un correo
            </a>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
