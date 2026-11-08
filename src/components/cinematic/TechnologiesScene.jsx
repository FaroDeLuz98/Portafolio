import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { verifiedTechnologies } from '../../data/portfolioData.js';
import { getTechExplanation } from '../../data/techExplanations.js';
import { createWordScrubber, responsive, reveal, scrubFromTo } from '../../animations/motion.js';
import { CheckIcon, TechVectorGlyph } from './CinematicIcons.jsx';

gsap.registerPlugin(ScrollTrigger);

const ASSET_CUBE_MAP = {
  react: '/assets/cinematic/cube-react.webp',
  javascript: '/assets/cinematic/cube-js.webp',
  php: '/assets/cinematic/cube-php.webp',
  html5: '/assets/cinematic/cube-html5.webp',
  database: '/assets/cinematic/cube-db.webp',
  github: '/assets/cinematic/cube-github.webp',
  bolt: '/assets/cinematic/cube-bolt.webp',
};

const GROUPS = [
  'Todas',
  'Frontend & Interacción',
  'Backend & Datos',
  'Gráficos & Animación',
  'Entorno & Despliegue',
];

// Vectores tridimensionales de dispersión inicial y apertura final para los 12 cristales
const CONSTELLATION_VECTORS = [
  { dx: -320, dy: -195, rot: -24, ex: -175, ey: -45, erot: -14 },
  { dx: -20, dy: -245, rot: 18, ex: 0, ey: -135, erot: 8 },
  { dx: 310, dy: -185, rot: 26, ex: 155, ey: -40, erot: 15 },
  { dx: -375, dy: -25, rot: -20, ex: -195, ey: -10, erot: -12 },
  { dx: 185, dy: -155, rot: -16, ex: 15, ey: -115, erot: -6 },
  { dx: 355, dy: 15, rot: 22, ex: 165, ey: 5, erot: 12 },
  { dx: -335, dy: 145, rot: 24, ex: -185, ey: 38, erot: -16 },
  { dx: -45, dy: 235, rot: -18, ex: -10, ey: -95, erot: 9 },
  { dx: 325, dy: 165, rot: -22, ex: 160, ey: 42, erot: 14 },
  { dx: -255, dy: 245, rot: 19, ex: -165, ey: 75, erot: -12 },
  { dx: 45, dy: 265, rot: -15, ex: 10, ey: 95, erot: -8 },
  { dx: 275, dy: 235, rot: 21, ex: 155, ey: 78, erot: 16 },
];

function CrystalTechNode({
  tech,
  index,
  isSelected,
  isDimmed,
  onSelect,
  isMobile,
  reducedMotion,
}) {
  const nodeRef = useRef(null);
  const cubeSrc = ASSET_CUBE_MAP[tech.iconKey];

  const handlePointerMove = (e) => {
    if (reducedMotion || isMobile || !nodeRef.current) return;
    const rect = nodeRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    nodeRef.current.style.setProperty('--cx', `${(px * 15).toFixed(2)}deg`);
    nodeRef.current.style.setProperty('--cy', `${(-py * 15).toFixed(2)}deg`);
  };

  const handlePointerLeave = () => {
    if (!nodeRef.current) return;
    nodeRef.current.style.setProperty('--cx', '0deg');
    nodeRef.current.style.setProperty('--cy', '0deg');
  };

  return (
    <div
      className={`tech-crystal-orbit tech-crystal-card--pos-${(index % 6) + 1}`}
      data-crystal-orbit={index}
    >
      <button
        ref={nodeRef}
        type="button"
        className={`tech-crystal-card${isSelected ? ' is-selected' : ''}${
          isDimmed ? ' is-dimmed' : ''
        }`}
        style={{ '--float-delay': `${(index * 0.38).toFixed(2)}s` }}
        onClick={() => onSelect(tech)}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-pressed={isSelected}
      >
        <span className="tech-crystal-card__refraction" aria-hidden="true" />

        <div className="tech-crystal-card__visual">
          {cubeSrc ? (
            <img
              src={cubeSrc}
              alt=""
              className="tech-crystal-card__cube-img"
              width="120"
              height="120"
              loading="lazy"
            />
          ) : (
            <div className="tech-crystal-card__custom-cube" aria-hidden="true">
              <TechVectorGlyph iconKey={tech.iconKey} size={36} />
            </div>
          )}
        </div>

        <div className="tech-crystal-card__meta">
          <strong>{tech.name}</strong>
          <span>{tech.group.split(' ')[0]}</span>
        </div>
      </button>
    </div>
  );
}

