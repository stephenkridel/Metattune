import React from 'react';

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screen Import
import SelectorScreen from './src/screens/SelectorScreen';
import SessionScreen from './src/screens/SessionScreen';
import UserScreen from './src/screens/UserScreen';
import LoginScreen from './src/screens/LoginScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import {
  AboutScreen1,
  AboutScreen2,
  AboutScreen3,
} from './src/screens/AboutScreen';
import PDFScreen from './src/screens/PDFScreen';
import InfoScreen from './src/screens/InfoScreen';
import SupportScreen from './src/screens/SupportScreen';
import ReleaseScreen from './src/screens/ReleaseScreen';
import AttributionScreen from './src/screens/AttributionScreen';

// Redux
import store from './src/store/Store';
import { Provider } from 'react-redux';

// Other Imports
import AntDesign from 'react-native-vector-icons/AntDesign';

// Session Stack
const SessionStack = createNativeStackNavigator();

function SessionStackScreen() {
  return (
    <SessionStack.Navigator
      initialRouteName="Selector"
      screenOptions={{ headerShown: false }}>
      <SessionStack.Screen name="Selector" component={SelectorScreen} />
      <SessionStack.Screen name="Session" component={SessionScreen} />
    </SessionStack.Navigator>
  );
}

// About Stack
const AboutStack = createNativeStackNavigator();

function AboutStackScreen() {
  return (
    <AboutStack.Navigator
      initialRouteName="About1"
      screenOptions={{ headerShown: false }}>
      <AboutStack.Screen name="About1" component={AboutScreen1} />
      <AboutStack.Screen name="About2" component={AboutScreen2} />
      <AboutStack.Screen name="About3" component={AboutScreen3} />
    </AboutStack.Navigator>
  );
}

// Auth Stack
const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <AuthStack.Screen name="User" component={UserScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

// Info Stack
const InfoStack = createNativeStackNavigator();

function InfoStackScreen() {
  return (
    <InfoStack.Navigator
      initialRouteName="Info"
      screenOptions={{ headerShown: false }}>
      <InfoStack.Screen name="Info" component={InfoScreen} />
      <InfoStack.Screen name="About" component={AboutStackScreen} />
      <InfoStack.Screen name="Support" component={SupportScreen} />
      <InfoStack.Screen name="Release" component={ReleaseScreen} />
      <InfoStack.Screen name="Attribution" component={AttributionScreen} />
      <InfoStack.Screen name="Pdf" component={PDFScreen} />
    </InfoStack.Navigator>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'InfoStack') {
                iconName = 'infocirlceo';
              } else if (route.name === 'SessionStack') {
                iconName = 'bars';
              } else if (route.name === 'AuthStack') {
                iconName = 'user';
              }

              // You can return any component that you like here!
              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'rgb(30, 27, 57)',
              borderTopColor: 'rgb(30, 27, 57)',
            },
            headerShown: false,
          })}>
          <Tab.Screen name="SessionStack" component={SessionStackScreen} />
          <Tab.Screen name="InfoStack" component={InfoStackScreen} />
          <Tab.Screen name="AuthStack" component={AuthStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
