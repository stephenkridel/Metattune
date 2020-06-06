import { Audio } from 'expo-av';

async function PlayMusic(source) {
    
    const soundObject = new Audio.Sound();

    try {
        await soundObject.loadAsync(source);
        await soundObject.playAsync();
    } catch (error) {
        console.log('There was an error in playing the sound.');
    }
    
}

export default PlayMusic;