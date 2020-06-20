import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import SessionModule from '../components/SessionModule';
import CustomSessionModule from '../components/CustomSessionModule';
import AudioObjects from '../data/AudioObjects.js';

// returns two lists: premixedAudioList and singleAudioList that contain the audio objects
const info = AudioObjects();

const SelectorScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.HeroText}>Module Screen</Text>
            <Text>Premixed Sessions</Text>
            <>
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
                <Text>Custom Sessions</Text>
                <CustomSessionModule info={info.singleAudioList} />
            </>
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
