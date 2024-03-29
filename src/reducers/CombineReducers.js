import { combineReducers } from 'redux';
import playbackObjectReducer from './PlaybackObjectReducer';
import errorReducer from './ErrorReducer';
import userReducer from './UserReducer';
import progressReducer from './ProgressReducer';

export default combineReducers({
  playbackObject: playbackObjectReducer,
  error: errorReducer,
  user: userReducer,
  progress: progressReducer,
});
