import { Audio } from 'expo-av';

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
      this.onStateChange('status');
    }
  };

  _onError = (error, errorMsg) => {
    this.onStateChange('error', errorMsg, error);
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
      this._onError(error, 'Sorry, there was an error loading the audio');
    }
  };

  playMedia = async () => {
    try {
      await this.playbackInstance.playAsync();
    } catch (error) {
      this._onError(error, 'Sorry, there was an error playing the audio');
    }
  };

  pauseMedia = async () => {
    await this.playbackInstance.pauseAsync();
  };

  stopMedia = async () => {
    await this.playbackInstance.stopAsync();
  };

  unloadMedia = async () => {
    await this.playbackInstance.unloadAsync();
    this.playbackInstance = null;
  };
}
