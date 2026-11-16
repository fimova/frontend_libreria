import { Link } from "react-router";
import { formatearPrecio } from "../utils/formatoPrecio.js";

export default function TarjetaLibro({ libro }) {
  return (
    <article className="tarjeta-libro">
      <p className="tarjeta-libro__autor">Autor: {libro.autor}</p>
      <h2>{libro.titulo}</h2>
      <p className="tarjeta-libro__descripcion">{libro.descripcion}</p>

      <div className="tarjeta-libro__pie">
        <p className="tarjeta-libro__precio">
          {formatearPrecio(libro.precio)}
        </p>

        <Link className="enlace-detalle" to={`/libros/${libro.id}`}>
          Ver detalles
        </Link>
      </div>
    </article>
  );
}