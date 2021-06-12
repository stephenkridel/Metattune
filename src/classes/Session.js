import SoundBiteList from './SoundBiteList';
import MainAudio from './MainAudio';
import store from '../store/Store';
import { updateHasLoaded } from '../actions/PlaybackObjectActions';

export default class Session {
  constructor(name, soundBites) {
    this.name = name;
    this.soundBites = soundBites;

    this.MainAudio = new MainAudio(this.name, true);
    if (this.soundBites) {
      this.SoundBiteList = new SoundBiteList(this.soundBites);
    }
    this.unsubscribe;
  }

  loadSession = async () => {
    console.log('Loading Session...');
    await this.MainAudio.setupAudioElement();
    // if statements around SoundBiteList prevent action if session is the intro track
    if (this.soundBites) {
      await this.SoundBiteList.setupSoundBites();
    }
  };

  playSession = () => {
    console.log('Playing Session...');
    this.MainAudio.Media.playMedia();
    if (this.soundBites) {
      this.SoundBiteList.startSoundBites();
    }
  };

  pauseSession = () => {
    this.MainAudio.Media.pauseMedia();
    if (this.soundBites) {
      this.SoundBiteList.pauseSoundBites();
    }
  };

  endSession = () => {
    this.MainAudio.Media.stopMedia();
    if (this.soundBites) {
      this.SoundBiteList.stopSoundBites();
    }
  };

  _unloadLogic = () => {
    /*
    this is the main logic that will unload all the audio. Packaged in 
    a separate function so that it can be used in conjunction with a 
    subscription incase the audio hasn't loaded fully when unload is requested
    */
    this.MainAudio.Media.unloadMedia();
    if (this.soundBites) {
      console.log('Unloading SoundBites');
      this.SoundBiteList.unloadSoundBites();
    }
  };

  _unloadAudioSubscription = () => {
    /*
    this subscription only gets activated when unloading of audio is
    requested before the audio has loaded fully loaded. It gets unsubscribed
    immediately after it finishes unloading the audio
    */
    let { playbackObject } = store.getState();
    console.log('Got state in subscription');
    if (playbackObject.hasLoaded) {
      this._unloadLogic();
      store.dispatch(updateHasLoaded(false));
      console.log('Done Unloading Audio');
      this.unsubscribe();
    }
  };

  unloadSession = () => {
    /*
    this function gets called first in the unloading. It checks to see if the audio
    has fully loaded. If it has, it unloads normally, if not, it creates a subscription
    that will watch for the audio to load fully and then unload. This prevents errors from
    overloading the phones media player if the user backs out of a session before it loads
    and then loads another session.
    */
    let { playbackObject } = store.getState();
    if (playbackObject.hasLoaded) {
      this._unloadLogic();
    } else {
      this.unsubscribe = store.subscribe(this._unloadAudioSubscription);
    }
  };
}
