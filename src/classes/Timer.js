import BackgroundTimer from 'react-native-background-timer';

export default class Timer {
  constructor(callback, delay) {
    this.delay = delay;
    this.callback = callback;
    this.instance = null;
    this.remaining = delay;
    this.startTime = null;
    this.totalTimePlayed = 0;
    this.hasStarted = false;
    this.gotPaused = false;
  }

  _callbackFunction = () => {
    this.callback();
    this.hasStarted = true;
  };

  startTimer = () => {
    this.startTime = Date.now();
    this.remaining -= Date.now() - this.startTime;
    BackgroundTimer.clearTimeout(this.instance);
    if (this.remaining > 0) {
      clearTimeout(this.instance);
      // calling BackgroundTimer for Android
      this.instance = BackgroundTimer.setTimeout(
        this._callbackFunction,
        this.remaining,
      );
    }
  };

  pauseTimer = () => {
    this.remaining -= Date.now() - this.startTime;
    if (this.delay != this.remaining) {
      this.totalTimePlayed = this.delay - this.remaining;
    }
    BackgroundTimer.clearTimeout(this.instance);
  };

  stopTimer = () => {
    this.totalTimePlayed = this.delay - this.remaining;
    this.remaining = this.delay;
    BackgroundTimer.clearTimeout(this.instance);
  };

  destroyTimer = () => {
    this.stopTimer();
    this.instance = null;
  };
}
