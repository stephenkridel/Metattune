import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default FetchMedia = () => {
  const ref = storage().ref('/assets/sounds/rainforest.mp3');
};
