import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import CodeWindow, { FloatingChips } from './CodeWindow.jsx';
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MapPinIcon,
} from './Icons.jsx';
import { contact } from '../data/siteData.js';

/**
 * HERO · Primera pantalla del portafolio
 * --------------------------------------
 * - Entrada escalonada de los textos.
 * - Parallax suave del editor de código al hacer scroll.
 * - Chips flotantes animados alrededor del editor.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Progreso del scroll dentro del hero (0 = arriba, 1 = cuando sale de pantalla).
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Distintas velocidades para crear profundidad (parallax).
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const editorY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const editorOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.35]);

  // Variantes para la entrada escalonada de los elementos.
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="hero shell" id="inicio" ref={heroRef}>
      <motion.div
        className="hero-copy"
        variants={container}
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        style={reduceMotion ? undefined : { y: copyY }}
      >
        <motion.div className="eyebrow" variants={item}>
          <span className="online-dot" aria-hidden="true" />
          Disponible para oportunidades trainee / junior
        </motion.div>

        <motion.p className="path" variants={item} aria-hidden="true">
          ~/portfolio/fernando-sisnande <span className="green">$</span> whoami
          <span className="cursor">_</span>
        </motion.p>

        <motion.h1 variants={item}>
          Hola, soy <span className="gradient">Fernando Sisnande.</span>
        </motion.h1>

        <motion.p className="hero-subtitle" variants={item}>
          Estudiante de Informática y <strong>desarrollador web junior</strong> de
          Uruguay. Transformo ideas en experiencias digitales funcionales, claras y
          útiles.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <a className="btn primary" href="#proyectos">
            Explorar proyectos
            <ArrowUpRightIcon size={17} />
          </a>
          <a
            className="btn ghost"
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon size={17} />
            Ver GitHub
          </a>
          <a
            className="btn ghost"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon size={17} />
            LinkedIn
          </a>
        </motion.div>

        <motion.div className="hero-meta" variants={item}>
          <span>
            <MapPinIcon size={15} />
            Sarandí Grande, Uruguay
          </span>
          <span className="meta-divider" aria-hidden="true" />
          <span>UTU · Promoción 2026</span>
          <span className="meta-divider" aria-hidden="true" />
          <span className="meta-status">
            <span className="online-dot" aria-hidden="true" />
            Disponible
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        aria-hidden="true"
        style={
          reduceMotion
            ? undefined
            : { y: editorY, opacity: editorOpacity }
        }
      >
        <div className="editor-glow" />
        <CodeWindow />
        <FloatingChips />
      </motion.div>

      <a
        className="scroll-cue"
        href="#sobre-mi"
        aria-label="Scroll · Bajar a la sección Sobre mí"
      >
        <span className="mouse" aria-hidden="true">
          <span />
        </span>
        <span>scroll</span>
      </a>
    </section>
  );
}
