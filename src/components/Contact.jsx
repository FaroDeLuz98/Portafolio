import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import KineticText from './KineticText.jsx';
import ScrambleText from './ScrambleText.jsx';
import Magnetic from './Magnetic.jsx';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons.jsx';
import { usePreferences } from '../context/PreferencesContext.jsx';
import { contact } from '../data/siteData.js';

const BURST_PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  return {
    id: i,
    dx: Math.cos(angle) * (44 + (i % 3) * 14),
    dy: Math.sin(angle) * (36 + (i % 2) * 14),
  };
});

/**
 * CONTACT · Sección final de contacto con tipografía 3D y micro-celebración
 * -------------------------------------------------------------------------
 * Incluye botones magnéticos y estallido de partículas al copiar el correo.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);
  const { isMinimalMotion } = usePreferences();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section className="contact-section" id="contacto">
      {/* Orbes decorativos del fondo */}
      <div className="contact-glow contact-glow--one" aria-hidden="true" />
      <div className="contact-glow contact-glow--two" aria-hidden="true" />

      <div className="shell contact-inner">
        <Reveal className="section-kicker" y={12}>
          <ScrambleText text="05 / CONTACTO" />
        </Reveal>

        <h2 className="contact-title-3d">
          <KineticText text="¿Construimos algo" mode="words" delay={0.04} />{' '}
          <span>
            <KineticText
              text="juntos?"
              mode="chars"
              delay={0.18}
              stagger={0.036}
              interactive
            />
          </span>
        </h2>

        <Reveal as="p" className="contact-lead" delay={0.12} y={18}>
          Estoy abierto a oportunidades para aprender, colaborar y dar mis primeros
          pasos profesionales en desarrollo web e IT.
        </Reveal>

        <Reveal className="contact-actions" delay={0.18} y={18}>
          <Magnetic strength={0.25}>
            <a className="btn primary" href={`mailto:${contact.email}`}>
              <MailIcon size={17} />
              Escribime un correo
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
              Conectar en LinkedIn
            </a>
          </Magnetic>

          <div className="copy-burst-wrap">
            <Magnetic strength={0.2}>
              <button
                type="button"
                className={`btn ghost copy-btn${copied ? ' is-copied' : ''}`}
                onClick={copyEmail}
              >
                {copied ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                <span role="status" aria-live="polite">
                  {copied ? '¡Correo copiado!' : 'Copiar correo'}
                </span>
              </button>
            </Magnetic>

            <AnimatePresence>
              {copied && !isMinimalMotion && (
                <span className="copy-particles" aria-hidden="true">
                  {BURST_PARTICLES.map((p) => (
                    <motion.i
                      key={p.id}
                      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      animate={{ opacity: 0, x: p.dx, y: p.dy, scale: 0.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.65, ease: 'easeOut' }}
                    />
                  ))}
                </span>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal className="contact-links" delay={0.24} y={14}>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon size={15} />
            GitHub
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon size={15} />
            LinkedIn
          </a>
          <a className="contact-cta-link" href="#proyectos">
            Ver mis proyectos
            <ArrowUpRightIcon size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
