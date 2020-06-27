import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import AudioObjects from '../data/AudioObjects.js';
import { Picker } from '@react-native-community/picker';

// returns two lists: premixedAudioList and singleAudioList that contain the audio objects
const info = AudioObjects().singleAudioList;

export default class PickerScreen extends Component {
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.state = {
            choice1: info[0],
            choice2: info[0],
            choice3: info[0],
            choice4: info[0],
            choice5: info[0]
        };

        this.choices = [
            this.state.choice1,
            this.state.choice2,
            this.state.choice3,
            this.state.choice4,
            this.state.choice5
        ];
    }

    render() {
        return (
            <View style={styles.Hero}>
                <Text style={styles.HeroText}>Picker Screen</Text>
                <Picker
                    selectedValue={this.state.choice1}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => {
                        this.setState({
                            choice1: itemValue
                        });
                    }}
                >
                    {info.map(element => {
                        return (
                            <Picker.Item
                                key={element.title}
                                label={element.title}
                                value={element}
                            />
                        );
                    })}
                </Picker>
                <Picker
                    selectedValue={this.state.choice2}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => {
                        this.setState({
                            choice2: itemValue
                        });
                    }}
                >
                    {info.map(element => {
                        return (
                            <Picker.Item
                                key={element.title}
                                label={element.title}
                                value={element}
                            />
                        );
                    })}
                </Picker>
                <Picker
                    selectedValue={this.state.choice3}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => {
                        this.setState({
                            choice3: itemValue
                        });
                    }}
                >
                    {info.map(element => {
                        return (
                            <Picker.Item
                                key={element.title}
                                label={element.title}
                                value={element}
                            />
                        );
                    })}
                </Picker>
                <Picker
                    selectedValue={this.state.choice4}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => {
                        this.setState({
                            choice4: itemValue
                        });
                    }}
                >
                    {info.map(element => {
                        return (
                            <Picker.Item
                                key={element.title}
                                label={element.title}
                                value={element}
                            />
                        );
                    })}
                </Picker>
                <Picker
                    selectedValue={this.state.choice5}
                    style={{ height: 50, width: 200 }}
                    onValueChange={itemValue => {
                        this.setState({
                            choice5: itemValue
                        });
                    }}
                >
                    {info.map(element => {
                        return (
                            <Picker.Item
                                key={element.title}
                                label={element.title}
                                value={element}
                            />
                        );
                    })}
                </Picker>

                <Button
                    title='Load Session'
                    onPress={() =>
                        this.navigation.navigate('Custom', {
                            choices: this.choices
                        })
                    }
                />
            </View>
        );
    }
}

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
