import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStorageAPI {
  static isStoredInDevice = async token => {
    const isStored = await AsyncStorage.getItem(token);
    return isStored != null ? true : false;
  };

  static getItem = async token => {
    try {
      const retrievedItem = await AsyncStorage.getItem(token);
      return retrievedItem != null ? JSON.parse(retrievedItem) : null;
    } catch (error) {
      console.log(error);
    }
  };

  static saveItem = async (token, data) => {
    try {
      await AsyncStorage.setItem(token, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  static deleteItem = async token => {
    try {
      await AsyncStorage.removeItem(token);
    } catch (error) {
      console.log(error);
    }
  };
}
