import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ArrowButton from '../components/ArrowButton';

const AboutComponent = props => {
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
          color={'white'}
          backgroundColor={'rgb(255, 101, 132)'}
        />
        <ArrowButton
          screen={props.nextScreen}
          direction={'arrowright'}
          shouldShow={props.shouldShowRight}
          color={'white'}
          backgroundColor={'rgb(255, 101, 132)'}
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
  },
  Header: {
    fontSize: 28,
    textAlign: 'left',
    color: 'rgb(30, 27, 57)',
    marginBottom: 7.5,
    fontFamily: 'JosefinSans-Bold',
  },
  Text: {
    fontSize: 21,
    lineHeight: 25,
    textAlign: 'left',
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    marginTop: 7.5,
  },
  Button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 27, 57)',
  },
  Image: {
    height: '50%',
  },
  Controls: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: -25,
  },
  Info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    top: -25,
    paddingHorizontal: 30,
    marginLeft: 25,
    elevation: 15,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    marginBottom: 30,
    backgroundColor: 'white',
  },
});

export default AboutComponent;
