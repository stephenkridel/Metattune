import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import ArrowButton from './ArrowButton';

const SelectorComponent = props => {
	return (
		<View style={styles.Container}>
			<Text style={styles.ListText}>{props.info.title}</Text>
			<View style={styles.ButtonContainer}>
				<ArrowButton
					screen={'Session'}
					info={props.info}
					direction={'arrowright'}
					shouldShow={true}
				/>
			</View>
			<Image source={props.info.image} style={styles.Image} />
		</View>
	);
};

const styles = StyleSheet.create({
	Container: {
		// width: Dimensions.get('window').width,
		marginTop: 10,
		marginHorizontal: 20,
		height: 150,
		alignItems: 'center',
		marginBottom: 20,
		// if you want different colors use -> props.info.color
		backgroundColor: 'white',
		elevation: 10,
		borderRadius: 10,
		shadowColor: 'black',
		shadowOffset: {
			width: 10,
			height: 10
		},
		shadowOpacity: 0.75,
		shadowRadius: 5
	},
	ListText: {
		fontSize: 25,
		marginLeft: 40,
		marginTop: 10,
		alignSelf: 'flex-start',
		color: 'black',
		fontFamily: 'JosefinSans-Regular'
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
		top: 12
	}
});

export default SelectorComponent;
