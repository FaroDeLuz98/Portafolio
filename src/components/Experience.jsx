import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';
import { timeline } from '../data/siteData.js';

/**
 * EXPERIENCE · Línea de tiempo de experiencia y formación
 * -------------------------------------------------------
 * La línea vertical se "dibuja" a medida que se hace scroll,
 * usando useScroll + useSpring sobre la sección.
 */
export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section className="section shell" id="experiencia" ref={sectionRef}>
      <SectionHeading
        kicker="04 / EXPERIENCIA"
        title="Trabajo y"
        highlight="formación."
        aside="Aprendizaje constante entre el aula, los proyectos y los clientes reales."
      />

      <div className="timeline">
        {/* Riel de fondo + progreso animado */}
        <div className="timeline-rail" aria-hidden="true">
          <motion.div className="timeline-progress" style={{ scaleY: lineScale }} />
        </div>

        {timeline.map((item, index) => (
          <Reveal
            className="timeline-item"
            key={item.title}
            delay={index * 0.08}
            amount={0.2}
          >
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-date">{item.period}</div>
            <h3>
              {item.title} <span>· {item.subtitle}</span>
            </h3>
            <p>{item.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
