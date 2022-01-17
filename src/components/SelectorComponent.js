import React from 'react';
import { Text, StyleSheet, View, Image, Dimensions } from 'react-native';
import ArrowButton from './ArrowButton';
import { withNavigation } from 'react-navigation';

const width = Dimensions.get('window').width;

const SelectorComponent = props => {
  return (
    <View style={[styles.Container, { backgroundColor: props.info.color }]}>
      <View style={styles.LeftContainer}>
        <Image source={props.info.image} style={styles.Image} />
      </View>
      <View style={styles.RightContainer}>
        <Text style={styles.Header}>{props.info.title}</Text>
        <View style={styles.TimeContainer}>
          <Text style={styles.TimeText}>{props.info.time}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <ArrowButton
            screen={'Session'}
            info={props.info}
            direction={'arrowright'}
            shouldShow={true}
            color={'white'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    // width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    height: 165,
    marginBottom: 20,
    // if you want different colors use -> props.info.color
    // backgroundColor: 'white',
    overflow: 'hidden',
    elevation: 20,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    width: width > 400 ? '87.5%' : '90%',
    alignSelf: 'center',
  },
  RightContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: width > 389 ? '35%' : '45%',
    right: '5%'
  },
  LeftContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    right: '25%',
  },
  Header: {
    fontSize: 23,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
  TimeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  TimeText: {
    fontFamily: 'JosefinSans-Regular',
    color: 'rgb(30, 27, 57)',
    fontSize: 15,
    lineHeight: 20,
  },
  ButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    right: 12,
  },
  Image: {
    height: 230,
    aspectRatio: 1,
  },
});

export default withNavigation(SelectorComponent);
