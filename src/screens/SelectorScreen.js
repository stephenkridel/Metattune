import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SessionModule from '../components/SessionModule';
import AudioObjects from '../data/AudioObjects.js';

const info = AudioObjects();

const SelectorScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Module Screen</Text>
            <SessionModule 
                title={info.nature.title}
                file={info.nature.file}
            />
            <SessionModule 
                title={info.urban.title}
                file={info.nature.file}
            />
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
    }
});

export default SelectorScreen;
