import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { obtenerCategorias } from "../api.js";

export default function Inicio() {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const [parametrosBusqueda] = useSearchParams();
    const tipoError = parametrosBusqueda.get("error") ?? "";

    useEffect(() => {
        const controlador = new AbortController();

        async function cargarCategorias() {
            setCargando(true);
            setError("");

            try {
                const resultado = await obtenerCategorias(tipoError, controlador.signal);
                setCategorias(resultado);
            } catch (errorDePeticion) {
                if (errorDePeticion?.name !== "AbortError") {
                    setError(
                        errorDePeticion instanceof Error
                            ? errorDePeticion.message
                            : "No se pudieron cargar las categorías.",
                    );
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        cargarCategorias();

        return () => controlador.abort();
    }, [tipoError]);

    return (
        <main className="contenedor pagina">
            <section className="presentacion">
                <p className="sobrelinea">Bienvenidos a nuestra librería</p>
                <h1>Encuentra tu próxima lectura</h1>
                <p>
                    Explora nuestras categorías y descubre libros para distintos gustos.
                </p>
                <a className="boton boton--principal" href="#categorias">
                    Ver categorías
                </a>
            </section>

            <section id="categorias" className="seccion-catalogo">
                <div className="encabezado-seccion">
                    <p className="sobrelinea">Nuestro catálogo</p>
                    <h2>Explora las categorías</h2>
                    <p>Elige una categoría para descubrir sus libros.</p>
                </div>

                {cargando && (
                    <p className="estado" role="status">
                        Cargando categorías...
                    </p>
                )}

                {!cargando && error && (
                    <div className="mensaje-error" role="alert">
                        <h3>No se pudieron cargar las categorías</h3>
                        <p>{error}</p>
                    </div>
                )}

                {!cargando && !error && categorias.length === 0 && (
                    <p className="estado">Todavía no hay categorías disponibles.</p>
                )}

                {!cargando && !error && categorias.length > 0 && (
                    <div className="rejilla-categorias">
                        {categorias.map((categoria) => (
                            <Link
                                className="tarjeta-categoria"
                                to={`/categorias/${categoria.id}`}
                                key={categoria.id}
                            >
                                <div>
                                    <h3>{categoria.nombre}</h3>
                                    <p>{categoria.descripcion}</p>
                                </div>

                                <span className="tarjeta-categoria__accion">Ver libros</span>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}