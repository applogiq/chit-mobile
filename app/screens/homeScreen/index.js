//This is the homescreen
/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector, connect } from 'react-redux';
import { getMetals, yourchitsFailure } from '../../redux/actions';
import { getYourchits } from '../../redux/actions';
import { getRecenttransactions } from '../../redux/actions';


/**************************************** Import components ***********************************************************/
import { IMAGES } from '../../common/images';
import YourChitCardSlider from '../../components/YourchitsCard/yourchitsCard';
import MetalsCardSlider from '../../components/Metalscard/meatlsCard';


const HomeScreen = () => {
  const dispatch = useDispatch()
  const [goldPrice, setgoldPrice] = useState(0)
  const [silverPrice, setsilverPrice] = useState(0)
  const [diamondPrice, setdiamondPrice] = useState(0)
  const [yourChitsdata, setyourChitsdata] = useState([])
  const [recentTransactions, setrecentTransactions] = useState([])
  const [userDetails, setUserDetails] = useState("")
  const Data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];
  //change this to real data

  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();
  //For adding responsiveness

  useEffect(() => {

    setMetals()
    setYourchits()
  }, [])

  const setMetals = () => {

    dispatch(getMetals()).then((resp) => {
      resp?.records.map((item) => {

        if (item.name == "Gold" || item.name == "gold") {
          setgoldPrice(item.price)
        } else if (item.name == "Diamond" || item.name == "diamond") {
          setdiamondPrice(item.price)
        } else if (item.name == "Silver" || item.name == "silver") {
          setsilverPrice(item.price)
        }
      })
    })
  }
  const setYourchits = async () => {

    await AsyncStorage.getItem('@loggedUser').then(result => {

      const loggedUser = JSON.parse(result);
      setUserDetails(loggedUser)
      dispatch(getYourchits(loggedUser.id)).then((resp) => {

        setyourChitsdata(resp.records)
      })
      dispatch(getRecenttransactions(loggedUser.id)).then((resp) => {
        setrecentTransactions(resp.records)

      })

    });

  }

  console.log(typeof yourChitsdata, "1???....uymffthhhhhhhhhhhhhhhhhhhhhhhhhhh")
  console.log(typeof recentTransactions, "2???...gnrrsgggsgnnnnnnnnnnnnnnnnnnnnnn.")
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: height * (18 / 100),
          width: width * (100 / 100),
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <View style={styles.headerUpper}>
          <Image
            resizeMode="contain"
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04ZndPl3TMJ4GMG8UeiY8XGh8ifpnPGHTbw&usqp=CAU',
            }}
            style={{
              height: height * (7 / 100),
              width: height * (7 / 100),
              borderRadius: 50,
            }}></Image>
          <Pressable
            style={[
              {
                height: height * (5 / 100),
                width: height * (5 / 100),
                marginLeft: width * (68 / 100),
              },
              styles.headerNotifi,
            ]}>
            <Image
              resizeMode="contain"
              source={IMAGES.notify}
              style={{
                height: height * (2 / 100),
                width: height * (2 / 100),
                borderRadius: 50,
              }}></Image>
          </Pressable>
        </View>
        <Text
          style={[
            styles.titleText,
            {
              fontSize: font * 24,
              lineHeight: font * 21,
              marginTop: height * (2.5 / 100),
              marginBottom: height * (1 / 100),
            },
          ]}>
          Hello {userDetails?.name},
        </Text>
        <Text
          style={[
            styles.titleText,
            { fontSize: font * 24, lineHeight: font * 21 },
          ]}>
          Welcome to Luxury
        </Text>
      </View>
      <View style={{}}>
        <Text style={[styles.cardTitle, { fontSize: font * 15, marginLeft: 15 }]}>
          Your Chits
        </Text>
        <View style={styles.top}>
          {yourChitsdata.length < 1 ? <Text style={[styles.cardTitle, { fontSize: font * 20, alignSelf: "center", marginTop: "7%", marginBottom: "7%" }]} >You have not yet joined any chits</Text> : <View></View>}
          <YourChitCardSlider data={yourChitsdata}></YourChitCardSlider>
        </View>
      </View>
      <View style={styles.top}>
        <Text style={[styles.cardTitle, { fontSize: font * 15, marginLeft: 15 }]}>
          Today's Prices
        </Text>
        <View style={[styles.top]}>
          <MetalsCardSlider gold={goldPrice} silver={silverPrice} diamond={diamondPrice} ></MetalsCardSlider>
        </View>
      </View>
      <View style={[styles.top, { paddingLeft: 15, paddingRight: 15 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.cardTitle, { fontSize: font * 15 }]}>
            Recent Transactions
          </Text>
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: font * 13,
                marginLeft: width * (41 / 100),
                color: 'rgba(65, 39, 15, 0.6)',
              },
            ]}>
            View All
          </Text>
        </View>
        {typeof recentTransactions == "undefined" ? <Text style={[styles.cardTitle, { fontSize: font * 20, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >Your recent transactions will appear here</Text> : <View></View>}
        {recentTransactions?.length < 1 ? <Text style={[styles.cardTitle, { fontSize: font * 20, alignSelf: "center", marginTop: "14%", marginBottom: "7%" }]} >Your recent transactions will appear here</Text> : <View></View>}
        <View
          style={[
            styles.top,
            { backgroundColor: 'white', borderTopLeftRadius: 5, borderRadius: 5 },
          ]}>
          <FlatList
            data={recentTransactions}
            keyExtractor={item => item}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 0.5,
                  backgroundColor: 'grey',
                  width: '100%',
                }}></View>
            )}
            scrollEnabled={true}
            snapToAlignment="center"
            renderItem={({ item }) => {

              console.log(item, "<<<<<<<<<<<<<<<<<<<<<")
              return (
                <View
                  style={{
                    height: height * (10 / 100),
                    width: '100%',
                    paddingTop: '4%',
                    paddingRight: '3%',
                    paddingLeft: '3%',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: font * 14,
                        color: 'rgba(65, 39, 15, 0.8)',
                        fontWeight: '600',
                        fontFamily: 'SourceSansPro-SemiBold',
                      }}>
                      {item.created_at.substring(0, 10)}
                    </Text>
                    <Text
                      style={{
                        fontSize: font * 14,
                        color: 'rgba(65, 39, 15, 0.8)',
                        fontWeight: '600',
                        fontFamily: 'SourceSansPro-SemiBold',
                        marginLeft: width * (55 / 100),
                      }}>
                      ₹{item?.amount}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                    <Text
                      style={{
                        fontSize: font * 13,
                        color: 'rgba(65, 39, 15, 0.5)',
                        fontWeight: '600',
                        fontFamily: 'SourceSansPro-SemiBold',
                      }}>
                      {item?.scheme_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: font * 23,
                        color: 'rgba(65, 39, 15, 0.8)',
                        fontWeight: '600',
                        fontFamily: 'SourceSansPro-SemiBold',
                        marginLeft: width * (1 / 100),
                        marginTop: height * (-1.5 / 100),
                      }}>
                      .
                    </Text>
                    <Text
                      style={{
                        fontSize: font * 13,
                        color: 'rgba(65, 39, 15, 0.5)',
                        fontWeight: '600',
                        fontFamily: 'SourceSansPro-SemiBold',
                        marginLeft: width * (1 / 100),
                      }}>
                      {item?.group_code}
                    </Text>
                  </View>
                </View>
              );
            }}></FlatList>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F2',
    paddingTop: 15, marginBottom: "20%"
  },
  titleText: {
    fontFamily: 'Belleza-Regular',
    fontWeight: '400',
    color: '#9D6939',
  },
  cardTitle: {
    lineHeight: 24,
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'rgba(65, 39, 15, 0.6)',
    fontWeight: '600',
  },
  headerUpper: { flexDirection: 'row', width: '100%', alignItems: 'center' },
  headerNotifi: {
    borderRadius: 5,
    backgroundColor: 'rgba(213, 186, 143, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: { marginTop: 10 },
});


export default HomeScreen;
