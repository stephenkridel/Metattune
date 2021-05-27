import AudioElement from './AudioElement';
import Media from './Media';

export default class MainAudio extends AudioElement {
  constructor(name) {
    super(name);
  }

  setupAudioElement = async () => {
    let isDownloaded = this._checkIfStored(this.name);
    let storedFile = await this._getAudioFromStoredLocation(isDownloaded);
    this.Media = new Media(storedFile, isDownloaded, true);
    this.Media.onStateChange = this.onStateChange;
    await this.Media.loadMedia();
  };
}
