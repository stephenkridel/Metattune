import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import IconComponent from './IconComponent';

const InfoComponent = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(props.screen)}
      style={[{ backgroundColor: props.color }, styles.Container]}>
      <IconComponent
        iconName={props.iconName}
        iconSize={40}
        colors={['rgb(207, 159, 237)', 'rgb(255, 101, 132)']}
        style={{ backgroundColor: 'white' }}
      />
      <View style={styles.ContentContainer}>
        <Text style={styles.Header}>{props.header}</Text>
      </View>
    </TouchableOpacity>
  );
};

// <Text style={styles.BodyText}>{props.text}</Text>

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '17%',
    borderRadius: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: '7.5%',
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ContentContainer: {
    width: '80%',
    marginLeft: '15%',
  },
  Header: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 10,
  },
});

export default withNavigation(InfoComponent);
