import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../../data/portfolioData.js';
import { responsive } from '../../animations/motion.js';
import { ArrowDownIcon, ArrowRightIcon } from './CinematicIcons.jsx';

gsap.registerPlugin(ScrollTrigger);

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
 * Separamos contenedores de scroll, intro y tilt para evitar cualquier colisión de matrices CSS/GSAP.
 */
function OrbitalRingHalf({ position = 'front', scrollRef, introRef }) {
  const gradId = `metallic-ring-grad-${position}`;
  const rimId = `electric-rim-grad-${position}`;
  const flareId = `flare-glow-${position}`;

  return (
    <div
      className={`hero-ring-plane hero-ring-plane--${position}`}
      aria-hidden="true"
    >
      <div className="hero-ring-scroll" ref={scrollRef}>
        <div className="hero-ring-intro" ref={introRef}>
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

export default function HeroScene({ onNavigate, reducedMotion = false, isMobile = false }) {
  const sectionRef = useRef(null);
  const heroPinRef = useRef(null);
  const skyImgRef = useRef(null);
  const stageLightRef = useRef(null);
  const copyRef = useRef(null);
  const cameraRigRef = useRef(null);
  const stageRef = useRef(null);
  const statueGroupRef = useRef(null);
  const statueIntroRef = useRef(null);
  const crackGlowRef = useRef(null);
  const ringBackRef = useRef(null);
  const ringFrontRef = useRef(null);
  const ringBackIntroRef = useRef(null);
  const ringFrontIntroRef = useRef(null);
  const haloRef = useRef(null);
  const cloudBackRef = useRef(null);
  const cloudNebulaRef = useRef(null);
  const cloudFrontRef = useRef(null);
  const rock1Ref = useRef(null);
  const rock2Ref = useRef(null);
  const rock3Ref = useRef(null);
  const rock4Ref = useRef(null);
  const scrollCueRef = useRef(null);
  const horizonCurveRef = useRef(null);
  const previewStripRef = useRef(null);
  const transitionVeilRef = useRef(null);
  const veilMistRef = useRef(null);
  const veilColumnHintRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    let media;
    const ctx = gsap.context(() => {
      const chars = section.querySelectorAll('.hero-char');
      const eyebrow = section.querySelector('.hero-eyebrow');
      const lead = section.querySelector('.hero-lead');
      const actions = section.querySelector('.hero-actions');
      const previewCards = section.querySelectorAll('.hero-preview-card');
      const rockIntros = section.querySelectorAll('.hero-rock-intro');

      // =======================================================================
      // ETAPA 1 — PRESENTACIÓN AL CARGAR
      // =======================================================================
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .fromTo(
          cloudBackRef.current,
          { opacity: 0 },
          { opacity: 0.62, duration: 1.05 },
          0.04
        )
        .fromTo(
          haloRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.05 },
          0.04
        )
        .fromTo(
          statueIntroRef.current,
          { autoAlpha: 0, y: 32, scale: 0.94, filter: 'brightness(0.28)' },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'brightness(1)',
            duration: 1.2,
            clearProps: 'filter',
          },
          0.1
        )
        .fromTo(
          crackGlowRef.current,
          { opacity: 0 },
          { opacity: 0.92, duration: 1.0, ease: 'power2.inOut' },
          0.3
        )
        .fromTo(
          rockIntros,
          { autoAlpha: 0, scale: 0.72 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.95,
            stagger: 0.07,
          },
          0.35
        )
        .fromTo(
          [ringBackIntroRef.current, ringFrontIntroRef.current],
          { autoAlpha: 0, scale: 0.84 },
          { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'expo.out' },
          0.46
        )
        .fromTo(
          eyebrow,
          { autoAlpha: 0, x: -16 },
          { autoAlpha: 1, x: 0, duration: 0.62 },
          0.58
        )
        .fromTo(
          chars,
          { yPercent: 112, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.022,
            ease: 'power4.out',
          },
          0.64
        )
        .fromTo(
          [lead, actions],
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.08, clearProps: 'transform' },
          0.92
        )
        .fromTo(
          previewCards,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.06, clearProps: 'transform' },
          1.02
        );

      // =======================================================================
      // SCROLL: una sola línea de tiempo con scrub mientras el Hero sale de pantalla.
      // Cada propiedad de cada elemento se anima UNA sola vez (sin solapes), así que
      // el movimiento es idéntico al bajar, al subir o al saltar desde el menú.
      // =======================================================================
      const mm = gsap.matchMedia();
      media = mm;

      responsive(mm, ({ desk, k, scrub }) => {
        const tl = gsap.timeline({
          defaults: { ease: 'none', duration: 1 },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub,
            invalidateOnRefresh: true,
          },
        });

        tl.to(skyImgRef.current, { scale: 1.12, yPercent: 5 }, 0)
          .to(stageLightRef.current, { scale: 1.2, opacity: 0.9 }, 0)
          .to(cloudNebulaRef.current, { x: -70 * k, y: 24 * k, scale: 1.12 }, 0)
          .to(cloudFrontRef.current, { y: -40 * k, scale: 1.2 }, 0)
          .to(cameraRigRef.current, { scale: 1 + 0.12 * k, yPercent: -3 * k }, 0)
          .to(statueGroupRef.current, { scale: 1 + 0.14 * k, y: 44 * k }, 0)
          .to(
            [ringBackRef.current, ringFrontRef.current],
            { rotate: -14, scaleX: 1 + 0.14 * k, scaleY: 1 + 0.26 * k, y: 30 * k },
            0
          )
          .to(rock1Ref.current, { x: 125 * k, y: -90 * k, rotate: 22, scale: 1.2 }, 0)
          .to(rock4Ref.current, { x: -135 * k, y: -60 * k, rotate: -22, scale: 1.2 }, 0)
          .to(rock2Ref.current, { x: -95 * k, y: -115 * k, rotate: 14, scale: 1.12 }, 0)
          .to(rock3Ref.current, { x: -115 * k, y: 80 * k, rotate: -18, scale: 1.25 }, 0)
          // El texto se aleja y se desvanece en el primer tramo del recorrido.
          .to(
            copyRef.current,
            { y: -80 * k, x: desk ? -28 : 0, autoAlpha: desk ? 0 : 0.25, duration: 0.7, ease: 'power1.in' },
            0
          )
          .to(scrollCueRef.current, { y: 22, autoAlpha: 0, duration: 0.22, ease: 'power1.in' }, 0)
          // Velo azul que conecta con la escena "Sobre mí" en el tramo final.
          .fromTo(
            transitionVeilRef.current,
            { autoAlpha: 0 },
            { autoAlpha: desk ? 0.65 : 0.4, duration: 0.3 },
            0.7
          )
          .fromTo(
            veilMistRef.current,
            { yPercent: 30, scale: 1.04 },
            { yPercent: 0, scale: 1.16, duration: 0.3 },
            0.7
          )
          .fromTo(
            veilColumnHintRef.current,
            { y: 75, scale: 0.9, autoAlpha: 0 },
            { y: 0, scale: 1, autoAlpha: 0.45, duration: 0.3 },
            0.7
          );
      });
    }, section);

    return () => {
      // La media query debe limpiarse ANTES de restaurar el árbol React:
      // evita dejar spans materializados o animaciones duplicadas al alternar FX.
      media?.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  // Física independiente del cursor en tiempo real (2.5D / perspectiva)
  useEffect(() => {
    if (reducedMotion || isMobile) return undefined;
    const stage = stageRef.current;
    if (!stage) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let rafId = 0;

    const onPointerMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const updateParallax = () => {
      rafId = window.requestAnimationFrame(updateParallax);
      current.x += (target.x - current.x) * 0.055;
      current.y += (target.y - current.y) * 0.055;

      stage.style.setProperty('--mx', current.x.toFixed(4));
      stage.style.setProperty('--my', current.y.toFixed(4));
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = window.requestAnimationFrame(updateParallax);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [reducedMotion, isMobile]);

  return (
    <section className="hero-scene" id="inicio" ref={sectionRef}>
      <div className="hero-pin-stage" ref={heroPinRef}>
        {/* ESCENARIO PRINCIPAL CINEMATOGRÁFICO */}
        <div className="hero-viewport">
          {/* Fondo atmosférico nocturno, iluminación reactiva y nubes por capas */}
          <div className="hero-backdrop" aria-hidden="true">
            <img
              ref={skyImgRef}
              src="/assets/cinematic/hero-atmosphere.webp"
              alt=""
              className="hero-backdrop__sky"
              fetchPriority="high"
              decoding="async"
            />
            <div className="hero-stage-light" ref={stageLightRef} />
            <img
              ref={cloudBackRef}
              src="/assets/cinematic/cloud-storm.webp"
              alt=""
              className="hero-cloud hero-cloud--upper"
            />
            <div className="hero-cloud-nebula-wrap" ref={cloudNebulaRef}>
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
            <div className="hero-copy" ref={copyRef}>
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

            {/* COLUMNA DERECHA: Rig de cámara 3D + Estatua, anillo orbital y rocas suspendidas */}
            <div className="hero-camera-rig" ref={cameraRigRef}>
              <div className="hero-stage" ref={stageRef}>
                <div className="hero-orbital-halo" ref={haloRef} aria-hidden="true" />
                <div className="hero-statue-backlight" aria-hidden="true" />

                <OrbitalRingHalf
                  position="back"
                  scrollRef={ringBackRef}
                  introRef={ringBackIntroRef}
                />

                <div className="hero-rock hero-rock--two" aria-hidden="true">
                  <div className="hero-rock-scroll" ref={rock2Ref}>
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-2.webp" alt="" className="hero-rock__float-b" />
                    </div>
                  </div>
                </div>

                <div className="hero-statue-wrap" ref={statueGroupRef}>
                  <div className="hero-statue-intro" ref={statueIntroRef}>
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
                        ref={crackGlowRef}
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

                <OrbitalRingHalf
                  position="front"
                  scrollRef={ringFrontRef}
                  introRef={ringFrontIntroRef}
                />

                <div className="hero-rock hero-rock--one" aria-hidden="true">
                  <div className="hero-rock-scroll" ref={rock1Ref}>
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-1.webp" alt="" className="hero-rock__float-a" />
                    </div>
                  </div>
                </div>

                <div className="hero-rock hero-rock--four" aria-hidden="true">
                  <div className="hero-rock-scroll" ref={rock4Ref}>
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-4.webp" alt="" className="hero-rock__float-c" />
                    </div>
                  </div>
                </div>

                <div className="hero-rock hero-rock--three" aria-hidden="true">
                  <div className="hero-rock-scroll" ref={rock3Ref}>
                    <div className="hero-rock-intro">
                      <img src="/assets/cinematic/rock-3.webp" alt="" className="hero-rock__float-d" />
                    </div>
                  </div>
                </div>

                <div className="hero-foreground-mist" ref={cloudFrontRef} aria-hidden="true">
                  <img src="/assets/cinematic/cloud-storm.webp" alt="" />
                </div>
              </div>
            </div>
          </div>

          <button
            ref={scrollCueRef}
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

          <div className="hero-horizon-curve" ref={horizonCurveRef} aria-hidden="true" />
        </div>

        {/* PANELES INFERIORES DE PRESENTACIÓN (fieles a la composición de la Imagen 1) */}
        <div className="hero-preview-strip" ref={previewStripRef} aria-label="Vista previa de escenas">
          <div className="hero-preview-grid">
            {/* Panel 02 · Sobre mí */}
            <article
              className="hero-preview-card hero-preview-card--about"
              onClick={() => onNavigate('sobre-mi')}
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
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  03 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Proyectos</h2>
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
            >
              <div className="hero-preview-card__content">
                <span className="cine-kicker-num">
                  04 <i aria-hidden="true" />
                </span>
                <h2 className="hero-preview-card__title">Tecnologías</h2>
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

        {/* Velo atmosférico y puente arquitectónico de Etapa 4 (Hero -> Sobre mí) */}
        <div className="hero-transition-veil" ref={transitionVeilRef} aria-hidden="true">
          <div className="hero-transition-veil__glow" />
          <img
            ref={veilColumnHintRef}
            src="/assets/cinematic/marble-column.webp"
            alt=""
            className="hero-transition-veil__column"
          />
          <img
            ref={veilMistRef}
            src="/assets/cinematic/cloud-storm.webp"
            alt=""
            className="hero-transition-veil__mist"
          />
        </div>
      </div>
    </section>
  );
}