export default function TechnologiesScene({ reducedMotion = false, isMobile = false }) {
  const sectionRef = useRef(null);
  const pinStageRef = useRef(null);
  const monolithRef = useRef(null);
  const headerRef = useRef(null);
  const filterBarRef = useRef(null);
  const rockBaseRef = useRef(null);
  const rockGlowRef = useRef(null);
  const podiumRef = useRef(null);
  const podiumBeamRef = useRef(null);
  const portalBridgeGlowRef = useRef(null);

  const [activeGroup, setActiveGroup] = useState('Todas');
  const [selectedTech, setSelectedTech] = useState(verifiedTechnologies[0]);

  const detailedInfo = useMemo(
    () => getTechExplanation(selectedTech.name.split(' ')[0]),
    [selectedTech]
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return undefined;

    let media;
    const ctx = gsap.context(() => {
      const orbits = gsap.utils.toArray('.tech-crystal-orbit', section);
      const mm = gsap.matchMedia();
      media = mm;

      responsive(mm, ({ desk, scrub }) => {
        const stage = pinStageRef.current;

        const words = createWordScrubber(scrub, desk ? 1 : 0.5);
        reveal(headerRef.current?.querySelector('.cine-section-eyebrow'), { y: 24, start: 'top 80%', trigger: stage });
        words.run(headerRef.current?.querySelectorAll('h2, .tech-header__lead'));
        reveal(filterBarRef.current, { y: 24, start: 'top 92%' });

        // Monolito de fondo: parallax continuo mientras la escena cruza la pantalla.
        scrubFromTo(
          monolithRef.current,
          { y: 50, rotate: -10, scale: 0.92 },
          { y: -40, rotate: 10, scale: 1.08 },
          { trigger: stage, start: 'top bottom', end: 'bottom top' },
          scrub
        );

        // Resplandor puente hacia Contacto: se enciende al salir la escena.
        scrubFromTo(
          portalBridgeGlowRef.current,
          { opacity: 0, scale: 0.65, yPercent: 25 },
          { opacity: 0.9, scale: 1.25, yPercent: 0 },
          { trigger: stage, start: 'center center', end: 'bottom top' },
          scrub
        );

        if (!desk) {
          // MÓVIL: cada cristal converge al entrar en pantalla.
          orbits.forEach((node, i) => {
            scrubFromTo(
              node,
              { x: i % 2 === 0 ? -40 : 40, y: 36, scale: 0.82, autoAlpha: 0.1 },
              { x: 0, y: 0, scale: 1, autoAlpha: 1, ease: 'power2.out' },
              { trigger: node, start: 'top 95%', end: 'top 45%' },
              scrub
            );
          });
          scrubFromTo(
            podiumRef.current,
            { autoAlpha: 0.2, y: 36, scale: 0.95 },
            { autoAlpha: 1, y: 0, scale: 1, ease: 'power2.out' },
            { trigger: podiumRef.current, start: 'top 90%', end: 'top 55%' },
            scrub
          );
          return words.revert;
        }

        // ESCRITORIO: los 12 cristales convergen desde el espacio mientras la escena sube.
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out', duration: 0.7 },
          scrollTrigger: {
            trigger: stage,
            start: 'top 92%',
            end: 'top -12%',
            scrub,
            invalidateOnRefresh: true,
          },
        });

        orbits.forEach((node, i) => {
          const v = CONSTELLATION_VECTORS[i % CONSTELLATION_VECTORS.length];
          tl.fromTo(
            node,
            { x: v.dx * 0.6, y: v.dy * 0.6, scale: 0.6, rotate: v.rot * 0.6, autoAlpha: 0.15 },
            { x: 0, y: 0, scale: 1, rotate: 0, autoAlpha: 1 },
            (i % 4) * 0.06
          );
        });

        tl.fromTo(
          rockBaseRef.current,
          { y: 45, scale: 0.88, autoAlpha: 0.35 },
          { y: 0, scale: 1, autoAlpha: 1 },
          0.05
        )
          .fromTo(
            rockGlowRef.current,
            { opacity: 0.25, scale: 0.75 },
            { opacity: 1, scale: 1.2 },
            0.05
          )
          .fromTo(
            podiumRef.current,
            { autoAlpha: 0.45, x: 55, scale: 0.94, rotateY: -8 },
            { autoAlpha: 1, x: 0, scale: 1, rotateY: 0 },
            0.05
          )
          .fromTo(
            podiumBeamRef.current,
            { scaleY: 0.2, opacity: 0.2, transformOrigin: 'bottom center' },
            { scaleY: 1, opacity: 1, transformOrigin: 'bottom center' },
            0.15
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

  const selectedCubeSrc = ASSET_CUBE_MAP[selectedTech.iconKey];

  return (
    <section className="cine-scene tech-scene" id="tecnologias" ref={sectionRef}>
      <div className="tech-pin-stage" ref={pinStageRef}>
        {/* Monolito cristalino con anillos orbitales en segundo plano */}
        <div className="tech-bg-monolith" ref={monolithRef} aria-hidden="true">
          <img src="/assets/cinematic/crystal-rings.webp" alt="" loading="lazy" />
        </div>

        {/* Resplandor puente hacia el Portal de Contacto en el Acto 3 */}
        <div
          className="tech-portal-bridge-glow"
          ref={portalBridgeGlowRef}
          aria-hidden="true"
        />

        <div className="cine-shell tech-stage-shell">
          <div className="tech-header" ref={headerRef}>
            <div>
              <div className="cine-section-eyebrow">
                <span className="cine-kicker-num">
                  04 <i aria-hidden="true" />
                </span>
                <span className="cine-kicker-label">STACK REAL VERIFICADO</span>
              </div>
              <h2 className="cine-display-title">Tecnologías</h2>
            </div>

            <p className="tech-header__lead">
              Herramientas y lenguajes aplicados realmente en mis proyectos y formación en
              UTU. Seleccioná cualquier cristal para inspeccionar su función y aplicación.
            </p>
          </div>

          {/* Filtros coordinados por área (iluminan sub-constelaciones sin desmontar nodos) */}
          <div
            className="tech-filter-bar"
            ref={filterBarRef}
            role="tablist"
            aria-label="Filtrar tecnologías por área"
          >
            {GROUPS.map((grp) => (
              <button
                key={grp}
                type="button"
                role="tab"
                aria-selected={activeGroup === grp}
                className={`tech-filter-btn${activeGroup === grp ? ' is-active' : ''}`}
                onClick={() => {
                  setActiveGroup(grp);
                  const nextList =
                    grp === 'Todas'
                      ? verifiedTechnologies
                      : verifiedTechnologies.filter((t) => t.group === grp);
                  if (nextList.length > 0 && !nextList.some((t) => t.id === selectedTech.id)) {
                    setSelectedTech(nextList[0]);
                  }
                }}
              >
                {grp}
              </button>
            ))}
          </div>

          <div className="tech-constellation-layout">
            {/* Constelación interactiva de 12 cristales verificados */}
            <div className="tech-crystals-field">
              {verifiedTechnologies.map((tech, idx) => {
                const isDimmed = activeGroup !== 'Todas' && tech.group !== activeGroup;
                return (
                  <CrystalTechNode
                    key={tech.id}
                    tech={tech}
                    index={idx}
                    isSelected={selectedTech.id === tech.id}
                    isDimmed={isDimmed}
                    onSelect={(chosen) => {
                      setSelectedTech(chosen);
                      if (activeGroup !== 'Todas' && chosen.group !== activeGroup) {
                        setActiveGroup('Todas');
                      }
                    }}
                    isMobile={isMobile}
                    reducedMotion={reducedMotion}
                  />
                );
              })}

              {/* Base rocosa iluminada bajo la constelación */}
              <div className="tech-field-rock-base" ref={rockBaseRef} aria-hidden="true">
                <div className="tech-field-rock-glow" ref={rockGlowRef} />
                <img src="/assets/cinematic/rock-peak.webp" alt="" loading="lazy" />
              </div>
            </div>

            {/* Podio holográfico interactivo de inspección */}
            <aside
              className="tech-podium-inspector cine-glass-panel"
              ref={podiumRef}
              aria-live="polite"
            >
              <div className="tech-podium-stage">
                <div className="tech-podium-beam" ref={podiumBeamRef} aria-hidden="true" />

                <div className="tech-podium-floating-icon" key={selectedTech.id}>
                  {selectedCubeSrc ? (
                    <img src={selectedCubeSrc} alt="" width="136" height="136" />
                  ) : (
                    <div className="tech-crystal-card__custom-cube tech-crystal-card__custom-cube--lg">
                      <TechVectorGlyph iconKey={selectedTech.iconKey} size={48} />
                    </div>
                  )}
                </div>

                <img
                  src="/assets/cinematic/neon-podium.webp"
                  alt=""
                  aria-hidden="true"
                  className="tech-podium-disc"
                  loading="lazy"
                />
              </div>

              <div className="tech-podium-copy">
                <span className="tech-podium-group">{selectedTech.group}</span>
                <h3>{selectedTech.name}</h3>
                <p className="tech-podium-summary">{selectedTech.summary}</p>

                {detailedInfo?.analogy && (
                  <div className="tech-podium-analogy">
                    <strong>En simple:</strong> {detailedInfo.simple}
                  </div>
                )}

                <div className="tech-podium-used">
                  <span className="tech-podium-used__title">Verificado en:</span>
                  <div className="tech-podium-used__chips">
                    {selectedTech.usedIn.map((place) => (
                      <span key={place}>
                        <CheckIcon size={13} />
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
