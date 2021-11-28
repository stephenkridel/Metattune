import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import SelectorComponent from '../components/SelectorComponent';
import AudioObjects from '../data/AudioObjects.js';
import SplashScreen from 'react-native-splash-screen';
import ScreenHeaderComponent from '../components/ScreenHeaderComponent';

const SelectorScreen = () => {
  // closing the splash screen when this screen loads
  React.useEffect(() => {
    SplashScreen.hide();
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
