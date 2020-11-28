import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginScreen extends Component {
	constructor() {
		super();
		this.state = {
			inputText: ''
		};
	}

	_setUserToken = async value => {
		try {
			await AsyncStorage.setItem('userToken', JSON.stringify(value));
			this.props.navigation.navigate('User');
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		return (
			<View style={styles.Container}>
				<TextInput
					style={styles.TextInput}
					onChangeText={text => this.setState({ inputText: text })}
					textAlign='center'
					placeholder='Name'
					placeholderTextColor='grey'
				/>
				<TouchableOpacity
					style={styles.SubmitButton}
					onPress={() =>
						this._setUserToken({
							userName: this.state.inputText,
							hoursCompleted: 0,
							sessionsCompleted: 0
						})
					}
				>
					<Text style={styles.ButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	TextInput: {
		height: 50,
		width: '75%',
		backgroundColor: 'lightgrey',
		borderRadius: 20,
		marginVertical: 20,
		fontSize: 20
	},
	SubmitButton: {
		height: 60,
		width: '40%',
		backgroundColor: 'rgb(108, 99, 255)',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ButtonText: {
		color: 'white',
		fontSize: 20
	}
});
