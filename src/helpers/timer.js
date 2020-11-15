import BackgroundTimer from 'react-native-background-timer';

export default class Timer {
	constructor(callback, delay) {
		this.delay = delay;
		this.callback = callback;
		this.instance = null;
		this.remaining = delay;
		this.startTime = null;
		this.hasStarted = false;
	}

	start = () => {
		this.startTime = Date.now();
		this.remaining -= Date.now() - this.startTime;
		BackgroundTimer.clearTimeout(this.instance);
		if (this.remaining > 0) {
			clearTimeout(this.instance);
			// calling BackgroundTimer for Android
			this.instance = BackgroundTimer.setTimeout(
				this.callback,
				this.remaining
			);
		}
	};

	pause = () => {
		this.remaining -= Date.now() - this.startTime;
		BackgroundTimer.clearTimeout(this.instance);
	};

	stop = () => {
		this.remaining = this.delay;
		BackgroundTimer.clearTimeout(this.instance);
	};

	destroy = () => {
		BackgroundTimer.clearTimeout(this.instance);
		this.instance = null;
	};
}
