import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SelectorScreen from './src/screens/SelectorScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Selector: SelectorScreen
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(navigator);