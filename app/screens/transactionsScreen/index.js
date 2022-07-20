//tansactions screen
/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Image, ScrollView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**************************************** Import components ***********************************************************/
import { IMAGES } from '../../common/images';
import SchemeTransactions from '../schemeDetails/transactions';
import CalendarComponent from './calender';
import { getFiltertransactions } from '../../redux/actions/filtertransactionsAction';

const Transactions = () => {
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [endMonth, setendMonth] = useState("")
  const [startMonth, setstartMonth] = useState("")
  const [transactions, settransactions] = useState([])
  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();


  useEffect(() => {
    getDate()

  }, []);

  useEffect(() => {

    setTransactions()

  }, [startMonth, endMonth])
  const getDate = () => {
    const date = new Date()
    console.log(date, "?????????????????????????????????????????")
    const endyear = date.getFullYear()
    const endmonth = date.getMonth() + 1
    console.log(endmonth, "============================")
    const endday = date.getDate()
    let endMillidate = Date.parse(date)

    let startmillidate = endMillidate - 2592000000

    let startDate = new Date(startmillidate)
    const startyear = startDate.getFullYear()
    const startmonth = startDate.getMonth() + 1

    const startday = startDate.getDate()

    setendMonth(endday + "/" + endmonth + "/" + endyear)
    setstartMonth(startday + "/" + startmonth + "/" + startyear)
  }
  const setDates = (start, end) => {
    setstartMonth(start)
    setendMonth(end)
  }
  const handleModal = () => {
    setModalVisible(!modalVisible)
  }
  const setTransactions = async () => {

    await AsyncStorage.getItem('@loggedUser').then(result => {

      const loggedUser = JSON.parse(result);

      dispatch(getFiltertransactions(loggedUser.id, startMonth, endMonth)).then((resp) => {


        if (resp?.records.length > 0) {
          settransactions(resp?.records)
        } else {
          settransactions([])
        }
        console.log(resp?.records, "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")

      })


    });

  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: font * 21 }]}>Transactions</Text>
      <View style={[styles.dateContainer,]}>
        <Text style={styles.topText}>
          Showing results from
        </Text>
        <View style={styles.datescontainers}>
          <View style={[styles.datePicker, { height: height * (5 / 100), width: width * (80 / 100) }]}>
            <Text style={styles.dateText}>{startMonth}</Text>
            <Text style={styles.dateText}>to</Text>
            <Text style={styles.dateText}>{endMonth}</Text>
          </View>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <View style={[styles.datePicker, { height: height * (5 / 100), width: width * (10 / 100), justifyContent: "center" }]}>
              <Image style={{ height: 16, width: 16, resizeMode: "contain" }} source={IMAGES.filter} ></Image>
            </View>
          </Pressable>
        </View>
      </View>

      <ScrollView style={{ marginTop: "5%", marginBottom: "10%" }} showsVerticalScrollIndicator={false}>
        {transactions[0] != undefined ?
          <View><SchemeTransactions hidetitle={true} data={transactions}
          ></SchemeTransactions></View> : <View style={{ height: 200, width: "100%", alignItems: "center", justifyContent: "center" }}><Text style={{ fontSize: 25, fontFamily: "SourceSansPro-SemiBold", color: "#9D6939" }}>no records found</Text></View>
        }


      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { height: height * (64 / 100), width: width * (92 / 100) }]}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
              <Text style={[styles.topText, { fontSize: 18, marginLeft: "-1.5%" }]}>Filter</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image style={styles.close} source={IMAGES.close_icon}></Image>
              </TouchableOpacity>

            </View>
            <CalendarComponent handlemodal={handleModal} setdates={setDates} start={startMonth} end={endMonth}></CalendarComponent>

          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#F7F6F2", paddingTop: 16, paddingLeft: 16, paddingBottom: 16, paddingRight: 16
  }, headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
  },
  topText: {
    color: "rgba(65, 39, 15, 0.8)",
    fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, fontSize: 12
  },
  datePicker: { backgroundColor: "white", borderRadius: 6, flexDirection: "row", alignItems: "center" },
  dateContainer: { marginTop: "3%" },
  datescontainers: { flexDirection: "row", justifyContent: "space-between", marginTop: "1.5%" },
  dateText: {
    color: "rgba(65, 39, 15, 0.8)",
    fontFamily: "SourceSansPro-SemiBold", fontWeight: "600", lineHeight: 21, fontSize: 14, marginLeft: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3);"
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(247, 246, 242, 1)",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  close: { height: 14, width: 14 },


});
export default Transactions;
