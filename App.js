import React from 'react';
import { Linking as expoLinking } from 'expo';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Text, View } from 'react-native';

import SplashLoadingScreen from './screens/SplashLoadingScreen';


// screens
const SignUp = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>SignUp</Text>
  </View>
);

const SignIn = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>SignIn</Text>
  </View>
);

const List = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>List</Text>
  </View>
);

const Detail = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Detail</Text>
  </View>
);

// Navigator
const AuthStackNavigator = createStackNavigator({
  SignUp: {
    screen: SignUp,
    path: 'signup'
  },
  SignIn: {
    screen: SignIn,
    path: 'signin'
  }
});

const MainTabNavigator = createBottomTabNavigator({
  List: {
    screen: List,
    path: 'list'
  },
  Detail: {
    screen: Detail,
    path: 'detail'
  }
});

// SwitchNavigator
const AppSwitchNavigation = createSwitchNavigator({
  SplashLoadingScreen,
  Auth: {
    screen: AuthStackNavigator,
    path: 'login'
  },
  Main: {
    screen: MainTabNavigator,
    path: 'main'
  }
});

const AppContainer = createAppContainer(AppSwitchNavigation);

export default () => {
  const prefix = expoLinking.makeUrl('/');

  return <AppContainer uriPrefix={prefix} />;
};
