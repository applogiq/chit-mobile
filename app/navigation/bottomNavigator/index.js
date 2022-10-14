//Bottombar component will be nested in stacknavigator

import * as React from 'react';
import {
  Dimensions,
  Image,
  View,
  StyleSheet,
  Text,
  Platform,
  useWindowDimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/homeScreen';
import ChitsScreen from '../../screens/chitsScreen';
import Transactions from '../../screens/transactionsScreen';
import ProfileScreen from '../../screens/profileScreen';
import loginScreen from '../../screens/loginScreen';
import {IMAGES} from '../../common/images';

const Tab = createBottomTabNavigator();
//Assign createBottomTabNavigator to a variable to use it simply

const BottomNavigator = () => {
  const {height, width} = useWindowDimensions();
  //for responsiveness
  const font = useWindowDimensions().fontScale;
  //for responsive text sizes

  //Tab bar elements view component edit this to customize your tab bar
  return (
    <>
      <Tab.Navigator
        options={{}}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            shadowOffset: {
              width: 50,
              height: 10,
            },
            shadowColor: 'black',
            shadowOpacity: 1.0,
            shadowRadius: 56.0,
            elevation: 10,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: '#F7F6F2',
            position: 'absolute',
            bottom: 0,
            padding: '0%',
            width: '100%',
            height: Platform.OS === 'ios' ? '10%' : '10%',
            zIndex: 0,
            borderTopLeftRadius: height * (3 / 100),
            borderTopRightRadius: height * (3 / 100),
            paddingTop: height * (3 / 100),
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let Type;
            let Size;
            let title;
            if (route.name === 'Home') {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: width * (-8 / 100),
                    marginTop: 0,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    source={focused ? IMAGES.home_color : IMAGES.home}
                    style={{
                      width: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                      height: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                    }}
                  />
                  <Text
                    style={[
                      focused ? styles.colorText : styles.text,
                      {fontSize: font * 12},
                    ]}>
                    {title ? 'Home' : 'Home'}
                  </Text>
                </View>
              );
            } else if (route.name === 'Chits') {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: width * (-7 / 100),
                    marginTop: 0,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    source={focused ? IMAGES.chits_color : IMAGES.chits}
                    style={{
                      width: focused
                        ? height * (4 / 100)
                        : height * (2.8 / 100),
                      height: focused
                        ? height * (4 / 100)
                        : height * (2.8 / 100),
                    }}
                  />
                  <Text
                    style={[
                      focused ? styles.colorText : styles.text,
                      {fontSize: font * 12, marginTop: height * (-0.2 / 100)},
                    ]}>
                    {title ? 'Chits' : 'Chits'}
                  </Text>
                </View>
              );
            } else if (route.name === 'Transactions') {
              (Size = focused ? 30 : 25),
                (Type = focused ? 'entypo' : 'feather'),
                (iconName = focused ? 'heart' : 'heart');
              return (
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: width * (2 / 100),
                    marginTop: 0,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    source={
                      focused ? IMAGES.transactions_color : IMAGES.transactions
                    }
                    style={{
                      width: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                      height: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                    }}
                  />
                  <Text
                    style={[
                      focused ? styles.colorText : styles.text,
                      {fontSize: font * 12},
                    ]}>
                    {title ? 'Transactions' : 'Transactions'}
                  </Text>
                </View>
              );
            } else if (route.name === 'Profile') {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: width * (10 / 100),
                    marginTop: 0,
                  }}>
                  <Image
                    resizeMode={'contain'}
                    source={focused ? IMAGES.profile_color : IMAGES.profile}
                    style={{
                      width: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                      height: focused
                        ? height * (3.5 / 100)
                        : height * (2.8 / 100),
                    }}
                  />
                  <Text
                    style={[
                      focused ? styles.colorText : styles.text,
                      {fontSize: font * 12},
                    ]}>
                    {title ? 'Profile' : 'Profile'}
                  </Text>
                </View>
              );
            }
          },
          tabBarActiveTintColor: 'rgba(44, 159, 240, 1)',
          tabBarInactiveTintColor: 'grey',
        })}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeScreen} options={{title: ''}} />
        <Tab.Screen
          name="Chits"
          component={ChitsScreen}
          options={{title: ''}}
        />
        <Tab.Screen
          name="Transactions"
          component={Transactions}
          options={{title: ''}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{title: ''}}
        />
      </Tab.Navigator>
    </>
  );
};
export default BottomNavigator;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',

    color: '#576671',
    top: '8%',
  },
  colorText: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#0E2433',
    top: '8%',
  },
});
