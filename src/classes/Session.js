import SoundBiteList from './SoundBiteList';
import AudioElement from './AudioElement';
import store from '../store/Store';
import { updateHasLoaded } from '../actions/PlaybackObjectActions';
import { updateProgressMessage } from '../actions/ProgressActions';

export default class Session {
  constructor(name, soundBites) {
    this.name = name;
    this.soundBites = soundBites;
    this.MainAudio = new AudioElement(this.name);
    this.isIntroSession = true;
    this.unsubscribe;

    if (this.soundBites) {
      this.isIntroSession = false;
      this.SoundBiteList = new SoundBiteList(this.soundBites);
    }
  }

  load = async () => {
    store.dispatch(updateProgressMessage('Loading Main Audio'));

    await this.MainAudio.setup();

    store.dispatch(updateProgressMessage('Loading Vocal Cues'));

    if (!this.isIntroSession) await this.SoundBiteList.setup();

    store.dispatch(updateProgressMessage(''));
  };

  play = () => {
    this.MainAudio.Media.play();
    if (!this.isIntroSession) this.SoundBiteList.start();
  };

  pause = () => {
    this.MainAudio.Media.pause();
    if (!this.isIntroSession) this.SoundBiteList.pause();
  };

  end = () => {
    this.MainAudio.Media.stop();
    if (!this.isIntroSession) this.SoundBiteList.stop();
  };

  unloadMedia = () => {
    /*
    this is the main logic that will unload all the audio. Packaged in 
    a separate function so that it can be used in conjunction with a 
    subscription incase the audio hasn't loaded fully when unload is requested
    */
    this.MainAudio.Media.unload();
    if (!this.isIntroSession) this.SoundBiteList.unload();
  };

  unloadAudioSubscription = () => {
    /*
    this subscription only gets activated when unloading of audio is
    requested before the audio has loaded fully loaded. It gets unsubscribed
    immediately after it finishes unloading the audio
    */
    let { playbackObject } = store.getState();
    if (playbackObject.hasLoaded) {
      this.unloadMedia();
      store.dispatch(updateHasLoaded(false));
      this.unsubscribe();
    }
  };

  unload = () => {
    /*
    this function gets called first in the unloading. It checks to see if the audio
    has fully loaded. If it has, it unloads normally, if not, it creates a subscription
    that will watch for the audio to load fully and then unload. This prevents errors from
    overloading the phones media player if the user backs out of a session before it loads
    and then loads another session.
    */
    let { playbackObject } = store.getState();
    if (playbackObject.hasLoaded) {
      this.unloadMedia();
    } else {
      this.unsubscribe = store.subscribe(this.unloadAudioSubscription);
    }
  };
}
