# Portafolio: sistema de animación rehecho desde cero

Se conservan el diseño, los textos, los recursos y las escenas. Lo que cambia es **cómo se animan al hacer scroll**.

## Por qué se rehízo
Las versiones anteriores usaban `pin` de GSAP con timelines largos de 3-4 etapas por escena. Eso producía: saltos al refrescar, tweens solapados sobre el mismo elemento (el scroll no volvía exacto al invertir), `transition` de CSS peleando con GSAP y doble inercia (Lenis + scrub numérico).

## Cómo funciona ahora
Todo el sistema está en `src/animations/motion.js` y solo usa dos tipos de animación:

| Tipo | Para qué | Cómo |
|---|---|---|
| `scrubFromTo` | Parallax y progreso (columnas, seda, rocas, portal...) | Vinculado al scroll, con valor inicial y final **explícitos** → siempre reversible |
| `reveal` | Entrada de textos, tarjetas, métricas | Por **tiempo** (una vez, al entrar en pantalla): no depende de la velocidad del scroll |

Reglas: sin `pin`; ningún elemento con dos animaciones solapadas; scrub `true` en escritorio (Lenis ya suaviza) y `0.4` en táctil (scroll nativo); amplitudes a la mitad en móvil.

## Por escena
- **Inicio:** conserva la intro. Al bajar, una sola timeline con scrub aleja el texto y mueve estatua, anillos, rocas y nubes en profundidad. Ya no se pina ni se esconden los paneles inferiores.
- **Sobre mí:** columnas, seda, roca y haz de luz con parallax; contenido con entradas escalonadas.
- **Proyectos:** una pista alta (`.projects-track`) con el escenario en `position: sticky` y **un único** ScrollTrigger (`track-proyectos`). Cada proyecto ocupa una unidad de la timeline (entrada 3D → deriva lenta → salida). Las pestañas saltan al punto exacto de cada proyecto. En móvil: tarjetas apiladas con entrada por tiempo.
- **Tecnologías:** los 12 cristales convergen mientras la escena sube; el podio y la base rocosa se encienden; el resplandor puente hacia Contacto aparece al salir.
- **Contacto:** el portal se enciende al llegar; partículas ascendentes; textos y botones entran escalonados.

## Otros cambios
- `src/App.jsx` simplificado: Lenis + ScrollTrigger, navegación por sección y por proyecto, y volver al mismo punto al activar/desactivar animaciones.
- `ScrollTrigger.refresh()` solo cuando el scroll se detuvo y la altura del documento cambió (evita saltos por imágenes lazy).
- CSS: `.about-pillar-card` ya no usa `transition: transform` (peleaba con GSAP); se añadió `.projects-track` + sticky.
- El botón de animaciones (movimiento reducido) sigue funcionando: sin Lenis, sin pista alta, todo visible.

## Ejecutar
```powershell
npm install
npm run dev
npm run build
```

## Pruebas recomendadas
- Bajar de Inicio a Contacto y volver lentamente; cambiar de dirección varias veces en Proyectos y Tecnologías.
- Pestañas de Proyectos (deben llevar al proyecto correcto y mostrarlo completo).
- Anchos 390, 768, 960, 961 y 1440 px.
- Activar/desactivar animaciones a mitad de Proyectos.
- Abrir un proyecto (modal) y el menú móvil.

## Verificación hecha y límites
- Análisis sintáctico (esbuild) de todos los JSX/JS y del CSS.
- Auditoría del timeline de Proyectos: 0 solapes por elemento.
- **No se pudo ejecutar `npm run build` ni probar en navegador** (sin red para instalar dependencias). Los valores de movimiento (distancias, rotaciones, la altura de la pista `480vh`) están calculados pero conviene ajustarlos a gusto viéndolos en pantalla.

---

## Ronda 2: bug + más lento y fluido

