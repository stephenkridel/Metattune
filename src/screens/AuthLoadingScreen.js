import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarButton from '../components/AvatarButton';
import { useFocusEffect } from '@react-navigation/native';

const AuthLoadingScreen = props => {
  useFocusEffect(() => {
    AsyncStorage.getItem('userToken').then(token => {
      props.navigation.navigate(token ? 'User' : 'Login');
    });
  });

  return (
    <View style={styles.Container}>
      <AvatarButton AvatarObject={{ token: '' }} isDisabled={true} />
      <Text style={styles.LoadingText}>Fetching profile...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(30, 27, 57)',
  },
  LoadingText: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 20,
    color: 'white',
  },
});

export default AuthLoadingScreen;
