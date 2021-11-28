import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ScreenHeaderComponent = props => {
  return (
    <View style={styles.Container}>
      <Text style={styles.Header}>{props.header}</Text>
      <Text style={styles.SubHeader}>{props.subHeader}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    paddingHorizontal: '5%',
    paddingTop: '8%',
    paddingBottom: '5%',
    justifyContent: 'center',
  },
  Header: {
    fontSize: 25,
    fontFamily: 'JosefinSans-Bold',
    color: 'rgb(30, 27, 57)',
    marginBottom: 10,
  },
  SubHeader: {
    fontFamily: 'JosefinSans-Regular',
    color: 'rgb(30, 27, 57)',
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 24,
  },
});

export default ScreenHeaderComponent;
