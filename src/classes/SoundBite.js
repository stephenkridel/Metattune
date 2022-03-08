import Timer from './Timer';
import AudioElement from './AudioElement';

export default class SoundBite extends AudioElement {
  constructor(name, delay = null) {
    super(name);
    this.Timer = null;
    this.delay = delay;
  }

  setupSbTimer = () => {
    if (this.Media) this.Timer = new Timer(this.Media.play, this.delay);
  };
}
