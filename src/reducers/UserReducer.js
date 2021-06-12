const INITIAL_STATE = {
  userName: '',
  hoursCompleted: 0,
  sessionsCompleted: 0,
  showWarning: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'user/userName':
      let { userName } = state;
      userName = action.payload;
      newState = { ...state, userName };
      return newState;
    case 'user/hoursCompleted':
      let { hoursCompleted } = state;
      hoursCompleted = action.payload;
      newState = { ...state, hoursCompleted };
      return newState;
    case 'user/sessionsCompleted':
      let { sessionsCompleted } = state;
      sessionsCompleted = action.payload;
      newState = { ...state, sessionsCompleted };
      return newState;
    case 'user/showWarning':
      let { showWarning } = state;
      showWarning = action.payload;
      newState = { ...state, showWarning };
      return newState;
    default:
      return state;
  }
};

export default userReducer;
