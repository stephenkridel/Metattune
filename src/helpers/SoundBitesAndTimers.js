import Timer from '../helpers/Timer.js';
import { Audio } from 'expo-av';

const randomizeSoundBites = array => {
    // doubling the size of the array
    array = array.concat(array);

    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

const loadSoundBiteAudio = array => {
    array = array.map(element => {
        const soundObject = new Audio.Sound();
        try {
            soundObject.loadAsync(element);
            var sound = soundObject;
        } catch (error) {
            this.setState({
                errorMsg:
                    'Sorry, there was an error loading the sound bite audio',
                isError: true
            });
        }

        return sound;
    });

    return array;
};

const setupTimers = soundArray => {
    var timerArray = [];
    for (let i = 0; i < soundArray.length; i++) {
        timerArray[i] = new Timer(function () {
            soundArray[i].playAsync();
            // console.log(soundArray[i]);
        }, i * 53000);
    }

    return [timerArray, soundArray];
};

export { randomizeSoundBites, loadSoundBiteAudio, setupTimers };
