import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';
import SplashScreen from 'react-native-splash-screen';

// returns info as an object that contains the list premixedAudioList
const info = AudioObjects();

const SelectorScreen = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <SafeAreaView>
      <FlatList
        data={info.premixedAudioList}
        keyExtractor={item => item.title}
        renderItem={({item}) => {
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
