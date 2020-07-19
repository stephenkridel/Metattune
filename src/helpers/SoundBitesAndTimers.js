import Timer from '../helpers/Timer.js';

const randomizeSoundBites = async array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};
/*
loadSoundBiteAudio = async(array) => {
    array = array.map((element) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(element)
        } catch (error) {
            this.setState({
                errorMsg: 'Sorry, there was an error loading the sound bite audio',
                isError: true
            });
        }
    });

    return array;
};
*/
const loadSoundBiteAudio = async array => {
    array.map(element => {
        try {
            element;
        } catch (error) {
            this.setState({
                errorMsg:
                    'Sorry, there was an error loading the sound bite audio',
                isError: true
            });
        }
    });

    return array;
};

const setupTimers = async soundArray => {
    var timerArray = [];
    for (let i = 0; i < soundArray.length; i++) {
        timerArray[i] = new Timer(function () {
            //soundArray[i].playAsync();
            console.log(soundArray[i]);
        }, (i + 1) * 15000);
    }

    return timerArray;
};

export { randomizeSoundBites, loadSoundBiteAudio, setupTimers };
