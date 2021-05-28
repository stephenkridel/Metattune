import storage from '@react-native-firebase/storage';

export default class FirebaseFetchAPI {
  static fetchMedia = async mediaFile => {
    // let filePath = '/assets/sounds/test/' + mediaFile + '_test.mp3';
    let filePath = '/assets/sounds/production/' + mediaFile + '.mp3';
    const media = await storage().ref(filePath).getDownloadURL();
    console.log(`Loaded ${filePath}`);
    return media;
  };
}
