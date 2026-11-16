const formatoNumero = new Intl.NumberFormat("es-CL", {
  maximumFractionDigits: 0,
});

export function formatearPrecio(precio) {
  return `$${formatoNumero.format(Number(precio))}`;
}