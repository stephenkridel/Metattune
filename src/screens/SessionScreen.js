import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlayMusic from '../modules/PreMixedAudio';

const SessionScreen = props => {

    const file = props.navigation.getParam('file');

    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Session Screen</Text>
            <TouchableOpacity onPress={() => PlayMusic(file)} style={styles.Module}>
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
