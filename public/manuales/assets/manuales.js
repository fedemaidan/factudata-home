/* ============================================================
   Sorby · Manuales — manifiesto
   ------------------------------------------------------------
   ESTA ES LA ÚNICA LISTA. Para publicar un manual nuevo:
     1. Creá  /manuales/<slug>/index.html  (copiá otro de base).
     2. Agregá su entrada acá abajo, con `slug`.
   Para anunciar uno que todavía no está, dejá `slug: null`:
   se muestra en gris con el cartel "En preparación".

   Campos:
     area    — agrupador del hub (Obra · Finanzas · Materiales)
     titulo  — nombre del manual
     resumen — una línea, qué resuelve
     slug    — carpeta bajo /manuales/ (null = todavía no publicado)
     icono   — SVG de los recursos gráficos de marca
   ============================================================ */

(function () {
  // Formas geométricas del Manual de Marca (viewBox común 174.05 × 217.56)
  var S = {
    estrella: '<svg viewBox="0 0 174.05 217.56" aria-hidden="true"><path d="M156.35,71a40.84,40.84,0,0,0-28.41-12.23,40.92,40.92,0,0,0-81.82,0,40.91,40.91,0,0,0,0,81.81,40.92,40.92,0,0,0,81.82,0A40.92,40.92,0,0,0,156.35,71Zm-24.1,33.76-34.5,5.64-5.64,34.5H81.94l-5.63-34.5-34.5-5.64V94.61L76.31,89l5.63-34.5H92.11L97.75,89l34.5,5.64Z"/></svg>',
    arcos: '<svg viewBox="0 0 174.05 217.56" aria-hidden="true"><path d="M118.89,80.21h41.47a73.35,73.35,0,0,0-146.67,0H55.16a73.36,73.36,0,0,0-41.47,64.41H55.16A73.38,73.38,0,0,0,13.69,209H160.36a73.4,73.4,0,0,0-41.47-64.42h41.47A73.38,73.38,0,0,0,118.89,80.21Z"/></svg>',
    pin: '<svg viewBox="0 0 174.05 217.56" aria-hidden="true"><path d="M87.13,25.56h-.22a79.7,79.7,0,0,0,0,159.39h79.91V105.26A79.69,79.69,0,0,0,87.13,25.56ZM87,163.62a58.37,58.37,0,1,1,58.36-58.38A58.38,58.38,0,0,1,87,163.62Z"/><path d="M120.79,105.24v0a33.76,33.76,0,1,1-67.52,0v0a33.76,33.76,0,0,1,67.52,0Z"/></svg>',
    sol: '<svg viewBox="0 0 174.05 217.56" aria-hidden="true"><path d="M162.58,85.71l-16.61-2a7.33,7.33,0,0,1-5.2-11.37l9.35-13.89a7.33,7.33,0,0,0-9.27-10.7L125.77,55a7.34,7.34,0,0,1-10.52-6.76l.36-16.74a7.34,7.34,0,0,0-13.59-4L93.28,41.78a7.34,7.34,0,0,1-12.51,0L72,27.52a7.33,7.33,0,0,0-13.58,4l.35,16.74A7.33,7.33,0,0,1,48.27,55L33.2,47.72a7.33,7.33,0,0,0-9.27,10.7l9.34,13.89a7.33,7.33,0,0,1-5.19,11.37l-16.61,2a7.34,7.34,0,0,0-2,14l15.37,6.63a7.33,7.33,0,0,1,1.78,12.37L13.72,129.42A7.33,7.33,0,0,0,19.6,142.3l16.51-2.73A7.33,7.33,0,0,1,44.3,149l-5,15.95a7.33,7.33,0,0,0,11.91,7.66L63.57,161.4a7.34,7.34,0,0,1,12,3.53l4.37,16.15a7.34,7.34,0,0,0,14.16,0l4.38-16.15a7.33,7.33,0,0,1,12-3.53l12.42,11.23A7.33,7.33,0,0,0,134.8,165L129.75,149a7.33,7.33,0,0,1,8.18-9.45l16.51,2.73a7.34,7.34,0,0,0,5.89-12.88l-12.88-10.69a7.33,7.33,0,0,1,1.78-12.37l15.37-6.63A7.34,7.34,0,0,0,162.58,85.71Z"/></svg>'
  };

  window.MANUALES = [
    {
      area: "Obra",
      titulo: "Control de Obra",
      resumen: "Seguí una obra de punta a punta: avance, costos, certificados, cobros y pagos a proveedores.",
      slug: "control-obra",
      icono: S.estrella
    },
    {
      area: "Obra",
      titulo: "Presupuestos profesionales",
      resumen: "Armá y cotizá presupuestos detallados, y convertilos en una obra con un clic.",
      slug: null,
      icono: S.pin
    },
    {
      area: "Finanzas",
      titulo: "Caja chica",
      resumen: "Registrá los gastos del día a día de la obra y mantené la caja siempre cuadrada.",
      slug: null,
      icono: S.arcos
    },
    {
      area: "Finanzas",
      titulo: "Gastos recurrentes",
      resumen: "Cargá una vez los gastos que se repiten todos los meses y olvidate de anotarlos.",
      slug: null,
      icono: S.sol
    },
    {
      area: "Materiales",
      titulo: "Acopio",
      resumen: "Comprá material por adelantado, seguí el saldo y cerrá el acopio cuando corresponda.",
      slug: null,
      icono: S.arcos
    },
    {
      area: "Materiales",
      titulo: "Notas de pedido",
      resumen: "Pedí materiales al corralón desde WhatsApp y seguí el estado de cada pedido.",
      slug: null,
      icono: S.pin
    }
  ];
})();
