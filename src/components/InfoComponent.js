import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

const InfoComponent = props => {
  return (
    <LinearGradient
      colors={['rgb(207, 159, 237)', 'rgb(255, 101, 132)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.Container}>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => props.navigation.navigate(props.screen)}>
        <Text style={styles.Header}>{props.header}</Text>
        <FontAwesome5 name={props.iconName} size={50} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    borderRadius: 20,
    height: 150,
    elevation: 10,
    marginVertical: 10,
  },
  Header: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
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
