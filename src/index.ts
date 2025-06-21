import type { Core } from "@strapi/strapi";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Establecer idioma del admin a 'es' si aún no está

    await strapi.db.transaction(async ({ trx, rollback, commit }) => {
      var result = await strapi.db
        .connection("admin_users")
        .whereNot("prefered_language", "es")
        .update({ prefered_language: "es" })
        .select("id")
        .transacting(trx);
      result = result;
    });
    strapi.db.query("admin::user").updateMany({
      where: { preferedLanguage: null }, // o email: 'admin@dominio.com'
      data: { preferedLanguage: "es" },
    });
  },
};
