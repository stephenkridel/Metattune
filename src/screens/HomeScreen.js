import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text style={styles.Text}>ATT App</Text>
            <TouchableOpacity
                style={styles.Button}
                title='Go to Module Selector'
                onPress={() => props.navigation.navigate('Selector')}
            >
                <Text style={styles.ButtonText}>Go to Session Options</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'pink'
    },
    Text: {
        fontSize: 60,
        marginBottom: 50,
        color: 'white'
    },
    Button: {
        height: 100,
        width: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    ButtonText: {
        fontSize: 18
    }
});

export default HomeScreen;
