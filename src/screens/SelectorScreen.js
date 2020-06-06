import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SessionModule from '../components/SessionModule';

const SelectorScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Module Screen</Text>
            <SessionModule title='Nature Session'/>
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
