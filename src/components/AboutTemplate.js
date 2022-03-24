import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ArrowButton from './ArrowButton';

const AboutTemplate = props => {
  return (
    <View style={styles.Hero}>
      <Image resizeMode="contain" source={props.image} style={styles.Image} />
      <View style={styles.Info}>
        <Text style={styles.Header}>{props.header}</Text>
        <Text style={styles.Text}>{props.text}</Text>
      </View>
      <View style={styles.Controls}>
        <ArrowButton
          screen={props.prevScreen}
          direction={'arrowleft'}
          shouldShow={props.shouldShowLeft}
          color={'rgb(255, 101, 132)'}
          backgroundColor={'transparent'}
        />
        <ArrowButton
          screen={props.nextScreen}
          direction={'arrowright'}
          shouldShow={props.shouldShowRight}
          color={'rgb(255, 101, 132)'}
          backgroundColor={'transparent'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  Header: {
    fontSize: 28,
    textAlign: 'left',
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
    width: '100%',
    marginBottom: 10,
  },
  Text: {
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'left',
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    width: '100%',
  },
  Image: {
    height: '50%',
  },
  Controls: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  Info: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginLeft: 25,
    elevation: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 30,
    backgroundColor: 'white',
  },
});

export default AboutTemplate;
