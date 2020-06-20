import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default class CustomSessionScreen extends Component {
    constructor(props) {
        super(props);

        // collects the file and title props from SessionModule.js
        const choices = this.props.navigation.getParam('choices');

        this.choices = choices;

        this.playbackInstance = [null, null, null, null, null];

        this.state = {
            isPlaying: false,
            hasPlayed: false,
            btnText: 'Play'
        };
    }

    async loadNewAudio() {
        for (var i = 0; i < 5; i++) {
            const soundObject = new Audio.Sound();
            try {
                await soundObject.loadAsync(this.choices[i].file);
                this.playbackInstance[i] = soundObject;
            } catch (error) {
                console.log('There was an error loading the sound');
            }
        }
    }

    onPlayPausePressed = () => {
        if (this.state.isPlaying) {
            try {
                for (var i = 0; i < 5; i++) {
                    this.playbackInstance[i].pauseAsync();
                }
                this.setState({
                    isPlaying: false,
                    btnText: 'Play'
                });
            } catch (error) {
                console.log('There was an error pausing the sound');
            }
        } else {
            try {
                for (var i = 0; i < 5; i++) {
                    this.playbackInstance[i].playAsync();
                }
                this.setState({
                    isPlaying: true,
                    btnText: 'Pause'
                });
            } catch (error) {
                console.log('There was an error playing the sound');
            }
        }
    };

    onStopPressed = () => {
        try {
            this.playbackInstance.stopAsync();
            this.setState({
                isPlaying: false,
                btnText: 'Play'
            });
        } catch (error) {
            console.log('There was an error stopping the sound');
        }
    };

    componentDidMount = () => {
        this.loadNewAudio();
    };

    /*
    componentWillUnmount = () => {
        for (var i = 0; i < 5; i++) {
            this.playbackInstance[i].unloadAsync();
        }
    };
    */

    render() {
        const colorStyles = {
            backgroundColor: 'grey'
        };
        return (
            <View style={styles.Hero}>
                <Text style={styles.HeroText}>Session Screen</Text>
                <View style={styles.Controls}>
                    <TouchableOpacity
                        onPress={() => {
                            this.onPlayPausePressed();
                        }}
                        style={[styles.Module, colorStyles]}
                    >
                        <Text>{this.state.btnText} Session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.onStopPressed();
                        }}
                        style={[styles.Module, colorStyles]}
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
    }
});
