import SoundBite from './SoundBite';
import FirebaseFetchAPI from '../helpers/FirebaseFetchAPI';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';

export default class SoundBiteList {
  constructor(listOfSoundBites) {
    this.listOfSoundBites = listOfSoundBites;
    this.soundBiteArray = null;
  }

  _loadFromDevice = async item => {
    let storedFile = await AsyncStorageAPI.getItem(item);
    return storedFile;
  };

  _fetchFromFirebase = async item => {
    let storedFile = await FirebaseFetchAPI.fetchMedia(item.toLowerCase());
    return storedFile;
  };

  _getAudioFromStoredLocation = async (isStoredInDevice, item) => {
    isStoredInDevice = false;
    let storedFile = isStoredInDevice
      ? await this._loadFromDevice(item)
      : await this._fetchFromFirebase(item);
    return storedFile;
  };

  _checkIfStored = async item => {
    let isStoredInDevice = await AsyncStorageAPI.isStoredInDevice(item);
    return isStoredInDevice;
  };

  _timerMath = () => {
    let timers = [];
    for (i = 0; i < 10; i++) {
      let timeInMS = i * 30000 + 5000;
      timers.push(timeInMS);
    }
    for (i = 0; i < 20; i++) {
      let timeInMS = i * 15000 + (10 * 30000 + 5000);
      timers.push(timeInMS);
    }
    return timers;
  };

  _lengthenArray = array => {
    do {
      array = array.concat(array);
    } while (array.length < 30);
    return array;
  };

  _shuffleArray = array => {
    // Fisher-Yates shuffle (adapted to not have same elements next to eachother)
    for (let i = array.length - 1; i > 0; i--) {
      do {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      } while (array[i] === array[i + 1] || array[0] === array[1]);
    }
    return array;
  };

  setupSoundBites = async () => {
    console.log('Setting Up SoundBiteList...');
    let soundBiteNames = this.listOfSoundBites;

    let soundBiteContents = await Promise.all(
      soundBiteNames.map(async element => {
        let isDownloaded = await this._checkIfStored(element);
        let storedFile = await this._getAudioFromStoredLocation(
          isDownloaded,
          element,
        );
        return [element, storedFile, isDownloaded];
      }),
    );

    soundBiteContents = this._lengthenArray(soundBiteContents);
    soundBiteContents = soundBiteContents.slice(0, 30);
    soundBiteContents = this._shuffleArray(soundBiteContents);

    let executionTimes = this._timerMath();
    // setup a short array of SounBite objects to fetch the audio files
    let soundBiteArray = await Promise.all(
      soundBiteContents.map(async (element, index) => {
        let soundBite = new SoundBite(
          element[0],
          element[1],
          element[2],
          executionTimes[index],
        );
        await soundBite.setupAudioElement();
        return soundBite;
      }),
    );

    console.log('Done setting up SoundBiteList');
    this.soundBiteArray = soundBiteArray;
  };

  startSoundBites = () => {
    if (this.soundBiteArray != null) {
      this.soundBiteArray.forEach(element => {
        element.Timer.startTimer();
      });
      console.log('Started SoundBites');
    }
  };

  pauseSoundBites = () => {
    if (this.soundBiteArray != null) {
      this.soundBiteArray.forEach(element => {
        element.Timer.pauseTimer();
        // console.log(`Delay ${element.Timer.delay}`);
        // console.log(`Remaining ${element.Timer.remaining}`);
      });
    }
  };

  stopSoundBites = () => {
    if (this.soundBiteArray != null) {
      this.soundBiteArray.forEach(element => {
        element.Timer.stopTimer();
      });
    }
  };

  unloadSoundBites = () => {
    if (this.soundBiteArray != null) {
      this.soundBiteArray.forEach(element => {
        element.Timer.destroyTimer();
      });
    }
  };
}
