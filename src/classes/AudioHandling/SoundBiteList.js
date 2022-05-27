import SoundBite from './SoundBite';
import store from '../../store/Store';
import { updateProgressMessage } from '../../actions/ProgressActions';

export default class SoundBiteList {
  constructor(titles) {
    this.titles = titles;
    this.objectArray = [];
  }

  _timerMath = () => {
    let timers = [];
    for (let i = 0; i < 11; i++) {
      let timeInMS = i * 30000 + 5000;
      timers[i] = timeInMS;
    }
    for (let i = 11; i < 20; i++) {
      let timeInMS = i * 15000 + (10 * 30000 + 5000);
      timers[i] = timeInMS;
    }
    return timers;
  };

  // ------ why are there 30 elements but the timers only go to 20? ------
  _lengthenArray = array => {
    do {
      array = array.concat(array);
    } while (array.length < 30);

    array.slice(0, 30);

    return array;
  };

  _shuffleArray = array => {
    // Fisher-Yates shuffle (adapted to not have same elements next to eachother)
    store.dispatch(updateProgressMessage('Shuffling Vocal Cues'));
    for (let i = array.length - 1; i > 0; i--) {
      do {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      } while (array[i] === array[i + 1] || array[0] === array[1]);
    }
    return array;
  };

  setup = async () => {
    // must use Promise.all when awaiting .map
    this.objectArray = await Promise.all(
      this.titles.map(async element => {
        let SoundBiteObject = new SoundBite(element);
        await SoundBiteObject.setup();
        console.log('Setup SoundBite');
        return SoundBiteObject;
      }),
    );

    let timerArray = this._timerMath();

    this.objectArray.forEach((element, index) => {
      element.delay = timerArray[index];
      element.setupSbTimer();
    });

    this.objectArray = this._lengthenArray(this.objectArray);
    this.objectArray = this._shuffleArray(this.objectArray);

    let lastSoundBite = new SoundBite('all', 605000);
    await lastSoundBite.setup();
    lastSoundBite.setupSbTimer();
    this.objectArray.push(lastSoundBite);
  };

  start = () => {
    if (this.objectArray && this.objectArray.length > 0) {
      this.objectArray.forEach(element => {
        if (element.Timer.gotPaused) {
          element.Media.play();
          element.Timer.gotPaused = false;
        }
        element.Timer.start();
      });
    }
  };

  pause = () => {
    if (this.objectArray && this.objectArray.length > 0) {
      this.objectArray.forEach((element, index, array) => {
        if (
          (index !== array.length - 1 &&
            element.Timer.hasStarted &&
            !array[index + 1].hasStarted) ||
          (index === array.length - 1 && element.Timer.hasStarted)
        ) {
          element.Media.pause();
          element.Timer.gotPaused = true;
        }
        element.Timer.pause();
      });
    }
  };

  stop = () => {
    if (this.objectArray && this.objectArray.length > 0) {
      this.pause();
      this.objectArray.forEach(element => {
        element.Timer.stop();
      });
    }
  };

  unload = () => {
    if (this.objectArray && this.objectArray.length > 0) {
      this.objectArray.forEach(element => {
        element.Media.unload();
        element.Timer.destroy();
      });
    }
  };
}
