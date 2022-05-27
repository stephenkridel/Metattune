import SoundBiteList from './SoundBiteList';
import AudioElement from './AudioElement';
import store from '../store/Store';
import {
  updateHasLoaded,
  updateBtnIcon,
  updateDidJustFinish,
  updateHasFinished,
  updateIsPlaying,
  updateHasStarted,
} from '../actions/PlaybackObjectActions';
import { updateProgressMessage } from '../actions/ProgressActions';
import UserStatistics from '../helpers/UserStatistics';
import ErrorAPI from '../helpers/ErrorAPI';
import BackgroundTimer from 'react-native-background-timer';

export default class Session {
  constructor(name, soundBites) {
    this.name = name;
    this.soundBites = soundBites;
    this.MainAudio = new AudioElement(this.name);
    this.isIntroSession = true;
    this.unsubscribeMediaUnloading;

    if (this.soundBites) {
      this.isIntroSession = false;
      this.SoundBiteList = new SoundBiteList(this.soundBites);
    }
  }

  handleSessionFinishing = () => {
    console.log('_handleSessionFinishing');
    store.dispatch(updateDidJustFinish(false));
    store.dispatch(updateHasFinished(true));
    store.dispatch(updateBtnIcon('caretright'));
    store.dispatch(updateIsPlaying(false));
    this.end();
    ErrorAPI.errorHandler(
      'Session was completed',
      `Congrats! You just completed the ${this.name} session.`,
    );
  };

  updateStatistics = async hasFinished => {
    if (this.SoundBiteList) {
      const timer = this.SoundBiteList.objectArray[0].Timer;
      timer.pause();
      await UserStatistics.updateHoursCompleted(timer.totalTimePlayed);
      await UserStatistics.updateDayStreak();
      if (hasFinished) {
        await UserStatistics.updateCompletedSessions();
        await UserStatistics.updateFavoriteSession(this.name);
        store.dispatch(updateHasFinished(false));
      }
    }
  };

  load = async () => {
    store.dispatch(updateProgressMessage('Loading Main Audio'));
    await this.MainAudio.setup();
    store.dispatch(updateProgressMessage('Loading Vocal Cues'));
    if (!this.isIntroSession) await this.SoundBiteList.setup();
    store.dispatch(updateProgressMessage(''));
    store.dispatch(updateHasLoaded(true));
    store.dispatch(updateBtnIcon('caretright'));
    console.log('Finished Loading');
  };

  play = isPlaying => {
    if (isPlaying) {
      BackgroundTimer.start();
      store.dispatch(updateHasStarted(true));
    }
    this.MainAudio.Media.play();
    if (!this.isIntroSession) this.SoundBiteList.start();
    store.dispatch(updateBtnIcon('pause'));
    store.dispatch(updateIsPlaying(true));
  };

  pause = () => {
    this.MainAudio.Media.pause();
    if (!this.isIntroSession) this.SoundBiteList.pause();
    store.dispatch(updateBtnIcon('caretright'));
    store.dispatch(updateIsPlaying(false));
  };

  end = () => {
    this.MainAudio.Media.stop();
    BackgroundTimer.stop();
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
      this.unsubscribeMediaUnloading();
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
      this.unsubscribeMediaUnloading = store.subscribe(
        this.unloadAudioSubscription,
      );
    }
  };
}
