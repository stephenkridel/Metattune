const INITIAL_STATE = {
  isError: false,
  errorMsg: '',
};

const errorReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'error/isError':
      let { isError } = state;
      isError = action.payload;
      newState = { ...state, isError };
      return newState;
    case 'error/errorMsg':
      let { errorMsg } = state;
      errorMsg = action.payload;
      newState = { ...state, errorMsg };
      return newState;
    default:
      return state;
  }
};

export default errorReducer;
