import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Image,
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
  updateHasFinished,
} from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import ProgressComponent from '../components/ProgressComponent';
import UserStatistics from '../helpers/UserStatistics';
import CircularTimerComponent from '../components/CircularTimerComponent';
import LinearGradient from 'react-native-linear-gradient';

class SessionScreen extends Component {
  constructor(props) {
    super(props);
    // prevents changing state when the component is unmounted
    this._isMounted = false;
    const info = this.props.navigation.getParam('info');
    // destructuring info
    this.title = info.title;
    this.soundBitesString = info.soundBites;
    this.color = info.color;
    this.duration = info.duration;
    this.realisticImage = info.realisticImage;
    this.Session = new Session(this.title, this.soundBitesString);
    // using this variable to switch between icon families if needed
    this.iconFamily = AntDesign;
    this.unsubscribe = store.subscribe(this._handleSessionFinishing);

    this.state = {
      // used for the CircularTimerComponent
      timerIsRunning: true,
    };
  }

  _handleSessionFinishing = () => {
    if (this.props.playbackObject.statusDidJustFinish) {
      store.dispatch(updateDidJustFinish(false));
      store.dispatch(updateHasFinished(true));
      store.dispatch(updateBtnIcon('caretright'));
      store.dispatch(updateIsPlaying(false));
      this.Session.endSession();
      ErrorAPI.errorHandler(
        'Session was completed',
        `Congrats! You just completed the ${this.title} session.`,
      );
    }
  };

  _updateStatistics = async () => {
    if (this.Session.SoundBiteList) {
      if (this.Session.SoundBiteList.soundBiteArray) {
        const timer = this.Session.SoundBiteList.soundBiteArray[0].Timer;
        timer.pauseTimer();
        await UserStatistics.updateHoursCompleted(timer.totalTimePlayed);
        await UserStatistics.updateDayStreak();
        if (this.props.playbackObject.hasFinished) {
          await UserStatistics.updateCompletedSessions();
          await UserStatistics.updateFavoriteSession(this.title);
          store.dispatch(updateHasFinished(false));
        }
      }
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
      this.setState({ timerIsRunning: true });
    } else {
      this.Session.playSession();
      store.dispatch(updateBtnIcon('pause'));
      store.dispatch(updateIsPlaying(true));
      this.setState({ timerIsRunning: false });
    }
  };

  _loadAudio = async () => {
    await this.Session.loadSession();
    store.dispatch(updateHasLoaded(true));
    store.dispatch(updateBtnIcon('caretright'));
    console.log('*** APP THINKS IT IS DONE ***');
    console.log(this.props.playbackObject.hasFinished);
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
                style={{ marginLeft: Platform.OS === 'ios' ? '3%' : 0 }}
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
            duration={this.duration}
            timerIsRunning={this.state.timerIsRunning}
          />
        </View>
        <ProgressComponent messageText={this.props.progress.messageText} />
      </View>
    );
  }
}
/*
<CircularTimerComponent
style={styles.Timer}
duration={this.duration}
/>
*/
const styles = StyleSheet.create({
  Hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeroText: {
    marginBottom: 30,
    fontSize: 35,
    color: 'white',
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
