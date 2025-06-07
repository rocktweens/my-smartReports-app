/**
 * report controller
 */
import type { File as UploadedFile } from 'formidable';
import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::report.report', ({ strapi }) => ({
    async upload(ctx) {
      const { files } = ctx.request;
  
      // Verificar si se envió un archivo llamado "excel"
      if (!files || !files.excel) {
        ctx.throw(400, 'Debes subir un archivo Excel');
      }
      const file = files?.excel as UploadedFile;
  
      // Validar extensión del archivo
      if (!file?.filepath.endsWith('.xlsx') && !file?.filepath.endsWith('.xls')) {
        ctx.throw(400, 'El archivo debe ser Excel (.xlsx o .xls)');
      }
  
      // ... Aquí continúa tu lógica: guardar el archivo, procesarlo, etc.
    }
  }));