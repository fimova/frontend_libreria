import { Link } from "react-router";

export default function NoEncontrada() {
  return (
    <main className="contenedor pagina pagina--estado">
      <section className="estado-error">
        <p className="sobrelinea">Página Abierta</p>
        <h1>Página no encontrada</h1>
        <p>La dirección que buscas no existe.</p>

        <Link className="boton boton--principal" to="/">
          Ir al inicio
        </Link>
      </section>
    </main>
  );
}