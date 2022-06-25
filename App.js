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
import React from 'react';
import {



  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './app/redux/store';
import { NavigationContainer } from '@react-navigation/native';
/**************************************** Import Components ***********************************************************/
import MainStackNavigator from './app/navigation/stackNavigator';


const App =() => {



  return (
  


    <Provider store={store}>
         <NavigationContainer>
<MainStackNavigator></MainStackNavigator>
</NavigationContainer>
  </Provider>



  );
};



export default App;
