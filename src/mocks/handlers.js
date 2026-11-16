import { delay, http, HttpResponse } from "msw";

const categorias = [
    {
        id: "ficcion",
        nombre: "Ficción",
        descripcion: "Historias y personajes que despiertan la imaginación.",
    },
    {
        id: "ciencia-ficcion",
        nombre: "Ciencia ficción",
        descripcion: "Futuros posibles, viajes espaciales y nuevas tecnologías.",
    },
    {
        id: "fantasia",
        nombre: "Fantasía",
        descripcion: "Magia, criaturas extraordinarias y aventuras épicas.",
    },
    {
        id: "misterio",
        nombre: "Misterio",
        descripcion: "Casos intrigantes y secretos por descubrir.",
    },
];

const libros = [
    {
        id: "cien-anios-de-soledad",
        titulo: "Cien años de soledad",
        autor: "Gabriel García Márquez",
        categoriaId: "ficcion",
        precio: 14990,
        descripcion:
            "La historia de la familia Buendía y del pueblo de Macondo a través de varias generaciones.",
    },
    {
        id: "la-sombra-del-viento",
        titulo: "La sombra del viento",
        autor: "Carlos Ruiz Zafón",
        categoriaId: "ficcion",
        precio: 15990,
        descripcion:
            "Un joven descubre un libro misterioso e investiga la historia de su autor.",
    },
    {
        id: "dune",
        titulo: "Dune",
        autor: "Frank Herbert",
        categoriaId: "ciencia-ficcion",
        precio: 18990,
        descripcion:
            "Una aventura en Arrakis, un planeta desértico clave para el futuro de la humanidad.",
    },
    {
        id: "1984",
        titulo: "1984",
        autor: "George Orwell",
        categoriaId: "ciencia-ficcion",
        precio: 11990,
        descripcion:
            "Una novela sobre la vigilancia, el poder y el control de la información.",
    },
    {
        id: "el-nombre-del-viento",
        titulo: "El nombre del viento",
        autor: "Patrick Rothfuss",
        categoriaId: "fantasia",
        precio: 20990,
        descripcion:
            "Kvothe relata el camino que lo convirtió en una figura legendaria.",
    },
    {
        id: "la-historia-interminable",
        titulo: "La historia interminable",
        autor: "Michael Ende",
        categoriaId: "fantasia",
        precio: 16990,
        descripcion: "Una aventura mágica en el reino de Fantasía.",
    },
    {
        id: "asesinato-orient-express",
        titulo: "Asesinato en el Orient Express",
        autor: "Agatha Christie",
        categoriaId: "misterio",
        precio: 12990,
        descripcion:
            "Hércules Poirot debe resolver un asesinato ocurrido durante un viaje en tren.",
    },
    {
        id: "el-psicoanalista",
        titulo: "El psicoanalista",
        autor: "John Katzenbach",
        categoriaId: "misterio",
        precio: 14990,
        descripcion:
            "Un psicoanalista recibe una amenaza y debe descubrir quién está detrás.",
    },
];

export const handlers = [
    http.get("/api/categorias", async ({ request }) => {
        await delay(1000);

        const url = new URL(request.url);
        const error = url.searchParams.get("error");

        if (error === "404") {
            return HttpResponse.json(
                { mensaje: "No se encontraron categorías." },
                { status: 404 },
            );
        }

        if (error === "500") {
            return HttpResponse.json(
                { mensaje: "Error interno del servidor." },
                { status: 500 },
            );
        }

        return HttpResponse.json(categorias);
    }),

    http.get("/api/libros", async ({ request }) => {
        await delay(1000);

        const url = new URL(request.url);
        const error = url.searchParams.get("error");

        if (error === "404") {
            return HttpResponse.json(
                { mensaje: "No se encontraron libros." },
                { status: 404 },
            );
        }

        if (error === "500") {
            return HttpResponse.json(
                { mensaje: "Error interno del servidor." },
                { status: 500 },
            );
        }

        const categoriaId = url.searchParams.get("categoriaId");

        const librosFiltrados = categoriaId
            ? libros.filter((libro) => libro.categoriaId === categoriaId)
            : libros;

        return HttpResponse.json(librosFiltrados);
    }),

    http.get("/api/categorias/:categoriaId", async ({ request, params }) => {
        await delay(500);

        const url = new URL(request.url);
        const error = url.searchParams.get("error");

        if (error === "404") {
            return HttpResponse.json(
                { mensaje: "Categoría no encontrada." },
                { status: 404 },
            );
        }

        if (error === "500") {
            return HttpResponse.json(
                { mensaje: "Error interno del servidor al cargar la categoría." },
                { status: 500 },
            );
        }

        const categoria = categorias.find(
            (elemento) => elemento.id === params.categoriaId,
        );

        if (!categoria) {
            return HttpResponse.json(
                { mensaje: "Categoría no encontrada." },
                { status: 404 },
            );
        }

        return HttpResponse.json(categoria);
    }),

    http.get("/api/libros/:libroId", async ({ request, params }) => {
        await delay(500);

        const url = new URL(request.url);
        const error = url.searchParams.get("error");

        if (error === "404") {
            return HttpResponse.json(
                { mensaje: "Libro no encontrado." },
                { status: 404 },
            );
        }

        if (error === "500") {
            return HttpResponse.json(
                { mensaje: "Error interno del servidor al cargar el libro." },
                { status: 500 },
            );
        }

        const libro = libros.find((elemento) => elemento.id === params.libroId);

        if (!libro) {
            return HttpResponse.json(
                { mensaje: "Libro no encontrado." },
                { status: 404 },
            );
        }

        return HttpResponse.json(libro);
    })
];