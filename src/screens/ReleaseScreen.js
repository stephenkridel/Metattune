import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const ReleaseScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.TextContainer}>
        <Text style={styles.ReleaseVersion}>Release Version: 0.1.0</Text>
        <Text style={styles.Text}>
          This release is one of the first beta releases, yay! It may have bugs.
          Okay, it'll have bugs. But we are working on fixing them and improving
          the app. Tap on the logo below to submit feedback!
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://forms.gle/GjmXt3Z82NFvTBvc6');
          }}
          style={styles.Link}>
          <Image
            source={require('../assets/images/transparent-logo.png')}
            style={styles.Image}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
  },
  TextContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    overflow: 'scroll',
  },
  Text: {
    fontSize: 20,
    lineHeight: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'center',
  },
  ReleaseVersion: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  Image: {
    resizeMode: 'contain',
    height: 75,
    width: 75,
  },
  Link: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ReleaseScreen;
