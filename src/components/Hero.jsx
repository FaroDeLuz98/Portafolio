import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import KineticText from './KineticText.jsx';
import ScrambleText from './ScrambleText.jsx';
import RotatingRoles from './RotatingRoles.jsx';
import Tilt3DCard from './Tilt3DCard.jsx';
import Magnetic from './Magnetic.jsx';
import {
  ArrowUpRightIcon,
  BriefcaseIcon,
  GitHubIcon,
  InfoIcon,
  LinkedInIcon,
  MailIcon,
  MapPinIcon,
} from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact, projects } from '../data/siteData.js';

const DOSSIER_TECHS = ['React', 'JavaScript', 'PHP', 'MySQL'];

/**
 * HERO · Portada Ejecutiva Verde + Dossier Profesional 3D
 * -------------------------------------------------------
 * Diseñada para comunicar claridad inmediata tanto a equipos de Selección /
 * RRHH de grandes empresas como a clientes que no son del sector IT.
 */
export default function Hero() {
  const heroRef = useRef(null);
  const { isMinimalMotion, openTechExplainer } = usePreferences();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, 56]);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isMinimalMotion ? 0 : 0.08,
        delayChildren: isMinimalMotion ? 0 : 0.06,
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
    <section className="hero-editorial shell" id="inicio" ref={heroRef}>
      {/* Franja superior de disponibilidad corporativa */}
      <motion.div
        className="hero-telemetry"
        initial={isMinimalMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="availability-pill">
          <span className="online-dot" aria-hidden="true" />
          <span>
            Disponible para empresas y equipos · Rol Trainee / Junior
          </span>
        </div>

        <div className="telemetry-coords">
          <MapPinIcon size={14} />
          <ScrambleText
            text="SARANDÍ GRANDE · URUGUAY · REMOTO / HÍBRIDO / PRESENCIAL"
            speed={20}
          />
        </div>
      </motion.div>

      <div className="hero-stage-grid">
        {/* Columna izquierda: Propuesta de valor clara y humana */}
        <motion.div
          className="hero-headline-col"
          variants={container}
          initial={isMinimalMotion ? false : 'hidden'}
          animate="visible"
          style={isMinimalMotion ? undefined : { y: leftY }}
        >
          <motion.div className="hero-role-chip" variants={item}>
            <span className="role-chip-dot" aria-hidden="true">
              ✦
            </span>
            <RotatingRoles />
          </motion.div>

          <motion.h1 className="hero-monumental-title" variants={item}>
            <span className="hero-first-name">
              <KineticText
                text="Fernando"
                mode="chars"
                delay={0.12}
                stagger={0.028}
                interactive
              />
            </span>
            <span className="gradient hero-last-name">
              <KineticText
                text="Sisnande."
                mode="chars"
                delay={0.3}
                stagger={0.03}
                interactive
              />
            </span>
          </motion.h1>

          <motion.p className="hero-editorial-statement" variants={item}>
            Desarrollo soluciones web{' '}
            <em className="editorial-serif">claras, confiables y orientadas a resultados</em>{' '}
            — uniendo desarrollo de software con visión comercial y atención al
            cliente.
          </motion.p>

          <motion.p className="hero-bio-summary" variants={item}>
            Estudiante de <strong>Informática</strong> y{' '}
            <strong>Comercio y Ventas</strong> en UTU (promoción 2026). Preparado
            para integrarme a equipos corporativos aportando orden técnico,
            comunicación fluida con áreas no técnicas y experiencia real con 4
            sitios publicados.
          </motion.p>

          {/* Barra rápida de perfil para reclutadores y empresas */}
          <motion.div className="hero-exec-badges" variants={item}>
            <span>
              <BriefcaseIcon size={14} /> Perfil IT + Comercial
            </span>
            <span>Trabajo colaborativo con Git</span>
            <button
              type="button"
              className="hero-explain-trigger"
              onClick={() => openTechExplainer('React')}
            >
              <InfoIcon size={14} /> ¿No sos de IT? Tocá un lenguaje para entenderlo
            </button>
          </motion.div>

          <motion.div className="hero-cta-bar" variants={item}>
            <Magnetic strength={0.25}>
              <a className="btn primary btn-lg" href="#proyectos">
                <span>Ver sitios realizados ({projects.length})</span>
                <ArrowUpRightIcon size={18} />
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a className="btn ghost btn-lg" href="#sobre-mi">
                <span>Perfil empresarial &amp; Stack</span>
              </a>
            </Magnetic>

            <div className="hero-quick-socials">
              <Magnetic strength={0.28}>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn de Fernando Sisnande"
                  title="LinkedIn Profesional"
                >
                  <LinkedInIcon size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.28}>
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub de Fernando Sisnande"
                  title="GitHub · @FaroDeLuz98"
                >
                  <GitHubIcon size={18} />
                </a>
              </Magnetic>
              <Magnetic strength={0.28}>
                <a
                  href={`mailto:${contact.email}`}
                  aria-label="Enviar correo a Fernando Sisnande"
                  title={contact.email}
                >
                  <MailIcon size={18} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Columna derecha: Ficha Ejecutiva / Dossier 3D */}
        <motion.div
          className="hero-dossier-col"
          initial={isMinimalMotion ? false : { opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={isMinimalMotion ? undefined : { y: rightY }}
        >
          <Tilt3DCard className="dossier-card" maxTilt={6.5}>
            <div className="dossier-backplate" aria-hidden="true" />

            <div className="dossier-inner">
              <div className="dossier-top-meta">
                <span className="dossier-id">FICHA PROFESIONAL · 2026</span>
                <span className="dossier-badge">Trainee / Jr.</span>
              </div>

              <div className="dossier-portrait-frame">
                <img
                  src="/assets/ftperfil.jpeg"
                  alt="Retrato de Fernando Sisnande"
                  width="640"
                  height="640"
                />
                <div className="dossier-portrait-overlay">
                  <span>Fernando Sisnande</span>
                  <small>Sarandí Grande, Uruguay</small>
                </div>
              </div>

              <div className="dossier-specs">
                <div className="dossier-spec-row">
                  <span className="spec-key">Formación</span>
                  <strong className="spec-val">UTU · Informática + Ventas</strong>
                </div>
                <div className="dossier-spec-row">
                  <span className="spec-key">Modalidad</span>
                  <strong className="spec-val">Remoto · Híbrido · UY</strong>
                </div>
                <div className="dossier-spec-row">
                  <span className="spec-key">Entregas</span>
                  <strong className="spec-val accent-val">
                    04 Sitios web en línea
                  </strong>
                </div>
              </div>

              {/* Píldoras interactivas: al presionarlas explican qué hace cada una */}
              <div className="dossier-tech-row">
                <small>Tocá para saber qué hace:</small>
                <div className="dossier-tech-pills">
                  {DOSSIER_TECHS.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => openTechExplainer(tech)}
                      title={`Explicar para qué sirve ${tech}`}
                    >
                      {tech} <span>?</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="dossier-floating-tag" aria-hidden="true">
              <span className="online-dot" />
              <span>Listo para incorporar</span>
            </div>
          </Tilt3DCard>
        </motion.div>
      </div>
    </section>
  );
}
