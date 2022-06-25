import * as React from 'react';
import {  Dimensions, Image, View, StyleSheet, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/homeScreen';
import ChitsScreen from '../../screens/chitsScreen';
import Transactions from '../../screens/transactionsScreen';
import ProfileScreen from '../../screens/profileScreen';
import {IMAGES} from "../../common/images"


const Tab = createBottomTabNavigator();


const BottomNavigator = () => {





  return (
    <>
      <Tab.Navigator options={{}} screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowColor: 'black',
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          padding: '4%',
          width: '100%',
          height: Platform.OS === 'ios' ? '10%' : '8%',
          zIndex: 0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let Type;
          let Size;
          let title;
          if (route.name === 'Home') {
            return (
              <>
                <Image
                  resizeMode={'contain'}
                  source={focused ? IMAGES.home_color : IMAGES.home}
                  style={styles.icon}
                />
                <Text style={[focused ? styles.colorText : styles.text]}>{title ? 'Home' : 'Home'}</Text>
              </>
            )
          } else if (route.name === 'Chits') {
            return (
              <>
                <Image
                  resizeMode={'contain'}
                  source={focused ? IMAGES.chits_color : IMAGES.chits}
                  style={[styles.icon, { width: 20 }]}
                />
                <Text style={[focused ? styles.colorText : styles.text]}>{title ? 'Chits' : 'Chits'}</Text>
              </>
            )
          }
          else if (route.name === "Transactions") {
            Size = focused ? 30 : 25,
              Type = focused ? 'entypo' : 'feather',
              iconName = focused ? 'heart' : 'heart';
            return       <>
            <Image
              resizeMode={'contain'}
              source={focused ? IMAGES.transactions_color : IMAGES.transactions}
              style={[styles.icon, { width: 20 }]}
            />
            <Text style={[focused ? styles.colorText : styles.text]}>{title ? 'Transactions' : 'Transactions'}</Text>
          </>
          }
          else if (route.name === 'Profile') {
            return (
              <>
                <Image
                  resizeMode={'contain'}
                  source={focused ? IMAGES.profile_color : IMAGES.profile}
                  style={styles.icon}
                />
                <Text style={[focused ? styles.colorText : styles.text]}>{title ? 'Profile' : 'Profile'}</Text>
              </>
            )
          }
      
        },
        tabBarActiveTintColor: 'rgba(44, 159, 240, 1)',
        tabBarInactiveTintColor: 'grey',
      })} initialRouteName='Home' >
        <Tab.Screen name="Home" component={HomeScreen}  options={{ title: '', }} />
        <Tab.Screen name="Chits" component={ChitsScreen} options={{ title: '', }} />
        <Tab.Screen name="Transactions" component={Transactions} options={{ title: '', }}  />
        <Tab.Screen name="Profile" component={ProfileScreen}  options={{ title: '', }} />
      
      </Tab.Navigator>
    

     
    </>
  );
}
export default BottomNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 20
  },
  text: {
    fontFamily:"SourceSansPro-Regular",
    fontWeight: '400',
    fontSize: 12,
    color: '#576671',
    top: '8%'
  },
  colorText: {
    fontFamily:"SourceSansPro-Regular",
    fontWeight: '400',
    fontSize: 12,
    color: '#0E2433',
    top: '8%'
  }
})