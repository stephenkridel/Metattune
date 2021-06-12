import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Session from '../classes/Session';
import ModalComponent from '../components/ModalComponent';
import BackgroundTimer from 'react-native-background-timer';
import { connect } from 'react-redux';
import store from '../store/Store';
import {
  resetPlaybackObject,
  updateBtnIcon,
  updateDidJustFinish,
  updateHasLoaded,
  updateHasStarted,
  updateIsPlaying,
} from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';

class SessionScreen extends Component {
  constructor(props) {
    super(props);
    // prevents changing state when the component is unmounted
    this._isMounted = false;
    // collects the file and title props from SelectorModule.js
    const info = this.props.navigation.getParam('info');
    // destructuring info
    this.title = info.title;
    this.soundBitesString = info.soundBites;
    this.Session = new Session(this.title, this.soundBitesString);
    // using this variable to switch between icon families if needed
    this.iconFamily = AntDesign;
    this.unsubscribe = store.subscribe(this._handleSessionFinishing);
  }

  _handleSessionFinishing = () => {
    if (this.props.playbackObject.statusDidJustFinish) {
      store.dispatch(updateDidJustFinish(false));
      store.dispatch(updateBtnIcon('caretright'));
      store.dispatch(updateIsPlaying(false));
      this._updateCompletedSessions();
      this.Session.endSession();
      ErrorAPI.errorHandler(
        'Session was completed',
        `Congrats! You just completed the ${this.title} session.`,
      );
    }
  };

  _updateHoursCompleted = async () => {
    const userData = await AsyncStorageAPI.getItem('userToken');
    if (userData && this.Session.SoundBiteList) {
      if (this.Session.SoundBiteList.soundBiteArray) {
        const timer = this.Session.SoundBiteList.soundBiteArray[0].Timer;
        timer.pauseTimer();
        let totalTimePlayedFormatted =
          Math.round((timer.totalTimePlayed / 3600000) * 100) / 100;
        let newData = userData;
        if (totalTimePlayedFormatted < 0.5 && totalTimePlayedFormatted > 0) {
          newData.hoursCompleted += totalTimePlayedFormatted;
          await AsyncStorageAPI.saveItem('userToken', newData);
        }
      }
    }
  };

  _updateCompletedSessions = async () => {
    const userData = await AsyncStorageAPI.getItem('userToken');
    if (userData && this.Session.SoundBiteList) {
      let newData = userData;
      newData.sessionsCompleted += 1;
      await AsyncStorageAPI.saveItem('userToken', newData);
    }
  };

  _onPlayPausePressed = () => {
    if (!this.props.playbackObject.hasStarted) {
      BackgroundTimer.start();
      store.dispatch(updateHasStarted(true));
    }

    if (this.props.playbackObject.isPlaying) {
      this.Session.pauseSession();
      store.dispatch(updateBtnIcon('caretright'));
      store.dispatch(updateIsPlaying(false));
    } else {
      this.Session.playSession();
      store.dispatch(updateBtnIcon('pause'));
      store.dispatch(updateIsPlaying(true));
    }
  };

  _loadAudio = async () => {
    await this.Session.loadSession();
    store.dispatch(updateHasLoaded(true));
    console.log('*** APP THINKS IT IS DONE ***');
  };

  componentDidMount = () => {
    this._isMounted = true;
    store.dispatch(resetPlaybackObject());
    this._loadAudio();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    BackgroundTimer.stop();
    this.Session.endSession();
    this.Session.unloadSession();
    this.unsubscribe();
    this._updateHoursCompleted();
  };

  render() {
    return (
      <View style={styles.Hero}>
        <ModalComponent
          isVisible={this.props.error.isError}
          message={this.props.error.errorMsg}
          onPressX={() => {
            ErrorAPI.clearError();
            this.props.navigation.navigate('Selector');
          }}
          shouldShowButton={false}
        />
        <Text style={styles.HeroText}>{this.title}</Text>
        <TouchableOpacity
          onPress={() => {
            this._onPlayPausePressed();
          }}
          // disables the button if the audio hasn't loaded
          disabled={this.props.playbackObject.hasLoaded ? false : true}
          // for different colors -> style={[styles.Module, this.colorStyles]}
          style={styles.Module}>
          <View>
            <ActivityIndicator
              size="large"
              hidesWhenStopped={true}
              color="#FFFFFF"
              animating={this.props.playbackObject.hasLoaded ? false : true}
            />
            <this.iconFamily
              name={this.props.playbackObject.btnIcon}
              // you can use iconStyle = `{marginRight: #}` for margins
              style={
                this.props.playbackObject.hasLoaded
                  ? styles.ShowIcon
                  : styles.HideIcon
              }
              size={35}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeroText: {
    marginBottom: 30,
    fontSize: 35,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
  },
  Module: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: 'rgb(30, 27, 57)',
  },
  ShowIcon: {
    color: 'white',
    position: 'absolute',
  },
  HideIcon: {
    display: 'none',
  },
});

const mapStateToProps = state => {
  const { playbackObject, error } = state;
  return { playbackObject, error };
};

export default connect(mapStateToProps)(SessionScreen);
