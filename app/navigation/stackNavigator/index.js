//Import whole apps screens here and configure it in stacknavigator
//Bottombar component will be nested here stacknavigator
//We can add drawer navbar also if we need
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/loginScreen';
import ForgotPassword from '../../screens/forgotPassword';
import ChangePassword from '../../screens/changePassword';
import ProfileScreen from '../../screens/profileScreen';
import BottomNavigator from '../bottomNavigator';
import SchemeDetails from '../../screens/schemeDetails';

const Stack = createStackNavigator();
//Assign createStackNavigator to a variable to use it simply

const MainStackNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      headerShown={false}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen name="HomeScreen" component={BottomNavigator} />

      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />

      <Stack.Screen name="Schemedetails" component={SchemeDetails} />

      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
