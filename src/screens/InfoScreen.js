import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import InfoComponent from '../components/InfoComponent';
import LargeInfoComponent from '../components/LargeInfoComponent';
import ScreenHeaderComponent from '../components/ScreenHeaderComponent';

const InfoScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <ScreenHeaderComponent
          header={'About This App'}
          subHeader={
            "Find information about ATT, our team, and the app's development below"
          }
        />
        <View style={styles.SelectorContainer}>
          <InfoComponent
            header="About ATT"
            iconName="brain"
            screen="About"
            text="Learn about ATT and its benefits"
            color="rgb(111, 98, 255)"
            iconColor="rgb(255, 177, 62)"
          />
          <LargeInfoComponent
            header="Support"
            iconName="hands-helping"
            screen="Support"
            text="Support the development of the app"
            color="rgb(111, 98, 255)"
            image={require('../assets/images/brothers-image.png')}
          />
          <InfoComponent
            header="Attribution"
            iconName="creative-commons"
            screen="Attribution"
            text="See who's work we used to build this app"
            color="rgb(111, 98, 255)"
            iconColor="rgb(255, 177, 62)"
          />
          <LargeInfoComponent
            header="Release Info"
            iconName="bug"
            screen="Release"
            text="See what's been updated since the last release"
            color="rgb(111, 98, 255)"
            image={require('../assets/images/tech-image.png')}
          />
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  SelectorContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  Header: {
    fontFamily: 'JosefinSans-Bold',
    color: 'rgb(30, 27, 57)',
    fontSize: 25,
    marginBottom: 10,
  },
  BodyText: {
    fontFamily: 'JosefinSans-Regular',
    color: 'rgb(30, 27, 57)',
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 24,
  },
});

export default InfoScreen;
