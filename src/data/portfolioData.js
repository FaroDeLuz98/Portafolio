/**
 * DATOS PROFESIONALES VERIFICADOS — FERNANDO SISNANDE
 * ---------------------------------------------------
 * 100% basado en la información real del portafolio original, README.md,
 * proyectos publicados verificables y repositorios públicos en GitHub (@FaroDeLuz98).
 */

export const profile = {
  name: 'Fernando Sisnande',
  firstName: 'Fernando',
  lastName: 'Sisnande',
  role: 'Desarrollador Web',
  roleDetail: 'Desarrollador Web Junior · Estudiante de Informática',
  location: 'Sarandí Grande, Uruguay',
  availability: 'Disponible para oportunidades Trainee / Junior y proyectos web',
  workModes: 'Remoto · Híbrido · Presencial en Uruguay',
  heroLead:
    'Creo experiencias web modernas, funcionales y claras que combinan diseño de interfaz, lógica de negocio y bases de datos para llevar ideas reales al mundo digital.',
  aboutSummary:
    'Desarrollador web de Uruguay formado en Informática y Comercio y Ventas en UTU (promoción 2026), enfocado en crear soluciones digitales reales que unen diseño, funcionalidad y visión comercial.',
  aboutParagraphs: [
    'Soy estudiante de Bachillerato Tecnológico en Informática y de Comercio y Ventas en UTU (finalización prevista en 2026), radicado en Sarandí Grande, Uruguay.',
    'Durante mi formación he desarrollado proyectos individuales y en equipo que integran interfaces responsivas, lógica de servidor y bases de datos relacionales, además de colaborar con emprendimientos y artistas locales en su presencia digital.',
    'Esta doble formación técnico-comercial me permite comprender tanto la arquitectura del código como los objetivos reales de cada cliente, comunicando soluciones con claridad y trabajando de forma ordenada con Git y GitHub.',
  ],
  metrics: [
    { value: '2026', label: 'Promoción UTU' },
    { value: '02', label: 'Áreas · IT + Comercial' },
    { value: '04', label: 'Sitios en producción' },
    { value: 'UY', label: 'Sarandí Grande' },
  ],
  pillars: [
    {
      code: '01',
      title: 'Frontend & Experiencia UI/UX',
      detail:
        'Interfaces modernas, accesibles y adaptables a celulares, tablets y escritorio con HTML5, CSS3, JavaScript y React.',
    },
    {
      code: '02',
      title: 'Backend & Bases de Datos',
      detail:
        'Desarrollo de catálogos dinámicos, autenticación de usuarios, carritos de compra y gestión relacional con PHP, MySQL y SQL.',
    },
    {
      code: '03',
      title: 'Puente entre Código y Negocio',
      detail:
        'Formación conjunta en Informática y Comercio y Ventas para traducir necesidades comerciales en soluciones digitales efectivas.',
    },
  ],
};

export const navSections = [
  { id: 'inicio', num: '01', label: 'Inicio' },
  { id: 'sobre-mi', num: '02', label: 'Sobre mí' },
  { id: 'proyectos', num: '03', label: 'Proyectos' },
  { id: 'tecnologias', num: '04', label: 'Tecnologías' },
  { id: 'contacto', num: '05', label: 'Contacto' },
];

