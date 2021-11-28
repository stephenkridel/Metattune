import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

const ArrowButton = props => {
  const shouldShow = props.shouldShow ? 'flex' : 'none';
  return (
    <TouchableOpacity
      // navigates to the SessionScreen passing info (.title, .file, and .color) to SessionScreen.js
      onPress={() =>
        props.navigation.navigate(props.screen, {
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

export default withNavigation(ArrowButton);
