import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from 'react-native';

const ReleaseScreen = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.TextContainer}>
        <Text style={styles.Text}>
          First off, thank you for using our app. Attune is produced by us, two
          brothers from Ohio. We believe in developing accessible tools to
          improve mental health. Because we want Attune to be accessible, we
          chose to not charge for it. The usage of Attune does cost us money, so
          if you have the ability and would like to support the development and
          maintenance of Attune, please donate by tapping on the logo below :)
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://ko-fi.com/rocketcafe');
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
  Image: {
    resizeMode: 'contain',
    height: 75,
    width: 75,
    alignSelf: 'center',
  },
  Link: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ReleaseScreen;
