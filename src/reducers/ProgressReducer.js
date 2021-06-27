const INITIAL_STATE = {
  messageText: '',
};

const progressReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'progress/messageText':
      let { messageText } = state;
      messageText = action.payload;
      newState = { ...state, messageText };
      return newState;
    default:
      return state;
  }
};

export default progressReducer;
