import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarSelectorComponent from '../components/AvatarSelectorComponent';

export default class Screen extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this._getUserToken();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _getUserToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'User' : 'Login');
  };

  render() {
    return (
      <View style={styles.Container}>
        <AvatarSelectorComponent
          AvatarObject={{ token: '' }}
          isDisabled={true}
        />
        <Text style={styles.LoadingText}>Fetching profile...</Text>
      </View>
    );
  }
}

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
