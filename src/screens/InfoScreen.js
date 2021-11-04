import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import InfoComponent from '../components/InfoComponent';
import LinesImageComponent from '../components/LinesImageComponent';

const InfoScreen = () => {
  return (
    <>
      <LinesImageComponent imageLocation={'top'} />
      <View style={styles.Container}>
        <View style={styles.HeaderContainer}>
          <Text style={styles.Header}>About This App</Text>
          <Text style={styles.BodyText}>
            Find information about ATT, our team, and the app's development
            below.
          </Text>
        </View>
        <View style={styles.SelectorContainer}>
          <InfoComponent
            header="About ATT"
            iconName="brain"
            screen="About"
            text="Learn about ATT and its benefits"
            color="rgb(111, 98, 255)"
          />
          <InfoComponent
            header="Support"
            iconName="heart"
            screen="Support"
            text="Support the development of the app"
            color="rgb(30, 27, 57)"
          />
          <InfoComponent
            header="Release Notes"
            iconName="bug"
            screen="Release"
            text="See what's been updated since the last release"
            color="rgb(255, 177, 62)"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: '5%',
  },
  HeaderContainer: {
    marginTop: '10%',
    justifyContent: 'center',
  },
  SelectorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 17.5,
    lineHeight: 24,
  },
});

export default InfoScreen;
