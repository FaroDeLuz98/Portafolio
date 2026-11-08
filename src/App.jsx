import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import CinematicNavbar from './components/cinematic/CinematicNavbar.jsx';
import HeroScene from './components/cinematic/HeroScene.jsx';
import AboutScene from './components/cinematic/AboutScene.jsx';
import ProjectsScene from './components/cinematic/ProjectsScene.jsx';
import TechnologiesScene from './components/cinematic/TechnologiesScene.jsx';
import ContactScene from './components/cinematic/ContactScene.jsx';
import { navSections } from './data/portfolioData.js';
import { createWordScrubber } from './animations/motion.js';
import { useIsMobile, useReducedMotionPreference } from './hooks/useMotionPreference.js';

const AtmosphericCanvas = lazy(() =>
  import('./components/cinematic/AtmosphericCanvas.jsx')
);

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});

const STORAGE_MOTION_KEY = 'cine_motion_override';

// Id del ScrollTrigger de la galería de Proyectos (ver ProjectsScene.jsx)
const PROJECTS_TRACK_ID = 'track-proyectos';
const PROJECT_COUNT = 4;

function getStoredMotionOverride() {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(STORAGE_MOTION_KEY);
    if (val === 'reduced') return true;
    if (val === 'full') return false;
  } catch {}
  return null;
}

/** Posición de scroll (px) de un progreso dado dentro de la galería de proyectos. */
function projectsTrackY(progress) {
  const st = ScrollTrigger.getById(PROJECTS_TRACK_ID);
  if (!st || st.end <= st.start) return null;
  const p = Math.max(0, Math.min(1, progress));
  return Math.round(st.start + (st.end - st.start) * p);
}

