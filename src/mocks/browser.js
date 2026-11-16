import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

// handlers.js define qué respuestas simular. browser.js conecta esas respuestas con el worker del navegador
export const worker = setupWorker(...handlers); 