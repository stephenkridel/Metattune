import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ArrowButton = props => {
  const shouldShow = props.shouldShow ? 'flex' : 'none';
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // navigates to the SessionScreen passing info (.title, .file, and .color) to SessionScreen.js
      onPress={() =>
        navigation.navigate(props.screen, {
          info: props.info,
        })
      }
      style={[
        styles.Button,
        {
          display: shouldShow,
          backgroundColor:
            props.backgroundColor == null
              ? 'transparent'
              : props.backgroundColor,
        },
      ]}>
      <AntDesign
        name={props.direction}
        size={30}
        style={[styles.Icon, { color: props.color }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArrowButton;
