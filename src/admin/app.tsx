//import type { StrapiApp } from '@strapi/strapi/admin';
import type  { Core }  from "@strapi/strapi";
//import  { Page } from "@strapi/admin/strapi-admin";
//import type { Core } from '@strapi/types';
import es from "./src/translations/es.json";
import { register } from "module";

export default {
  config: {
    locales: ["es"],
    translations: {
      es:{...es}
    }
  },
  bootstrap(app: Core.Strapi) {
    console.log(app);
    console.log('Prototype:', Object.getPrototypeOf(app));
    
  },
  register(app: Core.Strapi){
    console.log(app);
  },
  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./src/translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
