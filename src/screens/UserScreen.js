import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import ModalComponent from '../components/ModalComponent';

export default class UserScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			hoursCompleted: 0,
			sessionsCompleted: 0,
			showWarning: false
		};
	}

	_deleteAccountAsync = async () => {
		try {
			await AsyncStorage.clear();
			this.props.navigation.navigate('Auth');
		} catch (error) {
			console.log(error);
		}
	};

	_getUserToken = async () => {
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
		this._getUserToken();
	}

	render() {
		return (
			<>
				<NavigationEvents onDidFocus={() => this._getUserToken()} />
				<ModalComponent
					isVisible={this.state.showWarning}
					onPressX={() => this.setState({ showWarning: false })}
					onPressDelete={() => {
						this._deleteAccountAsync();
					}}
					message='Are you sure you want to delete your account?'
					shouldShowButton={true}
				/>
				<View style={styles.Container}>
					<Text style={styles.GreetingText}>{`Hello, ${this.state.userName}!`}</Text>
					<Text style={styles.SubHeader}>we tracked your statistics for you</Text>
					<View style={styles.StatisticsContainer}>
						<Text style={styles.StatisticText}>Hours Listened:</Text>
						<Text style={styles.StatisticNumber}>{this.state.hoursCompleted}</Text>
					</View>
					<View style={styles.StatisticsContainer}>
						<Text style={styles.StatisticText}>Sessions Completed:</Text>
						<Text style={styles.StatisticNumber}>{this.state.sessionsCompleted}</Text>
					</View>
					<TouchableOpacity
						style={styles.TrashButton}
						onPress={() => this.setState({ showWarning: true })}
					>
						<FontAwesome name='trash-o' size={40} color='rgb(108, 99, 255)' />
					</TouchableOpacity>
				</View>
			</>
		);
	}
}

const styles = StyleSheet.create({
	Container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'center'
	},
	TrashButton: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	GreetingText: {
		position: 'absolute',
		top: 0,
		fontSize: 30,
		color: 'black',
		marginTop: '15%',
		marginLeft: '5%',
		fontFamily: 'OpenSans-Regular'
	},
	SubHeader: {
		position: 'absolute',
		top: 0,
		fontSize: 17.5,
		color: 'black',
		marginTop: '30%',
		marginLeft: '5%',
		fontFamily: 'OpenSans-Light'
	},
	StatisticText: {
		fontSize: 25,
		marginBottom: 20,
		color: 'black',
		textAlign: 'center',
		fontFamily: 'OpenSans-Light'
	},
	StatisticNumber: {
		fontSize: 25,
		color: 'white',
		backgroundColor: 'rgb(108, 99, 255)',
		padding: 10,
		textAlign: 'center',
		fontFamily: 'OpenSans-Light',
		borderRadius: 100,
		width: '45%'
	},
	StatisticsContainer: {
		height: '20%',
		marginTop: '10%',
		alignSelf: 'center',
		alignItems: 'center',
		width: '100%'
	}
});
