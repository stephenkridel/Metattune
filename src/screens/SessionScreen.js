import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
// import PlayMusic from '../modules/PreMixedAudio.js'

const SessionScreen = () => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Session Screen</Text>
            <TouchableOpacity onPress={() => 
                async function PlayMusic(soundAsset) {
                    const soundObject = new Audio.Sound();
                    try {
                        await soundObject.loadAsync(require('.../assets/nature.mp3'));
                        await soundObject.playAsync();
                    // Your sound is playing!
                    } catch (error) {
                        console.log('There was an error in playing the sound.');
                    }
                }} style={styles.Module}>
                <Text>Play Session</Text>
            </TouchableOpacity>
        </View>
    );
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
        height: 200,
        width: 200,
        backgroundColor: 'green',
        borderRadius: 100
    }
});

export default SessionScreen;
