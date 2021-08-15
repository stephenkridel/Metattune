import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
    this.props.navigation.navigate(userToken ? 'User' : 'Auth');
  };

  render() {
    return (
      <View style={styles.Container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
