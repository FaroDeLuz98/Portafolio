import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, timeline } from '../../data/portfolioData.js';
import { createWordScrubber, responsive, reveal, scrubFromTo } from '../../animations/motion.js';

gsap.registerPlugin(ScrollTrigger);

export default function AboutScene({ reducedMotion = false }) {
  const sectionRef = useRef(null);
  const aboutPinRef = useRef(null);
  const stage3dRef = useRef(null);
  const columnPrimaryRef = useRef(null);
  const columnFarLeftRef = useRef(null);
  const columnFarRightRef = useRef(null);
  const silkMainRef = useRef(null);
  const silkEchoRef = useRef(null);
  const lightBeamRef = useRef(null);
  const rockFgRef = useRef(null);
  const badgeRef = useRef(null);
  const lowerBlockRef = useRef(null);
  const exitBridgeRockRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    let media;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      media = mm;

      responsive(mm, ({ k, scrub }) => {
        const stage = aboutPinRef.current;
        const lower = lowerBlockRef.current;
        const full = { trigger: stage, start: 'top bottom', end: 'bottom top' };

        // --- Entradas de contenido (por tiempo, una vez) --------------------------
        // Textos: las palabras se materializan una a una mientras se hace scroll.
        const words = createWordScrubber(scrub, k);
        reveal(section.querySelector('.cine-section-eyebrow[data-about-step="header"]'), { y: 28 });
        words.run(section.querySelectorAll('h2[data-about-step="header"], p[data-about-step="header"]'));
        words.run(section.querySelectorAll('[data-about-step="para"]'));
        words.run(section.querySelector('.about-trajectory__head h3'));
        reveal(section.querySelector('[data-about-step="metrics"]'), { y: 24, scale: 0.96 });
        reveal(badgeRef.current, { y: 22, scale: 0.94, ease: 'back.out(1.3)' });
        reveal(section.querySelectorAll('.about-pillar-card'), { y: 36, stagger: 0.12 });
        reveal(section.querySelector('.about-trajectory__head .cine-kicker-label'), { y: 22 });
        reveal(section.querySelectorAll('.about-timeline-card'), { y: 30, x: -12, stagger: 0.12 });

        // --- Parallax de profundidad (scrub reversible) ---------------------------
        scrubFromTo(
          columnPrimaryRef.current,
          { y: 70 * k, rotateY: -8, scale: 0.94 },
          { y: -50 * k, rotateY: 6, scale: 1.05 },
          full,
          scrub
        );
        scrubFromTo(
          columnFarLeftRef.current,
          { y: -40 * k, scale: 0.94 },
          { y: 55 * k, scale: 1.05 },
          full,
          scrub
        );
        scrubFromTo(
          columnFarRightRef.current,
          { y: 60 * k, rotateY: 10 },
          { y: -55 * k, rotateY: -6 },
          full,
          scrub
        );
        scrubFromTo(
          silkMainRef.current,
          { xPercent: -22 * k, yPercent: 18 * k, rotate: -10 },
          { xPercent: 12 * k, yPercent: -14 * k, rotate: 6 },
          full,
          scrub
        );
        scrubFromTo(
          silkEchoRef.current,
          { xPercent: 16 * k, yPercent: -12 * k, rotate: 8 },
          { xPercent: -14 * k, yPercent: 12 * k, rotate: -7 },
          full,
          scrub
        );
        scrubFromTo(
          rockFgRef.current,
          { y: 90 * k, x: -20 * k, rotate: -12 },
          { y: -100 * k, x: 26 * k, rotate: 16 },
          full,
          scrub
        );
        scrubFromTo(
          lightBeamRef.current,
          { xPercent: -16, opacity: 0.4 },
          { xPercent: 16, opacity: 0.95 },
          full,
          scrub
        );
        scrubFromTo(
          exitBridgeRockRef.current,
          { y: 60 * k, rotate: -10 },
          { y: -45 * k, rotate: 10 },
          { trigger: lower, start: 'top bottom', end: 'bottom top' },
          scrub
        );

        return words.revert;
      });
    }, section);

    return () => {
      // La media query debe limpiarse ANTES de restaurar el árbol React:
      // evita dejar spans materializados o animaciones duplicadas al alternar FX.
      media?.revert();
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section className="cine-scene about-scene" id="sobre-mi" ref={sectionRef}>
      {/* ESCENARIO ARQUITECTÓNICO PRINCIPAL (Fijado en escritorio con perspectiva 3D) */}
      <div className="about-pin-stage" ref={aboutPinRef}>
        {/* Columna lejana izquierda de profundidad arquitectónica */}
        <div className="about-arch-far" ref={columnFarLeftRef} aria-hidden="true">
          <img src="/assets/cinematic/marble-column.webp" alt="" loading="lazy" />
        </div>

        {/* Columna clásica derecha en plano profundo */}
        <div className="about-arch-far-right" ref={columnFarRightRef} aria-hidden="true">
          <img src="/assets/cinematic/pack-column.webp" alt="" loading="lazy" />
        </div>

        {/* Haz volumétrico azul que evoluciona con el desplazamiento */}
        <div className="about-evolving-light" ref={lightBeamRef} aria-hidden="true" />

        <div className="cine-shell about-layout">
          {/* COLUMNA EDITORIAL CON INFORMACIÓN PROFESIONAL REAL */}
          <div className="about-editorial">
            <div className="cine-section-eyebrow" data-about-step="header">
              <span className="cine-kicker-num">
                02 <i aria-hidden="true" />
              </span>
              <span className="cine-kicker-label">SOBRE MÍ · PERFIL PROFESIONAL</span>
            </div>

            <h2 className="cine-display-title" data-about-step="header">
              Sobre mí
            </h2>

            <p className="about-statement" data-about-step="header">
              Transformo ideas en soluciones web{' '}
              <em>funcionales, claras y orientadas a personas reales</em>, uniendo
              desarrollo de software con visión comercial.
            </p>

            <div className="about-bio-copy">
              {profile.aboutParagraphs.map((paragraph) => (
                <p key={paragraph} data-about-step="para">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Métricas verificadas */}
            <div className="about-metrics-bar" data-about-step="metrics">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="about-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ESCENA ESCULTÓRICA DERECHA EN PERSPECTIVA 3D */}
          <div className="about-sculpture-stage" ref={stage3dRef} aria-hidden="true">
            <div className="about-stage-glow" />

            {/* Pliegue secundario de seda azul en profundidad */}
            <div className="about-silk about-silk--back" ref={silkEchoRef}>
              <img
                src="/assets/cinematic/pack-blue-silk.webp"
                alt=""
                loading="lazy"
                className="about-silk__wave-slow"
              />
            </div>

            {/* Columna clásica corintia de mármol con rotación 3D */}
            <div className="about-column-main" ref={columnPrimaryRef}>
              <img
                src="/assets/cinematic/marble-column.webp"
                alt=""
                width="283"
                height="1110"
                loading="lazy"
              />
            </div>

            {/* Tela de seda azul real atravesando la composición */}
            <div className="about-silk about-silk--front" ref={silkMainRef}>
              <img
                src="/assets/cinematic/blue-silk.webp"
                alt=""
                width="1044"
                height="593"
                loading="lazy"
                className="about-silk__wave"
              />
            </div>

            {/* Fragmento rocoso en primer plano conectando desde el Hero */}
            <div className="about-fg-rock" ref={rockFgRef}>
              <img src="/assets/cinematic/rock-4.webp" alt="" loading="lazy" />
            </div>

            {/* Tarjeta flotante de identidad verificada */}
            <div className="about-floating-badge" ref={badgeRef}>
              <img
                src="/assets/ftperfil.jpeg"
                alt="Fernando Sisnande"
                width="56"
                height="56"
                loading="lazy"
              />
              <div>
                <strong>{profile.name}</strong>
                <span>{profile.location} · UTU 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-ESCENA EN PROFUNDIDAD: PILARES TÉCNICO-COMERCIALES + TRAYECTORIA REAL */}
      <div className="about-lower-narrative" ref={lowerBlockRef}>
        {/* Roca tecnológica de transición hacia la cumbre de Proyectos */}
        <div className="about-exit-bridge-rock" ref={exitBridgeRockRef} aria-hidden="true">
          <img src="/assets/cinematic/rock-1.webp" alt="" loading="lazy" />
        </div>

        <div className="cine-shell about-pillars-grid">
          {profile.pillars.map((pillar) => (
            <article key={pillar.code} className="about-pillar-card cine-glass-panel">
              <span className="about-pillar-card__code">{pillar.code}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.detail}</p>
            </article>
          ))}
        </div>

        <div className="cine-shell about-trajectory">
          <div className="about-trajectory__head">
            <span className="cine-kicker-label">EXPERIENCIA REAL &amp; FORMACIÓN</span>
            <h3>Recorrido práctico y académico</h3>
          </div>

          <div className="about-trajectory__grid">
            {timeline.map((item, idx) => (
              <article key={item.title} className="about-timeline-card cine-glass-panel">
                <div className="about-timeline-card__top">
                  <span className="about-timeline-card__period">{item.period}</span>
                  <span className="about-timeline-card__idx">0{idx + 1}</span>
                </div>
                <h4>{item.title}</h4>
                <span className="about-timeline-card__sub">{item.subtitle}</span>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
