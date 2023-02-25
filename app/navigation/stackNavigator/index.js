//Import whole apps screens here and configure it in stacknavigator
//Bottombar component will be nested here stacknavigator
//We can add drawer navbar also if we need
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/loginScreen';
import ForgotPassword from '../../screens/forgotPassword';
import ChangePassword from '../../screens/changePassword';
import ProfileScreen from '../../screens/profileScreen';
import BottomNavigator from '../bottomNavigator';
import SchemeDetails from '../../screens/schemeDetails';
import NotificationScreen from '../../screens/notificationScreen';
import SchemedetailsScreen from '../../screens/SchemeDetailsScreen/SchemeDetails';
import TransactionsList from '../../screens/SchemeDetailsScreen/TransactionList';
import PaymentsStats from '../../screens/PaymentsScreen/PaymentPending';

const Stack = createStackNavigator();
//Assign createStackNavigator to a variable to use it simply

const MainStackNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      headerShown={false}>
      <Stack.Screen name="LoginScreen">
        {props => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="HomeScreen">
        {props => <BottomNavigator {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotPassword">
        {props => <ForgotPassword {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ChangePassword">
        {props => <ChangePassword {...props} />}
      </Stack.Screen>

      <Stack.Screen name="Schemedetails">
        {props => <SchemeDetails {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SchemedetailsScreen">
        {props => <SchemedetailsScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="TransactionsList">
        {props => <TransactionsList {...props} />}
      </Stack.Screen>
      <Stack.Screen name="PaymentStats">
        {props => <PaymentsStats {...props} />}
      </Stack.Screen>

      <Stack.Screen name="ProfileScreen">
        {props => <ProfileScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="NotificationScreen">
        {props => <NotificationScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
