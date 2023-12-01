import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

const initialState = {
  companyName: '',
  courses: [{ id: uuid(), value: '' }],
  address: '',
  name: '',
  phoneNumber: '',
};

const useSingupStore = create((set) => ({
  companyName: initialState.companyName,
  courses: initialState.courses,
  address: initialState.address,
  name: initialState.name,
  phoneNumber: initialState.phoneNumber,

  changeCompanyName: ({ target }) => {
    set((state) => ({ ...state, companyName: target.value }));
  },
  changeCourses: () => {
    // set((state) => ({ ...state, courses }));
  },
}));

export default useSingupStore;
