import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinesImageComponent from './LinesImageComponent';

const TextInfoComponent = props => {
  return (
    <View style={styles.Container}>
      <LinesImageComponent imageLocation={'right'} />
      <LinesImageComponent imageLocation={'left'} />
      <Image resizeMode={'contain'} source={props.image} style={styles.Image} />
      <View style={styles.TextContainer}>
        <Text style={styles.HeaderText}>{props.headerText}</Text>
        <Text style={styles.Text}>{props.infoText}</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.URL);
          }}
          style={styles.Button}>
          <Text style={styles.ButtonText}>{props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  Image: {
    height: '30%',
    marginBottom: 20,
  },
  TextContainer: {
    borderRadius: 20,
    width: '100%',
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
  Button: {
    height: 50,
    width: '75%',
    backgroundColor: 'rgb(255, 101, 132)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  ButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
  },
});

export default TextInfoComponent;
