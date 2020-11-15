import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ArrowButton from '../components/ArrowButton';

const AboutComponent = props => {
	return (
		<View style={styles.Hero}>
			<Image
				resizeMode='contain'
				source={props.image}
				style={styles.Image}
			/>
			<Text style={styles.Header}>{props.header}</Text>
			<Text style={styles.Text}>{props.text}</Text>
			<View style={styles.Controls}>
				<ArrowButton
					screen={props.prevScreen}
					direction={'arrowleft'}
					disable={props.disableLeft}
				/>
				<ArrowButton
					screen={props.nextScreen}
					direction={'arrowright'}
					disable={props.disableRight}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	Hero: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	Header: {
		fontSize: 30,
		marginBottom: 10,
		marginHorizontal: 10,
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'black'
	},
	Text: {
		fontSize: 20,
		marginBottom: 35,
		marginHorizontal: 10,
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'black',
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
		width: '80%',
		marginBottom: 10
	},
	Controls: {
		width: Dimensions.get('window').width,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
});

export default AboutComponent;
