/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//This is the main entry file
//Rest of screen components will be nested and finally rendered here
//Redux store provider is configured here
//Please put all needed fonts files in android/app/src/main/assets/fonts
/**************************************** Import Packages ***********************************************************/
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {View, ActivityIndicator, Text, Image} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
/**************************************** Import Components ***********************************************************/
import MainStackNavigator from './app/navigation/stackNavigator';
import {RefreshProvider} from './app/RefreshProvider';
import {IMAGES} from './app/common/images';
const App = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(handleConnectivityChange);
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      console.log('connection', setIsConnected(state.isConnected));
    });

    return () => {
      NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
        console.log('connectionwww', setIsConnected(state.isConnected));
      });
    };
  }, [NetInfo]);

  function handleConnectivityChange(state) {
    if (state.isConnected) {
      setIsConnected(true);
      console.log('online---', setIsConnected(true));
    } else {
      setIsConnected(false);
    }
  }
  console.log(isConnected, 'from begininggggggggggggggggggggggggggg');
  return (
    <Provider store={store}>
      {isConnected ? (
        <RefreshProvider>
          <NavigationContainer>
            <MainStackNavigator></MainStackNavigator>
          </NavigationContainer>
        </RefreshProvider>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(247, 246, 242, 1)',
          }}>
          <Text
            style={{
              fontSize: 25,
              color: 'rgba(157, 105, 57, 1)',
              fontWeight: '600',
            }}>
            Network Error
          </Text>
          <Text>Looks like you are not connected to the internet</Text>
        </View>
      )}
      <Toast />
    </Provider>
  );
};

export default App;
