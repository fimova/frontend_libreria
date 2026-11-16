import { Link } from "react-router";

export default function EstadoError({ mensaje }) {
  return (
    <main className="contenedor pagina pagina--estado">
      <section className="estado-error" role="alert">
        <p className="sobrelinea">Ocurrió un problema</p>
        <h1>No se pudo cargar la información</h1>
        <p>{mensaje}</p>

        <Link className="boton boton--secundario" to="/">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}