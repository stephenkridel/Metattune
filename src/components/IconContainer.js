import React from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

const IconContainer = props => {
  return (
    <LinearGradient
      colors={props.colors}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.Container}>
      <FontAwesome5 name={props.iconName} size={props.iconSize} color="white" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconContainer;
