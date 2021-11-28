import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import ArrowButton from './ArrowButton';
import { withNavigation } from 'react-navigation';

const SelectorComponent = props => {
  return (
    <View style={[styles.Container, { backgroundColor: props.info.color }]}>
      <View style={styles.LeftContainer}>
        <View style={styles.ImageButton}>
          <Image source={props.info.image} style={styles.Image} />
        </View>
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
    marginTop: 20,
    marginHorizontal: 20,
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
  },
  RightContainer: {
    width: '100%',
    paddingLeft: '10%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
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
  LeftContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    marginRight: '5%',
  },
  ImageButton: {
    borderRadius: 60,
  },
  Image: {
    height: 230,
    aspectRatio: 1,
  },
});

export default withNavigation(SelectorComponent);
