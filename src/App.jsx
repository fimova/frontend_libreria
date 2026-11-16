import { Route, Routes } from "react-router";
import Encabezado from "./components/Encabezado.jsx";
import PieDePagina from "./components/PieDePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import Categoria from "./pages/Categoria.jsx";
import Libro from "./pages/Libro.jsx";
import NoEncontrada from "./pages/NoEncontrada.jsx";

export default function Aplicacion() {
  return (
    <>
      <Encabezado />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias/:categoriaId" element={<Categoria />} />
        <Route path="/libros/:libroId" element={<Libro />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>

      <PieDePagina />
    </>
  );
}