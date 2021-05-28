import Media from './Media';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';
import FirebaseFetchAPI from '../helpers/FirebaseFetchAPI';

export default class AudioElement {
  constructor(name) {
    this.name = name;
    this.Media = null;
  }

  _onError = (error, errorMsg) => {
    this.onStateChange('error', errorMsg, error);
  };

  _loadFromDevice = async item => {
    let storedFile = await AsyncStorageAPI.getItem(item);
    return storedFile;
  };

  _fetchFromFirebase = async item => {
    try {
      let storedFile = await FirebaseFetchAPI.fetchMedia(item.toLowerCase());
      return storedFile;
    } catch (error) {
      this._onError(
        error,
        'There was a problem connecting to our servers, please check your internet connection and try again.',
      );
    }
  };

  _getAudioFromStoredLocation = async isStoredInDevice => {
    isStoredInDevice = false;
    let storedFile = isStoredInDevice
      ? await this._loadFromDevice(this.name)
      : await this._fetchFromFirebase(this.name);
    return storedFile;
  };

  _checkIfStored = async item => {
    let isStoredInDevice = await AsyncStorageAPI.isStoredInDevice(item);
    return isStoredInDevice;
  };

  setupAudioElement = async () => {
    let isDownloaded = this._checkIfStored(this.name);
    let storedFile = await this._getAudioFromStoredLocation(isDownloaded);
    this.Media = new Media(storedFile, isDownloaded);
    await this.Media.loadMedia();
  };
}
