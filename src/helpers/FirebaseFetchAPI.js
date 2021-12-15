import storage from '@react-native-firebase/storage';
import store from '../store/Store';
import { updateProgressMessage } from '../actions/ProgressActions';

export default class FirebaseFetchAPI {
  static fetchMedia = async mediaFile => {
    try {
      let filePath = '/assets/sounds/test/' + mediaFile + '_test.mp3';
      //let filePath = '/assets/sounds/production/' + mediaFile + '.mp3';
      let mediaFileName =
        mediaFile.charAt(0).toUpperCase() + mediaFile.slice(1);
      store.dispatch(
        updateProgressMessage(`Loading Media File: ${mediaFileName}`),
      );
      const media = await storage().ref(filePath).getDownloadURL();
      console.log(`Loaded ${filePath}`);
      return media;
    } catch (error) {
      console.log(error);
    }
  };
}
