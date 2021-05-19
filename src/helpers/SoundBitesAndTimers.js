import Timer from './Timer.js';
import { Audio } from 'expo-av';

const _timerMath = () => {
  let timers = [];
  for (i = 0; i < 10; i++) {
    let timeInMS = i * 30000 + 5000;
    timers.push(timeInMS);
  }
  for (i = 0; i < 20; i++) {
    let timeInMS = i * 15000 + (10 * 30000 + 5000);
    timers.push(timeInMS);
  }
  console.log(timers);
  return timers;
};

const _lengthenArray = array => {
  do {
    array = array.concat(array);
    console.log(Date.now());
  } while (array.length < 30);

  return array;
};

const _shuffleArray = array => {
  // Fisher-Yates shuffle (adapted to not have same elements next to eachother)
  for (let i = array.length - 1; i > 0; i--) {
    do {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    } while (array[i] === array[i + 1] || array[0] === array[1]);
  }

  return array;
};

const randomizeSoundBites = array => {
  return new Promise((resolve, reject) => {
    // doubling the size of the array

    array = _lengthenArray(array);
    array = _shuffleArray(array);
    array = array.slice(0, 30);

    // null is loosely equivalent to undefined (i.e. null == undefined) so
    // we get away with only checking for null values with loose equivalence
    // not great error checking but it can be adapted later
    for (let i = 0; i < array.length; i++) {
      if (array[i] == null) {
        reject('error in randomizeSoundBites function');
        break;
      } else if (i === array.length - 1) {
        resolve(array);
      }
    }
  });
};

const loadSoundBiteAudio = array => {
  return new Promise((resolve, reject) => {
    try {
      soundArray = array.map(element => {
        const soundObject = new Audio.Sound();
        soundObject.loadAsync(element);
        return soundObject;
      });
    } catch (error) {
      throw 'error loading the audio prompts (expo async error)';
    }
    for (let i = 0; i < array.length; i++) {
      if (soundArray[i] == null) {
        reject('error in randomizeSoundBites function');
        break;
      } else if (i === soundArray.length - 1) {
        resolve(soundArray);
      }
    }
  });
};

const setupTimers = soundArray => {
  return new Promise((resolve, reject) => {
    const timerArray = [];
    const exectutionTimes = _timerMath();
    for (let i = 0; i < soundArray.length; i++) {
      timerArray[i] = new Timer(function () {
        soundArray[i].playAsync();
        // used to stop a soundbite when the audio gets paused
        timerArray[i].hasStarted = true;
        console.log(
          `Timer ${i + 1} executed, ${
            exectutionTimes.length - (i + 1)
          } timers to go`,
        );
      }, exectutionTimes[i]);
      // timerArray[i].timerId = 'ID - ' + Math.floor(Math.random() * 10000);
    }
    for (let i = 0; i < timerArray.length; i++) {
      if (timerArray[i] == null || soundArray[i] == null) {
        reject('error in setupTimers function');
        break;
      } else if (i === timerArray.length - 1) {
        resolve([timerArray, soundArray]);
      }
    }
  });
};

export { randomizeSoundBites, loadSoundBiteAudio, setupTimers };
