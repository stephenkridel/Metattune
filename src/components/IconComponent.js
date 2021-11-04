import React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const IconComponent = props => {
  return (
    <LinearGradient
      colors={props.colors}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.Container}>
      <FontAwesome5 name={props.iconName} size={30} color="white" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});

export default IconComponent;
