import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const LinkButton = props => {
  return (
    <View style={styles.Container}>
      <Image resizeMode={'contain'} source={props.image} style={styles.Image} />
      <View style={styles.TextContainer}>
        <Text style={styles.HeaderText}>{props.headerText}</Text>
        <Text style={styles.Text}>{props.infoText}</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.URL);
          }}
          style={styles.Link}>
          <Image
            source={require('../assets/images/transparent-logo.png')}
            style={styles.Logo}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '2.5%',
  },
  Image: {
    height: '35%',
    marginBottom: 10,
  },
  TextContainer: {
    borderRadius: 20,
    paddingHorizontal: 20,
    height: '50%',
    overflow: 'scroll',
  },
  HeaderText: {
    fontSize: 30,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 10,
    textAlign: 'left',
    //backgroundColor: 'rgb(255, 201, 211)',
  },
  Text: {
    fontSize: 20,
    lineHeight: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'left',
  },
  Logo: {
    resizeMode: 'contain',
    height: 75,
    width: 75,
  },
  Link: {
    height: 75,
    width: 75,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default LinkButton;
