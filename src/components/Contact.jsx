import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';
import {
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons.jsx';
import { contact } from '../data/siteData.js';

/**
 * CONTACT · Sección final de contacto
 * -----------------------------------
 * Incluye un botón para copiar el correo al portapapeles con confirmación
 * visual. Si el navegador no permite copiar, abre el cliente de correo.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  // Limpia el temporizador si el componente se desmonta.
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2200);
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
          05 / CONTACTO
        </Reveal>

        <Reveal as="h2" delay={0.06} y={20}>
          ¿Construimos algo <span>juntos?</span>
        </Reveal>

        <Reveal as="p" className="contact-lead" delay={0.12} y={18}>
          Estoy abierto a oportunidades para aprender, colaborar y dar mis primeros
          pasos profesionales en IT.
        </Reveal>

        <Reveal className="contact-actions" delay={0.18} y={18}>
          <a className="btn primary" href={`mailto:${contact.email}`}>
            <MailIcon size={17} />
            Escribime un correo
          </a>
          <a
            className="btn ghost"
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon size={17} />
            Conectar en LinkedIn
          </a>
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
