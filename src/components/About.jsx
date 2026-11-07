import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import TechSphere3D from './TechSphere3D.jsx';
import AnimatedCounter from './AnimatedCounter.jsx';
import { Cube3DIcon } from './Icons.jsx';
import { skillGroups } from '../data/siteData.js';

/**
 * SOBRE MÍ · Presentación personal y stack con Esfera 3D libremente móvil
 * -----------------------------------------------------------------------
 * La tarjeta "Tech stack" desactiva la inclinación externa cuando está activa
 * la Esfera 3D para que puedas arrastrar y moverte dentro sin interferencia.
 */
export default function About() {
  const [stackView, setStackView] = useState('sphere'); // 'sphere' | 'list'

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
        <Reveal delay={0.05}>
          <Tilt3DCard className="panel about-card" maxTilt={4}>
            <div className="about-profile-row">
              <div className="about-avatar">
                <img
                  src="/assets/ftperfil.jpeg"
                  alt="Fernando Sisnande"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <h3>
                  Sobre mí <span className="green" aria-hidden="true">↗</span>
                </h3>
                <span className="about-location">
                  Fernando Sisnande · Sarandí Grande, UY
                </span>
              </div>
            </div>

            <p>
              Soy Fernando, estudiante de Bachillerato Tecnológico en Informática y
              de Comercio y Ventas en UTU, con finalización prevista para 2026.
            </p>
            <p>
              Desarrollo proyectos web con interfaces modernas, animaciones fluidas,
              lógica de negocio y bases de datos. También realicé trabajos digitales
              para clientes locales, combinando creatividad, comunicación y tecnología.
            </p>

            <div className="mini-stats">
              <div>
                <strong>
                  <AnimatedCounter value={2026} />
                </strong>
                <span>Finalización UTU</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter value={2} />
                </strong>
                <span>Bachilleratos</span>
              </div>
              <div>
                <strong>
                  <AnimatedCounter value={4} suffix="+" />
                </strong>
                <span>Proyectos web</span>
              </div>
              <div>
                <strong>UY</strong>
                <span>Ubicación</span>
              </div>
            </div>
          </Tilt3DCard>
        </Reveal>

        {/* Tarjeta de tecnologías: cuando está en Esfera 3D no inclina la tarjeta para moverse libre */}
        <Reveal delay={0.14}>
          <Tilt3DCard
            className="panel skills-card"
            maxTilt={stackView === 'sphere' ? 0 : 4}
            glare={stackView !== 'sphere'}
          >
            <div className="card-topline">
              <h3>Tech stack</h3>
              <div
                className="stack-view-tabs"
                role="tablist"
                aria-label="Modo de visualización de tecnologías"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={stackView === 'sphere'}
                  className={stackView === 'sphere' ? 'is-active' : ''}
                  onClick={() => setStackView('sphere')}
                >
                  <Cube3DIcon size={13} />
                  Esfera 3D
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={stackView === 'list'}
                  className={stackView === 'list' ? 'is-active' : ''}
                  onClick={() => setStackView('list')}
                >
                  Por área
                </button>
              </div>
            </div>

            <p>
              {stackView === 'sphere'
                ? 'Arrastrá la esfera en cualquier dirección para explorar mis herramientas.'
                : 'Tecnologías con las que trabajé y sigo aprendiendo cada día.'}
            </p>

            <AnimatePresence mode="wait">
              {stackView === 'sphere' ? (
                <motion.div
                  key="sphere"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                >
                  <TechSphere3D />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  className="skill-groups"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
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
                </motion.div>
              )}
            </AnimatePresence>

            <div className="terminal-line">
              <span className="green" aria-hidden="true">➜</span>{' '}
              <span className="muted">status:</span> always learning &amp; building
              <span className="cursor" aria-hidden="true">_</span>
            </div>
          </Tilt3DCard>
        </Reveal>
      </div>
    </section>
  );
}
