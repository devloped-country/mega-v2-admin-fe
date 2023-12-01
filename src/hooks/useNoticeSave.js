import { useNoticeSaveStore } from '@/store/useNoticeSaveStore';

import { shallow } from 'zustand/shallow';

export const useNoticeSave = () => {
  const {
    isTitle,
    title,
    tag,
    tags,
    content,
    textContent,
    thumbnail,
    changeIsTitle,
    changeTitle,
    changeTag,
    changeTags,
    changeContent,
    changeTextContent,
    changeThumbnail,
    reset,
  } = useNoticeSaveStore(
    (state) => ({
      isTitle: state.isTitle,
      title: state.title,
      tag: state.tag,
      tags: state.tags,
      content: state.content,
      textContent: state.textContent,
      thumbnail: state.thumbnail,
      changeIsTitle: state.changeIsTitle,
      changeTitle: state.changeTitle,
      changeTag: state.changeTag,
      changeTags: state.changeTags,
      changeContent: state.changeContent,
      changeTextContent: state.changeTextContent,
      changeThumbnail: state.changeThumbnail,
      reset: state.reset,
    }),
    shallow
  );

  return {
    isTitle,
    title,
    tag,
    tags,
    content,
    textContent,
    thumbnail,
    changeIsTitle,
    changeTitle,
    changeTag,
    changeTags,
    changeContent,
    changeTextContent,
    changeThumbnail,
    reset,
  };
};
