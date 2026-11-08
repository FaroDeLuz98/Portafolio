import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { contact, projects } from '../../data/portfolioData.js';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  GitHubIcon,
} from './CinematicIcons.jsx';

function extractHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export const PROJECT_PROTAGONIST_PROGRESS = [0.1, 0.36, 0.62, 0.88];

/**
 * Tarjeta individual de cada proyecto real en producción.
 */
const ProtagonistProjectSlide = memo(function ProtagonistProjectSlide({
  project,
  index,
  isActive,
  onInspect,
}) {
  return (
    <article
      className={`project-cinema-slide${isActive ? ' is-active-slide' : ''}`}
      data-project-slide={index}
    >
      <div className={`project-screen-card${index % 2 === 1 ? ' is-reversed' : ''}`}>
        <div className="project-screen-card__glow" aria-hidden="true" />

        {/* Pantalla flotante con marco de cristal oscuro y captura real */}
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
              alt={project.imageAlt || `Captura del sitio web de ${project.title}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              width="1024"
              height="640"
              className="project-monitor-img"
            />
            <div className="project-monitor-overlay">
              <span className="project-monitor-zoom">Ampliar detalles</span>
            </div>
          </div>
        </div>

        {/* Información y especificaciones técnicas */}
        <div className="project-screen-info" data-slide-info>
          <div className="project-screen-meta">
            <span className="project-screen-category">{project.category}</span>
            <span className="project-screen-num" aria-hidden="true">
              {project.number}
            </span>
          </div>

          <h3 className="project-screen-title">{project.title}</h3>
          <p className="project-screen-desc">{project.description}</p>

          {project.impact && (
            <div className="project-impact-callout">
              <strong>Valor funcional:</strong> {project.impact}
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <ul className="project-highlights-list">
              {project.highlights.map((item) => (
                <li key={item}>
                  <CheckIcon size={15} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="project-tech-pills" aria-label="Tecnologías del proyecto">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tech-pill">
                  {tag}
                </span>
              ))}
            </div>
          )}

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
});

export default function ProjectsScene() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inspectedProject, setInspectedProject] = useState(null);
  const [ghRepos, setGhRepos] = useState([]);

  const handleInspect = useCallback((project) => {
    setInspectedProject(project);
  }, []);

  // Carga de repositorios públicos reales en GitHub
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

  // Modal accesible: bloqueo de scroll y escape
  useEffect(() => {
    if (!inspectedProject) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e) => {
      if (e.key === 'Escape') setInspectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [inspectedProject]);

  // Actualizar la pestaña activa según la tarjeta que esté visible en viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const slides = section.querySelectorAll('.project-cinema-slide');
    if (slides.length === 0) return undefined;

    let ticking = false;
    const updateActiveSlide = () => {
      ticking = false;
      const viewportMid = window.innerHeight * 0.45;

      let bestIdx = 0;
      let minDistance = Infinity;

      slides.forEach((slide, idx) => {
        const rect = slide.getBoundingClientRect();
        const slideMid = rect.top + rect.height * 0.5;
        const dist = Math.abs(slideMid - viewportMid);
        if (dist < minDistance) {
          minDistance = dist;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateActiveSlide);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTabSelect = (idx) => {
    setActiveIndex(idx);
    const targetSlide = sectionRef.current?.querySelector(
      `[data-project-slide="${idx}"]`
    );
    if (targetSlide) {
      const targetY = Math.max(0, targetSlide.getBoundingClientRect().top + window.scrollY - 85);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section className="cine-scene projects-scene" id="proyectos" ref={sectionRef}>
      {/* ESCENARIO DE PROYECTOS */}
      <div className="projects-pin-stage">
        {/* Roca flotante con símbolo </> en segundo plano */}
        <div className="projects-code-rock" aria-hidden="true">
          <img src="/assets/cinematic/code-rock.webp" alt="" loading="lazy" />
        </div>

        <div className="cine-shell projects-theater-shell">
          {/* HUD Superior de Galería */}
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
            </div>
          </div>

          {/* SECUENCIA VERTICAL DE PROYECTOS */}
          <div className="projects-theater-deck">
            {projects.map((project, index) => (
              <ProtagonistProjectSlide
                key={project.id}
                project={project}
                index={index}
                isActive={index === activeIndex}
                onInspect={handleInspect}
              />
            ))}
          </div>

          {/* Cumbre rocosa oscura iluminada bajo las pantallas */}
          <div className="projects-theater-pedestal" aria-hidden="true">
            <div className="projects-stage-pedestal__glow" />
            <img src="/assets/cinematic/rock-peak.webp" alt="" loading="lazy" />
          </div>
        </div>
      </div>

      {/* Trazabilidad real en GitHub (@FaroDeLuz98) */}
      <div className="cine-shell projects-github-wrap">
        <div className="projects-github-bar cine-glass-panel">
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

      {/* Modal accesible para inspeccionar detalles del proyecto */}
      {inspectedProject && (
        <div
          className="cine-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalles de ${inspectedProject.title}`}
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="cine-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cine-modal-header">
              <div className="cine-modal-title-row">
                <span className="cine-kicker-num">{inspectedProject.number}</span>
                <h3>{inspectedProject.title}</h3>
                <span className="cine-badge">{inspectedProject.category}</span>
              </div>
              <button
                type="button"
                className="cine-modal-close"
                onClick={() => setInspectedProject(null)}
                aria-label="Cerrar modal de detalles"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            <div className="cine-modal-body">
              <div className="cine-modal-media">
                <img
                  src={inspectedProject.image}
                  alt={inspectedProject.imageAlt || `Captura completa de ${inspectedProject.title}`}
                  className="cine-modal-img"
                />
              </div>

              <div className="cine-modal-details">
                <h4>Descripción del proyecto</h4>
                <p>{inspectedProject.description}</p>

                {inspectedProject.impact && (
                  <div className="project-impact-callout">
                    <strong>Valor funcional:</strong> {inspectedProject.impact}
                  </div>
                )}

                {inspectedProject.highlights && inspectedProject.highlights.length > 0 && (
                  <>
                    <h4>Aspectos destacados</h4>
                    <ul className="project-highlights-list">
                      {inspectedProject.highlights.map((h) => (
                        <li key={h}>
                          <CheckIcon size={15} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {inspectedProject.tags && inspectedProject.tags.length > 0 && (
                  <>
                    <h4>Tecnologías aplicadas</h4>
                    <div className="project-tech-pills">
                      {inspectedProject.tags.map((tech) => (
                        <span key={tech} className="project-tech-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                <div className="cine-modal-actions">
                  <a
                    href={inspectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cine-btn cine-btn--primary"
                  >
                    <span>Visitar sitio en producción</span>
                    <ArrowUpRightIcon size={16} />
                  </a>

                  {inspectedProject.repoUrl && (
                    <a
                      href={inspectedProject.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cine-btn cine-btn--ghost"
                    >
                      <GitHubIcon size={16} />
                      <span>Ver repositorio</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
