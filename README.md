# Portafolio · Fernando Sisnande

Portafolio personal de **Fernando Sisnande**, estudiante de Informática y desarrollador web junior en Uruguay.

El sitio fue reconstruido con **React + Vite + Framer Motion** para tener animaciones fluidas, animaciones al hacer scroll, una grilla de proyectos bien separada y un código ordenado y comentado.

---

## Tecnologías

| Área | Herramientas |
| --- | --- |
| Frontend | React 19, JSX, CSS modular |
| Build / dev | Vite 8 |
| Animaciones | Framer Motion |
| Datos en vivo | API pública de GitHub (sin backend) |
| Deploy | Vercel |

> No se usa PHP, Java, C, C#, C++ ni ningún lenguaje que Vercel no soporte para este proyecto.

---

## Cómo ejecutarlo

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo (http://localhost:5173)
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar la compilación
npm run preview
```

---

## Estructura del proyecto

```text
Portafolio/
├── index.html                  # HTML base: metadatos, fuentes, SEO y JSON-LD
├── vite.config.js              # Configuración de Vite
├── vercel.json                 # Configuración de deploy y caché de assets
├── public/
│   └── assets/                 # Imágenes optimizadas (WebP) y foto de perfil
├── src/
│   ├── main.jsx                # Punto de entrada de React
│   ├── App.jsx                 # Orden de las secciones de la página
│   ├── data/
│   │   └── siteData.js         # ⭐ Todo el contenido editable del sitio
│   ├── components/
│   │   ├── Navbar.jsx          # Menú fijo, sección activa y menú móvil
│   │   ├── Hero.jsx            # Portada con parallax y entrada escalonada
│   │   ├── CodeWindow.jsx      # Editor decorativo + chips flotantes
│   │   ├── TechMarquee.jsx     # Cinta infinita de tecnologías
│   │   ├── About.jsx           # Biografía, estadísticas y stack
│   │   ├── Projects.jsx        # Grilla de proyectos
│   │   ├── ProjectCard.jsx     # Tarjeta individual con spotlight
│   │   ├── GitHubSection.jsx   # Estadísticas y repositorios reales
│   │   ├── Experience.jsx      # Línea de tiempo animada
│   │   ├── Contact.jsx         # Contacto y copiar correo
│   │   ├── Footer.jsx          # Pie de página
│   │   ├── Reveal.jsx          # Animación reutilizable al hacer scroll
│   │   └── ...                 # Iconos, fondos y controles auxiliares
│   └── styles/
│       ├── base.css            # Variables, reset, botones y utilidades
│       ├── layout.css          # Fondo, navbar, hero, footer
│       ├── sections.css        # Tarjetas, GitHub, timeline y contacto
│       └── responsive.css      # Adaptaciones para tablet y celular
├── legacy/                     # Respaldo de la versión anterior (no se publica)
└── dist/                       # Resultado del build (lo genera Vercel)
```

---

## Dónde editar el contenido

Casi todo el contenido está centralizado en **`src/data/siteData.js`**:

- `projects`: tarjetas de proyectos, enlaces, capturas y colores de acento.
- `technologies`: nombres de la cinta animada.
- `skillGroups`: tecnologías agrupadas por área.
- `timeline`: experiencia y formación.
- `contact`: correo, GitHub y LinkedIn.

Para agregar un proyecto, copiá un objeto de `projects` y modificá sus campos. La grilla se adapta automáticamente.

---

## Animaciones incluidas

- **Scroll reveal**: cada bloque aparece con fade + desplazamiento (`Reveal.jsx`).
- **Barra de progreso** de lectura en la parte superior.
- **Parallax** del editor de código y del texto del hero.
- **Entrada escalonada** del hero con Framer Motion.
- **Menú activo animado** con `layoutId` (la píldora se mueve entre secciones).
- **Cinta infinita** de tecnologías con pausa al pasar el mouse.
- **Tarjetas de proyectos**: elevación al hover, zoom de la captura y spotlight que sigue al cursor.
- **Línea de tiempo** que se dibuja a medida que se hace scroll.
- **Botón "volver arriba"** animado.
- **Respeto por `prefers-reduced-motion`**: si el usuario prefiere menos movimiento, las animaciones se reducen o se desactivan.

---

## Deploy en Vercel

1. Subí el proyecto a GitHub.
2. En [vercel.com](https://vercel.com), importá el repositorio.
3. Vercel detecta **Vite** automáticamente (también está configurado en `vercel.json`).
4. Build command: `npm run build` · Output directory: `dist`.
5. Deploy.

Cada push a la rama principal genera un deploy nuevo.

---

## Notas

- Las estadísticas de GitHub se obtienen de la API pública en el navegador. Si se supera el límite de pedidos, la sección sigue funcionando con la captura y el enlace al perfil.
- Las capturas de proyectos se convirtieron a **WebP** para reducir el peso de ~7 MB a ~600 KB.
- La carpeta `legacy/` guarda la versión anterior por si querés comparar o recuperar algo. No forma parte del build.
