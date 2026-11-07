/**
 * GUÍA SIMPLE DE TECNOLOGÍAS · Pensada para RRHH, empresas y clientes no técnicos
 * -------------------------------------------------------------------------------
 * Cada entrada traduce un lenguaje o herramienta a lenguaje cotidiano:
 * - simple: explicación clara sin jerga informática.
 * - analogy: comparación con el mundo real para entenderlo en segundos.
 * - enterprise: por qué aporta valor en una empresa grande o negocio real.
 * - technical: resumen técnico puntual para líderes de equipo IT.
 * - usedIn: sitios reales del portafolio donde Fernando lo aplicó.
 */
export const TECH_DICTIONARY = {
  HTML5: {
    id: 'HTML5',
    name: 'HTML5',
    category: 'Estructura Web',
    badge: 'Base de toda web',
    simple:
      'Es el lenguaje que organiza el contenido de una página web: títulos, textos, imágenes, botones, formularios y secciones.',
    analogy:
      'Si un sitio web fuera un edificio corporativo, HTML5 serían los cimientos, las columnas y la división de cada oficina.',
    enterprise:
      'Garantiza que el sitio sea accesible para todas las personas, se posicione bien en buscadores como Google y cargue de forma ordenada.',
    technical:
      'Marcado semántico moderno, estructura accesible (WAI-ARIA) y metadatos SEO.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  CSS3: {
    id: 'CSS3',
    name: 'CSS3',
    category: 'Diseño Visual y Adaptabilidad',
    badge: 'Imagen y estilo',
    simple:
      'Define cómo se ve la página: colores corporativos, tipografías, espacios, animaciones suaves y que todo se acomode bien tanto en un celular como en un monitor grande.',
    analogy:
      'Siguiendo el ejemplo del edificio, CSS3 es la arquitectura interior, la iluminación, el mobiliario y la identidad visual de la marca.',
    enterprise:
      'Transmite profesionalismo, coherencia de marca y asegura que los clientes puedan usar la web cómodamente desde cualquier dispositivo.',
    technical:
      'Sistemas de grillas (CSS Grid / Flexbox), variables dinámicas, animaciones aceleradas y diseño responsive.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  'HTML / CSS': {
    id: 'HTML / CSS',
    name: 'HTML5 y CSS3',
    category: 'Estructura + Diseño Visual',
    badge: 'Maquetación completa',
    simple:
      'Es la combinación que da forma y presentación a una página web: HTML organiza la información y CSS define su diseño profesional y adaptación a pantallas.',
    analogy:
      'Es como unir los planos estructurales de un local comercial con su decoración, cartelería e iluminación.',
    enterprise:
      'Permite construir interfaces rápidas, claras, fieles a la identidad de la empresa y cómodas de usar en celulares y computadoras.',
    technical:
      'Arquitectura semántica HTML5 combinada con hojas de estilo modulares y adaptables en CSS3.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  JavaScript: {
    id: 'JavaScript',
    name: 'JavaScript',
    category: 'Interactividad Inteligente',
    badge: 'Acción en tiempo real',
    simple:
      'Hace que una página web responda al instante cuando el usuario interactúa: abrir menús, filtrar productos, validar formularios o actualizar datos sin recargar toda la pantalla.',
    analogy:
      'En el edificio, JavaScript sería la electricidad, los ascensores, los sensores y las puertas automáticas que responden cuando alguien pasa.',
    enterprise:
      'Reduce fricciones para el cliente, evita errores al completar formularios y convierte una página estática en una herramienta ágil.',
    technical:
      'Lenguaje estándar del navegador (ES6+), manejo de eventos, consumo de APIs asíncronas y manipulación dinámica de interfaz.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  React: {
    id: 'React',
    name: 'React',
    category: 'Aplicaciones Web Modernas',
    badge: 'Estándar empresarial',
    simple:
      'Es una tecnología creada originalmente por Meta que permite armar sitios y sistemas grandes dividiéndolos en piezas reutilizables, logrando pantallas sumamente rápidas y fluidas.',
    analogy:
      'Funciona como bloques modulares de construcción industrial: si mejorás una pieza, se actualiza de forma consistente en todo el sistema.',
    enterprise:
      'Es una de las tecnologías más utilizadas por grandes empresas y bancos porque facilita escalar sistemas complejos y trabajar entre varios desarrolladores a la vez.',
    technical:
      'Arquitectura declarativa basada en componentes, Hooks, estado reactivo y renderizado eficiente.',
    usedIn: ['Este portafolio profesional'],
  },
  PHP: {
    id: 'PHP',
    name: 'PHP',
    category: 'Servidor y Lógica de Negocio',
    badge: 'Motor detrás de escena',
    simple:
      'Trabaja del lado del servidor (lo que el usuario no ve): verifica contraseñas al iniciar sesión, calcula el carrito de compras y procesa pedidos de forma segura.',
    analogy:
      'Es la administración y cocina interna de un restaurante: recibe el pedido del salón, verifica disponibilidad, lo procesa y entrega el resultado.',
    enterprise:
      'Protege las reglas del negocio, gestiona usuarios registrados y conecta la página web con bases de datos empresariales.',
    technical:
      'Procesamiento backend en servidor, manejo de sesiones seguras, rutas dinámicas y consultas parametrizadas.',
    usedIn: ['Byztoo PC'],
  },
  MySQL: {
    id: 'MySQL',
    name: 'MySQL',
    category: 'Base de Datos Relacional',
    badge: 'Memoria organizada',
    simple:
      'Es el sistema donde se guarda y organiza de forma segura toda la información importante: catálogo de productos, precios, stock, cuentas de usuarios y pedidos.',
    analogy:
      'Es como un archivo central digitalizado e indexado donde miles de fichas de clientes y productos se pueden buscar o actualizar en milésimas de segundo.',
    enterprise:
      'Asegura que los datos de una organización no se pierdan, estén ordenados sin duplicados y puedan consultarse con rapidez y seguridad.',
    technical:
      'Sistema de gestión de bases de datos relacionales (RDBMS), tablas vinculadas, claves foráneas e integridad de datos.',
    usedIn: ['Byztoo PC'],
  },
  SQL: {
    id: 'SQL',
    name: 'SQL',
    category: 'Consulta y Gestión de Datos',
    badge: 'Idioma de los datos',
    simple:
      'Es el lenguaje universal que se usa para hacerle preguntas precisas a una base de datos: por ejemplo, buscar un producto específico, actualizar precios o listar ventas del mes.',
    analogy:
      'Es como hablarle a un bibliotecario experto que te trae exactamente el documento que pediste entre miles de carpetas al instante.',
    enterprise:
      'Fundamental en cualquier gran empresa para operar sistemas comerciales, reportes, inventarios y registros de clientes.',
    technical:
      'Consultas estructuradas (SELECT, JOIN, INSERT, UPDATE), filtrado optimizado y modelado relacional.',
    usedIn: ['Byztoo PC'],
  },
  'Three.js': {
    id: 'Three.js',
    name: 'Three.js (Gráficos 3D)',
    category: 'Visualización 3D en la Web',
    badge: 'Experiencia inmersiva',
    simple:
      'Permite mostrar objetos, luces y escenarios tridimensionales interactivos directamente en el navegador, sin obligar al usuario a instalar ningún programa.',
    analogy:
      'Convierte una vidriera plana en una maqueta interactiva con profundidad e iluminación real que reacciona al movimiento.',
    enterprise:
      'Ayuda a marcas e instituciones a diferenciarse visualmente, presentar productos de forma innovadora y crear experiencias memorables.',
    technical:
      'Motor 3D sobre WebGL con cámaras en perspectiva, geometrías, materiales físicos e iluminación dinámica.',
    usedIn: ['Este portafolio profesional'],
  },
  'Framer Motion': {
    id: 'Framer Motion',
    name: 'Framer Motion',
    category: 'Animaciones de Interfaz',
    badge: 'Fluidez visual',
    simple:
      'Se encarga de que las transiciones entre secciones, ventanas y botones sean suaves y naturales, guiando la atención del visitante sin brusquedad.',
    analogy:
      'Es como los amortiguadores hidráulicos de una puerta de alta gama: hace que cada movimiento se sienta sólido, suave y controlado.',
    enterprise:
      'Mejora la percepción de calidad del producto digital y guía al usuario visualmente para que entienda qué cambió en pantalla.',
    technical:
      'Animaciones basadas en física de resortes (springs), gestos, transiciones de layout y sincronización con scroll.',
    usedIn: ['Este portafolio profesional'],
  },
  Git: {
    id: 'Git',
    name: 'Git',
    category: 'Control de Versiones',
    badge: 'Seguridad en cambios',
    simple:
      'Registra paso a paso cada cambio que se hace en el código del proyecto, permitiendo volver atrás en cualquier momento si algo falla y trabajar sin pisar el avance de otros.',
    analogy:
      'Es como una máquina del tiempo con historial completo de quién modificó cada línea, cuándo y por qué.',
    enterprise:
      'Indispensable en empresas: evita pérdida de trabajo, permite auditar cambios y facilita que equipos grandes trabajen en paralelo sin riesgos.',
    technical:
      'Control de versiones distribuido, manejo de ramas (branches), commits atómicos y resolución de fusiones.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  GitHub: {
    id: 'GitHub',
    name: 'GitHub',
    category: 'Trabajo Colaborativo en la Nube',
    badge: 'Trabajo en equipo IT',
    simple:
      'Es la plataforma en internet donde los equipos de tecnología guardan sus proyectos creados con Git, revisan la calidad del trabajo en conjunto y publican actualizaciones.',
    analogy:
      'Es la oficina central en la nube donde todo el equipo de ingeniería coordina, revisa planos y aprueba entregas antes de salir al público.',
    enterprise:
      'Permite integrarse de inmediato a flujos de trabajo profesionales de empresas tecnológicas, revisiones de código y despliegues ordenados.',
    technical:
      'Repositorios remotos, Pull Requests, seguimiento de incidencias e integración con plataformas de despliegue.',
    usedIn: ['Byztoo PC', 'Este portafolio profesional'],
  },
  Vite: {
    id: 'Vite',
    name: 'Vite',
    category: 'Optimización y Velocidad',
    badge: 'Carga ultrarrápida',
    simple:
      'Es una herramienta que empaqueta y optimiza todo el código e imágenes antes de publicar la web para que cargue en menos de un segundo en el navegador del cliente.',
    analogy:
      'Funciona como una planta empaquetadora moderna que comprime y ordena todo el envío para que llegue mucho más rápido y liviano.',
    enterprise:
      'Acelera los tiempos de desarrollo del equipo y reduce el peso final del sitio web, mejorando retención de visitas y ahorro de datos móviles.',
    technical:
      'Bundler moderno con Hot Module Replacement (HMR) instantáneo y división automática de código (code-splitting).',
    usedIn: ['Este portafolio profesional'],
  },
  Vercel: {
    id: 'Vercel',
    name: 'Vercel / Hosting Cloud',
    category: 'Publicación en Internet',
    badge: 'Sitio siempre activo',
    simple:
      'Es la infraestructura en la nube donde se aloja un sitio web para que esté disponible las 24 horas desde cualquier país de forma rápida y con candado de seguridad HTTPS.',
    analogy:
      'Es el terreno seguro y con suministro eléctrico continuo donde se abre la sucursal digital al público mundial.',
    enterprise:
      'Garantiza alta disponibilidad, certificados de seguridad automáticos y actualizaciones instantáneas sin dejar el sitio fuera de línea.',
    technical:
      'Despliegue continuo desde Git (CI/CD), red global CDN y SSL automático.',
    usedIn: ['Este portafolio profesional', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  'VS Code': {
    id: 'VS Code',
    name: 'Visual Studio Code',
    category: 'Entorno de Desarrollo',
    badge: 'Estación de trabajo',
    simple:
      'Es el editor profesional donde se escribe, revisa y depura el código del software detectando errores a tiempo.',
    analogy:
      'Es el tablero de precisión del ingeniero, equipado con reglas, detectores de fallas y herramientas de control de calidad.',
    enterprise:
      'Estandariza el formato del código para que cualquier compañero del equipo pueda leerlo y mantenerlo fácilmente.',
    technical:
      'IDE ligero con integración Git nativa, depuración, autocompletado inteligente y extensiones de calidad de código.',
    usedIn: ['Todos los proyectos'],
  },
  XAMPP: {
    id: 'XAMPP',
    name: 'XAMPP',
    category: 'Servidor de Pruebas Local',
    badge: 'Laboratorio seguro',
    simple:
      'Permite simular un servidor web y una base de datos completa dentro de la propia computadora para probar todo antes de subirlo a internet.',
    analogy:
      'Es una pista de pruebas cerrada donde se verifica que cada pieza del vehículo funcione perfecto antes de salir a la ruta.',
    enterprise:
      'Evita cometer errores en el sitio público en vivo, asegurando que las nuevas funciones se prueben primero en un entorno controlado.',
    technical:
      'Entorno local integrado con servidor Apache, intérprete PHP y motor de base de datos MariaDB/MySQL.',
    usedIn: ['Byztoo PC'],
  },
  'UI / UX': {
    id: 'UI / UX',
    name: 'Diseño UI / UX',
    category: 'Experiencia del Usuario',
    badge: 'Claridad para las personas',
    simple:
      'UI es el diseño visual (botones, colores, orden) y UX es la experiencia de uso: lograr que cualquier persona encuentre lo que busca de forma intuitiva y sin frustrarse.',
    analogy:
      'En un aeropuerto, UI son los carteles claros y legibles; UX es que el recorrido desde la entrada hasta tu puerta de embarque sea simple y directo.',
    enterprise:
      'Aumenta las consultas y ventas, reduce llamadas de soporte por confusión y mejora la imagen institucional frente al cliente.',
    technical:
      'Jerarquía visual, contraste accesible, arquitectura de información, micro-interacciones y flujos orientados a conversión.',
    usedIn: ['MR Coiffeur', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'Byztoo PC'],
  },
  'Diseño responsive': {
    id: 'Diseño responsive',
    name: 'Diseño Responsive (Adaptable)',
    category: 'Compatibilidad Multi-dispositivo',
    badge: 'Celular, tablet y PC',
    simple:
      'Significa que un mismo sitio web reorganiza automáticamente sus textos, fotos y botones para verse cómodo tanto en un teléfono vertical como en una pantalla ancha de oficina.',
    analogy:
      'Es como el agua que se adapta con naturalidad a la forma de un vaso pequeño o de una jarra grande sin desbordarse.',
    enterprise:
      'Hoy más del 70% de las visitas llegan desde celulares: un sitio adaptable evita perder clientes por textos diminutos o botones difíciles de tocar.',
    technical:
      'Media queries fluidas, unidades relativas, tipografía escalable con clamp() y áreas táctiles accesibles.',
    usedIn: ['Byztoo PC', 'Maktub · Tu Liberación', 'Juglares · Hugo Cabeza', 'MR Coiffeur'],
  },
  'Lógica de negocio': {
    id: 'Lógica de negocio',
    name: 'Lógica de Negocio',
    category: 'Reglas Comerciales en Software',
    badge: 'Tecnología + Comercio',
    simple:
      'Es traducir las reglas reales de una empresa (precios, stock, validaciones, permisos de clientes o pasos de compra) a instrucciones exactas dentro del sistema.',
    analogy:
      'Es enseñar al sistema el reglamento operativo de la empresa para que atienda pedidos respetando cada política comercial.',
    enterprise:
      'Conecta directamente mi formación en Informática con Comercio y Ventas: entender qué necesita el negocio antes de escribir código.',
    technical:
      'Validación de reglas de dominio, control de estados de compra, sesiones autenticadas y consistencia transaccional.',
    usedIn: ['Byztoo PC', 'MR Coiffeur', 'Maktub · Tu Liberación'],
  },
  'Crisp Chat': {
    id: 'Crisp Chat',
    name: 'Crisp Chat (Atención en Vivo)',
    category: 'Atención al Cliente',
    badge: 'Respuesta directa',
    simple:
      'Integra una burbuja de mensajería en vivo dentro del sitio web para que los visitantes puedan hacer consultas al instante y recibir respuesta rápida.',
    analogy:
      'Es contar con un recepcionista amable disponible en la entrada del sitio para despejar dudas en el momento justo.',
    enterprise:
      'Incrementa la confianza del visitante y acelera la conversión comercial al resolver preguntas en tiempo real.',
    technical:
      'Integración de widget asíncrono de mensajería omnicanal sin bloquear la carga principal del sitio.',
    usedIn: ['Maktub · Tu Liberación'],
  },
  Formspree: {
    id: 'Formspree',
    name: 'Formspree (Formularios Seguros)',
    category: 'Captación de Consultas',
    badge: 'Contacto automatizado',
    simple:
      'Recibe los mensajes que los clientes escriben en el formulario de contacto de la web, filtra correo basura (spam) y los envía directo al correo de la empresa.',
    analogy:
      'Funciona como una mesa de entrada digital que verifica cada consulta y la entrega ordenada en la bandeja del responsable.',
    enterprise:
      'Permite recibir consultas formales las 24 horas sin necesidad de mantener servidores de correo propios complejos.',
    technical:
      'Endpoint serverless para recepción de formularios con validación, protección anti-spam y notificaciones.',
    usedIn: ['Maktub · Tu Liberación'],
  },
  Hosting: {
    id: 'Hosting',
    name: 'Hosting y Publicación Web',
    category: 'Infraestructura en Línea',
    badge: 'Presencia 24/7',
    simple:
      'Es el servicio que mantiene todos los archivos, fotos y código del sitio publicados en internet para que cualquier persona pueda entrar con un enlace.',
    analogy:
      'Es el local abierto las 24 horas en una avenida principal de internet con seguridad y mantenimiento incluidos.',
    enterprise:
      'Asegura velocidad de carga, disponibilidad continua y acceso confiable para clientes desde cualquier lugar.',
    technical:
      'Configuración de servidores web, dominios, certificados SSL/TLS y optimización de recursos estáticos.',
    usedIn: ['Juglares · Hugo Cabeza', 'Byztoo PC', 'Maktub · Tu Liberación', 'MR Coiffeur'],
  },
  'Diseño web': {
    id: 'Diseño web',
    name: 'Diseño Web Integral',
    category: 'Identidad y Estructura Digital',
    badge: 'Imagen institucional',
    simple:
      'Combina estética visual, orden de lectura y facilidad de navegación para representar fielmente la identidad de una marca, artista o institución.',
    analogy:
      'Es diseñar la portada, las secciones y la experiencia completa de una revista interactiva oficial.',
    enterprise:
      'Refuerza la credibilidad institucional y facilita que el público encuentre información oficial en un solo lugar.',
    technical:
      'Dirección visual, composición tipográfica, optimización de imágenes WebP y diseño centrado en contenido.',
    usedIn: ['Juglares · Hugo Cabeza', 'Maktub · Tu Liberación', 'MR Coiffeur'],
  },
  'Comunicación digital': {
    id: 'Comunicación digital',
    name: 'Comunicación Digital y Conversión',
    category: 'Estrategia con Clientes',
    badge: 'Foco comercial',
    simple:
      'Consiste en redactar y organizar mensajes claros junto a canales rápidos (como WhatsApp o formularios) para transformar visitas a la web en consultas reales.',
    analogy:
      'Es guiar amablemente a quien entra a mirar la vidriera hasta el mostrador adecuado para asesorarlo.',
    enterprise:
      'Alinea el sitio web con los objetivos comerciales de ventas, reservas y atención al público.',
    technical:
      'Llamados a la acción (CTAs) estratégicos, enlaces profundos a mensajería directa y redacción orientada al usuario.',
    usedIn: ['MR Coiffeur', 'Juglares · Hugo Cabeza', 'Maktub · Tu Liberación'],
  },
};

const ALIAS_MAP = {
  'html5 / css3': 'HTML / CSS',
  'html / css': 'HTML / CSS',
  'three.js 3d': 'Three.js',
  'three.js': 'Three.js',
  responsive: 'Diseño responsive',
  'diseño responsive': 'Diseño responsive',
  'ui / ux': 'UI / UX',
  'vs code': 'VS Code',
  'framer motion': 'Framer Motion',
  'crisp chat': 'Crisp Chat',
  'lógica de negocio': 'Lógica de negocio',
  'diseño web': 'Diseño web',
  'comunicación digital': 'Comunicación digital',
};

/**
 * Busca la explicación amigable de cualquier tecnología o etiqueta.
 */
export function getTechExplanation(rawName) {
  if (!rawName) return TECH_DICTIONARY.HTML5;
  if (TECH_DICTIONARY[rawName]) return TECH_DICTIONARY[rawName];

  const normalized = String(rawName).trim().toLowerCase();
  const mappedKey = ALIAS_MAP[normalized];
  if (mappedKey && TECH_DICTIONARY[mappedKey]) {
    return TECH_DICTIONARY[mappedKey];
  }

  const found = Object.values(TECH_DICTIONARY).find(
    (item) => item.name.toLowerCase() === normalized || item.id.toLowerCase() === normalized
  );
  if (found) return found;

  return {
    id: rawName,
    name: rawName,
    category: 'Tecnología del Proyecto',
    badge: 'Herramienta digital',
    simple:
      'Herramienta utilizada para construir, optimizar o comunicar funciones clave dentro del sitio web.',
    analogy:
      'Forma parte del conjunto de piezas que trabajan coordinadas para brindar un servicio fluido al usuario.',
    enterprise:
      'Aporta orden técnico y mejor experiencia final para clientes y equipos de trabajo.',
    technical: `Implementación práctica de ${rawName} integrada al flujo del proyecto.`,
    usedIn: ['Proyectos del portafolio'],
  };
}

/**
 * Lista principal de tecnologías para el explorador/glosario interactivo.
 */
export const FEATURED_TECH_LIST = [
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
  'Three.js',
  'Framer Motion',
  'Vite',
  'Vercel',
  'VS Code',
  'XAMPP',
];
