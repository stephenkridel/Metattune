import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const SelectorModule = props => {
    return (
        <TouchableOpacity 
            onPress={() => props.navigation.navigate('Session', {
                title: props.title,
                file: props.file
            })} 
            style={styles.Module}
        >
            <Text>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    Module: {
        alignItems: 'center', 
        justifyContent: 'center',
        height: 200,
        width: 200,
        backgroundColor: 'green',
        borderRadius: 20,
        marginBottom: 20
    }
});

export default withNavigation(SelectorModule);
