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
import React from 'react';
import {


  Text,

  View,
} from 'react-native';





const App =() => {


  return (
<View style={{flex:1}}>
  <Text>Welcome to chit app!</Text>
</View>
  );
};



export default App;
