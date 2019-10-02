import React, { useState, useEffect } from 'react';
import * as expo from 'expo';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View, Linking } from 'react-native';

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
  },
});

const SwitchNavigation = createSwitchNavigator({
  Auth: {
    screen: AuthStackNavigator,
    path: 'login'
  },
  Main: {
    screen: MainTabNavigator,
    path: 'main'
  }
});

const AppContainer = createAppContainer(SwitchNavigation);

export default () => {
  const prefix = expo.Linking.makeUrl("/");

  return <AppContainer uriPrefix={prefix} />;
};
