import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

const SelectorModule = props => {
    return (
        <TouchableOpacity
            // navigates to the SessionScreen passing info (.title, .file, and .color) to SessionScreen.js
            onPress={() =>
                props.navigation.navigate('Session', {
                    info: props.info
                })
            }
            style={{
                width: Dimensions.get('window').width,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                backgroundColor: props.info.color
            }}
        >
            <Text style={styles.ListText}>{props.info.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ListText: {
        fontSize: 30
    }
});

export default withNavigation(SelectorModule);
