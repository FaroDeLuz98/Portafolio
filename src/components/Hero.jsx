import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CodeWindow from './CodeWindow.jsx';
import KineticText from './KineticText.jsx';
import ScrambleText from './ScrambleText.jsx';
import RotatingRoles from './RotatingRoles.jsx';
import Magnetic from './Magnetic.jsx';
import {
  ArrowUpRightIcon,
  GitHubIcon,
  LinkedInIcon,
  MapPinIcon,
} from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

/**
 * HERO · Primera pantalla del portafolio
 * --------------------------------------
 * - Tipografía cinética 3D interactiva en el nombre principal.
 * - Rotador dinámico 3D de roles.
 * - Ventana de código con profundidad 3D acoplada a la interfaz y paralaje suave.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const { isMinimalMotion } = usePreferences();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const editorY = useTransform(scrollYProgress, [0, 1], [0, 82]);
  const editorOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0.35]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMinimalMotion ? 0 : 0.085,
        delayChildren: isMinimalMotion ? 0 : 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: isMinimalMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMinimalMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="hero shell" id="inicio" ref={heroRef}>
      <motion.div
        className="hero-copy"
        variants={container}
        initial={isMinimalMotion ? false : 'hidden'}
        animate="visible"
        style={isMinimalMotion ? undefined : { y: copyY }}
      >
        <motion.div className="eyebrow" variants={item}>
          <span className="online-dot" aria-hidden="true" />
          Disponible para oportunidades trainee / junior
        </motion.div>

        <motion.p className="path" variants={item} aria-hidden="true">
          <ScrambleText text="~/portfolio/fernando-sisnande" speed={20} />{' '}
          <span className="green">$</span> whoami
          <span className="cursor">_</span>
        </motion.p>

        <motion.h1 variants={item}>
          Hola, soy{' '}
          <span className="gradient hero-display-name">
            <KineticText
              text="Fernando Sisnande."
              mode="chars"
              delay={0.22}
              stagger={0.028}
              interactive
            />
          </span>
        </motion.h1>

        <motion.div className="hero-role-banner" variants={item}>
          <span className="hero-role-prefix" aria-hidden="true">
            &gt;_
          </span>
          <RotatingRoles />
        </motion.div>

        <motion.p className="hero-subtitle" variants={item}>
          Estudiante de Informática y <strong>desarrollador web junior</strong> de
          Uruguay. Transformo ideas en experiencias digitales funcionales, claras y
          útiles.
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <Magnetic strength={0.26}>
            <a className="btn primary" href="#proyectos">
              Explorar proyectos
              <ArrowUpRightIcon size={17} />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              className="btn ghost"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon size={17} />
              Ver GitHub
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              className="btn ghost"
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon size={17} />
              LinkedIn
            </a>
          </Magnetic>
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
        initial={isMinimalMotion ? false : { opacity: 0, scale: 0.95, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        style={
          isMinimalMotion
            ? undefined
            : { y: editorY, opacity: editorOpacity }
        }
      >
        <div className="editor-glow" aria-hidden="true" />
        <CodeWindow />
      </motion.div>

      <a className="scroll-cue" href="#sobre-mi" aria-label="Bajar a Sobre mí">
        <span className="scroll-mouse" aria-hidden="true">
          <i />
        </span>
        <span>SCROLL</span>
      </a>
    </section>
  );
}
