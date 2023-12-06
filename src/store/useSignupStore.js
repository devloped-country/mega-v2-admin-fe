import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

const initialState = {
  companyName: '',
  courses: [{ id: uuid(), value: '' }],
  address: '',
  adminName: '',
  phoneNumber: '',
  detailAddress: '',
  email: '',
  authNumber: '',
  password: '',
  latitude: 0,
  longitude: 0,
};

const useSingupStore = create((set) => ({
  companyName: initialState.companyName,
  courses: initialState.courses,
  address: initialState.address,
  adminName: initialState.adminName,
  phoneNumber: initialState.phoneNumber,
  detailAddress: initialState.detailAddress,
  email: initialState.email,
  authNumber: initialState.authNumber,
  password: initialState.password,
  latitude: initialState.latitude,
  longitude: initialState.longitude,

  changeCompanyName: ({ target }) => {
    set((state) => ({ ...state, companyName: target.value }));
  },
  addCourses: () => {
    set((state) => ({
      ...state,
      courses: [...state.courses, { id: uuid(), value: '' }],
    }));
  },
  updateCourses: (value, id) => {
    set((state) => ({
      ...state,
      courses: state.courses.map((course) => {
        if (course.id === id) {
          return {
            ...course,
            value,
          };
        }

        return course;
      }),
    }));
  },
  removeCourses: (id) => {
    set((state) => ({
      ...state,
      courses: state.courses.filter((course) => course.id !== id),
    }));
  },
  changeAddress: (address) => {
    set((state) => ({ ...state, address }));
  },
  changeAdminName: ({ target }) => {
    set((state) => ({ ...state, adminName: target.value }));
  },
  changePhoneNumber: ({ target }) => {
    set((state) => ({ ...state, phoneNumber: target.value }));
  },
  changeDetailAddress: ({ target }) => {
    set((state) => ({ ...state, detailAddress: target.value }));
  },
  changeEmail: ({ target }) => {
    set((state) => ({ ...state, email: target.value }));
  },
  changeAuthNumber: ({ target }) => {
    set((state) => ({ ...state, authNumber: target.value }));
  },
  changePassword: ({ target }) => {
    set((state) => ({ ...state, password: target.value }));
  },
  changeLatitude: (latitude) => {
    set((state) => ({ ...state, latitude }));
  },
  changeLongitude: (longitude) => {
    set((state) => ({ ...state, longitude }));
  },
  reset: () => {
    set(() => initialState);
  },
}));

export default useSingupStore;
