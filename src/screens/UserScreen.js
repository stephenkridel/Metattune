import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class UserScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			hoursCompleted: null,
			sessionsCompleted: null
		};
	}

	_signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Auth');
	};

	_getUserData = async () => {
		try {
			const retrievedItem = await AsyncStorage.getItem('userToken');
			const item = JSON.parse(retrievedItem);
			if (item !== null) {
				this.setState({
					userName: item.userName,
					hoursCompleted: item.hoursCompleted,
					sessionsCompleted: item.sessionsCompleted
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		this._getUserData();
	}

	render() {
		return (
			<View style={styles.Container}>
				<Text style={styles.GreetingText}>
					{`Hello, ${this.state.userName}!`}
				</Text>
				<Text style={styles.GreetingText}>
					{`Your total hours listened is: ${this.state.hoursCompleted}`}
				</Text>
				<Text style={styles.GreetingText}>
					{`Your total sessions completed is: ${this.state.sessionsCompleted}`}
				</Text>
				<TouchableOpacity
					style={styles.SignOutButton}
					onPress={() => this._signOutAsync()}
				>
					<Text style={styles.SignOutText}>Sign Out</Text>
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
	SignOutButton: {
		height: 35,
		width: '25%',
		backgroundColor: 'black',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	SignOutText: {
		color: 'white',
		fontSize: 15
	},
	GreetingText: {
		fontSize: 20,
		marginBottom: 20
	}
});
