import { profile, timeline } from '../../data/portfolioData.js';

export default function AboutScene() {
  return (
    <section className="cine-scene about-scene" id="sobre-mi">
      {/* ESCENARIO ARQUITECTÓNICO PRINCIPAL */}
      <div className="about-pin-stage">
        {/* Columna lejana izquierda de profundidad arquitectónica */}
        <div className="about-arch-far" aria-hidden="true">
          <img src="/assets/cinematic/marble-column.webp" alt="" loading="lazy" />
        </div>

        {/* Columna clásica derecha en plano profundo */}
        <div className="about-arch-far-right" aria-hidden="true">
          <img src="/assets/cinematic/pack-column.webp" alt="" loading="lazy" />
        </div>

        {/* Haz volumétrico azul */}
        <div className="about-evolving-light" aria-hidden="true" />

        <div className="cine-shell about-layout">
          {/* COLUMNA EDITORIAL CON INFORMACIÓN PROFESIONAL REAL */}
          <div className="about-editorial">
            <div className="cine-section-eyebrow">
              <span className="cine-kicker-num">
                02 <i aria-hidden="true" />
              </span>
              <span className="cine-kicker-label">SOBRE MÍ · PERFIL PROFESIONAL</span>
            </div>

            <h2 className="cine-display-title">
              Sobre mí
            </h2>

            <p className="about-statement">
              Transformo ideas en soluciones web{' '}
              <em>funcionales, claras y orientadas a personas reales</em>, uniendo
              desarrollo de software con visión comercial.
            </p>

            <div className="about-bio-copy">
              {profile.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Métricas verificadas */}
            <div className="about-metrics-bar">
              {profile.metrics.map((metric) => (
                <div key={metric.label} className="about-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ESCENA ESCULTÓRICA DERECHA */}
          <div className="about-sculpture-stage" aria-hidden="true">
            <div className="about-stage-glow" />

            {/* Pliegue secundario de seda azul en profundidad */}
            <div className="about-silk about-silk--back">
              <img
                src="/assets/cinematic/pack-blue-silk.webp"
                alt=""
                loading="lazy"
                className="about-silk__wave-slow"
              />
            </div>

            {/* Columna clásica corintia de mármol */}
            <div className="about-column-main">
              <img
                src="/assets/cinematic/marble-column.webp"
                alt=""
                width="283"
                height="1110"
                loading="lazy"
              />
            </div>

            {/* Tela de seda azul real atravesando la composición */}
            <div className="about-silk about-silk--front">
              <img
                src="/assets/cinematic/blue-silk.webp"
                alt=""
                width="1044"
                height="593"
                loading="lazy"
                className="about-silk__wave"
              />
            </div>

            {/* Fragmento rocoso en primer plano */}
            <div className="about-fg-rock">
              <img src="/assets/cinematic/rock-4.webp" alt="" loading="lazy" />
            </div>

            {/* Tarjeta flotante de identidad verificada */}
            <div className="about-floating-badge">
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
      <div className="about-lower-narrative">
        {/* Roca tecnológica de transición hacia la cumbre de Proyectos */}
        <div className="about-exit-bridge-rock" aria-hidden="true">
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
