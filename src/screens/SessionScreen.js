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

export default class SessionScreen extends Component {
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

    // hasLoaded is different that status.isLoaded. Tells if everything
    // needed has loaded like soundBites and timers. isPlaying tells
    // if the user pressed the play button and wants the audio to play. Its
    // a safeguard against unforseen audio interuptions.
    this.state = {
      isPlaying: false,
      hasStarted: false,
      hasLoaded: false,
      btnIcon: 'caretright',
      errorMsg: null,
      isError: false,
      soundBiteGotPaused: false,
      pausedAt: null,
      userExists: false,
      completedSession: 0,
    };
  }

  _updateState = (option, optionalError, optionalMessage) => {
    switch (option) {
      case 'status':
        this.setState({ isPlaying: false, btnIcon: 'caretright' });
        this.Session.endSession();
        break;
      case 'error':
        this._errorHandler(optionalError, optionalMessage);
      default:
        break;
    }
  };

  _errorHandler = (error, message) => {
    this.setState({
      errorMsg: message,
      isError: true,
    });
    console.log(error);
  };

  _onPlayPausePressed = () => {
    if (!this.state.hasStarted) {
      BackgroundTimer.start();
      this.setState({ hasStarted: true });
    }

    this.state.isPlaying
      ? this.Session.pauseSession()
      : this.Session.playSession();

    this.state.isPlaying
      ? this.setState({ isPlaying: false, btnIcon: 'caretright' })
      : this.setState({ isPlaying: true, btnIcon: 'pause' });
  };

  _loadAudio = async () => {
    await this.Session.loadSession();
    console.log('*** APP THINKS IT IS DONE ***');
    this.setState({ hasLoaded: true });
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.Session.onStateChange = (option, optionalError, optionalMessage) => {
      this._updateState(option, optionalError, optionalMessage);
    };
    this._loadAudio();
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    BackgroundTimer.stop();
    this.Session.endSession();
    this.Session.unloadSession();
  };

  render() {
    return (
      <View style={styles.Hero}>
        <ModalComponent
          isVisible={this.state.isError}
          message={this.state.errorMsg}
          onPressX={() => this.setState({ isError: false })}
          shouldShowButton={false}
        />
        <Text style={styles.HeroText}>{this.title}</Text>
        <TouchableOpacity
          onPress={() => {
            this._onPlayPausePressed();
          }}
          // disables the button if the audio hasn't loaded
          disabled={this.state.hasLoaded ? false : true}
          // for different colors -> style={[styles.Module, this.colorStyles]}
          style={styles.Module}>
          <View>
            <ActivityIndicator
              size="large"
              hidesWhenStopped={true}
              color="#FFFFFF"
              animating={this.state.hasLoaded ? false : true}
            />
            <this.iconFamily
              name={this.state.btnIcon}
              // you can use iconStyle = `{marginRight: #}` for margins
              style={this.state.hasLoaded ? styles.ShowIcon : styles.HideIcon}
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
