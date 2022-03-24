import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import IconContainer from './IconContainer';

const StatisticsContainer = props => {
  return (
    <LinearGradient
      colors={['rgb(142, 90, 255)', 'rgb(111, 98, 255)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.Container}>
      <View style={styles.TopContainer}>
        <IconContainer
          iconName={props.iconName}
          iconSize={25}
          colors={['rgb(255, 177, 62)', 'rgb(255, 109, 123)']}
        />
      </View>
      <View style={styles.BottomContainer}>
        <Text style={styles.Header}>{props.header}</Text>
        <Text style={styles.Statistic}>{props.statistic}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    aspectRatio: 1,
    paddingHorizontal: 12.5,
    paddingVertical: 10,
    borderRadius: 20,
    //elevation: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    margin: 5,
  },
  TopContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  BottomContainer: {
    width: '100%',
    height: '50%',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  Header: {
    fontFamily: 'JosefinSans-Bold',
    fontSize: 15,
    lineHeight: 20,
    color: 'white',
  },
  Statistic: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 25,
    color: 'white',
  },
});

export default StatisticsContainer;
