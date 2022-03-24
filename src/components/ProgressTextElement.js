import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressTextElement = props => {
  return (
    <View style={styles.TextBox}>
      <Text style={styles.Message}>{props.messageText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TextBox: {
    width: '100%',
    display: 'flex',
    marginTop: 20,
    height: 20,
  },
  Message: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default ProgressTextElement;
