import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CloseIcon, MenuIcon, ArrowUpRightIcon } from './Icons.jsx';
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
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    );
    const home = document.getElementById('inicio');
    if (home) sections.unshift(home);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // La franja central del viewport decide qué sección está activa.
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

/**
 * NAVBAR · Barra de navegación fija
 * ---------------------------------
 * - Se vuelve más opaca al scrollear (clase .is-scrolled).
 * - Marca la sección activa con una píldora animada (layoutId).
 * - En móvil muestra un menú desplegable animado.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();

  // Estado visual de la barra al bajar por la página.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquea el scroll del cuerpo y permite cerrar el menú con Escape.
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

  // Si se agranda la ventana, el menú móvil se cierra solo.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 821px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <motion.header
      className={`topbar${scrolled ? ' is-scrolled' : ''}`}
      initial={reduceMotion ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="top-inner shell">
        {/* Marca personal */}
        <a className="mark" href="#inicio" aria-label="Ir al inicio">
          <span className="mark-icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <span>
            fernando<span className="muted">.dev</span>
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

        {/* Llamado a la acción visible en escritorio */}
        <a className="header-cta" href="#contacto">
          Hablemos
          <ArrowUpRightIcon size={14} />
        </a>

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

      {/* Menú móvil: se anima con CSS y queda fuera del foco cuando está cerrado */}
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
