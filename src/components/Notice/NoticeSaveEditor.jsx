import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNoticeEditor } from '@/hooks/useNoticeEditor';
import { useNoticeSave } from '@/hooks/useNoticeSave';

function NoticeSaveEditor({ setIsShowingContentInputValidateMessage }) {
  const { content, changeContent, changeTextContent } = useNoticeSave();
  const { uploadPlugin } = useNoticeEditor();

  return (
    <CKEditor
      editor={ClassicEditor}
      data={content}
      config={{
        placeholder: '내용을 입력하세요.',
        language: 'ko',
        extraPlugins: [uploadPlugin],
        image: {
          toolbar: [''],
        },
        alignment: {
          options: ['left', 'center', 'right'],
        },
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            '|',
            'link',
            'uploadImage',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
          ],
        },
      }}
      onChange={(_, editor) => {
        const data = editor.getData();
        const pattern = /<img[^>]*>|<figure[^>]*>|<\/?[^>]+(>|$)/g;
        const text = data
          .replace(pattern, ' ')
          .split(' ')
          .filter((data) => data !== '')
          .map((data) =>
            data === '&nbsp;' ? data.replace('&nbsp;', '') : data
          );

        setIsShowingContentInputValidateMessage(false);
        changeTextContent(text);
        changeContent(data);
      }}
    />
  );
}

export default NoticeSaveEditor;
