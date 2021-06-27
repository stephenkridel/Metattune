const INITIAL_STATE = {
  statusDidJustFinish: false,
  isPlaying: false,
  hasLoaded: false,
  btnIcon: 'caretright',
  hasStarted: false,
  timeListened: 0,
  instanceList: [],
};

const playbackObjectReducer = (state = INITIAL_STATE, action) => {
  let newState;
  switch (action.type) {
    case 'playbackObject/statusDidJustFinish':
      let { statusDidJustFinish } = state;
      statusDidJustFinish = action.payload;
      newState = { ...state, statusDidJustFinish };
      return newState;
    case 'playbackObject/isPlaying':
      let { isPlaying } = state;
      isPlaying = action.payload;
      newState = { ...state, isPlaying };
      return newState;
    case 'playbackObject/btnIcon':
      let { btnIcon } = state;
      btnIcon = action.payload;
      newState = { ...state, btnIcon };
      return newState;
    case 'playbackObject/hasLoaded':
      let { hasLoaded } = state;
      hasLoaded = action.payload;
      newState = { ...state, hasLoaded };
      return newState;
    case 'playbackObject/hasStarted':
      let { hasStarted } = state;
      hasStarted = action.payload;
      newState = { ...state, hasStarted };
      return newState;
    case 'playbackObject/timeListened':
      var { timeListened } = state;
      timeListened = action.payload;
      newState = { ...state, timeListened };
      return newState;
    case 'playbackObject/reset':
      newState = { INITIAL_STATE };
      return newState;
    default:
      return state;
  }
};

export default playbackObjectReducer;
