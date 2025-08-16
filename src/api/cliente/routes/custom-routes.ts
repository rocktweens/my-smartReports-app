export default {
  routes: [
    {
      method: "PUT",
      path: "/actualizar-por-entidad-de",
      handler: "actualizar-por-entidad-de.actualizarPorEntidadDe",
      config: {
        auth: false, // cámbialo a true si necesitas autenticación
      },
    },
  ],
};
