import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';

// returns info as an object that contains the list premixedAudioList
const info = AudioObjects();

const SelectorScreen = () => {
	return (
		<SafeAreaView>
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
		</SafeAreaView>
	);
};

export default SelectorScreen;
