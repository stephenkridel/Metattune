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
import LinearGradient from 'react-native-linear-gradient';

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
        <View style={styles.CircleOne}></View>
        <View style={styles.CircleTwo}></View>
        <View style={styles.CircleThree}></View>
        <View style={styles.CircleFour}></View>
        <View style={styles.Container}>
          <Text
            style={
              styles.GreetingText
            }>{`Hello, ${this.props.user.userName}!`}</Text>
          <Text style={styles.SubHeader}>
            we tracked your statistics for you
          </Text>
          <LinearGradient
            colors={['rgb(207, 159, 237)', 'rgb(255, 101, 132)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.StatisticsContainer}>
            <Text style={styles.StatisticText}>Hours Listened:</Text>
            <Text style={styles.StatisticNumber}>
              {this.props.user.hoursCompleted}
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={['rgb(207, 159, 237)', 'rgb(255, 101, 132)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.StatisticsContainer}>
            <Text style={styles.StatisticText}>Sessions Completed:</Text>
            <Text style={styles.StatisticNumber}>
              {this.props.user.sessionsCompleted}
            </Text>
          </LinearGradient>
        </View>
        <TouchableOpacity
          style={styles.TrashButton}
          onPress={() => store.dispatch(updateShowWarning(true))}>
          <FontAwesome name="trash-o" size={40} color="rgb(255, 101, 132)" />
        </TouchableOpacity>
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
  CircleOne: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    left: '5%',
    top: '80%',
    backgroundColor: 'rgba(30, 27, 57, 0.075)',
  },
  CircleTwo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    position: 'absolute',
    left: '80%',
    top: '50%',
    backgroundColor: 'rgba(30, 27, 57, 0.075)',
  },
  CircleThree: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    left: '30%',
    top: '20%',
    backgroundColor: 'rgba(30, 27, 57, 0.075)',
  },
  CircleFour: {
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    left: '70%',
    top: '80%',
    backgroundColor: 'rgba(30, 27, 57, 0.075)',
  },
  TrashButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  GreetingText: {
    position: 'absolute',
    top: 0,
    fontSize: 35,
    color: 'rgb(30, 27, 57)',
    marginTop: '15%',
    marginLeft: '5%',
    fontFamily: 'JosefinSans-Bold',
  },
  SubHeader: {
    position: 'absolute',
    top: 0,
    fontSize: 20,
    color: 'rgb(30, 27, 57)',
    marginTop: '30%',
    marginLeft: '5%',
    fontFamily: 'JosefinSans-Regular',
  },
  StatisticText: {
    fontSize: 25,
    color: 'white',
    textAlign: 'left',
    marginLeft: 10,
    fontFamily: 'JosefinSans-Regular',
  },
  StatisticNumber: {
    fontSize: 60,
    color: 'white',
    textAlign: 'left',
    fontFamily: 'JosefinSans-Regular',
    marginLeft: 10,
    overflow: 'hidden', // needed on ios to show border radius
  },
  StatisticsContainer: {
    height: '20%',
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '80%',
    overflow: 'hidden',
    marginVertical: 10,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    elevation: 10,
  },
});

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(UserScreen);
