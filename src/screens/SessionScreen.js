import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default class SessionScreen extends Component {
    constructor(props) {
        super(props);

        // collects the file and title props from SessionModule.js
        const info = this.props.navigation.getParam('info');

        this.title = info.title;
        this.color = info.color;
        this.source = info.file;
        this.playbackInstance = null;

        this.state = {
            isPlaying: false,
            hasPlayed: false,
            btnText: 'Play'
        };
    }

    async loadNewAudio() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(this.source);
            this.playbackInstance = soundObject;
        } catch (error) {
            console.log('There was an error loading the sound');
        }
    }

    onPlayPausePressed = () => {
        if (this.state.isPlaying) {
            try {
                this.playbackInstance.pauseAsync();
                this.setState({
                    isPlaying: false,
                    btnText: 'Play'
                });
            } catch (error) {
                console.log('There was an error pausing the sound');
            }
        } else {
            try {
                this.playbackInstance.playAsync();
                this.setState({
                    isPlaying: true,
                    btnText: 'Pause'
                });
                console.log('Playing sound');
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

    componentWillUnmount = () => {
        this.playbackInstance.unloadAsync();
    };

    render() {
        const colorStyles = {
            backgroundColor: this.color
        };
        return (
            <View style={styles.Hero}>
                <Text style={styles.HeroText}>{this.title} Session Screen</Text>
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
