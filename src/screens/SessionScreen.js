import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default class SessionScreen extends Component {
    constructor(props) {
        super(props);
        const file = this.props.navigation.getParam('file');
        this.source = file;
        this.playbackInstance = null;
        this.state = {
            isPlaying: false,
            hasPlayed: false,
            btnText: 'Play'
        };
    };

    async loadNewAudio() {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(this.source);
        } catch (error) {
            console.log('There was an error loading the sound');
        }
        this.playbackInstance = soundObject;
    };

    onPlayPausedPressed = () => {
        if (this.state.isPlaying) {
            try {
                this.playbackInstance.pauseAsync();
            } catch (error) {
                console.log('There was an error pausing the sound');
            }
            this.state.isPlaying = false;
            this.state.btnText = 'Play';
        } else {
            try {
                this.playbackInstance.playAsync();
            } catch (error) {
                console.log('There was an error playing the sound');
            }
            this.state.isPlaying = true;
            this.state.btnText = 'Pause';
        }
    };

    onStopPressed = () => {
        if (this.state.isPlaying) {
            try {
                this.playbackInstance.stopAsync();
            } catch (error) {
                console.log('There was an error stopping the sound');
            }
            this.state.isPlaying = false;
        }
    };
    
    componentDidMount = () => {
        this.loadNewAudio();
    };

    componentWillUnmount = () => {
        this.playbackInstance.unloadAsync();
    };

    render() {
        return (
            <View style={styles.Hero}>
                <Text style={styles.HeroText}>Session Screen</Text>
                <View style={styles.Controls}>
                    <TouchableOpacity 
                        onPress={() => {
                            this.onPlayPausedPressed();
                        }} 
                        style={styles.Module}>
                        <Text>{this.state.btnText} Session</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => {
                            this.onStopPressed();
                        }}
                        style={styles.Module}>
                        <Text>Stop Session</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

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
        backgroundColor: 'green',
        borderRadius: 50
    },
    Controls: {
        height: 100,
        width: 225,
        flexDirection: 'row',
        justifyContent: "space-between"
    }
});
