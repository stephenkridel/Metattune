import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import ModalComponent from '../components/ModalComponent';
import store from '../store/Store';
import {
  updateHoursCompleted,
  updateSessionsCompleted,
  updateUserName,
  updateShowWarning,
} from '../actions/UserActions';
import { connect } from 'react-redux';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  _deleteAccountAsync = async () => {
    try {
      await AsyncStorageAPI.deleteItem('userToken');
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  _getUserToken = async () => {
    try {
      const item = await AsyncStorageAPI.getItem('userToken');
      if (item) {
        item.hoursCompleted = item.hoursCompleted.toFixed(2); // rounds number to 2 decimal places
        store.dispatch(updateUserName(item.userName));
        store.dispatch(updateHoursCompleted(item.hoursCompleted));
        store.dispatch(updateSessionsCompleted(item.sessionsCompleted));
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <NavigationEvents onDidFocus={() => this._getUserToken()} />
        <ModalComponent
          isVisible={this.props.user.showWarning}
          onPressX={() => store.dispatch(updateShowWarning(false))}
          onPressDelete={() => {
            this._deleteAccountAsync();
            store.dispatch(updateShowWarning(false));
          }}
          message="Are you sure you want to delete your account?"
          shouldShowButton={true}
        />
        <View style={styles.Container}>
          <Text
            style={
              styles.GreetingText
            }>{`Hello, ${this.props.user.userName}!`}</Text>
          <Text style={styles.SubHeader}>
            we tracked your statistics for you
          </Text>
          <View style={styles.StatisticsContainer}>
            <Text style={styles.StatisticText}>Hours Listened:</Text>
            <Text style={styles.StatisticNumber}>
              {this.props.user.hoursCompleted}
            </Text>
          </View>
          <View style={styles.StatisticsContainer}>
            <Text style={styles.StatisticText}>Sessions Completed:</Text>
            <Text style={styles.StatisticNumber}>
              {this.props.user.sessionsCompleted}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.TrashButton}
            onPress={() => store.dispatch(updateShowWarning(true))}>
            <FontAwesome name="trash-o" size={40} color="rgb(255, 101, 132)" />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  TrashButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  GreetingText: {
    position: 'absolute',
    top: 0,
    fontSize: 30,
    color: 'rgb(30, 27, 57)',
    marginTop: '15%',
    marginLeft: '5%',
    fontFamily: 'JosefinSans-Bold',
  },
  SubHeader: {
    position: 'absolute',
    top: 0,
    fontSize: 17.5,
    color: 'rgb(30, 27, 57)',
    marginTop: '30%',
    marginLeft: '5%',
    fontFamily: 'JosefinSans-Regular',
  },
  StatisticText: {
    fontSize: 25,
    marginBottom: 20,
    color: 'rgb(30, 27, 57)',
    textAlign: 'center',
    fontFamily: 'JosefinSans-Regular',
  },
  StatisticNumber: {
    fontSize: 25,
    color: 'white',
    backgroundColor: 'rgb(30, 27, 57)',
    padding: 10,
    textAlign: 'center',
    fontFamily: 'JosefinSans-Regular',
    borderRadius: 20,
    width: '45%',
    overflow: 'hidden', // needed on ios to show border radius
  },
  StatisticsContainer: {
    height: '20%',
    marginTop: '10%',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
});

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(UserScreen);
