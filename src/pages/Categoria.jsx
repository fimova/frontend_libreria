import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { obtenerCategoriaPorId, obtenerLibros } from "../api.js";
import EstadoCarga from "../components/EstadoCarga.jsx";
import EstadoError from "../components/EstadoError.jsx";
import TarjetaLibro from "../components/TarjetaLibro.jsx";

export default function Categoria() {
    const { categoriaId } = useParams();

    const [categoria, setCategoria] = useState(null);
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [parametrosBusqueda] = useSearchParams();

    const tipoErrorLibros = parametrosBusqueda.get("error") ?? "";
    const tipoErrorDetalle = parametrosBusqueda.get("errorDetalle") ?? "";

    useEffect(() => {
        const controlador = new AbortController();

        async function cargarCategoriaYLibros() {
            setCargando(true);
            setError("");
            setCategoria(null);
            setLibros([]);

            try {
                const [categoriaObtenida, librosObtenidos] = await Promise.all([
                    obtenerCategoriaPorId(
                        categoriaId,
                        controlador.signal,
                        tipoErrorDetalle,
                    ),
                    obtenerLibros(
                        categoriaId,
                        tipoErrorLibros,
                        controlador.signal,
                    ),
                ]);

                setCategoria(categoriaObtenida);
                setLibros(librosObtenidos);
            } catch (errorDePeticion) {
                if (errorDePeticion?.name !== "AbortError") {
                    setError(
                        errorDePeticion instanceof Error
                            ? errorDePeticion.message
                            : "No se pudieron cargar los libros.",
                    );
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        cargarCategoriaYLibros();

        return () => controlador.abort();
    }, [categoriaId, tipoErrorLibros, tipoErrorDetalle]);

    if (cargando) {
        return <EstadoCarga mensaje="Cargando categoría y libros..." />;
    }

    if (error) {
        return <EstadoError mensaje={error} />;
    }

    if (!categoria) {
        return <EstadoError mensaje="No encontramos esta categoría." />;
    }

    return (
        <main className="contenedor pagina">
            <Link className="enlace-volver" to="/">
                Volver a las categorías
            </Link>

            <header className="encabezado-pagina">
                <p className="sobrelinea">Categoría de libros</p>
                <h1>{categoria.nombre}</h1>
                <p>{categoria.descripcion}</p>
                <p className="encabezado-pagina__cantidad">
                    {libros.length === 1 ? "1 libro" : `${libros.length} libros`}
                </p>
            </header>

            {libros.length === 0 ? (
                <p className="estado">Todavía no hay libros en esta categoría.</p>
            ) : (
                <div className="rejilla-libros">
                    {libros.map((libro) => (
                        <TarjetaLibro libro={libro} key={libro.id} />
                    ))}
                </div>
            )}
        </main>
    );
}