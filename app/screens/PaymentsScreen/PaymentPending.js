import React, {useRef, useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {Pressable} from 'react-native';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {IMAGES} from '../../common/images';
import Header from '../../components/Header/header';
import {monthArray} from '../../utils/formatDate';

const PaymentsStats = ({navigation, route}) => {
  const data = route?.params?.data;
  
  const {height, width} = useWindowDimensions();
  const [select, setSelect] = useState([]);
  const [billPaymentAmount, setBillPaymentAmount] = useState(0);
  const [payselect, setPaySelect] = useState(1);

  const handleChange = item => {
    function checkPlace(data) {
      return data === item;
    }
    let val = select.find(checkPlace);
    if (val === undefined) {
      const data = [...select, item];
      let bill = 0;
      data.map(item => {
        const value = item?.Due_amount?.split('₹')[1];
        bill += parseFloat(value);
      });
      setSelect([...select, item]);
      setBillPaymentAmount(bill);
    } else {
      const result = select.filter(filterFunc);
      function filterFunc(value) {
        return value !== item;
      }
      let bill = 0;
      result.map(item => {
        const value = item?.Due_amount?.split('₹')[1];
        bill += parseFloat(value);
      });
      setBillPaymentAmount(bill);
      setSelect(result);
    }
  };
  const selectAllBill = () => {
    if (select.length < data.length) {
      let bill = 0;

      data.map(item => {
        const value = item?.Due_amount?.split('₹')[1];
        bill += parseFloat(value);
      });
      setBillPaymentAmount(bill);
      setSelect([...new Set(data.map(item => item))]);
    } else {
      setBillPaymentAmount(0);
      setSelect([]);
    }
    if (select.length === data.length) {
      setSelect([]);
    }
  };

  const handleOnPress = item => {
    if (select.length) {
      return handleChange(item);
    }
    alert('Long press to select');
    // here you can add you code what do you want if user just do single tap
    console.log('pressed');
  };

  const hasAllBillselected = data.length === select.length;
  return (
    <View style={styles.container}>
      <View style={{padding: 5, paddingBottom:0}}>
        <StatusBar barStyle="dark-content" backgroundColor="#F7F6F2" />
        <Header
          Type={'Pending Payments'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={{flex: 1, padding: 10, paddingBottom:0}}>
        <View style={[styles.subContainer, {marginVertical:10}]}>
          {select.length ? (
            <Pressable
              onPress={() => {
                selectAllBill();
              }}
              style={{flexDirection: 'row', alignItems: 'center',}}>
              <Image
                source={
                  hasAllBillselected ? IMAGES.Checkbox : IMAGES.Uncheckbox
                }
                resizeMode="contain"
                style={{height: 18, width: 18, marginHorizontal: 12}}
              />
              <Text style={styles.text}>Select All</Text>
            </Pressable>
          ) : (
            <Text style={[styles.text, {marginLeft:5}]}>
              Long press on the card to select and pay
            </Text>
          )}
        </View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const date = new Date(item.date);
            const month = date.getMonth();
            return (
              <Pressable
                onPress={() => handleOnPress(item)}
                onLongPress={() => handleChange(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: 'white',
                  marginVertical: 4,
                  borderRadius: 10,
                  padding: 10,
                  height: height * (11 / 100),
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable>
                    {select.length ? (
                      <Image
                        source={
                          select.find(function checkData(data) {
                            return data === item;
                          }) === undefined
                            ? IMAGES.Uncheckbox
                            : IMAGES.Checkbox
                        }
                        style={{height: 18, width: 18, marginRight: 12}}
                        resizeMode="contain"
                      />
                    ) : null}
                  </Pressable>
                  <View>
                    <Text style={styles.text1}>{item.Due_amount}</Text>
                    <Text style={styles.text}>{monthArray[month]}</Text>
                  </View>
                </View>
                <View>
                  {select.length ? null : (
                    <Pressable
                      style={{
                        backgroundColor: '#D5BA8F',
                        padding: 7,
                        paddingHorizontal: 15,
                        borderRadius: 8,
                      }}>
                      <Text
                        style={[styles.text1, {color: 'white', fontSize: 14}]}>
                        Pay Now
                      </Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      {select.length ? (
        <View
        style={{
          shadowColor: 'grey',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          flexDirection:'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          elevation: 3,
          padding: 15
        }}>
        <View style={{}}>
          <Text style={styles.text1}>₹ {billPaymentAmount}</Text>
          <Text style={styles.text}>Total Amount</Text>
        </View>
        <Pressable
          style={{
            backgroundColor: '#D5BA8F',
            paddingHorizontal: 50,
            paddingVertical: 10,
            borderRadius: 8,
          }}>
          <Text style={[styles.text1, {color: 'white', fontSize: 16}]}>
            Pay All
          </Text>
        </Pressable>
      </View>
      ) : null}
    
    </View>
  );
};
const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {flex: 1, backgroundColor: '#F7F6F2'},
  text: {
    color: '#41270F80',
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 14,
  },
  text1: {
    color: '#41270FCC',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 22,
  },
});
export default PaymentsStats;
