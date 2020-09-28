import Timer from './Timer.js';
import { Audio } from 'expo-av';

const randomizeSoundBites = array => {
	return new Promise((resolve, reject) => {
		// doubling the size of the array
		array = array.concat(array);

		// Fisher-Yates shuffle
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		// null is loosely equivalent to undefined (i.e. null == undefined) so
		// we get away with only checking for null values with loose equivalence
		// not great error checking but it can be adapted later
		if (array == null) {
			reject('error in randomizeSoundBites function');
		} else {
			resolve(array);
		}
	});
};

const loadSoundBiteAudio = array => {
	return new Promise((resolve, reject) => {
		try {
			array = array.map(element => {
				const soundObject = new Audio.Sound();
				soundObject.loadAsync(element);
				return soundObject;
			});
		} catch (error) {
			throw 'error loading the audio prompts (expo async error)';
		}
		if (array == null) {
			reject('error in loadSoundBiteAudio function');
		} else {
			resolve(array);
		}
	});
};

const setupTimers = soundArray => {
	return new Promise((resolve, reject) => {
		var timerArray = [];
		for (let i = 0; i < soundArray.length; i++) {
			timerArray[i] = new Timer(function () {
				soundArray[i].playAsync();
			}, (i + 1) * 53000);
		}
		if (timerArray == null || soundArray == null) {
			reject('error in setupTimers function');
		} else {
			resolve([timerArray, soundArray]);
		}
	});
};

export { randomizeSoundBites, loadSoundBiteAudio, setupTimers };
