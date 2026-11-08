import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contact, projects } from '../../data/portfolioData.js';
import { responsive, reveal, scrubFromTo } from '../../animations/motion.js';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  GitHubIcon,
} from './CinematicIcons.jsx';

gsap.registerPlugin(ScrollTrigger);

function extractHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

// Progreso de la pista en el que cada proyecto está en primer plano: (i + 0.43) / 4
const PROJECT_PROTAGONIST_PROGRESS = [0.1075, 0.3575, 0.6075, 0.8575];

// Tiempo (ms) tras pulsar una pestaña durante el que el scroll automático no cambia la pestaña activa
const TAB_TRAVEL_LOCK_MS = 2100;

/**
 * Diapositiva protagonista 3D de cada proyecto real:
 * En escritorio se dibuja de forma continua a partir del progreso del scroll (ScrollTrigger + sticky);
 * además su monitor interno responde tridimensionalmente al cursor sin interferir con GSAP.
 */
function ProtagonistProjectSlide({
  project,
  index,
  isActive,
  onInspect,
  isMobile,
  reducedMotion,
}) {
  const tiltBoxRef = useRef(null);

  const handlePointerMove = (e) => {
    if (reducedMotion || isMobile || !tiltBoxRef.current) return;
    const rect = tiltBoxRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 9;
    const rx = -(py - 0.5) * 7;

    tiltBoxRef.current.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
    tiltBoxRef.current.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    tiltBoxRef.current.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    tiltBoxRef.current.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };

  const handlePointerLeave = () => {
    if (!tiltBoxRef.current) return;
    tiltBoxRef.current.style.setProperty('--rx', '0deg');
    tiltBoxRef.current.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      className={`project-cinema-slide${isActive ? ' is-active-slide' : ''}`}
      data-project-slide={index}
    >
      <div
        ref={tiltBoxRef}
        className={`project-screen-card${index % 2 === 1 ? ' is-reversed-mobile' : ''}`}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="project-screen-card__glow" aria-hidden="true" />

        {/* Pantalla flotante con marco de cristal oscuro (crece y rota en 3D con el scroll) */}
        <div className="project-floating-monitor" data-slide-monitor>
          <div className="project-monitor-bar" aria-hidden="true">
            <div className="project-monitor-dots">
              <i />
              <i />
              <i />
            </div>
            <span className="project-monitor-domain">{extractHostname(project.url)}</span>
            <span className="project-monitor-index">{project.number}</span>
          </div>

          <div
            className="project-monitor-viewport"
            data-slide-mask
            role="button"
            tabIndex={0}
            aria-label={`Ampliar captura y detalles de ${project.title}`}
            onClick={() => onInspect(project)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onInspect(project);
              }
            }}
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              width="1600"
              height="900"
              loading="eager"
              decoding="async"
            />
            <div className="project-monitor-overlay">
              <span>Inspeccionar pantalla</span>
            </div>
          </div>
        </div>

        {/* Descripción editorial, impacto y enlaces verificados (se revelan tras la pantalla) */}
        <div className="project-screen-info" data-slide-info>
          <div className="project-screen-meta">
            <span className="project-screen-category">{project.category}</span>
            <span className="project-screen-num" aria-hidden="true">
              {project.number}
            </span>
          </div>

          <h3 className="project-screen-title">{project.title}</h3>
          <p className="project-screen-desc">{project.description}</p>

          <div className="project-impact-callout">
            <strong>Valor funcional:</strong> {project.impact}
          </div>

          <ul className="project-highlights-list">
            {project.highlights.map((item) => (
              <li key={item}>
                <CheckIcon size={15} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="project-tech-pills" aria-label="Tecnologías del proyecto">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tech-pill">
                {tag}
              </span>
            ))}
          </div>

          <div className="project-screen-actions">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cine-btn cine-btn--primary"
            >
              <span>{project.linkLabel}</span>
              <ArrowUpRightIcon size={16} />
            </a>

            <button
              type="button"
              className="cine-btn cine-btn--ghost"
              onClick={() => onInspect(project)}
            >
              <span>Ver detalle</span>
              <ArrowRightIcon size={15} />
            </button>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-repo-link"
                aria-label={`Código fuente de ${project.title} en GitHub`}
              >
                <GitHubIcon size={17} />
                <span>Código</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsScene({
  onNavigate,
  onScrollLock,
  reducedMotion = false,
  isMobile = false,
}) {
  const sectionRef = useRef(null);
  const modalCloseRef = useRef(null);
  const trackRef = useRef(null);
  const pinStageRef = useRef(null);
  const progressFillRef = useRef(null);
  const pedestalRef = useRef(null);
  const pedestalGlowRef = useRef(null);
  const codeRockRef = useRef(null);
  const githubBarRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const tabLockUntilRef = useRef(0);
  const [inspectedProject, setInspectedProject] = useState(null);
  const [ghRepos, setGhRepos] = useState([]);

  // Carga liviana y no bloqueante de repositorios públicos reales en GitHub
  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://api.github.com/users/${contact.githubUser}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) {
          setGhRepos(data.slice(0, 4));
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  // Cierre accesible del modal con Escape
  useEffect(() => {
    if (!inspectedProject) return undefined;
    const prevOverflow = document.documentElement.style.overflow;
    const previouslyFocused = document.activeElement;
    onScrollLock?.('project-modal', true);
    document.documentElement.style.overflow = 'hidden';
    // El botón de cierre debe tener foco, incluso si se abrió desde una escena fijada.
    modalCloseRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') setInspectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      onScrollLock?.('project-modal', false);
      window.removeEventListener('keydown', onKey);
      if (previouslyFocused?.isConnected && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [inspectedProject, onScrollLock]);

  // Coreografía de la galería.
  // Escritorio: la sección es una pista alta (`.projects-track`) con el escenario en
  // `position: sticky`. Un ScrollTrigger (sin pin) entrega el progreso y cada proyecto se
  // dibuja de forma determinista a partir de él (ver `renderAt`). Móvil: tarjetas apiladas.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    let media;
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.project-cinema-slide', section);
      const mm = gsap.matchMedia();
      media = mm;

      responsive(mm, ({ desk, scrub }) => {
        const monitors = slides.map((s) => s.querySelector('[data-slide-monitor]'));
        const infos = slides.map((s) => s.querySelector('[data-slide-info]'));
        const masks = slides.map((s) => s.querySelector('[data-slide-mask]'));

        // ---------------------------------------------------------------------
        // MÓVIL / TABLET: tarjetas apiladas con entrada por tiempo
        // ---------------------------------------------------------------------
        if (!desk) {
          slides.forEach((slide, i) => {
            reveal(slide, { y: 44, scale: 0.95, duration: 0.9 });
            scrubFromTo(
              monitors[i],
              { scale: 0.94 },
              { scale: 1 },
              { trigger: slide, start: 'top 85%', end: 'center 50%' },
              scrub
            );
            // La captura se revela poco a poco: se funde, se enfoca y se asienta.
            scrubFromTo(
              slide.querySelector('[data-slide-mask] img'),
              { opacity: 0.15, scale: 1.14, filter: 'blur(8px)' },
              { opacity: 1, scale: 1, filter: 'blur(0px)' },
              { trigger: slide, start: 'top 80%', end: 'center 45%' },
              scrub
            );
          });
          return undefined;
        }

        if (slides.length < 2 || !trackRef.current) return undefined;

        // ---------------------------------------------------------------------
        // ESCRITORIO: galería 3D sobre pista sticky, con render determinista.
        //
        // No hay timeline: en cada frame se calcula el estado de cada proyecto
        // directamente a partir del progreso (0-1) de la pista. Así no existen
        // estados iniciales "ocultos" que puedan quedar atascados, y el resultado es
        // idéntico al avanzar, retroceder o saltar con las pestañas.
        //
        // Unidades: cada proyecto ocupa 1 unidad de t = progreso * N.
        //   entra   en [i - LEAD, i - LEAD + ENTER]
        //   sale    en [i + EXIT_AT, i + 1]   (coincide con la entrada del siguiente)
        // ---------------------------------------------------------------------
        const N = slides.length;
        const ENTER = 0.5; // recorrido de la entrada (unidades)
        const LEAD = 0.4; // cuánto antes de su turno empieza a entrar
        const EXIT_AT = 1 - LEAD;
        const FOLLOW = 0.085; // suavidad con la que la escena persigue al scroll (menor = más lento)

        const clamp01 = (v) => Math.min(1, Math.max(0, v));
        const smooth = (v) => {
          const x = clamp01(v);
          return x * x * (3 - 2 * x);
        };
        const easeOut = (v) => 1 - Math.pow(1 - clamp01(v), 3);
        const lerp = (a, b, k) => a + (b - a) * k;

        const imgs = slides.map((s) => s.querySelector('[data-slide-mask] img'));
        const ambient = [pedestalRef.current, pedestalGlowRef.current, codeRockRef.current];

        const commitIndex = (idx) => {
          // Mientras se viaja a una pestaña no se cambia el resaltado por los proyectos intermedios.
          if (Date.now() < tabLockUntilRef.current) return;
          if (idx !== activeIndexRef.current) {
            activeIndexRef.current = idx;
            setActiveIndex(idx);
          }
        };

        const renderAt = (p) => {
          const t = p * N;
          let bestIdx = 0;
          let bestAlpha = -1;

          slides.forEach((slide, i) => {
            const first = i === 0;
            const last = i === N - 1;

            // e: 0 = fuera de escena (a la derecha) · 1 = en primer plano
            const e = first ? 0.55 + 0.45 * easeOut(t / 0.3) : easeOut((t - (i - LEAD)) / ENTER);
            // x: 0 = presente · 1 = ya salió (a la izquierda)
            const x = last ? 0 : smooth((t - (i + EXIT_AT)) / (1 - EXIT_AT));
            const alpha = (first ? 1 : clamp01(e / 0.65)) * (1 - x);
            const drift = smooth((t - (i + 0.22)) / (EXIT_AT - 0.22));

            gsap.set(slide, {
              autoAlpha: alpha,
              xPercent: 80 * (1 - e) - 80 * x,
              yPercent: 4 * (1 - e) - 4 * x,
              scale: (0.8 + 0.2 * e) * (1 - 0.18 * x),
              rotateY: -22 * (1 - e) + 22 * x,
            });

            if (alpha > bestAlpha) {
              bestAlpha = alpha;
              bestIdx = i;
            }

            // Monitor: crece y se endereza al entrar; deriva lenta mientras es protagonista.
            gsap.set(monitors[i], {
              scale: lerp(first ? 0.92 : 0.86, 1.03, e) + 0.03 * drift,
              rotateY: lerp(first ? 8 : -12, 0, e),
            });

            // La imagen aparece poco a poco: se abre el recorte, se funde, se desenfoca menos y se asienta.
            const reveal01 = first ? 1 : e;
            const open = 1 - reveal01;
            const done = reveal01 >= 0.999;
            gsap.set(masks[i], {
              clipPath: done
                ? 'none'
                : `inset(${(open * 9).toFixed(2)}% ${(open * 20).toFixed(2)}% ${(open * 9).toFixed(2)}% ${(open * 20).toFixed(2)}% round ${(open * 16).toFixed(1)}px)`,
            });
            if (imgs[i]) {
              const imgIn = smooth((reveal01 - 0.1) / 0.7);
              gsap.set(imgs[i], {
                opacity: first ? 1 : imgIn,
                scale: 1 + 0.18 * (1 - easeOut(reveal01)),
                filter: first || imgIn >= 0.999 ? 'none' : `blur(${((1 - imgIn) * 10).toFixed(2)}px)`,
              });
            }

            // Descripción: llega un poco después que la pantalla.
            const ik = first ? 1 : smooth((e - 0.3) / 0.7);
            gsap.set(infos[i], { autoAlpha: ik, x: 30 * (1 - ik), y: 24 * (1 - ik) });
          });

          // Ambiente continuo durante toda la galería.
          gsap.set(pedestalRef.current, { xPercent: lerp(-9, 9, p), scale: lerp(0.94, 1.06, p) });
          gsap.set(pedestalGlowRef.current, { opacity: lerp(0.45, 0.95, p), scale: lerp(0.88, 1.22, p) });
          gsap.set(codeRockRef.current, {
            x: lerp(20, -155, p),
            y: lerp(-15, 85, p),
            rotate: lerp(-12, 22, p),
            scale: lerp(0.9, 1.18, p),
          });

          if (progressFillRef.current) {
            progressFillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
          }
          commitIndex(bestIdx);
        };

        // La escena persigue al scroll con una suavidad propia (por encima de Lenis).
        let target = 0;
        let current = 0;
        let running = false;
        const tick = () => {
          const diff = target - current;
          if (Math.abs(diff) < 0.00015) {
            current = target;
            renderAt(current);
            stop();
            return;
          }
          current += diff * (1 - Math.pow(1 - FOLLOW, gsap.ticker.deltaRatio()));
          renderAt(current);
        };
        function start() {
          if (running) return;
          running = true;
          gsap.ticker.add(tick);
        }
        function stop() {
          if (!running) return;
          running = false;
          gsap.ticker.remove(tick);
        }

        renderAt(0);
        const st = ScrollTrigger.create({
          id: 'track-proyectos',
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            target = self.progress;
            start();
          },
          onRefresh: (self) => {
            target = self.progress;
            current = self.progress;
            renderAt(current);
          },
        });

        // Barra de GitHub: entrada por tiempo al llegar.
        reveal(githubBarRef.current, { y: 50, scale: 0.96, start: 'top 90%' });

        // Limpieza: los estilos aplicados con gsap.set fuera del contexto no se revierten solos.
        return () => {
          stop();
          st.kill();
          gsap.set(
            [...slides, ...monitors, ...infos, ...masks, ...imgs, ...ambient].filter(Boolean),
            { clearProps: 'all' }
          );
        };
      });
    }, section);

    return () => {
      // La media query debe limpiarse ANTES de restaurar el árbol React:
      // evita dejar spans materializados o animaciones duplicadas al alternar FX.
      media?.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  const handleTabSelect = (idx) => {
    setActiveIndex(idx);
    activeIndexRef.current = idx;
    tabLockUntilRef.current = Date.now() + TAB_TRAVEL_LOCK_MS;
    if (!isMobile && !reducedMotion && onNavigate) {
      onNavigate('proyectos', PROJECT_PROTAGONIST_PROGRESS[idx] ?? 0.1);
    } else {
      const targetSlide = sectionRef.current?.querySelector(
        `[data-project-slide="${idx}"]`
      );
      targetSlide?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="cine-scene projects-scene" id="proyectos" ref={sectionRef}>
      {/* PISTA ALTA: el escenario permanece fijo (sticky) mientras se recorre la galería */}
      <div className="projects-track" ref={trackRef}>
      <div className="projects-pin-stage" ref={pinStageRef}>
        {/* Roca flotante con símbolo </> orbitando en profundidad */}
        <div className="projects-code-rock" ref={codeRockRef} aria-hidden="true">
          <img src="/assets/cinematic/code-rock.webp" alt="" loading="lazy" />
        </div>

        <div className="cine-shell projects-theater-shell">
          {/* HUD Superior de Galería Cinematográfica */}
          <div className="projects-theater-hud">
            <div className="projects-theater-hud__titles">
              <div className="cine-section-eyebrow">
                <span className="cine-kicker-num">
                  03 <i aria-hidden="true" />
                </span>
                <span className="cine-kicker-label">PROYECTOS VERIFICADOS EN PRODUCCIÓN</span>
              </div>
              <div className="projects-theater-title-row">
                <h2 className="cine-display-title">Proyectos</h2>
                <span className="projects-theater-counter" aria-live="polite">
                  <strong>0{activeIndex + 1}</strong> / 0{projects.length}
                </span>
              </div>
            </div>

            <div className="projects-theater-controls">
              <div
                className="projects-stage-tabs"
                role="tablist"
                aria-label="Seleccionar proyecto en escena"
              >
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    role="tab"
                    data-project-tab={idx}
                    aria-selected={idx === activeIndex}
                    className={`projects-stage-tab${idx === activeIndex ? ' is-active' : ''}`}
                    onClick={() => handleTabSelect(idx)}
                  >
                    <span>{proj.number}</span>
                    <strong>{proj.title}</strong>
                  </button>
                ))}
              </div>

              <div className="projects-scroll-progress" aria-hidden="true">
                <span className="projects-scroll-progress__fill" ref={progressFillRef} />
              </div>
            </div>
          </div>

          {/* ESCENARIO 3D DE PROYECTOS PROTAGONISTAS */}
          <div className="projects-theater-deck">
            {projects.map((project, index) => (
              <ProtagonistProjectSlide
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeIndex}
                onInspect={setInspectedProject}
                isMobile={isMobile}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* Cumbre rocosa oscura iluminada en azul bajo las pantallas flotantes */}
          <div className="projects-theater-pedestal" ref={pedestalRef} aria-hidden="true">
            <div className="projects-stage-pedestal__glow" ref={pedestalGlowRef} />
            <img src="/assets/cinematic/rock-peak.webp" alt="" loading="lazy" />
          </div>
        </div>
      </div>
      </div>

      {/* Trazabilidad real en GitHub (@FaroDeLuz98) como puente hacia Tecnologías */}
      <div className="cine-shell projects-github-wrap">
        <div className="projects-github-bar cine-glass-panel" ref={githubBarRef}>
          <div className="projects-github-bar__intro">
            <div className="projects-github-bar__badge">
              <GitHubIcon size={20} />
              <span>REPOSITORIOS PÚBLICOS · @{contact.githubUser}</span>
            </div>
            <h3>Actividad y código verificable en GitHub</h3>
            <p>
              Además de los sitios publicados en producción, podés explorar mis repositorios
              de práctica, maquetación y proyectos académicos directamente en GitHub.
            </p>
          </div>

          {ghRepos.length > 0 && (
            <div className="projects-github-repos">
              {ghRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-mini-repo"
                >
                  <div>
                    <strong>{repo.name}</strong>
                    <span>{repo.language || 'Repositorio'}</span>
                  </div>
                  <ArrowUpRightIcon size={15} />
                </a>
              ))}
            </div>
          )}

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cine-btn cine-btn--ghost"
          >
            <GitHubIcon size={17} />
            <span>Ver perfil completo en GitHub</span>
            <ArrowUpRightIcon size={15} />
          </a>
        </div>
      </div>

      {/* Modal cinematográfico accesible para inspeccionar capturas reales */}
      {inspectedProject && (
        <div
          className="cine-modal-backdrop"
          data-lenis-prevent="true"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${inspectedProject.title}`}
          onClick={() => setInspectedProject(null)}
        >
          <div className="cine-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              ref={modalCloseRef}
              className="cine-modal-close"
              onClick={() => setInspectedProject(null)}
              aria-label="Cerrar ventana"
            >
              <CloseIcon size={20} />
            </button>

            <div className="cine-modal-media">
              <img
                src={inspectedProject.image}
                alt={inspectedProject.imageAlt}
                width="1600"
                height="900"
              />
            </div>

            <div className="cine-modal-body">
              <span className="project-screen-category">{inspectedProject.category}</span>
              <h3>{inspectedProject.title}</h3>
              <p>{inspectedProject.description}</p>

              <div className="project-tech-pills">
                {inspectedProject.tags.map((tag) => (
                  <span key={tag} className="project-tech-pill">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="cine-modal-actions">
                <a
                  href={inspectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cine-btn cine-btn--primary"
                >
                  <span>{inspectedProject.linkLabel}</span>
                  <ArrowUpRightIcon size={16} />
                </a>
                <button
                  type="button"
                  className="cine-btn cine-btn--ghost"
                  onClick={() => setInspectedProject(null)}
                >
                  Cerrar vista previa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
