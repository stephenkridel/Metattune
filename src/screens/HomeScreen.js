import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = props => {
    return (
        <View style={styles.Hero}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Module Selector"
                onPress={() => props.navigation.navigate('Selector')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    Hero: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    }
});

export default HomeScreen;
