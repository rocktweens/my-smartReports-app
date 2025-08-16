import type { Context } from "koa";

export default {
  async ultimosChatxCliente(ctx: Context) {
    console.log(ctx.request.body);

    const clientes = await strapi.entityService.findMany(
      "api::cliente.cliente",
      {
        populate: "*", // si querés incluir relaciones (opcional)
        limit: 1000, // opcional: podés ajustar el límite según tu necesidad
      }
    );

    if (!clientes || clientes.length === 0) {
      return ctx.notFound("No existen clientes");
    }

    const clientesConChats = await Promise.all(
      clientes.map(async (cliente) => {
        const chats = await strapi.entityService.findMany(
          "api::chats-bot.chats-bot",
          {
            filters: {
              entidad_de: cliente.entidad_de, // Relación o campo identificador
            },
            sort: ["fecha_hora:desc"],
            limit: 1,
          }
        );

        return {
          ...cliente,
          ultimo_chat: chats[0] ?? null,
        };
      })
    );

    // 3. Filtrar los que tienen chats y ordenarlos por fecha_hora descendente
    const ordenados = clientesConChats
      .filter((item) => item.ultimo_chat) // solo clientes con chats
      .sort(
        (a, b) =>
          new Date(b.ultimo_chat.fecha_hora).getTime() -
          new Date(a.ultimo_chat.fecha_hora).getTime()
      );
    return ctx.send({
      mensaje: "listado cliente por Chat",
      chatxcliente: ordenados,
    });
  },
};
