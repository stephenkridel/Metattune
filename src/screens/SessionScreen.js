import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  updateHasFinished,
} from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import ProgressComponent from '../components/ProgressComponent';
import UserStatistics from '../helpers/UserStatistics';
import CircularTimerComponent from '../components/CircularTimerComponent';

class SessionScreen extends Component {
  constructor(props) {
    super(props);
    // prevents changing state when the component is unmounted
    this._isMounted = false;
    const { info } = props.route.params;
    // destructuring info
    this.title = info.title;
    this.soundBitesString = info.soundBites;
    this.color = info.color;
    this.duration = info.duration;
    this.Session = new Session(this.title, this.soundBitesString);
    // using this variable to switch between icon families if needed
    this.iconFamily = AntDesign;
    this.unsubscribe = store.subscribe(this._handleSessionFinishing);
  }

  _handleSessionFinishing = () => {
    if (this.props.playbackObject.statusDidJustFinish) {
      console.log('_handleSessionFinishing');
      store.dispatch(updateDidJustFinish(false));
      store.dispatch(updateHasFinished(true));
      store.dispatch(updateBtnIcon('caretright'));
      store.dispatch(updateIsPlaying(false));
      this.Session.end();
      ErrorAPI.errorHandler(
        'Session was completed',
        `Congrats! You just completed the ${this.title} session.`,
      );
    }
  };

  _updateStatistics = async () => {
    if (this.Session.SoundBiteList) {
      const timer = this.Session.SoundBiteList.objectArray[0].Timer;
      timer.pause();
      await UserStatistics.updateHoursCompleted(timer.totalTimePlayed);
      await UserStatistics.updateDayStreak();
      if (this.props.playbackObject.hasFinished) {
        await UserStatistics.updateCompletedSessions();
        await UserStatistics.updateFavoriteSession(this.title);
        store.dispatch(updateHasFinished(false));
      }
    }
  };

  _onPlayPausePressed = () => {
    if (!this.props.playbackObject.hasStarted) {
      BackgroundTimer.start();
      store.dispatch(updateHasStarted(true));
    }

    // a function is passed into the setState function so that the circular
    // timer stops or starts before all the other functions.
    if (this.props.playbackObject.isPlaying) {
      this.child.stopAnimationTimer();
      this.Session.pause();
      store.dispatch(updateBtnIcon('caretright'));
      store.dispatch(updateIsPlaying(false));
    } else {
      this.child.startAnimationTimer();
      this.Session.play();
      store.dispatch(updateBtnIcon('pause'));
      store.dispatch(updateIsPlaying(true));
    }
  };

  _loadAudio = async () => {
    await this.Session.load();
    store.dispatch(updateHasLoaded(true));
    store.dispatch(updateBtnIcon('caretright'));
    console.log('Finished Loading');
  };

  componentDidMount = () => {
    this._isMounted = true;
    store.dispatch(resetPlaybackObject());
    this._loadAudio();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    BackgroundTimer.stop();
    this.Session.unload();
    this.unsubscribe();
    this._updateStatistics();
  };

  render() {
    return (
      <View style={[styles.Hero, { backgroundColor: this.color }]}>
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
        <View style={styles.ButtonAndTimer}>
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
                // activity indicator on ios was placed weird. probably buggy
                style={{
                  left: Platform.OS === 'ios' ? '2%' : 0,
                  top: Platform.OS === 'ios' ? '2.5%' : 0,
                }}
              />
              <this.iconFamily
                name={this.props.playbackObject.btnIcon}
                // you can use iconStyle = `{marginRight: #}` for marginss
                style={
                  this.props.playbackObject.hasLoaded
                    ? styles.ShowIcon
                    : styles.HideIcon
                }
                size={35}
              />
            </View>
          </TouchableOpacity>
          <CircularTimerComponent
            ref={child => {
              this.child = child;
            }}
            duration={this.duration}
          />
        </View>
        <ProgressComponent messageText={this.props.progress.messageText} />
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
    marginBottom: 25,
    fontSize: 35,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    lineHeight: 40,
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
  ButtonAndTimer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  const { playbackObject, error, progress } = state;
  return { playbackObject, error, progress };
};

export default connect(mapStateToProps)(SessionScreen);
