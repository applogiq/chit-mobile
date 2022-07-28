//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector, connect } from 'react-redux';
import { getSchemetransactions } from '../../redux/actions';
import { getYourchits } from '../../redux/actions';
import { getNewchits } from '../../redux/actions';
/**************************************** Import components ***********************************************************/
import TopBar from './topBar';
import { JoinChit } from "../../redux/actions";
import ModalComponent from '../../components/Modal/modalComponent';
import MyChitCardSlider from './chitsCards';


const ChitsScreen = ({ navigation }) => {
  const [modalVisible, setModalvisible] = useState(false);
  const [yourChitsdata, setyourChitsdata] = useState([])
  const [newChitsdata, setnewChitsdata] = useState([])
  const [userDetails, setUserDetails] = useState("")
  const [id, setId] = useState("")
  const [idx, setIdx] = useState("")
  const [name, setName] = useState("initial")
  const dispatch = useDispatch()
  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();
  const [screen, setScreen] = useState("My Chits")
  const onPress = (title) => {

    setScreen(title)
  }
  const onClick = (params) => {
    console.log(params, "oncliqqqqqqqqqqqqqqqqqqqqqqqqqqque")
    dispatch(getSchemetransactions(userDetails.id, params?.scheme_id)).then((resp) => {
      navigation.navigate("Schemedetails", {
        item: params,
        transactions: resp.records

      })

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
      dispatch(getNewchits(loggedUser.id)).then((resp) => {

        setnewChitsdata(resp.records)
      })

    });

  }
  const handleModal = () => {
    setModalvisible(!modalVisible);
  };



  const modify = (param) => {
    function check(val, index) {
      return index != param
    }
    const result = newChitsdata.filter(check)
    setnewChitsdata(result)

  }
  const action = () => {
    dispatch(JoinChit({
      "email_id": userDetails?.email_id,
      "scheme_id": id
    })).then((resp) => {
      if (resp?.message == "success") {
        handleModal()
        modify(idx)
      }

    })
  }
  const setData = (chitid, chitindex, chitname) => {
    setId(chitid)
    setIdx(chitindex)
    setName(chitname)
    handleModal()
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: font * 21 }]}>Chits</Text>
      <View style={{ marginTop: height * (2 / 100), marginBottom: height * (2 / 100) }}>
        <TopBar screenName={screen} onClick={onPress} ></TopBar>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {yourChitsdata.length < 1 && screen == "My Chits" ? <Text style={[styles.cardTitle, { fontSize: font * 20, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >You have not joined any chits yet</Text> : <View></View>}
        {newChitsdata.length < 1 && screen == "New Plans" ? <Text style={[styles.cardTitle, { fontSize: font * 20, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >Sorry there is no new chits available now</Text> : <View></View>}
        <MyChitCardSlider setData={setData} modify={modify} handlemodal={handleModal} userdata={userDetails} yourchitsdata={yourChitsdata} screen={screen} newchitsdata={newChitsdata} onButton={onClick}></MyChitCardSlider>
      </ScrollView>
      <ModalComponent
        action={action}
        textData1={"New scheme request"}
        textData2={"You are about to send a request to join a new scheme ,"}
        textData3={"Are you sure that you want to join"}
        textData4={`"${name}?"`}
        modalVisible={modalVisible}
        onmodalPress={handleModal}></ModalComponent>
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
