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
import { connect } from 'react-redux';
import store from '../store/Store';
import { resetPlaybackObject } from '../actions/PlaybackObjectActions';
import ErrorAPI from '../helpers/ErrorAPI';
import ProgressComponent from '../components/ProgressComponent';
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
    this.unsubscribeSessionFinishing = store.subscribe(
      this._handleSessionFinishing,
    );
  }

  _handleSessionFinishing = () => {
    if (this.props.playbackObject.statusDidJustFinish)
      this.Session.handleSessionFinishing();
  };

  _onPlayPausePressed = () => {
    // a function is passed into the setState function so that the circular
    // timer stops or starts before all the other functions.
    if (this.props.playbackObject.isPlaying) {
      this.child.stopAnimationTimer();
      this.Session.pause();
    } else {
      this.child.startAnimationTimer();
      this.Session.play(!this.props.playbackObject.hasStarted);
    }
  };

  componentDidMount = async () => {
    this._isMounted = true;
    store.dispatch(resetPlaybackObject());
    await this.Session.load();
  };

  componentWillUnmount = () => {
    this.Session.updateStatistics(this.props.playbackObject.hasFinished);
    this._isMounted = false;
    this.Session.unload();
    this.unsubscribeSessionFinishing();
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
