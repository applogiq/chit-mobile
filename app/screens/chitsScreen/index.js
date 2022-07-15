//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector, connect } from 'react-redux';

import { getYourchits } from '../../redux/actions';
/**************************************** Import components ***********************************************************/
import TopBar from './topBar';
import MyChitCardSlider from './chitsCards';


const ChitsScreen = ({ navigation }) => {
  const [yourChitsdata, setyourChitsdata] = useState([])

  const [userDetails, setUserDetails] = useState("")
  const dispatch = useDispatch()
  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();
  const [screen, setScreen] = useState("My Chits")
  const onPress = (title) => {

    setScreen(title)
  }
  const onClick = () => {

    navigation.navigate("Schemedetails", {
      item: 86,

    })
  }
  useEffect(() => {


    setYourchits()
  }, [])
  const setYourchits = async () => {

    await AsyncStorage.getItem('@loggedUser').then(result => {

      const loggedUser = JSON.parse(result);
      setUserDetails(loggedUser)
      dispatch(getYourchits(loggedUser.id)).then((resp) => {

        setyourChitsdata(resp.records)
      })


    });

  }
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: font * 21 }]}>Chits</Text>
      <View style={{ marginTop: height * (2 / 100), marginBottom: height * (2 / 100) }}>
        <TopBar screenName={screen} onClick={onPress} ></TopBar>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyChitCardSlider yourchitsdata={yourChitsdata} screen={screen} onButton={onClick}></MyChitCardSlider>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 15, paddingLeft: 15, paddingRight: 15, backgroundColor: "#F7F6F2", marginBottom: "20%"
  },

  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',

  },
});
export default ChitsScreen;
