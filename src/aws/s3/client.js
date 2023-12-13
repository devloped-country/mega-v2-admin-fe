import { S3Client } from '@aws-sdk/client-s3';

export const client = new S3Client({
  region: 'ap-northeast-3',
  credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_SECRET_KEY,
  },
});
