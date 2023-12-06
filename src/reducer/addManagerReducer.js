export const initialAddManagerState = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  passwordConfirm: '',
};

export const addManagerReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT': {
      return { ...state, [action.payload]: action.value };
    }
  }
};
