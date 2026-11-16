import { Link } from "react-router";

export default function Encabezado() {
  return (
    <header className="encabezado">
      <div className="contenedor encabezado__interior">
        <Link
          className="marca"
          to="/"
          aria-label="Página Abierta, inicio"
        >
          <span className="marca__nombre">Página Abierta</span>
          <span className="marca__descripcion">Librería independiente</span>
        </Link>

        <nav className="navegacion" aria-label="Navegación principal">
          <Link to="/">Inicio</Link>
          <Link to="/#categorias">Categorías</Link>
        </nav>
      </div>
    </header>
  );
}