# Fusión V5 + V7: qué se conservó y qué cambió

**Base del proyecto: V7** (galería 3D con pista sticky, parallax GSAP, navegación Lenis, optimizaciones responsive, modales y movimiento reducido).

**Efecto de palabras: V5** (materialización de izquierda a derecha durante el scroll con partículas azules, sin zoom ni desenfoque). Se incorporó a `src/animations/motion.js`, con CSS en `src/styles/materialize-v5.css`. No carga `scroll-effects.js` ni `word-materialize.js`, para evitar motores de animaciones duplicados.

El materializador de V5 se aplica en Sobre mí, Tecnologías y Contacto, y se amplió a la introducción, el encabezado de Proyectos, los textos de la trayectoria, los pilares y la barra GitHub. Cada palabra responde al scroll, también cuando se vuelve hacia arriba. Los textos no cambian de posición durante el efecto.

**Botón Animaciones ON/OFF** trasladado al encabezado (siempre visible) manteniendo el estado real y la accesibilidad de V7. En móvil se muestra como FX ON / FX OFF.

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Para publicación: `npm run build` y subirlo a Vercel como proyecto Vite.

## Archivos importantes

- `src/animations/motion.js`: palabra V5 integrada en ScrollTrigger de V7.
- `src/styles/materialize-v5.css`: destellos y apariciones nítidas de V5.
- `src/App.jsx`: registro de textos adicionales y control de animación.
- `src/components/cinematic/CinematicNavbar.jsx`: botón visible en el encabezado.
- `src/main.jsx`: importa el estilo de materialización.
- `src/styles/cinematic.css`: diseño del botón responsive.

## Verificación de esta entrega

- **Sí:** análisis de sintaxis de 46 archivos JS/JSX, comparación de recursos, prueba aislada del materializador real en Chromium a 1440, 390 y 320 px (avance, retroceso, modo OFF, sin desbordamiento horizontal).
- **No:** compilación completa de React ni prueba integral del sitio: npm no pudo obtener dependencias del registro desde este entorno (error DNS `EAI_AGAIN`). Por lo mismo, el ZIP contiene fuentes limpias, no una carpeta `dist` desactualizada.
- No subas la carpeta `node_modules` al repositorio. En tu equipo, con conexión a npm, ejecutá `npm install` y `npm run build` para generar `dist`.
