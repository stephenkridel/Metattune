import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import ArrowButton from './ArrowButton';
import { withNavigation } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

const SelectorComponent = props => {
  return (
    <LinearGradient
      colors={props.info.color}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.Container}>
      <View style={styles.LeftContainer}>
        <Text style={styles.Header}>{props.info.title}</Text>
        <View style={styles.TimeContainer}>
          <Text style={styles.TimeText}>{props.info.time}</Text>
        </View>
        <View style={styles.ButtonContainer}>
          <ArrowButton
            screen={'Session'}
            info={props.info}
            direction={'arrowright'}
            shouldShow={true}
            color={'white'}
          />
        </View>
      </View>
      <View style={styles.RightContainer}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Session', {
              info: props.info,
            })
          }
          style={styles.ImageButton}>
          <Image source={props.info.image} style={styles.Image} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  Container: {
    // width: Dimensions.get('window').width,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 20,
    padding: 10,
    paddingLeft: 30,
    height: 165,
    marginBottom: 20,
    // if you want different colors use -> props.info.color
    // backgroundColor: 'white',
    elevation: 10,
    borderRadius: 15,
    shadowColor: 'rgb(30, 27, 57)',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  LeftContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '50%',
    height: '100%',
  },
  RightContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Header: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'JosefinSans-Regular',
  },
  TimeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  TimeText: {
    fontFamily: 'JosefinSans-Regular',
    color: 'rgb(30, 27, 57)',
    fontSize: 15,
    lineHeight: 20,
  },
  ButtonContainer: {
    height: 50,
    width: 50,
    borderRadius: 50,
    right: 12,
  },
  Image: {
    height: 120,
    width: 120,
  },
  ImageButton: {
    height: 120,
    width: 120,
    position: 'absolute',
    borderRadius: 60,
  },
});

export default withNavigation(SelectorComponent);
