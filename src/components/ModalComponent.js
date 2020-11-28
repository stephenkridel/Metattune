import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ModalComponent = props => {
	const shouldShowButton = props.shouldShowButton ? 'flex' : 'none';
	return (
		<Modal visible={props.isVisible} animationType='slide'>
			<TouchableOpacity
				style={{ marginTop: 30, marginRight: 30, alignSelf: 'flex-end' }}
				onPress={props.onPressX}
			>
				<AntDesign name='close' size={35} color='black' />
			</TouchableOpacity>
			<View style={styles.Modal}>
				<Text style={styles.ModalText}>{props.message}</Text>
				<TouchableOpacity
					style={[styles.DeleteButton, { display: shouldShowButton }]}
					onPress={props.onPressDelete}
				>
					<Text style={styles.DeleteButtonText}>Yes</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	Modal: {
		flex: 1,
		margin: 20,
		justifyContent: 'center'
	},
	ModalText: {
		fontSize: 40,
		color: 'black',
		fontFamily: 'sans-serif-light',
		marginBottom: '10%'
	},
	ModalClose: {
		marginTop: 30,
		marginRight: 30,
		alignSelf: 'flex-end'
	},
	DeleteButton: {
		width: '40%',
		height: '10%',
		backgroundColor: 'rgb(108, 99, 255)',
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center'
	},
	DeleteButtonText: {
		color: 'white',
		fontSize: 25,
		fontFamily: 'sans-serif-light'
	}
});

export default ModalComponent;
