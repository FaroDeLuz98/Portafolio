import { useEffect, useState } from 'react';
import { navSections } from '../../data/portfolioData.js';
import { ArrowUpRightIcon, CloseIcon, MenuIcon } from './CinematicIcons.jsx';

export default function CinematicNavbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(id);
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
