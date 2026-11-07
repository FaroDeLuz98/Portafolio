import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import { timeline } from '../data/siteData.js';

/**
 * EXPERIENCE · Capítulos de Trayectoria y Formación Académica
 * -----------------------------------------------------------
 * Diseño horizontal de 3 columnas conectadas por un haz luminoso que
 * se completa con el scroll, conservando cada experiencia y formación en UTU.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 55%'],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="section shell" id="experiencia" ref={sectionRef}>
      <SectionHeading
        kicker="03 / TRAYECTORIA & FORMACIÓN"
        title="Clientes reales y"
        highlight="educación."
        aside="Aprendizaje constante combinando el aula en UTU con proyectos reales de diseño y comunicación."
      />

      <div className="chapters-wrapper">
        {/* Barra conectora animada con el scroll */}
        <div className="chapters-beam-track" aria-hidden="true">
          <motion.div
            className="chapters-beam-fill"
            style={{ scaleX: progressScale }}
          />
        </div>

        <div className="chapters-grid">
          {timeline.map((item, index) => (
            <Reveal
              key={item.title}
              className="chapter-cell"
              delay={index * 0.1}
              amount={0.18}
            >
              <Tilt3DCard className="bento-card chapter-card" maxTilt={4.5}>
                <div className="chapter-head">
                  <span className="chapter-period">{item.period}</span>
                  <span className="chapter-watermark" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="chapter-title">{item.title}</h3>
                <span className="chapter-subtitle">{item.subtitle}</span>
                <p className="chapter-desc">{item.description}</p>
              </Tilt3DCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
