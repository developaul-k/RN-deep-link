import React, { useState, useEffect } from 'react';
import * as expo from 'expo';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Linking
} from 'react-native';

const AuthLoadingScreen = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // 앱이 실행중일 때 deep link 체크
  const _hadnlerEvent = url => {
    console.log({handlerEvent: url})
    if (url !== "exp://192.168.0.12:19000") {
      setIsDeep(true)
    } else {
      setIsDeep(false)
    }
  }

  useEffect(() => {
    let isDeep = false;

    expo.Linking.addEventListener('url', _hadnlerEvent);

    // 앱이 실행중이지 않을 때 실행 후 deep link 체크
    const checkDeep = async () => {
      await Linking.getInitialURL().then(url => {
        if (url !== "exp://192.168.0.12:19000") {
          isDeep = true
        } else {
          isDeep = false
        }
      });
    }

    checkDeep()

    // deep link 유무에 따라 로그인 체크
    if (!isDeep) {
      navigation.navigate(isLoggedIn ? 'Main' : 'Auth');
    }

    return () => expo.Linking.removeEventListener('url', _hadnlerEvent);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color='#000' />
      <StatusBar barStyle='default' />
    </View>
  );
};

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
  }
});

const SwitchNavigation = createSwitchNavigator({
  AuthLoadingScreen,
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
  const prefix = expo.Linking.makeUrl('/');

  return <AppContainer uriPrefix={prefix} />;
};
