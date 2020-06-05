/* 

import { Audio } from 'expo-av';

// soundAsset = file path to mp3
async function PlayMusic(soundAsset) {
    const soundObject = new Audio.Sound();
    try {
        await soundObject.loadAsync(require(soundAsset));
        await soundObject.playAsync();
    // Your sound is playing!
    } catch (error) {
        console.log('There was an error in playing the sound.');
    }
}

export default PlayMusic;

*/