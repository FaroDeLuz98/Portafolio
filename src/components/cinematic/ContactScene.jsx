import { useEffect, useRef, useState } from 'react';
import { contact, navSections, profile } from '../../data/portfolioData.js';
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './CinematicIcons.jsx';

const PORTAL_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${16 + ((i * 37) % 68)}%`,
  delay: `${(i * 0.31).toFixed(2)}s`,
  duration: `${4.0 + (i % 4) * 1.05}s`,
  size: `${2 + (i % 3) * 1.5}px`,
}));

export default function ContactScene({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2600);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <section className="cine-scene contact-scene" id="contacto">
      <div className="contact-pin-stage">
        {/* Resplandor ambiental azul */}
        <div className="contact-ambient-aura" aria-hidden="true" />

        <div className="cine-shell contact-portal-layout">
          {/* COLUMNA IZQUIERDA: Título, CTA principal y enlaces verificados */}
          <div className="contact-editorial">
            <div>
              <div className="cine-section-eyebrow">
                <span className="cine-kicker-num">
                  05 <i aria-hidden="true" />
                </span>
                <span className="cine-kicker-label">PORTAL DE CONTACTO DIRECTO</span>
              </div>

              <h2 className="cine-display-title">Contacto</h2>

              <p className="contact-headline">
                ¿Tenés un proyecto en mente o buscás sumar un desarrollador a tu equipo?{' '}
                <em>Hablemos y llevémoslo a la realidad.</em>
              </p>

              <p className="contact-subcopy">
                Abierto a oportunidades laborales Trainee / Junior, colaboraciones en
                equipos de tecnología y desarrollo de sitios web desde{' '}
                <strong>{contact.location}</strong>.
              </p>
            </div>

            <div className="contact-primary-actions">
              <a
                href={`mailto:${contact.email}`}
                className="cine-btn cine-btn--primary cine-btn--lg"
              >
                <MailIcon size={18} />
                <span>Enviar mensaje</span>
                <ArrowRightIcon size={17} />
              </a>

              <button
                type="button"
                className={`cine-btn cine-btn--ghost cine-btn--lg${copied ? ' is-copied' : ''}`}
                onClick={handleCopyEmail}
              >
                {copied ? <CheckIcon size={17} /> : <CopyIcon size={17} />}
                <span role="status" aria-live="polite">
                  {copied ? 'Correo copiado' : 'Copiar correo'}
                </span>
              </button>
            </div>

            <div className="contact-verified-links">
              <a href={`mailto:${contact.email}`} className="contact-link-card">
                <MailIcon size={19} />
                <div>
                  <span>Correo electrónico</span>
                  <strong>{contact.email}</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>

              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <LinkedInIcon size={19} />
                <div>
                  <span>LinkedIn Profesional</span>
                  <strong>Fernando Sisnande</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>

              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-card"
              >
                <GitHubIcon size={19} />
                <div>
                  <span>GitHub Oficial</span>
                  <strong>@{contact.githubUser}</strong>
                </div>
                <ArrowUpRightIcon size={15} />
              </a>
            </div>
          </div>

          {/* ESCENA DERECHA: Cámara + Arco clásico de piedra iluminado en azul */}
          <div className="contact-portal-perspective">
            <div className="contact-portal-stage" aria-hidden="true">
              <div className="portal-energy-core">
                <div className="portal-energy-core__vortex" />
                <div className="portal-energy-core__horizon" />
              </div>

              <div className="portal-particles">
                {PORTAL_PARTICLES.map((p) => (
                  <span
                    key={p.id}
                    className="portal-particle"
                    style={{
                      left: p.left,
                      animationDelay: p.delay,
                      animationDuration: p.duration,
                      width: p.size,
                      height: p.size,
                    }}
                  />
                ))}
              </div>

              <div className="portal-arch-monument">
                <img
                  src="/assets/cinematic/portal-arch.webp"
                  alt=""
                  width="735"
                  height="942"
                  loading="lazy"
                />
              </div>

              <div className="portal-threshold-mist">
                <img src="/assets/cinematic/cloud-storm.webp" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PIE DE PÁGINA MINIMALISTA */}
      <footer className="cine-footer">
        <div className="cine-shell cine-footer__inner">
          <div className="cine-footer__brand">
            <a
              href="#inicio"
              className="cine-brand"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('inicio');
              }}
            >
              <span className="cine-brand__slashes" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="cine-brand__text">{profile.name}</span>
            </a>
            <p>
              {profile.roleDetail} · {profile.location}
            </p>
          </div>

          <nav className="cine-footer__nav" aria-label="Enlaces del pie de página">
            {navSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(sec.id);
                }}
              >
                {sec.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="cine-shell cine-footer__bottom">
          <span>© {currentYear} Fernando Sisnande · Sarandí Grande, Uruguay</span>
          <span>React · Desplegado en Vercel</span>
        </div>
      </footer>
    </section>
  );
}
