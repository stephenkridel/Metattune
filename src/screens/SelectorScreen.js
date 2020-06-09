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
                <FlatList
                    data={info.premixedAudioList}
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => {
                        return (
                            <SessionModule 
                                // passes title and file to the SessionModule component
                                title={item.title}
                                file={item.file}
                            />
                        );
                    }}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        alignSelf: 'center'
    },
    HeroText: {
        marginBottom: 20
    }
});

export default SelectorScreen;
