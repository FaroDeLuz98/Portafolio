(() => {
  'use strict';

  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('mainNav');
  const navLinks = nav ? [...nav.querySelectorAll('a')] : [];

  /* ---------- Menú móvil ---------- */
  const setMenu = (open) => {
    if (!menuButton || !nav) return;
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    menuButton.textContent = open ? '✕' : '☰';
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    navLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));

    // Escape cierra el menú y devuelve el foco al botón
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        menuButton.focus();
      }
    });

    // Clic fuera del menú
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuButton.contains(e.target)) {
        setMenu(false);
      }
    });

    // Si se agranda la ventana, se resetea el estado
    window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Año del footer ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Enlace activo según la sección visible ---------- */
  const sections = [...document.querySelectorAll('main section[id]')]
    .filter((s) => navLinks.some((l) => l.hash === '#' + s.id));

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-30% 0px -55% 0px' });

    sections.forEach((s) => observer.observe(s));
  }
})();