export const projects = [
  {
    id: 'byztoo-pc',
    number: '01',
    title: 'Byztoo PC',
    subtitle: 'E-commerce Tecnológico',
    category: 'Comercio Electrónico · Trabajo en equipo',
    description:
      'Plataforma de comercio electrónico enfocada en productos informáticos desarrollada en equipo. Integra catálogo dinámico con buscador, sistema de favoritos, registro e inicio de sesión y carrito de compras conectado a base de datos.',
    impact:
      'Permite comercializar hardware y periféricos en línea con gestión estructurada de usuarios, catálogo y stock real sobre PHP y MySQL.',
    highlights: [
      'Catálogo buscable con filtros y sistema de favoritos para clientes.',
      'Autenticación de usuarios y carrito de compras persistente.',
      'Persistencia de productos y cuentas gestionada con PHP y MySQL.',
    ],
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    image: '/assets/byztoo-pc.webp',
    imageAlt: 'Captura real de la tienda tecnológica Byztoo PC',
    url: 'https://byztoo-pc.ct.ws/index.php',
    linkLabel: 'Visitar Byztoo PC',
    transitionPreset: 'orbital-tilt',
  },
  {
    id: 'maktub',
    number: '02',
    title: 'Maktub · Tu Liberación',
    subtitle: 'Sitio Institucional & Reservas',
    category: 'Desarrollo Web · Atención en línea',
    description:
      'Sitio institucional para un espacio de constelaciones familiares asistidas con caballos y desarrollo personal. Presenta jornadas, testimonios y agenda, integrando chat en tiempo real y formularios automatizados.',
    impact:
      'Conecta visitantes con atención directa mediante Crisp Chat y recepción estructurada de consultas vía Formspree.',
    highlights: [
      'Arquitectura clara de experiencias, preguntas frecuentes y testimonios.',
      'Widget de mensajería en vivo integrado con Crisp Chat.',
      'Gestión automática de consultas con Formspree y diseño responsive.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Crisp Chat', 'Formspree'],
    image: '/assets/Maktub.webp',
    imageAlt: 'Captura real del sitio institucional Maktub Tu Liberación',
    url: 'https://heroic-faun-71d0f4.netlify.app/',
    linkLabel: 'Visitar Maktub',
    transitionPreset: 'depth-glide',
  },
  {
    id: 'juglares',
    number: '03',
    title: 'Juglares · Hugo Cabeza',
    subtitle: 'Portal Oficial Cultural',
    category: 'Portal Oficial · Música y cultura',
    description:
      'Portal web oficial del músico Hugo Cabeza y el grupo de música popular uruguaya Juglares. Reúne décadas de discografía documentada, galería histórica y material audiovisual con identidad de Sarandí Grande.',
    impact:
      'Preserva y difunde seis álbumes documentados, historia cultural y obras musicales en un archivo digital accesible para todas las edades.',
    highlights: [
      'Catálogo interactivo de discografía, canciones y archivo fotográfico.',
      'Dirección visual inspirada en el patrimonio cultural de Sarandí Grande.',
      'Experiencia de lectura clara y fluida en móviles y escritorio.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Diseño responsive', 'Hosting'],
    image: '/assets/Juglares.webp',
    imageAlt: 'Captura real del portal oficial de Juglares y Hugo Cabeza',
    url: 'https://incandescent-semolina-a7b3ff.netlify.app/',
    linkLabel: 'Visitar Juglares',
    transitionPreset: 'horizon-reveal',
  },
  {
    id: 'mr-coiffeur',
    number: '04',
    title: 'MR Coiffeur',
    subtitle: 'Presencia Digital Comercial',
    category: 'Negocio Local · UI / UX',
    description:
      'Sitio comercial para salón de estilismo y peluquería en Sarandí Grande. Destaca servicios de corte, colorimetría y tratamientos capilares con conversión directa hacia WhatsApp.',
    impact:
      'Facilita que clientas consulten servicios desde el teléfono móvil y coordinen atención personalizada en un toque.',
    highlights: [
      'Presentación visual de servicios de corte, coloración y cuidado capilar.',
      'Acceso directo de consulta y asesoramiento por WhatsApp.',
      'Diseño mobile-first con código fuente disponible en GitHub.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'UI / UX', 'GitHub'],
    image: '/assets/MR.webp',
    imageAlt: 'Captura real del sitio web comercial MR Coiffeur',
    url: 'https://cute-empanada-4edf45.netlify.app/',
    repoUrl: 'https://github.com/FaroDeLuz98/MR-Couoiffer',
    linkLabel: 'Visitar MR Coiffeur',
    transitionPreset: 'prism-shift',
  },
];

export const timeline = [
  {
    period: 'Experiencia con clientes',
    title: 'Juglares · Hugo Cabeza',
    subtitle: 'Contenido digital y portal web oficial',
    description:
      'Colaboración directa en diseño visual, comunicación digital y desarrollo de la plataforma oficial del proyecto musical.',
  },
  {
    period: 'Proyectos comerciales',
    title: 'MR Coiffeur',
    subtitle: 'Presencia web y comunicación digital',
    description:
      'Desarrollo de interfaz comercial y piezas digitales orientadas a agilizar consultas y reservas desde dispositivos móviles.',
  },
  {
    period: 'Educación · Promoción 2026',
    title: 'UTU Uruguay',
    subtitle: 'Informática + Comercio y Ventas',
    description:
      'Doble formación técnica y comercial con práctica en programación web, bases de datos SQL, trabajo en equipo y gestión.',
  },
];

/**
 * Tecnologías verificadas exclusivamente en el portafolio original y proyectos reales.
 */
export const verifiedTechnologies = [
  {
    id: 'react',
    name: 'React',
    short: 'React',
    group: 'Frontend & Interacción',
    iconKey: 'react',
    featured: true,
    summary:
      'Construcción de interfaces basadas en componentes reutilizables, estado reactivo y experiencias interactivas fluidas.',
    usedIn: ['Portafolio Cinemático'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    short: 'JS',
    group: 'Frontend & Interacción',
    iconKey: 'javascript',
    featured: true,
    summary:
      'Lógica interactiva en el navegador, manipulación dinámica de interfaz, animaciones avanzadas e integración con APIs.',
    usedIn: ['Byztoo PC', 'Maktub', 'Juglares', 'MR Coiffeur', 'Portafolio'],
  },
  {
    id: 'php',
    name: 'PHP',
    short: 'PHP',
    group: 'Backend & Datos',
    iconKey: 'php',
    featured: true,
    summary:
      'Desarrollo del lado del servidor para sesiones de usuario, autenticación, carrito de compras y lógica comercial.',
    usedIn: ['Byztoo PC'],
  },
  {
    id: 'mysql',
    name: 'MySQL & SQL',
    short: 'SQL',
    group: 'Backend & Datos',
    iconKey: 'database',
    featured: true,
    summary:
      'Modelado relacional, consultas estructuradas y administración segura de catálogos, clientes y transacciones.',
    usedIn: ['Byztoo PC', 'Formación UTU'],
  },
  {
    id: 'html5',
    name: 'HTML5',
    short: 'HTML5',
    group: 'Frontend & Interacción',
    iconKey: 'html5',
    featured: true,
    summary:
      'Estructura semántica accesible, optimización SEO y cimientos limpios para aplicaciones y sitios institucionales.',
    usedIn: ['Byztoo PC', 'Maktub', 'Juglares', 'MR Coiffeur'],
  },
  {
    id: 'css3',
    name: 'CSS3 & Responsive',
    short: 'CSS3',
    group: 'Frontend & Interacción',
    iconKey: 'css3',
    featured: true,
    summary:
      'Sistemas de grillas flexibles, composición editorial, iluminación CSS, perspectiva 3D y adaptación móvil.',
    usedIn: ['Byztoo PC', 'Maktub', 'Juglares', 'MR Coiffeur', 'Portafolio'],
  },
  {
    id: 'threejs',
    name: 'Three.js',
    short: '3D',
    group: 'Gráficos & Animación',
    iconKey: 'three',
    featured: true,
    summary:
      'Escenas WebGL en tiempo real con partículas tridimensionales, cámaras en perspectiva e iluminación reactiva.',
    usedIn: ['Portafolio Cinemático'],
  },
  {
    id: 'github',
    name: 'Git & GitHub',
    short: 'Git',
    group: 'Entorno & Despliegue',
    iconKey: 'github',
    featured: true,
    summary:
      'Control de versiones distribuido, flujo por ramas, trabajo colaborativo en equipo y trazabilidad pública de código.',
    usedIn: ['Byztoo PC', 'MR Coiffeur', 'Portafolio'],
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    short: 'BS',
    group: 'Frontend & Interacción',
    iconKey: 'layers',
    featured: false,
    summary:
      'Sistema de componentes y grillas adaptables empleado para agilizar interfaces comerciales responsivas.',
    usedIn: ['Byztoo PC'],
  },
  {
    id: 'vite',
    name: 'Vite & Vercel',
    short: 'Vite',
    group: 'Entorno & Despliegue',
    iconKey: 'bolt',
    featured: false,
    summary:
      'Empaquetado optimizado de alta velocidad y despliegue continuo en la nube con HTTPS y distribución global.',
    usedIn: ['Portafolio Cinemático'],
  },
  {
    id: 'xampp',
    name: 'XAMPP & Linux',
    short: 'Env',
    group: 'Entorno & Despliegue',
    iconKey: 'server',
    featured: false,
    summary:
      'Configuración de servidores locales Apache/MariaDB para pruebas de backend y manejo de entornos de desarrollo.',
    usedIn: ['Byztoo PC', 'Formación UTU'],
  },
  {
    id: 'vscode',
    name: 'VS Code & APIs',
    short: 'API',
    group: 'Entorno & Despliegue',
    iconKey: 'code',
    featured: false,
    summary:
      'Integración de servicios externos (GitHub REST API, Crisp Chat, Formspree) y flujo de desarrollo modular.',
    usedIn: ['Maktub', 'Portafolio'],
  },
];

export const contact = {
  email: 'rafaelsisnandevarela@gmail.com',
  github: 'https://github.com/FaroDeLuz98',
  githubUser: 'FaroDeLuz98',
  linkedin:
    'https://www.linkedin.com/in/fernando-rafael-sisnande-varela-505abb362',
  location: 'Sarandí Grande, Uruguay',
  portfolioUrl: 'https://fernando-sisnande-portfolio.vercel.app',
};
