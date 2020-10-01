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
		color: 'black',
		marginBottom: 70,
		fontFamily: 'sans-serif-thin'
	},
	Button: {
		height: 50,
		width: 50,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'black'
	},
	Image: {
		height: 256,
		width: 330,
		marginBottom: 20,
		marginTop: 125,
		marginBottom: 35
	}
});

export default HomeScreen;
