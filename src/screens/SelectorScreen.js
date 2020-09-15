import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SessionModule from '../components/SessionModule';
import AudioObjects from '../data/AudioObjects.js';

// returns info as an object that contains the list premixedAudioList
const info = AudioObjects();

const SelectorScreen = () => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Explore</Text>
            <View>
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
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    HeroText: {
        marginBottom: 20,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: 'bold'
    }
});

export default SelectorScreen;
