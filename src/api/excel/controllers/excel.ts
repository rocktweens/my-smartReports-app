import type { Context } from "koa";
import AWS from "aws-sdk";
import fs from "fs";

type UploadedFile = {
  path: string;
  name: string;
  type: string;
  size: number;
};

export default {
  async uploadExcel(ctx: Context) {
    const { files } = ctx.request;
    const rawFile = files?.excel;

    if (!rawFile || (Array.isArray(rawFile) && rawFile.length === 0)) {
      return ctx.badRequest("Debes subir un archivo Excel (.xlsx)");
    }

    const file = Array.isArray(rawFile)
      ? (rawFile[0] as unknown as UploadedFile)
      : (rawFile as unknown as UploadedFile);

    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `excels/${Date.now()}-${file.name}`,
      Body: fileStream,
      ContentType: file.type,
    };

    try {
      const result = await s3.upload(uploadParams).promise();
      ctx.send({
        message: "Archivo subido correctamente",
        url: result.Location,
      });
    } catch (error) {
      console.error(error);
      ctx.throw(500, "Error al subir archivo a S3");
    }
  },
};
