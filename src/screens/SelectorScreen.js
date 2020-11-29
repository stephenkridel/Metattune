import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';

// returns info as an object that contains the list premixedAudioList
const info = AudioObjects();

const SelectorScreen = () => {
	return (
		<View style={styles.Hero}>
			<View>
				<FlatList
					data={info.premixedAudioList}
					keyExtractor={item => item.title}
					renderItem={({ item }) => {
						return (
							<SelectorComponent
								// passes info (.title, .file, .color) to the SelectorModule component
								info={item}
							/>
						);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	Hero: {
		marginTop: 20,
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		alignSelf: 'center',
		backgroundColor: 'white'
	}
});

export default SelectorScreen;
