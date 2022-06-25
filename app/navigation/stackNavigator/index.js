import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/loginScreen';
import ForgotPassword from '../../screens/forgotPassword';
import ChangePassword from '../../screens/changePassword';
import ProfileScreen from '../../screens/profileScreen';
import BottomNavigator from '../bottomNavigator';



const Stack = createStackNavigator();

const MainStackNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="IntroScreen"
      headerShown={false}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={BottomNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      
    </Stack.Navigator>
  );
};

export default MainStackNavigator;