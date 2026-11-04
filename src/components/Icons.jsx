/**
 * ICONOS SVG REUTILIZABLES
 * ------------------------
 * Se usan como componentes para no repetir el mismo SVG en varios archivos.
 * Todos son decorativos (aria-hidden) porque siempre acompañan un texto.
 */

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  'aria-hidden': 'true',
  focusable: 'false',
};

export function GitHubIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="currentColor">
      <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.1c-3.09.67-3.74-1.31-3.74-1.31-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .17 1.8 1.3 3.27.89.1-.73.39-1.23.7-1.52-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.14a10.7 10.7 0 0 1 5.6 0c2.14-1.44 3.07-1.14 3.07-1.14.61 1.53.23 2.67.12 2.95.72.78 1.14 1.77 1.14 2.99 0 4.29-2.6 5.24-5.08 5.52.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}

export function LinkedInIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.67H9.34V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.1 20.45H3.54V9h3.56v11.45Z" />
    </svg>
  );
}

export function MailIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3.5 6 8.5 6.5L20.5 6" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowUpIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5.5 11.5 12 5l6.5 6.5" />
    </svg>
  );
}

export function CopyIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
      <path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
    </svg>
  );
}

export function CheckIcon({ size = 18 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function MapPinIcon({ size = 16 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function MenuIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ size = 22 }) {
  return (
    <svg {...base} width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function StarIcon({ size = 14 }) {
  return (
    <svg {...base} width={size} height={size} fill="currentColor">
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}
