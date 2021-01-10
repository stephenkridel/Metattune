import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ModalComponent from '../components/ModalComponent';

export default class LoginScreen extends Component {
	constructor() {
		super();
		this.state = {
			inputText: '',
			isError: false,
			errorMsg: null
		};
	}

	_setUserToken = async value => {
		try {
			await AsyncStorage.setItem('userToken', JSON.stringify(value));
			this.props.navigation.navigate('User');
		} catch (error) {
			this.setState({
				isError: true,
				errorMsg: 'Sorry, an error has occurred. Please try closing and reopening the app.'
			});
			console.log(error);
		}
	};

	render() {
		return (
			<View style={styles.Container}>
				<ModalComponent
					isVisible={this.state.isError}
					message={this.state.errorMsg}
					onPressX={() => this.setState({ isError: false })}
					shouldShowButton={false}
				/>
				<Text style={styles.Header}>Create an Account</Text>
				<Text style={styles.SubHeader}>
					All we require is a name, and we don't store any information externally
				</Text>
				<TextInput
					style={styles.TextInput}
					onChangeText={text => this.setState({ inputText: text })}
					textAlign='center'
					placeholder='Name'
					placeholderTextColor='grey'
				/>
				<TouchableOpacity
					style={styles.SubmitButton}
					onPress={() => {
						if (this.state.inputText != null && this.state.inputText != '') {
							this._setUserToken({
								userName: this.state.inputText.trim(),
								hoursCompleted: 0,
								sessionsCompleted: 0
							});
						} else {
							this.setState({
								isError: true,
								errorMsg: 'Please enter a name to create an account'
							});
						}
					}}
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
	Header: {
		fontSize: 35,
		color: 'black',
		textAlign: 'center'
	},
	SubHeader: {
		fontSize: 17,
		color: 'black',
		fontFamily: 'OpenSans-Light',
		textAlign: 'left',
		marginBottom: 20,
		width: '75%'
	},
	TextInput: {
		color: 'black',
		height: 60,
		width: '75%',
		backgroundColor: 'transparent',
		borderColor: 'lightgrey',
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 10,
		marginVertical: 20,
		fontSize: 20,
		fontFamily: 'OpenSans-Light'
	},
	SubmitButton: {
		height: 50,
		width: '75%',
		backgroundColor: 'rgb(108, 99, 255)',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ButtonText: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'OpenSans-Light'
	}
});
