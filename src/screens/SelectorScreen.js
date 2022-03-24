import React, { useEffect } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SessionSelectorContainer from '../components/SessionSelectorContainer';
import AudioObjects from '../data/AudioObjects.js';
import ScreenHeader from '../components/ScreenHeader';
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
          <ScreenHeader
            header={'Sessions'}
            subHeader={'Choose from one of our core sessions'}
          />
        }
        renderItem={({ item }) => {
          return (
            <SessionSelectorContainer
              // passes info (.title, .file, .color) to the SessionSelectorContainer
              info={item}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default SelectorScreen;
