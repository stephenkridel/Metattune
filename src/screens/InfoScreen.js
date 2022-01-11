import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import IconComponentPressable from '../components/IconComponentPressable';
import IconComponent from '../components/IconComponent';
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
            iconColor="rgb(255, 101, 132)"
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
            iconColor="rgb(255, 101, 132)"
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
        <View style={styles.ExtraInfo}>
          <IconComponentPressable
            colors={['rgb(255, 101, 132)', 'rgb(255, 101, 132)']}
            iconName={'creative-commons-by'}
            iconSize={40}
            source={{
              uri: 'bundle-assets://legal/Attributions_Metattune.pdf',
            }}
          />
          <IconComponentPressable
            colors={['rgb(255, 101, 132)', 'rgb(255, 101, 132)']}
            iconName={'user-lock'}
            iconSize={40}
            source={{
              uri: 'bundle-assets://legal/Privacy_Policy_Metattune.pdf',
            }}
          />
          <IconComponentPressable
            colors={['rgb(255, 101, 132)', 'rgb(255, 101, 132)']}
            iconName={'exclamation-circle'}
            iconSize={40}
            source={{
              uri: 'bundle-assets://legal/Disclaimer_Metattune.pdf',
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  SelectorContainer: {
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
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
  ExtraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '5%',
    height: 225,
    marginTop: 25,
  },
});

export default InfoScreen;