**Bugs corregidos**
1. **Escenario de Proyectos saltaba al abrir un modal.** El bloqueo de scroll ponía `overflow: hidden` en `<body>`; como `<html>` ya tiene `overflow-x: clip`, el body pasaba a ser un contenedor de scroll y rompía `position: sticky`. Ahora el bloqueo se hace sobre `<html>` (modal de proyecto, menú móvil, modal de tecnologías).
2. **Las pestañas de Proyectos parpadeaban** (0→1→2→3) al viajar a un proyecto lejano. Ahora se mantiene la pestaña elegida durante el desplazamiento.

**Más lento y fluido**
- Lenis: duración 1.05 → 1.6 s, rueda más pausada (×0.8), navegación entre secciones 1.9 s con salida suave.
- Scrub con inercia corta (0.55 escritorio / 0.7 móvil) para que el movimiento se deslice en vez de seguir de forma rígida.
- Entradas de contenido: 0.95 → 1.5 s, más desplazamiento y escalonado más amplio (0.16 s).
- Proyectos: pista de 480vh → 780vh (~170vh de recorrido por proyecto), transiciones más largas y con curvas más suaves.
- Tecnologías y Contacto: los recorridos de scrub son más largos.

Para ajustar el ritmo: `scrub` en `src/animations/motion.js`, `duration` de Lenis en `src/App.jsx` y `height` de `.projects-track` en `src/styles/cinematic.css`.

---

## Ronda 3: Proyectos (solo aparecía el primero)

- La galería de escritorio ya no usa un timeline de GSAP con estados iniciales ocultos (frágil). Ahora cada proyecto se **dibuja de forma determinista** a partir del progreso del scroll (`renderAt` en `ProjectsScene.jsx`): opacidad, posición, escala y giro 3D se calculan directamente. Resultado: los cuatro proyectos aparecen en orden y nunca queda la escena vacía.
- **Las imágenes aparecen poco a poco:** el recorte de la pantalla se abre, la captura se funde, se desenfoca menos y se asienta (zoom 1.18 → 1). La descripción llega un poco después. En móvil la captura también se revela de forma progresiva.
- Las 4 capturas cargan desde el inicio (`loading="eager"`) para que no aparezcan en blanco al entrar.
- La escena persigue al scroll con suavidad propia (`FOLLOW = 0.085` en `renderAt`; menor = más lento y suave).
- Ajustes rápidos en `ProjectsScene.jsx`: `ENTER` (duración de entrada), `LEAD` (anticipación), `FOLLOW` (suavidad); en CSS, `height` de `.projects-track` (recorrido total).

---

## Ronda 4: tarjeta de identidad tapada por la columna (Sobre mí)

`.about-sculpture-stage` tenía `transform-style: preserve-3d`: sus hijos se ordenaban por profundidad 3D e ignoraban `z-index`, y la columna, al rotar con el parallax, tapaba la tarjeta "Fernando Sisnande · UTU 2026". Ahora solo conserva `perspective` (+ `isolation: isolate`), así que la tarjeta (`z-index: 5`) queda siempre por encima de la columna (`z-index: 2`) y de la seda.

---

## Ronda 5: texto que se materializa palabra por palabra con el scroll

Nuevo `createWordScrubber` en `src/animations/motion.js`. Cada palabra parte de un estado de "partícula" (invisible, dispersa, pequeña, desenfocada 12px y con halo azul) y se condensa en su lugar, una tras otra, a medida que haces scroll. Es reversible: al subir, el texto se deshace.

- **Dónde se aplica:** Sobre mí (título, frase principal, los 3 párrafos y "Recorrido práctico y académico"), Tecnologías (título y descripción) y Contacto (título, titular y subtexto).
- **Ritmo:** el recorrido es proporcional al alto de la ventana (mínimo 45vh), así que incluso un título corto se forma sin prisa.
- **Ajustes** (en `createWordScrubber`): dispersión `110 / 70` px, desenfoque `blur(12px)`, halo `textShadow`, `spread` (0.72 = cuánto se escalona entre la primera y la última palabra), `lengthVh` (recorrido mínimo).
- Se respeta el HTML interno (`<em>`), el texto sigue siendo texto real (accesible/seleccionable) y con "Animaciones OFF" no se toca.
- Verificado en Chromium: misma altura y mismas palabras al dividir, y el HTML original se restaura al revertir.
