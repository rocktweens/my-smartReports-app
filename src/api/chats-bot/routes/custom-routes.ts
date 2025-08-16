export default {
  routes: [
    {
      method: "GET",
      path: "/ultimos-chats-por-cliente",
      handler: "ultimos-chats-por-cliente.ultimosChatxCliente",
      config: {
        auth: false, // cámbialo a true si necesitas autenticación
      },
    },
  ],
};
