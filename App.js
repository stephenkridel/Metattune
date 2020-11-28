import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SelectorScreen from './src/screens/SelectorScreen';
import SessionScreen from './src/screens/SessionScreen';
import UserScreen from './src/screens/UserScreen';
import LoginScreen from './src/screens/LoginScreen';
import { AboutScreen1, AboutScreen2, AboutScreen3 } from './src/screens/AboutScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import { AntDesign } from '@expo/vector-icons';
import 'react-native-console-time-polyfill';

const SessionStack = createStackNavigator(
	{
		Selector: SelectorScreen,
		Session: SessionScreen
	},
	{
		initialRouteName: 'Selector',
		defaultNavigationOptions: {
			headerShown: false,
			cardStyle: { backgroundColor: 'white' }
		}
	}
);

const AboutStack = createStackNavigator(
	{
		About1: AboutScreen1,
		About2: AboutScreen2,
		About3: AboutScreen3
	},
	{
		initialRouteName: 'About1',
		defaultNavigationOptions: {
			headerShown: false,
			cardStyle: { backgroundColor: 'white' }
		}
	}
);

const AuthStack = createStackNavigator(
	{ Login: LoginScreen },
	{
		defaultNavigationOptions: {
			headerShown: false,
			cardStyle: { backgroundColor: 'white' }
		}
	}
);
const UserStack = createStackNavigator(
	{ User: UserScreen },
	{
		defaultNavigationOptions: {
			headerShown: false,
			cardStyle: { backgroundColor: 'white' }
		}
	}
);

const AccountStack = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	User: UserStack,
	Auth: AuthStack
});

const App = createBottomTabNavigator(
	{
		Sessions: SessionStack,
		About: AboutStack,
		Account: AccountStack
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = AntDesign;
				let iconName;
				if (routeName === 'About') {
					iconName = 'infocirlceo';
				} else if (routeName === 'Sessions') {
					iconName = 'bars';
				} else if (routeName === 'Account') {
					iconName = 'user';
				}
				return <IconComponent name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: 'rgb(108, 99, 255)',
			inactiveTintColor: 'gray'
		}
	}
);

export default createAppContainer(App);
