/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Navigation } from 'react-native-navigation';
import { _pushTo, _toHome, _toAdmin } from './src/routes/routes';
import { LOGIN, MAIN } from './src/routes/payloads.routes';
import { isLogin, getToken, getUser } from './src/config/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => Node = () => {

  setTimeout(async () => {
    const value = await AsyncStorage.getItem('token');
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (value != null) {
      if (user.role_id == 4) {
        _toHome()
      } else if (user.role_id == 2) {
        _toAdmin()
      }
    } else {
      _pushTo(LOGIN)
    }
  }, 2000);
  return (
    <View style={styles.SplashScreen_RootView}>
      <View style={styles.SplashScreen_ChildView}>
        <Image source={require('./images/logo.png')}
          style={{
            height: 180,
            width: 180,
            resizeMode: "contain"
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: (Platform.OS === 'ios') ? 20 : 0
    },

    SplashScreen_RootView:
    {
      justifyContent: 'center',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',

    },

    SplashScreen_ChildView:
    {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: "#3d4657",
    },

    TouchableOpacity_Style: {

      width: 25,
      height: 25,
      position: 'absolute'

    }
  });



export default App;
