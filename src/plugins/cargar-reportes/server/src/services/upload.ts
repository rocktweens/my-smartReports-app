import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { ReadStream } from 'fs';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export default {
  async uploadToS3(file: {
    path: string;
    name: string;
    type: string;
  }) {
    const readStream = fs.createReadStream(file.path);

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `excels/${Date.now()}_${file.name}`,
      Body: readStream,
      ContentType: file.type,
    });

    const result = await s3.send(command);
    return result;
  },
};
