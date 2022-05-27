import { Audio } from 'expo-av';
import { updateDidJustFinish } from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import store from '../store/Store';

export default class Media {
  constructor(source) {
    this.source = source;
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

  load = async () => {
    try {
      let mediaSource = { uri: this.source };
      const { sound, status } = await Audio.Sound.createAsync(
        mediaSource,
        {},
        this._onPlaybackStatusUpdate,
      );
      this.playbackInstance = sound;
    } catch (error) {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error loading the audio. Please check your internet connection, and try closing and reopening the app.',
      );
    }
  };

  play = () => {
    this.playbackInstance.playAsync().catch(error => {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error playing the audio. Please close the app and try again.',
      );
    });
  };

  pause = () => {
    this.playbackInstance.pauseAsync().catch(error => {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error pause the audio. Please close the app and try again.',
      );
    });
  };

  stop = () => {
    this.playbackInstance.stopAsync().catch(error => {
      ErrorAPI.errorHandler(
        error,
        'Sorry, there was an error stopping the audio. Please close the app and try again.',
      );
    });
  };

  unload = () => {
    this.playbackInstance
      .unloadAsync()
      .then(() => (this.playbackInstance = null))
      .catch(error => {
        ErrorAPI.errorHandler(
          error,
          'Sorry, there was an error unloading the audio. Please close the app and try again.',
        );
      });
  };
}
