import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { skillGroups } from '../data/siteData.js';

/**
 * SOBRE MÍ · Presentación personal y stack
 * ----------------------------------------
 * Dos tarjetas: una con la biografía y datos rápidos, otra con las
 * tecnologías agrupadas por área. Cada grupo entra escalonado.
 */
export default function About() {
  return (
    <section className="section shell" id="sobre-mi">
      <SectionHeading
        kicker="01 / SOBRE MÍ"
        title="Un poco sobre"
        highlight="mí."
        aside="Aprendiendo, construyendo y mejorando en cada proyecto."
      />

      <div className="about-grid">
        {/* Tarjeta de presentación */}
        <Reveal className="panel about-card" delay={0.05}>
          <h3>
            Sobre mí <span className="green" aria-hidden="true">↗</span>
          </h3>
          <p>
            Soy Fernando, estudiante de Bachillerato Tecnológico en Informática y
            de Comercio y Ventas en UTU, con finalización prevista para 2026.
          </p>
          <p>
            Desarrollo proyectos web con interfaces, lógica de negocio y bases de
            datos. También realicé trabajos digitales para clientes locales,
            combinando creatividad, comunicación y tecnología.
          </p>

          <div className="mini-stats">
            <div>
              <strong>2026</strong>
              <span>Finalización UTU</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Bachilleratos</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Proyectos web</span>
            </div>
            <div>
              <strong>UY</strong>
              <span>Ubicación</span>
            </div>
          </div>
        </Reveal>

        {/* Tarjeta de tecnologías */}
        <Reveal className="panel skills-card" delay={0.14}>
          <div className="card-topline">
            <h3>Tech stack</h3>
            <span className="pill">Mis herramientas</span>
          </div>
          <p>Tecnologías con las que trabajé y sigo aprendiendo cada día.</p>

          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.title}>
                <h4>{group.title}</h4>
                <div className="skills">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="terminal-line">
            <span className="green" aria-hidden="true">➜</span>{' '}
            <span className="muted">status:</span> always learning
            <span className="cursor" aria-hidden="true">_</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
