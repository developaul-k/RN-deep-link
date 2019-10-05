import React, { useState, useEffect } from 'react';
import { Image, View, AsyncStorage, Linking } from 'react-native';
import { Linking as expoLinking, AppLoading, SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

const SplashLoadingScreen = ({ navigation }) => {
  const [isDeep, setIsDeep] = useState(false);
  const [isSplashReady, setIsSplashReday] = useState(false);

  const _handleUrl = url => {
    const { path } = Linking.parse(url);

    if (path !== undefined && path.length > 0) {
      setIsDeep(true);
    } else {
      setIsDeep(false);
    }
  };

  const _cacheResourcesAsync = async () => {
    const images = [require('../assets/icon.png')];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    await Promise.all(cacheImages);
  };

  const _initializedApp = async () => {
    await _cacheResourcesAsync();

    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

    setTimeout(() => {
      if (!isLoggedIn) {
        return navigation.navigate('Auth');
      }
      return navigation.navigate('Main');
    }, 2000);
  };

  useEffect(() => {
    Linking.addEventListener('url', _handleUrl);

    const _cacheSplashResourcesAsync = async () => {
      const Image = require('../assets/splash.png');
      return Asset.fromModule(Image).downloadAsync();
    };

    _cacheSplashResourcesAsync();
    setIsSplashReday(true);

    return () => Linking.removeEventListener('url', _handleUrl);
  }, []);

  return isSplashReady ? (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/splash_wally.png')}
        onLoad={_initializedApp}
        onLoadEnd={() => {
          console.log('end');
          SplashScreen.hide();
        }}
        fadeDuration={0}
        style={{
          flex: 1,
          resizeMode: 'contain',
          width: undefined,
          height: undefined
        }}
      />
    </View>
  ) : (
    <AppLoading />
  );
};

export default SplashLoadingScreen;
