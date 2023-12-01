import { PutObjectCommand } from '@aws-sdk/client-s3';
import { client } from '@/aws/s3/client';
import { v4 as uuidv4 } from 'uuid';
import { useNoticeSave } from './useNoticeSave';

export const usePutObject = () => {
  const { thumbnail, changeThumbnail } = useNoticeSave();

  const putObject = async (file, type) => {
    const formData = new FormData();

    const uuid = uuidv4();
    formData.append('file', file);

    const command = new PutObjectCommand({
      Bucket: 'mega-v2-s3-d07',
      Key: `notice/${uuid}.${type}`,
      Body: file,
      ContentType: `image/${type}`,
    });
    console.log(command);

    try {
      await client.send(command);

      const imgUrl = `${
        import.meta.env.VITE_CLOUD_FRONT_ID
      }/notice/${uuid}.${type}`;

      if (!thumbnail.length) {
        changeThumbnail(imgUrl);
      }

      return Promise.resolve(imgUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return { putObject };
};
