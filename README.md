## Probar errores simulados con MSW

La aplicación usa MSW para simular respuestas de la API durante el desarrollo.
Para iniciar el sitio, ejecutar:

```bash
npm run dev
```
Abrir la dirección que indique Vite: `http://localhost:5173`, si Vite indica otro puerto, reemplazar 5173
por el puerto que aparece en la terminal.

Para probar los errores, se pueden escribir estas direcciones en el navegador:

### Errores al cargar listas

| Caso                           | Dirección                                          | Resultado esperado                           |
|--------------------------------|----------------------------------------------------|----------------------------------------------|
| Inicio normal                  | http://localhost:5173/                             | Se muestran las categorías                   |
| Error 404 al cargar categorías | http://localhost:5173/?error=404                   | Se muestra el mensaje de error de categorías |
| Error 500 al cargar categorías | http://localhost:5173/?error=500                   | Se muestra el mensaje de error del servidor  |
| Error 404 al cargar libros     | http://localhost:5173/categorias/ficcion?error=404 | Se muestra un error al cargar los libros     |
| Error 500 al cargar libros     | http://localhost:5173/categorias/ficcion?error=500 | Se muestra un error del servidor             |

### Errores al cargar una categoría o libro específico

| Caso                              | Dirección                                                 | Resultado esperado                                       |
|-----------------------------------|-----------------------------------------------------------|----------------------------------------------------------|
| Error 404 al cargar una categoría | http://localhost:5173/categorias/ficcion?errorDetalle=404 | Se muestra el error al cargar esa categoría              |
| Error 500 al cargar una categoría | http://localhost:5173/categorias/ficcion?errorDetalle=500 | Se muestra el error del servidor al cargar esa categoría |
| Error 404 al cargar un libro      | http://localhost:5173/libros/dune?errorDetalle=404        | Se muestra el error al cargar ese libro                  |
| Error 500 al cargar un libro      | http://localhost:5173/libros/dune?errorDetalle=500        | Se muestra el error del servidor al cargar ese libro     |

También se pueden probar IDs que no existen:

- http://localhost:5173/categorias/no-existe
- http://localhost:5173/libros/no-existe

Estas URLs producen un error 404.

## Consideraciones

Los parámetros `error` y `errorDetalle` sirven para probar errores simulados. La página lee el parámetro de su dirección y 
se lo pasa a `api.js`, quien lo incluye en la petición fetch. El worker de MSW intercepta la petición y el handler responde 
con un estado HTTP, como 404 o 500. `api.js` detecta que la respuesta no fue exitosa y lanza un error. Luego la página lo
captura y muestra un mensaje al usuario en vez de los datos.

El parámetro se escribe en la dirección de la aplicación para ver el resultado en pantalla. No es necesario 
abrir directamente una dirección /api/...

Para volver a ver los datos normales, se debe eliminar ?error=... de la dirección o simplemente volver a navegar la
página normalmente.