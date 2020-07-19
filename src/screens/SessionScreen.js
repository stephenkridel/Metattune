import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    YellowBox,
    AppState
} from 'react-native';
import { Audio } from 'expo-av';
import {
    randomizeSoundBites,
    loadSoundBiteAudio,
    setupTimers
} from '../helpers/SoundBitesAndTimers.js';

export default class SessionScreen extends Component {
    constructor(props) {
        super(props);

        // collects the file and title props from SessionModule.js
        const info = this.props.navigation.getParam('info');

        this.title = info.title;
        this.color = info.color;
        this.source = info.file;
        this.soundBites = info.soundBites;

        this.playbackInstance = null;

        this.colorStyles = {
            backgroundColor: this.color
        };

        this.timerInstances = null;

        this.state = {
            isPlaying: false,
            hasPlayed: false,
            btnText: 'Play',
            hasLoaded: false,
            errorMsg: 'Hello',
            isError: false,
            AppState: AppState.currentState
        };

        // Ignoring a warning for long timers (RN error 12981)
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    soundBiteTimerSetup = async array => {
        const randomizedArray = await randomizeSoundBites(array);
        const loadedSoundArray = await loadSoundBiteAudio(randomizedArray);
        const timersArray = await setupTimers(loadedSoundArray);

        return timersArray;
    };

    loadNewAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(this.source);
            this.timerInstances = await this.soundBiteTimerSetup(
                this.soundBites
            );
            //loadedSoundObject, this.timerInstances] = Promise.all([
            //    soundObject.loadAsync(this.source),
            //    soundBiteTimerSetup(this.soundBites)
            //]);
            this.playbackInstance = soundObject;
            this.setState({ hasLoaded: true });
        } catch (error) {
            this.setState({
                errorMsg: 'Sorry, there was an error loading the audio',
                isError: true
            });
        }
    };

    onPlayPausePressed = async () => {
        if (this.state.isPlaying) {
            try {
                await this.playbackInstance.pauseAsync();
                this.timerInstances.forEach(element => element.pause());
                this.setState({
                    isPlaying: false,
                    btnText: 'Play'
                });
            } catch (error) {
                this.setState({
                    errorMsg: 'Sorry, there was an error pausing the audio',
                    isError: true
                });
            }
        } else {
            try {
                await this.playbackInstance.playAsync();
                this.timerInstances.forEach(element => element.start());
                this.setState({
                    isPlaying: true,
                    btnText: 'Pause'
                });
            } catch (error) {
                this.setState({
                    errorMsg: 'Sorry, there was an error playing the audio',
                    isError: true
                });
            }
        }
    };

    onStopPressed = async () => {
        try {
            await this.playbackInstance.stopAsync();
            this.timerInstances.forEach(element => element.stop());
            this.setState({
                isPlaying: false,
                btnText: 'Play'
            });
        } catch (error) {
            this.setState({
                errorMsg: 'Sorry, there was an error stopping the audio',
                isError: true
            });
        }
    };

    componentDidMount = () => {
        this.loadNewAudio();
        // listens for the app to go into background or foreground and then
        // runs onPlayPausePressed. This keeps the timers running on time
        AppState.addEventListener('change', this.onPlayPausePressed);
    };

    componentWillUnmount = async () => {
        try {
            if (this.playbackInstance != null) {
                await this.playbackInstance.unloadAsync();
                this.playbackInstance = null;
            }
        } catch (error) {
            this.setState({
                errorMsg:
                    'Sorry, we experienced an error. This may cause future problems. If it does, close out of the app completely and reload it.',
                isError: true
            });
        }

        AppState.removeEventListener('change', this.onPlayPausePressed);
    };

    render() {
        return (
            <View style={styles.Hero}>
                <Modal visible={this.state.isError} animationType='slide'>
                    <TouchableOpacity
                        style={styles.ModalClose}
                        onPress={() => {
                            this.setState({ isError: false });
                        }}
                    >
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <View style={styles.Modal}>
                        <Text style={styles.ModalText}>
                            {this.state.errorMsg}
                        </Text>
                    </View>
                </Modal>
                <Text style={styles.HeroText}>{this.title} Session Screen</Text>
                <View style={styles.Controls}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onPlayPausePressed();
                        }}
                        // disables the button if the audio hasn't loaded
                        disabled={this.state.hasLoaded ? false : true}
                        style={[styles.Module, this.colorStyles]}
                    >
                        <Text>{this.state.btnText} Session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.onStopPressed();
                        }}
                        // disables the button if the audio hasn't loaded
                        disabled={this.state.hasLoaded ? false : true}
                        style={[styles.Module, this.colorStyles]}
                    >
                        <Text>Stop Session</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Hero: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    HeroText: {
        marginBottom: 20
    },
    Module: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 100,
        borderRadius: 50
    },
    Controls: {
        height: 100,
        width: 225,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Modal: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ModalText: {
        fontSize: 40
    },
    ModalClose: {
        marginTop: 30,
        marginRight: 30,
        fontSize: 15,
        alignSelf: 'flex-end'
    }
});
