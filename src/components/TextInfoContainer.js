import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Platform,
} from 'react-native';

const TextInfoContainer = props => {
  return (
    <SafeAreaView style={styles.Container}>
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
    </SafeAreaView>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 0,
  },
  Image: {
    height: '100%',
  },
  TextContainer: {
    width: '100%',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    display: 'flex',
    justifyContent: 'space-evenly',
    height: '55%',
    position: 'absolute',
    bottom: 0,
  },
  HeaderText: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
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
    elevation: 10,
  },
  ButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
  },
});

export default TextInfoContainer;
