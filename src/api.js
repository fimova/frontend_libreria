const API_BASE_URL = "/api";

// concentra el comportamiento de las peticiones para no repetir el manejo del fetch
async function solicitarJSON(ruta, signal) {
  try {
    const respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    // lee el cuerpo de la respuesta como JSON
    // si no contiene un JSON válido, deja datos como null
    const datos = await respuesta.json().catch(() => null);

    // fetch no considera los estados 404 y 500 como errores de conexión
    // se revisa manualmente si la respuesta fue exitosa
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(datos?.mensaje || "Recurso no encontrado.");
      }

      if (respuesta.status === 500) {
        throw new Error(datos?.mensaje || "Error del servidor.");
      }

      throw new Error(datos?.mensaje || "Error desconocido.");
    }

    return datos;
  } catch (error) { // si se canceló la petición, se deja pasar el error, para que la interfaz no lo muestre como un fallo normal
    if (error?.name === "AbortError") {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new Error(
        "No fue posible conectarse al servidor. Reintente más tarde.",
        { cause: error },
      );
    }

    throw error;
  }
}

function agregarError(ruta, tipoError) {
  if (!tipoError) {
    return ruta;
  }

  const parametros = new URLSearchParams({ error: tipoError });
  return `${ruta}?${parametros.toString()}`;
}

// tipoError permite probar errores simulados. signal permite cancelar una petición

// hace fetch a /api/categorias
export function obtenerCategorias(tipoError = "", signal) {
  const consulta = tipoError
    ? `?error=${encodeURIComponent(tipoError)}`
    : "";

  return solicitarJSON(`/categorias${consulta}`, signal);
}

// hace fetch a /api/libros?categoriaId=ficcion
export function obtenerCategoriaPorId(
  categoriaId,
  signal,
  tipoError = "",
) {
  const ruta = `/categorias/${encodeURIComponent(categoriaId)}`;
  return solicitarJSON(agregarError(ruta, tipoError), signal);
}

export function obtenerLibros(categoriaId = "", tipoError = "", signal) {
  const parametros = new URLSearchParams();

  if (categoriaId) {
    parametros.set("categoriaId", categoriaId);
  }

  if (tipoError) {
    parametros.set("error", tipoError);
  }

  const consulta = parametros.toString();
  const ruta = consulta ? `/libros?${consulta}` : "/libros";

  return solicitarJSON(ruta, signal);
}

// hace fetch a /api/libros/dune
export function obtenerLibroPorId(libroId, signal, tipoError = "") {
  const ruta = `/libros/${encodeURIComponent(libroId)}`;
  return solicitarJSON(agregarError(ruta, tipoError), signal);
}