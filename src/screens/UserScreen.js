import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import ModalComponent from '../components/ModalComponent';
import store from '../store/Store';
import {
  updateHoursCompleted,
  updateSessionsCompleted,
  updateUserName,
  updateShowWarning,
  updateShowAvatarModal,
  updateSelectedAvatar,
  updateResetUser,
  updateDayStreak,
  updateFavoriteSession,
} from '../actions/UserActions';
import { connect } from 'react-redux';
import AsyncStorageAPI from '../helpers/AsyncStorageAPI';
import StatisticsComponent from '../components/StatisticsComponent';
import AvatarComponent from '../components/AvatarComponent';
import AvatarModalComponent from '../components/AvatarModalComponent';

class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  _deleteAccountAsync = async () => {
    try {
      store.dispatch(updateShowAvatarModal(false));
      await AsyncStorageAPI.deleteItem('userToken');
      store.dispatch(updateResetUser());
      this.props.navigation.navigate('Login');
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
        store.dispatch(updateDayStreak(item.dayStreak));
        store.dispatch(updateFavoriteSession(item.favoriteSession));
        store.dispatch(updateSelectedAvatar(item.selectedAvatar));
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount = () => {
    this._getUserToken();
  };

  render() {
    return (
      <SafeAreaView style={styles.Container}>
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
        <AvatarModalComponent
          isVisible={this.props.user.showAvatarModal}
          onPressX={() => store.dispatch(updateShowAvatarModal(false))}
        />
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => store.dispatch(updateShowAvatarModal(true))}
            style={styles.AvatarButton}>
            <AvatarComponent
              AvatarObject={this.props.user.selectedAvatar}
              avatarWidth={'100%'}
            />
          </TouchableOpacity>
          <View style={styles.TextContainer}>
            <Text
              style={
                styles.GreetingText
              }>{`Hello, ${this.props.user.userName}!`}</Text>
            <Text style={styles.SubHeader}>
              we tracked your statistics for you
            </Text>
          </View>
        </View>
        <View style={styles.StatisticsOuterContainer}>
          <View style={styles.StatisticsInnerContainer}>
            <StatisticsComponent
              iconName={'headphones'}
              header={'Hours Listened'}
              statistic={this.props.user.hoursCompleted}
            />
            <StatisticsComponent
              iconName={'check'}
              header={'Finished Sessions'}
              statistic={this.props.user.sessionsCompleted}
            />
          </View>
          <View style={styles.StatisticsInnerContainer}>
            <StatisticsComponent
              iconName={'star'}
              header={'Favorite Session'}
              statistic={this.props.user.favoriteSession.title}
              //statistic={this.props.user.hoursCompleted}
            />
            <StatisticsComponent
              iconName={'calendar-check'}
              header={'Day Streak'}
              statistic={this.props.user.dayStreak}
              //statistic={this.props.user.hoursCompleted}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  HeaderContainer: {
    marginHorizontal: '5%',
    height: '27%',
    justifyContent: 'space-between',
  },
  AvatarButton: {
    width: '27.5%',
    alignSelf: 'center',
  },
  TextContainer: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  GreetingText: {
    fontSize: 25,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Bold',
    marginBottom: 10,
  },
  SubHeader: {
    fontSize: 20,
    color: 'rgb(30, 27, 57)',
    fontFamily: 'JosefinSans-Regular',
    lineHeight: 22,
  },
  StatisticsOuterContainer: {
    flexDirection: 'column',
  },
  StatisticsInnerContainer: {
    flexDirection: 'row',
    marginHorizontal: '2.5%',
    alignContent: 'center',
    justifyContent: 'space-evenly',
  },
});

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

export default connect(mapStateToProps)(UserScreen);
