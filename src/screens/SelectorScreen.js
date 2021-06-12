import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';
import SplashScreen from 'react-native-splash-screen';

// returns info as an object that contains the list premixedAudioList
// this is the starting point for the info object
const info = AudioObjects();

const SelectorScreen = () => {
  // closing the splash screen when this screen loads
  React.useEffect(() => {
    SplashScreen.hide();
  });
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
