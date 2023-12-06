export const initialAuthState = {
  email: '',
  password: '',
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return { ...state, email: action.payload };
    case 'PASSWORD_INPUT':
      return { ...state, password: action.payload };
    default:
      return state;
  }
};
