import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';

const LargeInfoComponent = props => {
  return (
    <TouchableOpacity
      style={[
        { backgroundColor: props.color, borderColor: props.color },
        styles.Container,
      ]}
      onPress={() => props.navigation.navigate(props.screen)}>
      <View style={styles.LeftContainer}>
        <Image source={props.image} style={styles.Image} />
      </View>
      <View style={styles.RightContainer}>
        <Text style={styles.Header}>{props.header}</Text>
        <Text style={styles.BodyText}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 20,
    elevation: 10,
    backgroundColor: 'rgb(108, 99, 255)',
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  RightContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '50%',
    paddingRight: 10,
    paddingVertical: 5,
  },
  Header: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
  },
  BodyText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
    lineHeight: 22,
  },
  LeftContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  },
  Image: {
    height: 150,
    aspectRatio: 1,
  },
});

export default withNavigation(LargeInfoComponent);
