export default class Timer {
    constructor(callback, delay) {
        this.delay = delay;
        this.callback = callback;
        this.instance = null;
        this.remaining = delay;
        this.startTime = null;
        this.instance = null;

        this.start = () => {
            this.startTime = Date.now();
            this.remaining -= Date.now() - this.startTime;
            clearTimeout(this.instance);
            if (this.remaining > 0) {
                clearTimeout(this.instance);
                this.instance = setTimeout(this.callback, this.remaining);
            }
        };

        this.pause = () => {
            this.remaining -= Date.now() - this.startTime;
            clearTimeout(this.instance);
        };

        this.stop = () => {
            this.remaining = this.delay;
            clearTimeout(this.instance);
        };
    }
}
