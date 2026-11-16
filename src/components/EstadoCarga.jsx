export default function EstadoCarga({ mensaje = "Cargando..." }) {
  return (
    <main className="contenedor pagina pagina--estado">
      <p className="estado" role="status">
        {mensaje}
      </p>
    </main>
  );
}