export default function App() {
  const systemReducedMotion = useReducedMotionPreference();
  const [motionOverride, setMotionOverride] = useState(getStoredMotionOverride);
  const reducedMotion = motionOverride !== null ? motionOverride : systemReducedMotion;
  const isMobile = useIsMobile(960);

  const [activeSection, setActiveSection] = useState('inicio');
  const activeSectionRef = useRef('inicio');
  const pendingAnchorRef = useRef(null);
  const scrollLocksRef = useRef(new Set());
  const [webglReady, setWebglReady] = useState(false);
  const lenisRef = useRef(null);

  // Carga diferida de la capa WebGL para priorizar el LCP del Hero
  useEffect(() => {
    if (reducedMotion || isMobile) {
      setWebglReady(false);
      return undefined;
    }
    const id = window.setTimeout(() => setWebglReady(true), 180);
    return () => window.clearTimeout(id);
  }, [reducedMotion, isMobile]);

  /**
   * Devuelve la posición de scroll (px) que corresponde a un ancla guardada
   * { id, progress?, projectIndex? }. Sirve tanto en modo completo como en reducido.
   */
  const resolveAnchorY = useCallback((anchor) => {
    if (anchor.id === 'inicio') return 0;

    if (anchor.id === 'proyectos') {
      const progress =
        typeof anchor.progress === 'number'
          ? anchor.progress
          : ((anchor.projectIndex ?? 0) + 0.43) / PROJECT_COUNT;
      const y = projectsTrackY(progress);
      if (y !== null) return y;
      // Sin pista (movimiento reducido o móvil): se va a la diapositiva correspondiente.
      const slide = document.querySelector(`[data-project-slide="${anchor.projectIndex ?? 0}"]`);
      if (slide) return Math.max(0, slide.getBoundingClientRect().top + window.scrollY - 90);
    }

    const el = document.getElementById(anchor.id);
    return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY) : 0;
  }, []);

  // Integración única Lenis + GSAP ScrollTrigger
  useEffect(() => {
    let cancelSync = false;

    // A. MOVIMIENTO REDUCIDO: scroll nativo, sin Lenis ni animaciones de scroll
    if (reducedMotion) {
      lenisRef.current = null;
      const rafId = window.requestAnimationFrame(() => {
        if (cancelSync) return;
        ScrollTrigger.refresh();
        const anchor = pendingAnchorRef.current;
        if (anchor) {
          pendingAnchorRef.current = null;
          window.scrollTo({ top: resolveAnchorY(anchor), behavior: 'instant' });
          ScrollTrigger.update();
        }
      });
      return () => {
        cancelSync = true;
        window.cancelAnimationFrame(rafId);
      };
    }

    // B. MODO COMPLETO: Lenis gobierna el scroll y ScrollTrigger lo sigue en cada frame
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -9 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    if (scrollLocksRef.current.size > 0) lenis.stop();

    const syncScrollTrigger = () => ScrollTrigger.update();
    const resizeLenis = () => lenis.resize();
    lenis.on('scroll', syncScrollTrigger);
    ScrollTrigger.addEventListener('refresh', resizeLenis);

    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Tras montar las escenas: medir y, si venimos de cambiar de modo, volver al mismo punto.
    const syncLayout = () => {
      if (cancelSync) return;
      ScrollTrigger.refresh();
      const anchor = pendingAnchorRef.current;
      if (anchor) {
        pendingAnchorRef.current = null;
        lenis.scrollTo(resolveAnchorY(anchor), { immediate: true, force: true });
        ScrollTrigger.update();
      }
    };

    let innerRaf = 0;
    const outerRaf = window.requestAnimationFrame(() => {
      innerRaf = window.requestAnimationFrame(syncLayout);
    });

    return () => {
      cancelSync = true;
      window.cancelAnimationFrame(outerRaf);
      if (innerRaf) window.cancelAnimationFrame(innerRaf);
      gsap.ticker.remove(rafCallback);
      gsap.ticker.lagSmoothing(500, 33);
      ScrollTrigger.removeEventListener('refresh', resizeLenis);
      lenis.off('scroll', syncScrollTrigger);
      lenis.destroy();
      if (lenisRef.current === lenis) lenisRef.current = null;
    };
  }, [reducedMotion, resolveAnchorY]);

  // Materialización V5 para textos que la V7 no tenía palabra a palabra.
  // Los títulos de Sobre mí, Tecnologías y Contacto se registran en cada escena.
  // No tocamos elementos interactivos ni tarjetas de proyecto con estado dinámico.
  useEffect(() => {
    if (reducedMotion) return undefined;
    const materializer = createWordScrubber();
    materializer.run(document.querySelectorAll([
      '.hero-lead',
      '.projects-theater-hud .cine-display-title',
      '.projects-github-bar__intro h3',
      '.projects-github-bar__intro p',
      '.about-pillar-card h3',
      '.about-pillar-card p',
      '.about-timeline-card h4',
      '.about-timeline-card p',
      '.cine-footer__brand p',
    ].join(',')));
    ScrollTrigger.refresh();
    return () => materializer.revert();
  }, [reducedMotion]);

  // Fuentes, imágenes tardías y restauración de pestaña pueden cambiar la geometría.
  // `ScrollTrigger.refresh()` en pleno scroll se nota como un salto, así que los eventos se
  // agrupan, se espera a que el scroll se detenga y solo se refresca si la altura cambió.
  useEffect(() => {
    let timer = 0;
    let disposed = false;
    let lastHeight = document.documentElement.scrollHeight;

    const refreshGeometry = (force = false) => {
      if (disposed) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(function check() {
        if (disposed || document.hidden) return;
        if (lenisRef.current?.isScrolling) {
          timer = window.setTimeout(check, 160);
          return;
        }
        const height = document.documentElement.scrollHeight;
        if (force === true || Math.abs(height - lastHeight) > 1) {
          lastHeight = height;
          ScrollTrigger.refresh();
        }
      }, 220);
    };
    const onAssetLoad = (e) => {
      if (e.target instanceof HTMLImageElement && !e.target.closest('.cine-modal-backdrop')) {
        refreshGeometry();
      }
    };
    const onPageShow = () => refreshGeometry(true);
    document.addEventListener('load', onAssetLoad, true);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('orientationchange', onPageShow);
    document.fonts?.ready?.then(() => refreshGeometry()).catch(() => {});
    return () => {
      disposed = true;
      document.removeEventListener('load', onAssetLoad, true);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('orientationchange', onPageShow);
      window.clearTimeout(timer);
    };
  }, []);

  // Los modales y el menú móvil suspenden Lenis. El Set impide que cerrar un overlay
  // reactive el scroll mientras otro sigue abierto.
  const handleScrollLock = useCallback((source, locked) => {
    if (locked) scrollLocksRef.current.add(source);
    else scrollLocksRef.current.delete(source);
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (scrollLocksRef.current.size > 0) lenis.stop();
    else lenis.start();
  }, []);

  // Sección activa según el punto de lectura (42% de la altura de la ventana)
  useEffect(() => {
    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;
      const probeY = window.scrollY + window.innerHeight * 0.42;
      let currentId = navSections[0].id;

      for (const sec of navSections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const topDoc = el.getBoundingClientRect().top + window.scrollY;
        if (probeY >= topDoc) currentId = sec.id;
      }

      activeSectionRef.current = currentId;
      setActiveSection((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveFromScroll);
      }
    };

    updateActiveFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  /**
   * Navegación: desplaza hasta el inicio de la sección. Para "proyectos" con
   * `customProgress` (pestañas) va al punto exacto de la galería donde ese proyecto
   * está en primer plano.
   */
  const handleNavigate = useCallback(
    (sectionId, customProgress) => {
      const target = document.getElementById(sectionId);
      if (!target) return;

      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);

      let y;
      if (sectionId === 'inicio') {
        y = 0;
      } else if (sectionId === 'proyectos' && typeof customProgress === 'number') {
        y = projectsTrackY(customProgress);
      }
      if (typeof y !== 'number') {
        y = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY));
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(y, { duration: 1.9, easing: (t) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top: y, behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  const handleToggleMotion = useCallback(() => {
    const willBeReduced = !reducedMotion;
    // Se guarda dónde está el usuario para volver al mismo punto tras re-montar las escenas.
    const id = activeSectionRef.current || 'inicio';
    const activeTab = document.querySelector('.projects-stage-tab.is-active');
    const track = ScrollTrigger.getById(PROJECTS_TRACK_ID);
    pendingAnchorRef.current = {
      id,
      progress: id === 'proyectos' && track ? track.progress : undefined,
      projectIndex: Number(activeTab?.getAttribute('data-project-tab') ?? 0),
    };
    setMotionOverride(willBeReduced);
    try {
      localStorage.setItem(STORAGE_MOTION_KEY, willBeReduced ? 'reduced' : 'full');
    } catch {}
  }, [reducedMotion]);

  return (
    <div className={`cine-app${reducedMotion ? ' is-reduced-motion' : ''}`}>
      <a href="#contenido-principal" className="cine-skip-link">
        Saltar al contenido principal
      </a>

      {/* Partículas y profundidad WebGL reactivas al progreso y velocidad de scroll */}
      {webglReady && !reducedMotion && (
        <Suspense fallback={null}>
          <AtmosphericCanvas disabled={reducedMotion} />
        </Suspense>
      )}

      <CinematicNavbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onScrollLock={handleScrollLock}
        reducedMotion={reducedMotion}
        onToggleMotion={handleToggleMotion}
      />

      <main id="contenido-principal" className="cine-main">
        <HeroScene
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
        <AboutScene reducedMotion={reducedMotion} isMobile={isMobile} />
        <ProjectsScene
          onNavigate={handleNavigate}
          onScrollLock={handleScrollLock}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
        <TechnologiesScene reducedMotion={reducedMotion} isMobile={isMobile} />
        <ContactScene
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
          isMobile={isMobile}
        />
      </main>

    </div>
  );
}
