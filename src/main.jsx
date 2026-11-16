import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import Aplicacion from "./App.jsx";
import "./index.css";

async function iniciarAplicacion() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser.js");

    await worker.start({
      onUnhandledRequest: "bypass", // si una petición no coincide con ningún handler, MSW la deja pasar
    });
  }

  const root = document.getElementById("root");

  if (!root) {
    throw new Error("No se encontró el elemento raíz de la aplicación.");
  }

  createRoot(root).render(
    <BrowserRouter>
      <Aplicacion />
    </BrowserRouter>,
  );
}

iniciarAplicacion().catch((error) => {
  console.error("No se pudo iniciar la aplicación:", error);

  const root = document.getElementById("root");

  if (root) {
    root.textContent =
      "No se pudo iniciar la aplicación. Revisa la consola del navegador.";
  }
});