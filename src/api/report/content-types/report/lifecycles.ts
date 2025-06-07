import { errors } from "@strapi/utils";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

const ReportsLifecycle = {
  async beforeUpdate(event: any) {
    const { data: entry } = event?.params || {};
    const uploadedFile = entry.archivo;
   /*  if (!uploadedFile || !uploadedFile.url)
      throw new errors.ApplicationError(
        "Debe subir un archivo Excel para continuar."
      ); */
  },
  async afterUpdate(event: any) {
    const { result: entry } = event;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");

    const fechaCargaInicio =
      entry?.fechaCargaInicio == null ? currentDate : entry?.fechaCargaInicio;

    const uploadedFile = entry.archivo;
    if (!uploadedFile || !uploadedFile.url) return;
    /*  throw new errors.ApplicationError(
        "Debe subir un archivo Excel para continuar."
      ); */

    const filePath = path.join(strapi.dirs.static.public, uploadedFile.url);

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null });

    const fechas: string[] = jsonData
      .map((row: any) => row["Fecha"])
      .filter(Boolean);

    await strapi.entityService.update("api::report.report", entry.id, {
      data: {
        nombre: `${sheetName}_${year}-${month}`,
        fechaCargaInicio: fechaCargaInicio,
        fechaUltimaCarga: currentDate,
      },
    });

    if (fechas.length) {
    }
  },
};

export default ReportsLifecycle;
