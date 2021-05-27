import SoundBiteList from './SoundBiteList';
import MainAudio from './MainAudio';

export default class Session {
  constructor(name, soundBites) {
    this.name = name;
    this.soundBites = soundBites;

    this.MainAudio = new MainAudio(this.name);
    this.SoundBiteList = new SoundBiteList(this.soundBites);
  }

  loadSession = async () => {
    console.log('Loading Session...');
    this.MainAudio.onStateChange = this.onStateChange;
    await this.MainAudio.setupAudioElement();
    if (this.soundBites != null) {
      await this.SoundBiteList.setupSoundBites();
    }
  };

  playSession = () => {
    console.log('Playing Session...');
    this.MainAudio.Media.playMedia();
    if (this.soundBites != null) {
      this.SoundBiteList.startSoundBites();
    }
  };

  pauseSession = () => {
    this.MainAudio.Media.pauseMedia();
    if (this.soundBites != null) {
      this.SoundBiteList.pauseSoundBites();
    }
  };

  endSession = () => {
    this.MainAudio.Media.stopMedia();
    if (this.soundBites != null) {
      this.SoundBiteList.stopSoundBites();
    }
  };

  unloadSession = () => {
    this.MainAudio.Media.unloadMedia();
    if (this.soundBites != null) {
      this.SoundBiteList.unloadSoundBites();
    }
  };
}
