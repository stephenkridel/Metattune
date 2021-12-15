import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';

const TextInfoComponent = props => {
  return (
    <View style={styles.Container}>
      <View style={styles.ImageContainer}>
        <Image
          resizeMode={'contain'}
          source={props.image}
          style={styles.Image}
        />
      </View>
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
    backgroundColor: 'rgb(134, 92, 255)',
  },
  ImageContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: '10%',
  },
  Image: {
    height: '110%',
    marginBottom: 20,
  },
  TextContainer: {
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '5%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
  },
  HeaderText: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 10,
    textAlign: 'left',
    //backgroundColor: 'rgb(255, 201, 211)',
  },
  Text: {
    fontSize: 19,
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
    elevation: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
  },
});

export default TextInfoComponent;
