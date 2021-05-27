import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageAPI {
  static isStoredInDevice = async token => {
    const isStored = await AsyncStorage.getItem(token);
    return isStored != null ? true : false;
  };

  static getItem = async token => {
    try {
      const retrievedItem = await AsyncStorage.getItem(token);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error);
    }
  };

  static deleteItem = async token => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.navigate(token);
    } catch (error) {
      console.log(error);
    }
  };
}
