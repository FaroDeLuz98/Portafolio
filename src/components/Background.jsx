/**
 * BACKGROUND · Fondo decorativo global
 * ------------------------------------
 * Tres "orbes" de luz que flotan lentamente y una grilla técnica.
 * Todo es puramente visual: aria-hidden evita que los lectores de
 * pantalla lo anuncien. Las animaciones se desactivan con
 * "prefers-reduced-motion" desde el CSS.
 */
export default function Background() {
  return (
    <div className="page-background" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-orb bg-orb--green" />
      <div className="bg-orb bg-orb--blue" />
      <div className="bg-orb bg-orb--pink" />
    </div>
  );
}
