import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SelectorScreen from './src/screens/SelectorScreen';
import SessionScreen from './src/screens/SessionScreen';
import CustomSessionScreen from './src/screens/CustomSessionScreen';
import PickerScreen from './src/screens/PickerScreen';

const navigator = createStackNavigator(
    {
        Home: HomeScreen,
        Selector: SelectorScreen,
        Session: SessionScreen,
        Custom: CustomSessionScreen,
        Picker: PickerScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(navigator);
