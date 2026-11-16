import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { obtenerCategoriaPorId, obtenerLibroPorId } from "../api.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import EstadoError from "../components/EstadoError.jsx";
import { formatearPrecio } from "../utils/formatoPrecio.js";

export default function Libro() {
  const { libroId } = useParams();

  const [libro, setLibro] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [parametrosBusqueda] = useSearchParams();
  const tipoErrorDetalle = parametrosBusqueda.get("errorDetalle") ?? "";

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarLibro() {
      setCargando(true);
      setError("");
      setLibro(null);
      setCategoria(null);

      try {
        const libroObtenido = await obtenerLibroPorId(
          libroId,
          controlador.signal,
          tipoErrorDetalle,
        );

        const categoriaObtenida = await obtenerCategoriaPorId(
          libroObtenido.categoriaId,
          controlador.signal,
        );

        setLibro(libroObtenido);
        setCategoria(categoriaObtenida);
      } catch (errorDePeticion) {
        if (errorDePeticion?.name !== "AbortError") {
          setError(
            errorDePeticion instanceof Error
              ? errorDePeticion.message
              : "No se pudo cargar el libro.",
          );
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarLibro();

    return () => controlador.abort();
  }, [libroId, tipoErrorDetalle]);

  if (cargando) {
    return <EstadoCarga mensaje="Cargando libro..." />;
  }

  if (error) {
    return <EstadoError mensaje={error} />;
  }

  if (!libro || !categoria) {
    return <EstadoError mensaje="No encontramos este libro." />;
  }

  return (
    <main className="contenedor pagina">
      <Link className="enlace-volver" to={`/categorias/${categoria.id}`}>
        Volver a la categoría {categoria.nombre}
      </Link>

      <section className="detalle-libro">
        <div className="detalle-libro__portada" aria-hidden="true">
          <span className="detalle-libro__portada-categoria">
            {categoria.nombre}
          </span>

          <strong className="detalle-libro__portada-titulo">
            {libro.titulo}
          </strong>

          <span className="detalle-libro__portada-autor">
            {libro.autor}
          </span>
        </div>

        <div className="detalle-libro__informacion">
          <p className="sobrelinea">{categoria.nombre}</p>
          <h1>{libro.titulo}</h1>
          <p className="detalle-libro__autor">Autor: {libro.autor}</p>
          <p className="detalle-libro__descripcion">{libro.descripcion}</p>

          <p className="detalle-libro__precio">
            <span>Precio</span>
            <strong>{formatearPrecio(libro.precio)}</strong>
          </p>

          <Link
            className="boton boton--secundario"
            to={`/categorias/${categoria.id}`}
          >
            Ver más libros de {categoria.nombre}
          </Link>
        </div>
      </section>
    </main>
  );
}