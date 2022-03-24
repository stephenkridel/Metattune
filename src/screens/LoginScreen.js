import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalElement from '../components/ModalElement';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputText: '',
      isError: false,
      errorMsg: null,
      isInfoNeeded: false,
    };
  }

  _setUserToken = async value => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify(value));
      this.props.navigation.navigate('User');
    } catch (error) {
      this.setState({
        isError: true,
        errorMsg:
          'Sorry, an error has occurred. Please try closing and reopening the app.',
      });
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.Container}>
        <ModalElement
          isVisible={this.state.isInfoNeeded}
          message={
            'Our app is still being developed, so please enjoy this basic account feature while we develop a more fully featured app. We do not store user data externally, so your information may not persist with future updates.'
          }
          onPressX={() => this.setState({ isInfoNeeded: false })}
          shouldShowButton={false}
        />
        <ModalElement
          isVisible={this.state.isError}
          message={this.state.errorMsg}
          onPressX={() => this.setState({ isError: false })}
          shouldShowButton={false}
        />
        <Text style={styles.Header}>Sign Up</Text>
        <Text style={styles.SubHeader}>All we require is your first name!</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={text => this.setState({ inputText: text })}
          textAlign="center"
          placeholder="Name"
          placeholderTextColor="lightgrey"
        />
        <TouchableOpacity
          style={styles.SubmitButton}
          onPress={() => {
            if (this.state.inputText != null && this.state.inputText != '') {
              this._setUserToken({
                userName: this.state.inputText.trim(),
                hoursCompleted: 0,
                sessionsCompleted: 0,
                favoriteSession: '',
                dayStreak: 0,
                selectedAvatar: '',
                lastListenTime: null,
                sessionTotals: [
                  { title: 'Cafe', total: 0 },
                  { title: 'City', total: 0 },
                  { title: 'Beach', total: 0 },
                  { title: 'Rainforest', total: 0 },
                ],
              });
            } else {
              this.setState({
                isError: true,
                errorMsg: 'Please enter a name to create an account',
              });
            }
          }}>
          <Text style={styles.ButtonText}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.InfoContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ isInfoNeeded: true })}>
            <AntDesign name="infocirlce" size={30} color="rgb(255, 101, 132)" />
          </TouchableOpacity>
          <Text style={styles.InfoText}>
            Tap for more information about this feature
          </Text>
        </View>
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
  Header: {
    fontSize: 40,
    color: 'rgb(30, 27, 57)',
    textAlign: 'left',
    fontFamily: 'JosefinSans-Bold',
    width: '75%',
  },
  SubHeader: {
    fontSize: 18,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    textAlign: 'left',
    marginBottom: 20,
    width: '75%',
  },
  TextInput: {
    color: 'white',
    height: 60,
    width: '75%',
    backgroundColor: 'rgb(30, 27, 57)',
    borderColor: 'lightgrey',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
  },
  SubmitButton: {
    height: 50,
    width: '75%',
    backgroundColor: 'rgb(255, 101, 132)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'JosefinSans-Regular',
    marginRight: 10,
  },
  InfoText: {
    color: 'black',
    fontSize: 15,
    fontFamily: 'JosefinSans-Regular',
    width: '75%',
    marginLeft: 10,
  },
  InfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '75%',
    alignItems: 'center',
    height: '10%',
    marginTop: 20,
  },
});
