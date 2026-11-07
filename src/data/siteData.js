/**
 * DATOS DE LOS PROYECTOS, COMPETENCIAS EMPRESARIALES Y CONTACTO
 * -------------------------------------------------------------
 * Conserva el 100% de la información real y suma contexto ejecutivo claro
 * pensado tanto para grandes empresas (RRHH / líderes) como para personas
 * que no pertenecen al área informática.
 */
export const projects = [
  {
    id: 'byztoo-pc',
    number: '01',
    title: 'Byztoo PC',
    category: 'Comercio Electrónico · Trabajo en equipo',
    businessImpact:
      'Permite a un comercio vender tecnología por internet con catálogo buscable, cuentas de clientes y carrito de compras conectado a base de datos.',
    description:
      'Tienda de tecnología desarrollada en equipo. Incluye catálogo de productos, inicio de sesión, carrito de compras y gestión de datos con MySQL.',
    highlights: [
      'Catálogo dinámico con buscador y sistema de favoritos para clientes.',
      'Inicio de sesión seguro y carrito de compras que conserva la selección.',
      'Gestión ordenada de productos, usuarios y datos reales con PHP y MySQL.',
    ],
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML / CSS'],
    image: '/assets/byztoo-pc.webp',
    imageAlt: 'Captura de la tienda Byztoo PC con catálogo de productos y diseño oscuro',
    accent: '#22c55e',
    accentRgb: '34, 197, 94',
    url: 'https://byztoo-pc.ct.ws/index.php',
    linkLabel: 'Visitar Byztoo PC',
    external: true,
  },
  {
    id: 'maktub',
    number: '02',
    title: 'Maktub · Tu Liberación',
    category: 'Sitio Institucional · Atención en línea',
    businessImpact:
      'Presenta un servicio profesional con claridad y convierte visitas en consultas reales mediante chat en vivo y formularios automáticos.',
    description:
      'Sitio institucional para un emprendimiento de constelaciones familiares asistidas con caballos. Presenta experiencias e integra chat directo y formularios de contacto.',
    highlights: [
      'Presentación clara y ordenada de jornadas y experiencias asistidas.',
      'Atención al visitante en tiempo real integrada mediante Crisp Chat.',
      'Recepción automática de consultas con Formspree y lectura adaptable.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'Crisp Chat', 'Formspree'],
    image: '/assets/Maktub.webp',
    imageAlt: 'Captura del sitio web Maktub con constelaciones asistidas con caballos',
    accent: '#10b981',
    accentRgb: '16, 185, 129',
    url: 'https://heroic-faun-71d0f4.netlify.app/',
    linkLabel: 'Visitar Maktub',
    external: true,
  },
  {
    id: 'juglares',
    number: '03',
    title: 'Juglares · Hugo Cabeza',
    category: 'Portal Oficial · Música y cultura',
    businessImpact:
      'Reúne décadas de trayectoria artística, discos, fotos y videos en un único portal oficial fácil de recorrer para todo público.',
    description:
      'Sitio oficial del músico Hugo Cabeza y el grupo Juglares. Centraliza discografía, galería histórica y videos con una identidad visual inspirada en Sarandí Grande.',
    highlights: [
      'Archivo centralizado de discografía, historia y material audiovisual.',
      'Dirección estética inspirada en la identidad cultural de Sarandí Grande.',
      'Navegación intuitiva pensada para visitantes de todas las edades.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'Hosting', 'Diseño web'],
    image: '/assets/Juglares.webp',
    imageAlt: 'Captura del sitio web oficial de Juglares y Hugo Cabeza',
    accent: '#34d399',
    accentRgb: '52, 211, 153',
    url: 'https://incandescent-semolina-a7b3ff.netlify.app/',
    linkLabel: 'Visitar Juglares',
    external: true,
  },
  {
    id: 'mr-coiffeur',
    number: '04',
    title: 'MR Coiffeur',
    category: 'Presencia Comercial · Negocio local',
    businessImpact:
      'Facilita que los clientes conozcan servicios desde el celular y reserven turno en un toque directo por WhatsApp.',
    description:
      'Presencia digital para un salón de belleza de Sarandí Grande. Presenta cortes, colorimetría y tratamientos, con un acceso directo a WhatsApp para consultas.',
    highlights: [
      'Catálogo visual claro de cortes, colorimetría y cuidado capilar.',
      'Canal directo de reserva y atención rápida conectado con WhatsApp.',
      'Diseño priorizado para teléfonos móviles, de donde llega la mayoría de clientes.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'UI / UX', 'Comunicación digital'],
    image: '/assets/MR.webp',
    imageAlt: 'Captura del sitio web de MR Coiffeur con servicios de peluquería',
    accent: '#4ade80',
    accentRgb: '74, 222, 128',
    url: 'https://cute-empanada-4edf45.netlify.app/',
    linkLabel: 'Visitar MR Coiffeur',
    external: true,
  },
];

/**
 * Nombres que aparecen en la cinta interactiva debajo del hero.
 * Al presionar cualquiera se explica en palabras simples para qué sirve.
 */
export const technologies = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'PHP',
  'MySQL',
  'SQL',
  'Git',
  'GitHub',
  'UI / UX',
  'Diseño responsive',
  'Lógica de negocio',
  'Three.js 3D',
  'Framer Motion',
  'Vite',
  'Vercel',
];

/**
 * Habilidades agrupadas por área para la tarjeta "Tech stack".
 */
export const skillGroups = [
  {
    title: 'Pantallas e Interacción (Frontend)',
    skills: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Diseño responsive',
      'UI / UX',
      'Framer Motion',
      'Three.js',
    ],
  },
  {
    title: 'Servidor, Datos y Negocio (Backend)',
    skills: ['PHP', 'MySQL', 'SQL', 'Lógica de negocio'],
  },
  {
    title: 'Trabajo en Equipo y Publicación',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'XAMPP', 'Vercel'],
  },
];

