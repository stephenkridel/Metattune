import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ArrowButton from '../components/ArrowButton';

const HomeScreen = props => {
    return (
        <View style={styles.Hero}>
            <Image
                source={require('../assets/home.png')}
                style={styles.Image}
            />
            <Text style={styles.Header}>The Attention Training App</Text>
            <Text style={styles.SubHeader}>
                ATT is a research-backed method that guides you to focus on
                sounds around you. An ATT session takes only 10-15 minutes.
            </Text>
            <ArrowButton screen={'Selector'} />
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        flex: 1,
        alignItems: 'center'
    },
    Header: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'black'
    },
    SubHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40,
        color: 'black',
        marginHorizontal: 40
    },
    Button: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    ButtonText: {
        fontSize: 18
    },
    Image: {
        height: 256,
        width: 330,
        marginBottom: 20,
        marginTop: 50,
        marginBottom: 35
    }
});

export default HomeScreen;
