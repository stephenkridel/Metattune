import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import IconComponent from './IconComponent';

const InfoComponent = props => {
  return (
    <View style={[{ backgroundColor: props.color }, styles.Container]}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => props.navigation.navigate(props.screen)}>
        <IconComponent
          iconName={props.iconName}
          colors={['rgb(207, 159, 237)', 'rgb(255, 101, 132)']}
          style={{ backgroundColor: 'white' }}
        />
        <View style={styles.ContentContainer}>
          <Text style={styles.Header}>{props.header}</Text>
          <Text style={styles.BodyText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '25%',
    borderRadius: 20,
    elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: '5%',
  },
  ContentContainer: {
    width: '80%',
    marginLeft: '15%',
  },
  BodyText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 17.5,
    lineHeight: 22,
    color: 'white',
  },
  Header: {
    fontSize: 21,
    color: 'white',
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 10,
  },
  Button: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default withNavigation(InfoComponent);