/**
 * Competencias clave valoradas por equipos de RRHH y grandes empresas.
 */
export const enterpriseStrengths = [
  {
    code: '01',
    title: 'Puente entre IT y Negocio',
    detail:
      'Mi doble formación en Informática y Comercio y Ventas (UTU) me permite entender tanto el código como los objetivos comerciales y la atención al cliente.',
  },
  {
    code: '02',
    title: 'Trabajo Ordenado en Equipo',
    detail:
      'Experiencia real desarrollando proyectos grupales (como Byztoo PC), utilizando control de versiones Git/GitHub y manteniendo código legible para otros compañeros.',
  },
  {
    code: '03',
    title: 'Comunicación sin Barreras',
    detail:
      'Facilidad para dialogar con perfiles no técnicos, áreas comerciales o clientes finales, traduciendo necesidades concretas en soluciones digitales claras.',
  },
  {
    code: '04',
    title: 'Adaptabilidad Corporativa',
    detail:
      'Disposición inmediata para roles Trainee / Junior, rápida incorporación de estándares internos, metodologías de equipo y aprendizaje continuo.',
  },
];

/**
 * Línea de tiempo de experiencia y formación.
 */
export const timeline = [
  {
    period: 'Experiencia con clientes',
    title: 'Juglares',
    subtitle: 'Contenido digital y portal web oficial',
    description:
      'Colaboración directa en diseño de piezas visuales, comunicación digital y desarrollo de la presencia web oficial del proyecto musical.',
  },
  {
    period: 'Proyectos comerciales',
    title: 'MR Coiffeur',
    subtitle: 'Comunicación digital y captación de clientes',
    description:
      'Creación de materiales promocionales y soluciones web enfocadas en facilitar la consulta y atención rápida por canales digitales.',
  },
  {
    period: 'Educación · Promoción 2026',
    title: 'UTU',
    subtitle: 'Informática + Comercio y Ventas',
    description:
      'Doble formación tecnológica y comercial con práctica real en desarrollo de software, bases de datos, gestión empresarial y trato con público.',
  },
];

/**
 * Datos de contacto reutilizados en varias partes del sitio.
 */
export const contact = {
  email: 'rafaelsisnandevarela@gmail.com',
  github: 'https://github.com/FaroDeLuz98',
  githubUser: 'FaroDeLuz98',
  githubAvatar: 'https://github.com/FaroDeLuz98.png',
  linkedin:
    'https://www.linkedin.com/in/fernando-rafael-sisnande-varela-505abb362',
};
