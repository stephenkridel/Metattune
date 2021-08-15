import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InfoComponent from '../components/InfoComponent';

const InfoScreen = () => {
  return (
    <View style={styles.Container}>
      <InfoComponent header="About ATT" iconName="brain" screen="About" />
      <InfoComponent header="Support" iconName="heart" screen="Support" />
      <InfoComponent header="Release Notes" iconName="bug" screen="Release" />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: 20,
    paddingVertical: '5%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InfoScreen;
