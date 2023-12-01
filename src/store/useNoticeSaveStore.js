import { create } from 'zustand';

const initialState = {
  isTitle: false,
  title: '',
  tag: '',
  tags: [],
  content: '',
  textContent: '',
  thumbnail: '',
};

export const useNoticeSaveStore = create((set) => ({
  isTitle: initialState.isTitle,
  title: initialState.title,
  tag: initialState.tag,
  tags: initialState.tags,
  content: initialState.content,
  textContent: initialState.textContent,
  thumbnail: initialState.thumbnail,

  changeIsTitle: () => {
    set((state) => ({ ...state, isTitle: !state.isTitle }));
  },
  changeTitle: (title) => {
    set((state) => ({ ...state, title }));
  },
  changeTag: (tag) => {
    set((state) => ({ ...state, tag }));
  },
  changeTags: (tag) => {
    if (Array.isArray(tag)) {
      set((state) => ({ ...state, tags: [...tag] }));
      return;
    }

    set((state) => ({ ...state, tags: [...state.tags, tag] }));
  },
  changeContent: (content) => {
    set((state) => ({ ...state, content }));
  },
  changeThumbnail: (thumbnail) => {
    set((state) => ({ ...state, thumbnail }));
  },
  changeTextContent: (textContent) => {
    if (!Array.isArray(textContent)) {
      set((state) => ({ ...state, textContent }));
      return;
    }

    set((state) => ({
      ...state,
      textContent: textContent.reduce((acc, prev) => {
        return acc + ' ' + prev;
      }, ''),
    }));
  },
  reset: () => {
    set(() => ({ ...initialState }));
  },
}));
