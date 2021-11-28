import { Audio } from 'expo-av';
import { updateDidJustFinish } from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import store from '../store/Store';

export default class Media {
  constructor(source, isDownloaded, isMainAudio) {
    this.source = source;
    this.isDownloaded = isDownloaded;
    this.isMainAudio = isMainAudio;
    this.playbackInstance = null;

    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
    });
  }

  _onPlaybackStatusUpdate = status => {
    if (status.didJustFinish) {
      store.dispatch(updateDidJustFinish(true));
    }
  };

  loadMedia = async () => {
    // let mediaSource = this.isDownloaded ? this.source : { uri: this.source };
    try {
      let statusUpdate = this.isMainAudio ? this._onPlaybackStatusUpdate : null;
      let mediaSource = { uri: this.source };
      const { sound, status } = await Audio.Sound.createAsync(
        mediaSource,
        {},
        statusUpdate,
      );
      this.playbackInstance = sound;
    } catch (error) {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error loading the audio. Please check your internet connect, and try closing and reopening the app.',
      );
    }
  };

  playMedia = async () => {
    try {
      if (this.playbackInstance) {
        await this.playbackInstance.playAsync();
      }
    } catch (error) {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error playing the audio. Please close the app and try again.',
      );
    }
  };

  pauseMedia = async () => {
    if (this.playbackInstance) {
      await this.playbackInstance.pauseAsync();
    }
  };

  stopMedia = async () => {
    if (this.playbackInstance) {
      await this.playbackInstance.stopAsync();
    }
  };

  unloadMedia = async () => {
    if (this.playbackInstance) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance = null;
    }
  };
}
