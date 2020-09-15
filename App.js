import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import SelectorScreen from './src/screens/SelectorScreen';
import SessionScreen from './src/screens/SessionScreen';

const navigator = createStackNavigator(
    {
        Home: HomeScreen,
        Selector: SelectorScreen,
        Session: SessionScreen
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            cardStyle: { backgroundColor: 'white' }
        }
    }
);

export default createAppContainer(navigator);
