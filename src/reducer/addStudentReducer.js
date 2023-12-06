export const initialStudentState = {
  name: '',
  email: '',
  phone: '',
  course: '',
};

export const addStudentReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT': {
      return { ...state, [action.payload]: action.value };
    }
  }
};
