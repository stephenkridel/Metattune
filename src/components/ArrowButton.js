import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

const ArrowButton = props => {
	return (
		<TouchableOpacity
			// navigates to the SessionScreen passing info (.title, .file, and .color) to SessionScreen.js
			onPress={() =>
				props.navigation.navigate(props.screen, {
					info: props.info
				})
			}
			style={styles.Button}
			disabled={props.disable}
		>
			<AntDesign name={props.direction} size={20} style={styles.Icon} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	Icon: {
		color: 'white',
		position: 'absolute',
		top: 15,
		left: 15
	},
	Button: {
		height: 50,
		width: 50,
		borderRadius: 50,
		backgroundColor: 'black'
	}
});

export default withNavigation(ArrowButton);
