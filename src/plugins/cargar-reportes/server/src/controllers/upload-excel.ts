import type { Context } from 'koa';
import uploadService from '../services/upload';

export default {
  async uploadExcel(ctx: Context) {
    const { files } = ctx.request;
    // Puede venir como array o como objeto simple
    const uploadedFile = Array.isArray(files?.file) ? files.file[0] : files?.file;

    if (!uploadedFile) {
      return ctx.badRequest('No se recibió el archivo.');
    }

    const { filepath: path, originalFilename: name, mimetype: type } = uploadedFile;

    if (!path || !name || !type) {
      return ctx.badRequest('El archivo no contiene la información esperada.');
    }
    try {
      const result = await uploadService.uploadToS3({
        path,
        name,
        type
      });
      ctx.send({ url: result.$metadata });
    } catch (err) {
      console.error('Error al subir a S3:', err);
      ctx.internalServerError('No se pudo subir a S3.');
    }
  },
};
