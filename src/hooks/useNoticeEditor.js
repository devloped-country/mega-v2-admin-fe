import { usePutObject } from './usePutObject';

export function useNoticeEditor() {
  const { imgs, putObject } = usePutObject();

  const customUploadAdapter = (loader) => {
    return {
      upload() {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            const [_, type] = file.type.split('/');

            putObject(file, type).then((file) => resolve({ default: file }));
          });
        });
      },
    };
  };

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return { imgs, uploadPlugin };
}
