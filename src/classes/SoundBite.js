import Timer from './Timer';
import Media from './Media';
import AudioElement from './AudioElement';

export default class SoundBite extends AudioElement {
  constructor(name, file, isDownloaded, delay) {
    super(name);
    this.file = file;
    this.isDownloaded = isDownloaded;
    this.Timer = null;
    this.delay = delay;
  }

  setupAudioElement = async () => {
    this.Media = new Media(this.file, this.isDownloaded, false);
    await this.Media.loadMedia();
    this.Timer = new Timer(this.Media.playMedia, this.delay);
  };
}
