import { profile } from '../../data/portfolioData.js';
import { ArrowDownIcon, ArrowRightIcon } from './CinematicIcons.jsx';

function MaskedNameLine({ text }) {
  return (
    <span className="hero-title-line">
      {Array.from(text).map((ch, idx) => (
        <span key={`${ch}-${idx}`} className="hero-char-mask">
          <span className="hero-char">{ch === ' ' ? '\u00A0' : ch}</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Mitad (trasera o delantera) del anillo metálico luminoso 3D.
 */
function OrbitalRingHalf({ position = 'front' }) {
  const gradId = `metallic-ring-grad-${position}`;
  const rimId = `electric-rim-grad-${position}`;
  const flareId = `flare-glow-${position}`;

  return (
    <div
      className={`hero-ring-plane hero-ring-plane--${position}`}
      aria-hidden="true"
    >
      <div className="hero-ring-scroll">
        <div className="hero-ring-intro">
          <div className={`hero-ring-tilt hero-ring-tilt--${position}`}>
            <svg
              className="hero-ring-svg"
              viewBox="0 0 800 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.42" />
                  <stop offset="26%" stopColor="#60a5fa" stopOpacity="0.78" />
                  <stop offset="52%" stopColor="#0f172a" stopOpacity="0.62" />
                  <stop offset="78%" stopColor="#93c5fd" stopOpacity="0.88" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.45" />
                </linearGradient>

                <linearGradient id={rimId} x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" stopOpacity="0.95" />
                  <stop offset="35%" stopColor="#3b82f6" stopOpacity="0.85" />
                  <stop offset="65%" stopColor="#1e3a8a" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.95" />
                </linearGradient>

                <radialGradient id={flareId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="28%" stopColor="#93c5fd" stopOpacity="0.88" />
                  <stop offset="62%" stopColor="#2563eb" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle
                cx="400"
                cy="400"
                r="338"
                stroke={`url(#${gradId})`}
                strokeWidth="36"
              />
              <circle
                cx="400"
                cy="400"
                r="356"
                stroke={`url(#${rimId})`}
                strokeWidth="2.4"
              />
              <circle
                cx="400"
                cy="400"
                r="320"
                stroke="rgba(191, 219, 254, 0.55)"
                strokeWidth="1.6"
              />

              <g className="hero-ring-rotor">
                <circle
                  cx="400"
                  cy="400"
                  r="338"
                  stroke="rgba(147, 197, 253, 0.32)"
                  strokeWidth="12"
                  strokeDasharray="190 340 120 410"
                  strokeLinecap="round"
                />
                <circle
                  cx="400"
                  cy="400"
                  r="355"
                  stroke="#ffffff"
                  strokeOpacity="0.72"
                  strokeWidth="2.2"
                  strokeDasharray="85 450 95 430"
                  strokeLinecap="round"
                />
                <circle cx="738" cy="400" r="34" fill={`url(#${flareId})`} />
                <circle cx="62" cy="400" r="28" fill={`url(#${flareId})`} />
              </g>

              {position === 'front' && (
                <g className="hero-ring-static-flares">
                  <ellipse cx="622" cy="654" rx="52" ry="24" fill={`url(#${flareId})`} />
                  <ellipse cx="195" cy="672" rx="42" ry="20" fill={`url(#${flareId})`} />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroScene({ onNavigate }) {
  return (
    <section className="cine-scene hero-scene" id="inicio">
      <div className="hero-pin-stage">
        {/* ESCENARIO HERO PRINCIPAL */}
        <div className="hero-viewport">
          <div className="hero-backdrop" aria-hidden="true">
            <img
              src="/assets/cinematic/hero-backdrop-sky.webp"
              alt=""
              className="hero-backdrop__sky"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-stage-light" />
            <img
              src="/assets/cinematic/cloud-storm.webp"
              alt=""
              className="hero-cloud hero-cloud--upper"
            />
            <div className="hero-cloud-nebula-wrap">
              <img
                src="/assets/cinematic/cloud-nebula.webp"
                alt=""
                className="hero-cloud hero-cloud--nebula"
              />
            </div>
            <div className="hero-backdrop__vignette" />
          </div>

          <div className="hero-grid cine-shell">
            {/* COLUMNA IZQUIERDA: Tipografía editorial monumental y CTAs */}
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow__line" aria-hidden="true" />
                <span className="hero-eyebrow__text">{profile.role.toUpperCase()}</span>
              </div>

              <h1 className="hero-title" aria-label={profile.name}>
                <MaskedNameLine text={profile.firstName} />
                <MaskedNameLine text={profile.lastName} />
              </h1>

              <p className="hero-lead">{profile.heroLead}</p>

              <div className="hero-actions">
                <a
                  href="#proyectos"
                  className="cine-btn cine-btn--primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('proyectos');
                  }}
                >
                  <span>Ver proyectos</span>
                  <ArrowRightIcon size={17} />
                </a>

                <a
                  href="#sobre-mi"
                  className="cine-btn cine-btn--ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('sobre-mi');
                  }}
                >
                  <span>Conocer más</span>
                  <ArrowDownIcon size={16} />
                </a>
              </div>
            </div>

            {/* COLUMNA DERECHA: Estatua clásica de mármol, anillo orbital y rocas suspendidas */}
            <div className="hero-camera-rig">
              <div className="hero-stage">
                <div className="hero-orbital-halo" aria-hidden="true" />
                <div className="hero-statue-backlight" aria-hidden="true" />

                <OrbitalRingHalf position="back" />

                <div className="hero-rock hero-rock--two" aria-hidden="true">
                  <div className="hero-rock-scroll">
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-2.webp" alt="" className="hero-rock__float-b" />
                    </div>
                  </div>
                </div>

                <div className="hero-statue-wrap">
                  <div className="hero-statue-intro">
                    <div className="hero-statue-parallax">
                      <img
                        src="/assets/cinematic/statue-bust.webp"
                        alt="Escultura clásica de mármol con fisuras luminosas azules"
                        className="hero-statue-img"
                        width="681"
                        height="1049"
                        fetchPriority="high"
                        decoding="async"
                      />
                      <img
                        src="/assets/cinematic/statue-cracks-glow.webp"
                        alt=""
                        aria-hidden="true"
                        className="hero-statue-cracks"
                        width="681"
                        height="1049"
                      />
                      <div className="hero-statue-rimlight" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <OrbitalRingHalf position="front" />

                <div className="hero-rock hero-rock--one" aria-hidden="true">
                  <div className="hero-rock-scroll">
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-1.webp" alt="" className="hero-rock__float-a" />
                    </div>
                  </div>
                </div>

                <div className="hero-rock hero-rock--four" aria-hidden="true">
                  <div className="hero-rock-scroll">
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-4.webp" alt="" className="hero-rock__float-c" />
                    </div>
                  </div>
                </div>

                <div className="hero-rock hero-rock--three" aria-hidden="true">
                  <div className="hero-rock-scroll">
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-3.webp" alt="" className="hero-rock__float-d" />
                    </div>
                  </div>
                </div>

                <div className="hero-foreground-mist" aria-hidden="true">
                  <img src="/assets/cinematic/cloud-storm.webp" alt="" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="hero-scroll-cue"
            onClick={() => onNavigate('sobre-mi')}
            aria-label="Desplazar hacia abajo para explorar"
          >
            <span className="hero-scroll-cue__mouse" aria-hidden="true">
              <i />
            </span>
            <span className="hero-scroll-cue__label">SCROLL PARA EXPLORAR</span>
          </button>

          <div className="hero-horizon-curve" aria-hidden="true" />
        </div>

        {/* PANELES INFERIORES DE PRESENTACIÓN (fieles a la composición de la Imagen 1) */}
        <div className="hero-preview-strip" aria-label="Vista previa de escenas">
          <div className="hero-preview-grid">
            {/* Panel 02 · Sobre mí */}
            <article
              className="hero-preview-card hero-preview-card--about"
              onClick={() => onNavigate('sobre-mi')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('sobre-mi');
                }
              }}
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  02 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Sobre mí</h2>
                <p className="hero-preview-card__desc">
                  Desarrollador web en Uruguay formado en Informática y Comercio y Ventas (UTU), uniendo diseño, funcionalidad y tecnología.
                </p>
              </div>
              <div className="hero-preview-card__art hero-preview-art--about" aria-hidden="true">
                <img
                  src="/assets/cinematic/marble-column.webp"
                  alt=""
                  className="preview-column-img"
                  loading="lazy"
                />
                <img
                  src="/assets/cinematic/blue-silk.webp"
                  alt=""
                  className="preview-silk-img"
                  loading="lazy"
                />
              </div>
            </article>

            {/* Panel 03 · Proyectos */}
            <article
              className="hero-preview-card hero-preview-card--projects"
              onClick={() => onNavigate('proyectos')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('proyectos');
                }
              }}
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  03 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Proyectos</h2>
                <p className="hero-preview-card__desc">
                  Aplicaciones web reales y verificables en producción: Byztoo PC, Maktub, MR Coiffeur y más.
                </p>
              </div>
              <div className="hero-preview-card__art hero-preview-art--projects" aria-hidden="true">
                <div className="preview-screens-rig">
                  <div className="preview-screen preview-screen--back">
                    <img src="/assets/Maktub.webp" alt="" loading="lazy" />
                  </div>
                  <div className="preview-screen preview-screen--main">
                    <img src="/assets/byztoo-pc.webp" alt="" loading="lazy" />
                    <span className="preview-screen__caption">Byztoo PC</span>
                  </div>
                  <div className="preview-screen preview-screen--side">
                    <img src="/assets/MR.webp" alt="" loading="lazy" />
                    <span className="preview-screen__caption">MR Coiffeur</span>
                  </div>
                </div>
                <img
                  src="/assets/cinematic/rock-peak.webp"
                  alt=""
                  className="preview-rock-base"
                  loading="lazy"
                />
              </div>
            </article>

            {/* Panel 04 · Tecnologías */}
            <article
              className="hero-preview-card hero-preview-card--tech"
              onClick={() => onNavigate('tecnologias')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('tecnologias');
                }
              }}
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  04 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Tecnologías</h2>
                <p className="hero-preview-card__desc">
                  Stack aplicado y verificado: React, JavaScript, PHP, MySQL, CSS moderno y herramientas de desarrollo.
                </p>
              </div>
              <div className="hero-preview-card__art hero-preview-art--tech" aria-hidden="true">
                <div className="preview-cubes-cluster">
                  <img
                    src="/assets/cinematic/cube-react.webp"
                    alt=""
                    className="preview-cube preview-cube--1"
                    loading="lazy"
                  />
                  <img
                    src="/assets/cinematic/cube-js.webp"
                    alt=""
                    className="preview-cube preview-cube--2"
                    loading="lazy"
                  />
                  <img
                    src="/assets/cinematic/cube-php.webp"
                    alt=""
                    className="preview-cube preview-cube--3"
                    loading="lazy"
                  />
                  <img
                    src="/assets/cinematic/cube-db.webp"
                    alt=""
                    className="preview-cube preview-cube--4"
                    loading="lazy"
                  />
                </div>
                <img
                  src="/assets/cinematic/rock-peak.webp"
                  alt=""
                  className="preview-rock-base"
                  loading="lazy"
                />
              </div>
            </article>

            {/* Panel 05 · Contacto */}
            <article
              className="hero-preview-card hero-preview-card--contact"
              onClick={() => onNavigate('contacto')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onNavigate('contacto');
                }
              }}
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  05 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Contacto</h2>
                <p className="hero-preview-card__desc">
                  ¿Tenés un proyecto o vacante en mente? Hablemos y llevémoslo a la realidad.
                </p>
                <span className="cine-pill-mini">
                  Enviar mensaje <ArrowRightIcon size={14} />
                </span>
              </div>
              <div className="hero-preview-card__art hero-preview-art--contact" aria-hidden="true">
                <div className="preview-portal-glow" />
                <img
                  src="/assets/cinematic/portal-arch.webp"
                  alt=""
                  className="preview-arch-img"
                  width="735"
                  height="942"
                  decoding="async"
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
