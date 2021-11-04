const INITIAL_STATE = {
  userName: '',
  hoursCompleted: 0,
  sessionsCompleted: 0,
  favoriteSession: '',
  dayStreak: 0,
  showWarning: false,
  showAvatarModal: false,
  selectedAvatar: '',
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
    case 'user/favoriteSession':
      let { favoriteSession } = state;
      favoriteSession = action.payload;
      newState = { ...state, favoriteSession };
      return newState;
    case 'user/dayStreak':
      let { dayStreak } = state;
      dayStreak = action.payload;
      newState = { ...state, dayStreak };
      return newState;
    case 'user/showWarning':
      let { showWarning } = state;
      showWarning = action.payload;
      newState = { ...state, showWarning };
      return newState;
    case 'user/showAvatarModal':
      let { showAvatarModal } = state;
      showAvatarModal = action.payload;
      newState = { ...state, showAvatarModal };
      return newState;
    case 'user/selectedAvatar':
      let { selectedAvatar } = state;
      selectedAvatar = action.payload;
      newState = { ...state, selectedAvatar };
      return newState;
    case 'user/resetUser':
      let { INITIAL_STATE } = state;
      newState = { ...state, INITIAL_STATE };
      return newState;
    default:
      return state;
  }
};

export default userReducer;
