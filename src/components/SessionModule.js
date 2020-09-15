import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    View,
    Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

const SelectorModule = props => {
    return (
        <View style={styles.Container}>
            <Text style={styles.ListText}>{props.info.title}</Text>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity
                    // navigates to the SessionScreen passing info (.title, .file, and .color) to SessionScreen.js
                    onPress={() =>
                        props.navigation.navigate('Session', {
                            info: props.info
                        })
                    }
                    style={styles.Button}
                >
                    <AntDesign
                        name='arrowright'
                        size={20}
                        style={styles.Icon}
                    />
                </TouchableOpacity>
            </View>
            <Image source={props.info.image} style={styles.Image} />
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        width: Dimensions.get('window').width,
        height: 150,
        alignItems: 'center',
        marginBottom: 20,
        // if you want different colors use -> props.info.color
        backgroundColor: 'white'
    },
    ListText: {
        fontSize: 25,
        marginLeft: 40,
        alignSelf: 'flex-start'
    },
    ButtonContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'black',
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft: 40
    },
    Image: {
        height: 120,
        width: 120,
        position: 'absolute',
        right: 40,
        top: 5
    },
    Icon: {
        color: 'white',
        position: 'absolute',
        top: 15,
        left: 15
    },
    Button: {
        height: 50,
        width: 50
    }
});

export default withNavigation(SelectorModule);
