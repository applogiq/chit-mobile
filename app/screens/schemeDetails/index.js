/**************************************** Import Packages ***********************************************************/
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {updateStates} from '../../redux/actions';
/**************************************** Import components ***********************************************************/
import {IMAGES} from '../../common/images';

import {useDispatch, useSelector} from 'react-redux';
import {
  getRecenttransactions,
  getSchemetransactions,
} from '../../redux/actions';
import {
  CreatePayment,
  VerifyPayment,
} from '../../redux/actions/createpaymentAction';
import {paymentFunction} from '../../utils/payment';
import InfoCard from './infoCard';
import ChitInfoForm from './infoForm';
import SchemeTransactions from './transactions';

const SchemeDetails = ({navigation, route}) => {
  const statechange = useSelector(state => state.updatestates?.states);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const {item, transactions} = route.params;
  const [Transactions, setTransactions] = useState(transactions);
  const font = useWindowDimensions().fontScale;
  const {height, width} = useWindowDimensions();
  const pendingMonths = item?.total_month - item?.paid_month;
  //for responsiveness

  const OnBackpress = () => {
    navigation.navigate('Chits');
  };
  console.log(pendingMonths, '::::::::::::::::::::');
  const handleRes = (res, resp) => {
    if (res.razorpay_order_id) {
      dispatch(
        VerifyPayment({
          amount: item.monthly_installment,
          payment_id: resp?.records?.id,
          group_user_id: item.id,
          razorpay_order_id: res.razorpay_order_id,
          razorpay_payment_id: res.razorpay_payment_id,
          razorpay_signature: res.razorpay_signature,
        }),
      ).then(respo => {
        if (respo?.message == 'payment verified') {
          dispatch(getSchemetransactions(item.user_id, item.scheme_id)).then(
            response => {
              setTransactions(response.records);
            },
          );
          dispatch(getRecenttransactions(item.user_id));
        }
      });
    }

    setDisabled(false);
    op();
    navigation.navigate('HomeScreen');
  };
  const onpayNow = () => {
    setDisabled(true);
    dispatch(
      CreatePayment({
        amount: item.monthly_installment * 100,
        group_user_id: item.id,
        scheme_id: item.scheme_id,
        user_id: item.user_id,
      }),
    ).then(async resp => {
      await AsyncStorage.getItem('@loggedUser').then(result => {
        const loggedUser = JSON.parse(result);

        if (resp.details.id != undefined && resp.details.id != null) {
          paymentFunction({
            amount: item.monthly_installment * 100,
            orederid: resp.details.id,
            email: loggedUser.email_id,
            phone: loggedUser.mobile_number,
            name: loggedUser.name,
            Resfun: handleRes,
            resp: resp,
          });
        }
      });
    });
  };
  const nextdue = item?.due_date.substring(0, 10);
  const comparedate = new Date(nextdue);
  const presentdate = new Date();

  const present = presentdate.getTime();
  const due = comparedate.getTime();
  console.log(present, due, '...........................................');
  const duetenure = due - present;
  console.log(duetenure, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  const op = () => {
    dispatch(updateStates(false));
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    dispatch(updateStates(true));
    wait(2000).then(() => dispatch(updateStates(false)));
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={statechange} onRefresh={onRefresh} />
        }
        style={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={{
              height: height * (3.5 / 100),
              width: width * (3.5 / 100),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => OnBackpress()}>
            <Image
              resizeMode="stretch"
              style={[
                styles.backIcon,
                {height: height * (2 / 100), width: width * (2 / 100)},
              ]}
              source={IMAGES.back_icon}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, {fontSize: font * 22}]}>
            Scheme Details
          </Text>
        </View>
        <View style={{marginTop: '5%'}}>
          <InfoCard pendingMonths={pendingMonths} data={item} />
        </View>
        <View style={{marginTop: '3%'}}>
          <ChitInfoForm data={item} />
        </View>
        <View style={{marginTop: '3%'}}>
          <SchemeTransactions data={Transactions} />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        {/* {due >= present && duetenure < 432000000 && duetenure >= 0 ? (
          <TouchableOpacity
            disabled={disabled}
            onPress={() => onpayNow()}
            style={styles.fooButton}>
            <Text style={styles.buttonTitle}>Pay Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={disabled} style={styles.fooButton}>
            <Text style={styles.buttonTitle}> No pending dues</Text>
          </TouchableOpacity>
        )} */}

        {due > present && duetenure < 432000000 && pendingMonths === '0' ? (
          <TouchableOpacity
            disabled={disabled && pendingMonths === '0' ? true : false}
            onPress={() => onpayNow()}
            style={styles.fooButton}>
            <Text style={styles.buttonTitle}>Pay upcoming due</Text>
          </TouchableOpacity>
        ) : due < present ? (
          <TouchableOpacity
            disabled={disabled && pendingMonths === '0' ? true : false}
            onPress={() => onpayNow()}
            style={styles.fooButton}>
            <Text style={styles.buttonTitle}>Pay overdue</Text>
          </TouchableOpacity>
        ) : due > present && duetenure > 432000000 ? (
          <TouchableOpacity
            disabled={disabled && pendingMonths === 0 ? true : false}
            style={styles.fooButton}>
            <Text style={styles.buttonTitle}>No Pending Dues</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 246, 242, 1)',
    paddingLeft: 11,
    paddingRight: 11,
  },
  headerContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  backIcon: {},
  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
    marginLeft: '5%',
  },
  footer: {
    height: '10%',
    backgroundColor: '#F7F6F2',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fooButton: {
    height: '65%',
    width: '94%',
    backgroundColor: 'rgba(213, 186, 143, 1)',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 18,
  },
});
export default SchemeDetails;
