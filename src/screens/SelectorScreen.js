import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SessionModule from '../components/SessionModule';
import AudioObjects from '../data/AudioObjects.js';

// returns info as an object that contains the list premixedAudioList
const info = AudioObjects();

const SelectorScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Module Screen</Text>
            <View style={styles.List}>
                <FlatList
                    data={info.premixedAudioList}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => {
                        return (
                            <SessionModule
                                // passes info (.title, .file, .color) to the SessionModule component
                                info={item}
                            />
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        marginTop: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    HeroText: {
        marginBottom: 20,
        fontSize: 40
    }
});

export default SelectorScreen;
