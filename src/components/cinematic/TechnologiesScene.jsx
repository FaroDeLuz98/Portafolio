import { useMemo, useState } from 'react';
import { verifiedTechnologies } from '../../data/portfolioData.js';
import { getTechExplanation } from '../../data/techExplanations.js';
import { CheckIcon, TechVectorGlyph } from './CinematicIcons.jsx';

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

function CrystalTechNode({
  tech,
  index,
  isSelected,
  isDimmed,
  onSelect,
}) {
  const cubeSrc = ASSET_CUBE_MAP[tech.iconKey];

  return (
    <div
      className={`tech-crystal-orbit tech-crystal-card--pos-${(index % 6) + 1}`}
      data-crystal-orbit={index}
    >
      <button
        type="button"
        className={`tech-crystal-card${isSelected ? ' is-selected' : ''}${
          isDimmed ? ' is-dimmed' : ''
        }`}
        style={{ '--float-delay': `${(index * 0.38).toFixed(2)}s` }}
        onClick={() => onSelect(tech)}
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
            <div className="tech-crystal-card__custom-cube">
              <TechVectorGlyph iconKey={tech.iconKey} size={38} />
            </div>
          )}
        </div>

        <div className="tech-crystal-card__label-block">
          <span className="tech-crystal-card__name">{tech.name}</span>
          <span className="tech-crystal-card__cat">{tech.category}</span>
        </div>
      </button>
    </div>
  );
}

export default function TechnologiesScene() {
  const [activeGroup, setActiveGroup] = useState('Todas');
  const [selectedTech, setSelectedTech] = useState(verifiedTechnologies[0]);

  const detailedInfo = useMemo(
    () => getTechExplanation(selectedTech.name.split(' ')[0]),
    [selectedTech]
  );

  const selectedCubeSrc = ASSET_CUBE_MAP[selectedTech.iconKey];

  return (
    <section className="cine-scene tech-scene" id="tecnologias">
      <div className="tech-pin-stage">
        {/* Monolito cristalino con anillos orbitales en segundo plano */}
        <div className="tech-bg-monolith" aria-hidden="true">
          <img src="/assets/cinematic/crystal-rings.webp" alt="" loading="lazy" />
        </div>

        <div className="cine-shell tech-stage-shell">
          <div className="tech-header">
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

          {/* Filtros coordinados por área */}
          <div
            className="tech-filter-bar"
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
                  />
                );
              })}

              {/* Base rocosa iluminada bajo la constelación */}
              <div className="tech-field-rock-base" aria-hidden="true">
                <div className="tech-field-rock-glow" />
                <img src="/assets/cinematic/rock-peak.webp" alt="" loading="lazy" />
              </div>
            </div>

            {/* Podio holográfico interactivo de inspección */}
            <aside
              className="tech-podium-inspector cine-glass-panel"
              aria-live="polite"
            >
              <div className="tech-podium-stage">
                <div className="tech-podium-beam" aria-hidden="true" />

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
