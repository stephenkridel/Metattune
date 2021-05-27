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
  }

  startTimer = () => {
    this.startTime = Date.now();
    this.remaining -= Date.now() - this.startTime;
    BackgroundTimer.clearTimeout(this.instance);
    if (this.remaining > 0) {
      clearTimeout(this.instance);
      // calling BackgroundTimer for Android
      this.instance = BackgroundTimer.setTimeout(this.callback, this.remaining);
    }
  };

  pauseTimer = () => {
    this.remaining -= Date.now() - this.startTime;
    this.totalTimePlayed = this.delay - this.remaining;
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
