import AsyncStorageAPI from './AsyncStorageAPI';
import store from '../store/Store';
import {
  updateHoursCompleted,
  updateSessionsCompleted,
  updateFavoriteSession,
  updateDayStreak,
} from '../actions/UserActions';

export default class UserStatistics {
  static updateDayStreak = async () => {
    let userData = await AsyncStorageAPI.getItem('userToken');
    let lastListenTime = userData.lastListenTime;
    let timeDifference = Date.now() - lastListenTime;
    console.log('Day Streak Code Started');
    if (lastListenTime == null) {
      userData.dayStreak = 1;
      console.log('Day Streak Initiated');
      userData.lastListenTime = Date.now();
    } else if (timeDifference > 86400000 && timeDifference <= 172800000) {
      userData.dayStreak += 1;
      console.log('Day Streak Increased');
      userData.lastListenTime = Date.now();
    } else if (timeDifference > 172800000) {
      userData.dayStreak = 1;
      userData.lastListenTime = Date.now();
    }
    await AsyncStorageAPI.saveItem('userToken', userData);
    store.dispatch(updateDayStreak(userData.dayStreak));
  };

  /*
  static checkDayStreak = async () => {
    console.log('Day Streak Code Started');
    let userData = null;
    let lastListenTime = null;
    [userData, lastListenTime] = await Promise.all([
      AsyncStorageAPI.getItem('userToken'),
      AsyncStorageAPI.getItem('lastListenTime'),
    ]);
    let timeDifference = Date.now() - lastListenTime;
    userData.dayStreak = timeDifference > 172800000 ? 0 : userData.dayStreak;
    await AsyncStorageAPI.saveItem('userToken', userData);
    store.dispatch(updateDayStreak(userData.dayStreak));
  };
  */

  static updateHoursCompleted = async timePlayed => {
    const userData = await AsyncStorageAPI.getItem('userToken');
    let newData = userData;
    if (newData && timePlayed) {
      let timePlayedFormatted = Math.round((timePlayed / 3600000) * 100) / 100;
      if (timePlayedFormatted < 0.5 && timePlayedFormatted > 0) {
        newData.hoursCompleted += timePlayedFormatted;
        await AsyncStorageAPI.saveItem('userToken', newData);
        store.dispatch(updateHoursCompleted(newData.hoursCompleted));
        console.log('---updateHoursCompleted---');
        console.log(newData);
      }
    }
  };

  static updateCompletedSessions = async () => {
    const userData = await AsyncStorageAPI.getItem('userToken');
    let newData = userData;
    if (newData) {
      newData.sessionsCompleted += 1;
      await AsyncStorageAPI.saveItem('userToken', newData);
      store.dispatch(updateSessionsCompleted(newData.sessionsCompleted));
      console.log('---updateSessionsCompleted---');
      console.log(newData);
    }
  };

  static updateFavoriteSession = async sessionName => {
    const userData = await AsyncStorageAPI.getItem('userToken');
    let newData = userData;
    let favoriteSession = '';
    let largestTotal = 0;
    console.log(newData.sessionTotals);
    newData.sessionTotals.forEach(element => {
      element.total =
        sessionName === element.title ? element.total + 1 : element.total;
      if (element.total > largestTotal) {
        largestTotal = element.total;
        favoriteSession = element;
      }
    });
    newData.favoriteSession = favoriteSession;
    await AsyncStorageAPI.saveItem('userToken', newData);
    store.dispatch(updateFavoriteSession(newData.favoriteSession));
    console.log('---updateFavoriteSession---');
    console.log(newData);
  };

  static updateAll = async sessionName => {
    this.updateDayStreak();
    this.updateHoursCompleted();
    this.updateCompletedSessions();
    this.updateFavoriteSession(sessionName);
  };
}
