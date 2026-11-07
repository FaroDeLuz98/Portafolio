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

const BURST_PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return {
    id: i,
    dx: Math.cos(angle) * (48 + (i % 3) * 16),
    dy: Math.sin(angle) * (38 + (i % 2) * 14),
  };
});

/**
 * CONTACT · Canal Ejecutivo para Empresas, Selección IT y Clientes
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
    <section className="section shell" id="contacto">
      <div className="contact-monolith">
        <div className="contact-glow contact-glow--one" aria-hidden="true" />
        <div className="contact-glow contact-glow--two" aria-hidden="true" />
        <div className="contact-perspective-grid" aria-hidden="true" />

        <div className="contact-monolith-inner">
          <Reveal className="section-kicker" y={12}>
            <ScrambleText text="05 / CONTACTO PROFESIONAL" />
          </Reveal>

          <h2 className="contact-display-title">
            <KineticText text="¿Coordinamos una" mode="words" delay={0.04} />{' '}
            <span className="gradient">
              <KineticText
                text="entrevista?"
                mode="chars"
                delay={0.18}
                stagger={0.034}
                interactive
              />
            </span>
          </h2>

          <Reveal as="p" className="contact-lead" delay={0.12} y={18}>
            Disponible para procesos de selección Trainee / Junior en empresas,
            integración en equipos de tecnología o desarrollo de proyectos web
            para marcas y organizaciones.
          </Reveal>

          <Reveal className="email-command-bar" delay={0.16} y={16}>
            <span className="email-address-text">{contact.email}</span>

            <div className="copy-burst-wrap">
              <button
                type="button"
                className={`email-copy-pill${copied ? ' is-copied' : ''}`}
                onClick={copyEmail}
              >
                {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                <span role="status" aria-live="polite">
                  {copied ? '¡Correo copiado!' : 'Copiar correo'}
                </span>
              </button>

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

          <Reveal className="contact-actions" delay={0.22} y={18}>
            <Magnetic strength={0.24}>
              <a className="btn primary btn-lg" href={`mailto:${contact.email}`}>
                <MailIcon size={17} />
                Enviar correo directo
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                className="btn ghost btn-lg"
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon size={17} />
                Perfil en LinkedIn
                <ArrowUpRightIcon size={15} />
              </a>
            </Magnetic>

            <Magnetic strength={0.2}>
              <a
                className="btn ghost btn-lg"
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon size={17} />
                GitHub · @{contact.githubUser}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
