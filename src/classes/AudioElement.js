import Media from './Media';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';
import FirebaseFetchAPI from '../helpers/FirebaseFetchAPI';

export default class AudioElement {
  constructor(name, isMainAudio) {
    this.name = name;
    this.isMainAudio = isMainAudio;
    this.Media = null;
  }

  _loadFromDevice = async item => {
    let storedFile = await AsyncStorageAPI.getItem(item);
    return storedFile;
  };

  _fetchFromFirebase = async item => {
    let storedFile = await FirebaseFetchAPI.fetchMedia(item.toLowerCase());
    return storedFile;
  };

  _getAudioFromStoredLocation = async isDownloaded => {
    let storedFile = isDownloaded
      ? await this._loadFromDevice(this.name)
      : await this._fetchFromFirebase(this.name);
    return storedFile;
  };

  _checkIfStored = async item => {
    let isDownloaded = await AsyncStorageAPI.isStoredInDevice(item);
    return isDownloaded;
  };

  setupAudioElement = async () => {
    let isDownloaded = await this._checkIfStored(this.name);
    let storedFile = await this._getAudioFromStoredLocation(isDownloaded);
    this.Media = new Media(storedFile, isDownloaded, this.isMainAudio);
    await this.Media.loadMedia();
  };
}
