import { updateErrorMsg, updateIsError } from '../actions/ErrorActions';
import store from '../store/Store';

export default class ErrorAPI {
  static errorHandler = (error, message, callback) => {
    store.dispatch(updateIsError(true));
    store.dispatch(updateErrorMsg(message));
    if (callback != null) {
      callback();
    }
    console.log(error);
  };

  static clearError = () => {
    store.dispatch(updateIsError(false));
  };
}
