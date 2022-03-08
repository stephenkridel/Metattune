import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';
import ScreenHeaderComponent from '../components/ScreenHeaderComponent';
import RNBootSplash from 'react-native-bootsplash';

const SelectorScreen = () => {
  // closing the splash screen when this screen loads
  useEffect(() => {
    RNBootSplash.hide({ fade: true });
  });
  return (
    <SafeAreaView>
      <FlatList
        data={AudioObjects}
        keyExtractor={item => item.title}
        ListHeaderComponent={
          <ScreenHeaderComponent
            header={'Sessions'}
            subHeader={'Choose from one of our core sessions'}
          />
        }
        renderItem={({ item }) => {
          return (
            <SelectorComponent
              // passes info (.title, .file, .color) to the SelectorComponent
              info={item}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SelectorScreen;
