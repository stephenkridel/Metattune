import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlayMusic from '../modules/PreMixedAudio';

const SessionScreen = () => {

    const source = require('../assets/nature.mp3');

    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Session Screen</Text>
            <TouchableOpacity onPress={() => PlayMusic(source)} style={styles.Module}>
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
