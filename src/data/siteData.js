/**
 * DATOS DE LOS PROYECTOS
 * ----------------------
 * Todo el contenido de las tarjetas vive acá para que sea fácil de editar.
 * Para agregar un proyecto nuevo, copiá un objeto y cambiá sus valores.
 *
 * Campos:
 * - id: identificador único (también se usa como key de React).
 * - number: número que se muestra en la tarjeta.
 * - title / category / description: textos visibles.
 * - highlights: puntos destacados para la vista rápida interactiva.
 * - tags: tecnologías o servicios usados.
 * - image / imageAlt: captura y texto alternativo (accesibilidad).
 * - accent / accentRgb: color de identidad de la tarjeta (hex + rgb para transparencias).
 * - url / linkLabel / external: enlace de salida y si abre en otra pestaña.
 */
export const projects = [
  {
    id: 'byztoo-pc',
    number: '01',
    title: 'Byztoo PC',
    category: 'E-commerce · Proyecto académico',
    description:
      'Tienda de tecnología desarrollada en equipo. Incluye catálogo de productos, inicio de sesión, carrito de compras y gestión de datos con MySQL.',
    highlights: [
      'Catálogo dinámico con buscador y sistema de favoritos.',
      'Autenticación de usuarios y carrito de compras persistente.',
      'Integración completa con base de datos relacional MySQL y PHP.',
    ],
    tags: ['PHP', 'MySQL', 'JavaScript', 'HTML / CSS'],
    image: '/assets/byztoo-pc.webp',
    imageAlt: 'Captura de la tienda Byztoo PC con catálogo de productos y diseño oscuro',
    accent: '#38bdf8',
    accentRgb: '56, 189, 248',
    url: 'https://byztoo-pc.ct.ws/index.php',
    linkLabel: 'Visitar Byztoo PC',
    external: true,
  },
  {
    id: 'maktub',
    number: '02',
    title: 'Maktub · Tu Liberación',
    category: 'Desarrollo web · Terapia asistida',
    description:
      'Sitio institucional para un emprendimiento de constelaciones familiares asistidas con caballos. Presenta experiencias e integra chat directo y formularios de contacto.',
    highlights: [
      'Presentación inmersiva de jornadas y experiencias asistidas.',
      'Atención en tiempo real integrada mediante Crisp Chat.',
      'Formularios automatizados con Formspree y diseño adaptable.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'Crisp Chat', 'Formspree'],
    image: '/assets/Maktub.webp',
    imageAlt: 'Captura del sitio web Maktub con constelaciones asistidas con caballos',
    accent: '#34d399',
    accentRgb: '52, 211, 153',
    url: 'https://heroic-faun-71d0f4.netlify.app/',
    linkLabel: 'Visitar Maktub',
    external: true,
  },
  {
    id: 'juglares',
    number: '03',
    title: 'Juglares · Hugo Cabeza',
    category: 'Desarrollo web · Música y cultura',
    description:
      'Sitio oficial del músico Hugo Cabeza y el grupo Juglares. Centraliza discografía, galería histórica y videos con una identidad visual inspirada en Sarandí Grande.',
    highlights: [
      'Archivo centralizado de discografía, historia y material audiovisual.',
      'Dirección estética inspirada en la identidad cultural de Sarandí Grande.',
      'Experiencia de lectura clara y optimizada para todo tipo de pantallas.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'Hosting', 'Diseño web'],
    image: '/assets/Juglares.webp',
    imageAlt: 'Captura del sitio web oficial de Juglares y Hugo Cabeza',
    accent: '#fbbf24',
    accentRgb: '251, 191, 36',
    url: 'https://incandescent-semolina-a7b3ff.netlify.app/',
    linkLabel: 'Visitar Juglares',
    external: true,
  },
  {
    id: 'mr-coiffeur',
    number: '04',
    title: 'MR Coiffeur',
    category: 'Diseño web · Negocio local',
    description:
      'Presencia digital para un salón de belleza de Sarandí Grande. Presenta cortes, colorimetría y tratamientos, con un acceso directo a WhatsApp para consultas.',
    highlights: [
      'Catálogo visual de servicios de corte, colorimetría y cuidado capilar.',
      'Canal de reserva y consulta rápida conectado con WhatsApp.',
      'Interfaz moderna pensada primero para navegación desde celulares.',
    ],
    tags: ['HTML5 / CSS3', 'JavaScript', 'UI / UX', 'Comunicación digital'],
    image: '/assets/MR.webp',
    imageAlt: 'Captura del sitio web de MR Coiffeur con servicios de peluquería',
    accent: '#f472b6',
    accentRgb: '244, 114, 182',
    url: 'https://cute-empanada-4edf45.netlify.app/',
    linkLabel: 'Visitar MR Coiffeur',
    external: true,
  },
];

/**
 * Nombres que aparecen en la cinta animada debajo del hero.
 * Se repiten automáticamente en el componente TechMarquee.
 */
export const technologies = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Three.js 3D',
  'Framer Motion',
  'PHP',
  'MySQL',
  'SQL',
  'Git',
  'GitHub',
  'Vite',
  'Vercel',
  'UI / UX',
  'Diseño responsive',
];

/**
 * Habilidades agrupadas por área para la tarjeta "Tech stack".
 */
export const skillGroups = [
  {
    title: 'Frontend & Interactividad',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Framer Motion', 'Three.js', 'Diseño responsive'],
  },
  {
    title: 'Backend y datos',
    skills: ['PHP', 'MySQL', 'SQL', 'Lógica de negocio'],
  },
  {
    title: 'Herramientas',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'XAMPP', 'Vercel'],
  },
];

/**
 * Línea de tiempo de experiencia y formación.
 */
export const timeline = [
  {
    period: 'Experiencia con clientes',
    title: 'Juglares',
    subtitle: 'Contenido digital y web',
    description:
      'Colaboración en diseño de piezas visuales, contenido para redes y presencia web del proyecto musical.',
  },
  {
    period: 'Proyectos para clientes',
    title: 'MR Coiffeur',
    subtitle: 'Comunicación digital',
    description:
      'Creación de materiales promocionales y exploración de soluciones digitales para atención y comunicación.',
  },
  {
    period: 'Educación · 2026',
    title: 'UTU',
    subtitle: 'Informática y Comercio y Ventas',
    description:
      'Formación tecnológica y comercial, con proyectos prácticos de desarrollo de software y gestión.',
  },
];

/**
 * Datos de contacto reutilizados en varias partes del sitio.
 */
export const contact = {
  email: 'rafaelsisnandevarela@gmail.com',
  github: 'https://github.com/FaroDeLuz98',
  githubUser: 'FaroDeLuz98',
  linkedin:
    'https://www.linkedin.com/in/fernando-rafael-sisnande-varela-505abb362',
};
