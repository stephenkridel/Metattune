import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PlayMusic from '../modules/PreMixedAudio';

const SessionScreen = props => {

    const file = props.navigation.getParam('file');

    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Session Screen</Text>
            <View style={styles.Controls}>
                <TouchableOpacity onPress={() => PlayMusic(file)} style={styles.Module}>
                    <Text>Play Session</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => PlayMusic(file)} style={styles.Module}>
                    <Text>Stop Session</Text>
                </TouchableOpacity>
            </View>
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

export default SessionScreen;
