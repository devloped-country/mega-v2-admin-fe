import { create } from "zustand";

const initialState = {
  isShowingModal: false,
  title: "",
  receiver: "",
  sender: "",
  date: new Date(),
  content: "",
};

export const useNoteStore = create((set) => ({
  isShowingModal: initialState.isShowingModal,
  title: initialState.title,
  receiver: initialState.receiver,
  sender: initialState.sender,
  date: initialState.date,
  content: initialState.content,

  changeIsShowingModal: () => {
    set((state) => ({ ...state, isShowingModal: !state.isShowingModal }));
  },
}));
