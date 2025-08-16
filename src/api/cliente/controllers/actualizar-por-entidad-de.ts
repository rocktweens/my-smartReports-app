
import type { Context } from "koa";

export default {
  async actualizarPorEntidadDe(ctx: Context) {
    console.log(ctx.request.body);
    const { entidad_de, nombre, es_manual } = ctx.request.body.data;

    if (!entidad_de || !nombre) {
      return ctx.badRequest("Faltan datos: entidad_de o nombre");
    }

    // Buscar cliente por entidad_de
    const clientes = await strapi.entityService.findMany(
      "api::cliente.cliente",
      {
        filters: { entidad_de },
      }
    );

    if (!clientes || clientes.length === 0) {
      return ctx.notFound("Cliente no encontrado");
    }

    const cliente = clientes[0];

    // Actualizar nombre
    const actualizado = await strapi.entityService.update(
      "api::cliente.cliente",
      cliente.id,
      {
        data: {
          nombre: nombre === null ? cliente.nombre : nombre,
          es_manual: es_manual === null ? cliente.es_manual : es_manual,
        },
      }
    );

    return ctx.send({ mensaje: "Cliente actualizado", cliente: actualizado });
  },
};
