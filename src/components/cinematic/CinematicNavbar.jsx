import { useEffect, useRef, useState } from 'react';
import CinematicMotionToggle from './CinematicMotionToggle.jsx';
import { navSections } from '../../data/portfolioData.js';
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from './CinematicIcons.jsx';

export default function CinematicNavbar({ activeSection, onNavigate, onScrollLock, reducedMotion, onToggleMotion }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pendingNavigationRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    onScrollLock?.('mobile-menu', true);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.documentElement.style.overflow = prevOverflow;
      onScrollLock?.('mobile-menu', false);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, onScrollLock]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Cerrar el menú primero: Lenis está pausado mientras el overlay permanece abierto.
  // La navegación se ejecuta cuando el efecto de limpieza ya liberó el scroll.
  useEffect(() => {
    if (menuOpen || !pendingNavigationRef.current) return undefined;
    const id = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    const raf = window.requestAnimationFrame(() => onNavigate(id));
    return () => window.cancelAnimationFrame(raf);
  }, [menuOpen, onNavigate]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (menuOpen) {
      pendingNavigationRef.current = id;
      setMenuOpen(false);
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <header className={`cine-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="cine-header__inner">
          {/* Identidad visual "// Portafolio" fiel a la referencia */}
          <a
            href="#inicio"
            data-nav-target="inicio"
            className="cine-brand"
            onClick={(e) => handleLinkClick(e, 'inicio')}
            aria-label="Fernando Sisnande · Ir al inicio"
          >
            <span className="cine-brand__slashes" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="cine-brand__text">Portafolio</span>
          </a>

          {/* Navegación central minimalista con indicador luminoso azul */}
          <nav className="cine-nav" aria-label="Navegación principal">
            {navSections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-nav-target={item.id}
                  className={`cine-nav__link${isActive ? ' is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  <span>{item.label}</span>
                  <span className="cine-nav__glowbar" aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          {/* CTA derecho "Trabajemos juntos ↗" */}
          <div className="cine-header__actions">
            <a
              href="#contacto"
              data-nav-target="contacto"
              className="cine-cta-outline"
              onClick={(e) => handleLinkClick(e, 'contacto')}
            >
              <span>Trabajemos juntos</span>
              <ArrowUpRightIcon size={15} />
            </a>

            <CinematicMotionToggle reducedMotion={reducedMotion} onToggle={onToggleMotion} />

            <button
              type="button"
              className="cine-mobile-toggle"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              aria-expanded={menuOpen}
              aria-controls="cine-mobile-menu"
            >
              {menuOpen ? <CloseIcon size={21} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Indicadores verticales derechos de escena (como en la imagen de referencia) */}
      <aside className="cine-side-dots" aria-label="Indicador de escena actual">
        {navSections.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`cine-side-dot${isActive ? ' is-active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-label={`Ir a ${item.label}`}
              title={`${item.num} · ${item.label}`}
            >
              <span className="cine-side-dot__core" />
            </button>
          );
        })}
      </aside>

      {/* Drawer móvil dedicado */}
      <div
        className={`cine-mobile-backdrop${menuOpen ? ' is-open' : ''}`}
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
      />
      <nav
        id="cine-mobile-menu"
        className={`cine-mobile-drawer${menuOpen ? ' is-open' : ''}`}
        aria-label="Navegación móvil"
        aria-hidden={!menuOpen}
      >
        <div className="cine-mobile-drawer__inner">
          <div className="cine-mobile-drawer__links">
            {navSections.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`cine-mobile-link${isActive ? ' is-active' : ''}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                >
                  <span className="cine-mobile-link__num">{item.num}</span>
                  <span className="cine-mobile-link__label">{item.label}</span>
                  <ArrowUpRightIcon size={17} />
                </a>
              );
            })}
          </div>

          <a
            href="#contacto"
            className="cine-btn cine-btn--primary cine-mobile-drawer__cta"
            onClick={(e) => handleLinkClick(e, 'contacto')}
          >
            <span>Trabajemos juntos</span>
            <ArrowUpRightIcon size={16} />
          </a>
        </div>
      </nav>
    </>
  );
}
