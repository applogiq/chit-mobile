import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import Header from '../../components/Header/header';
import InfoCard from './InfoCard';
import ChitInfoForm from './infoForm';
import SchemeTransactions from './transactions';

const SchemedetailsScreen = ({navigation, transactions, route}) => {
  const Items = route.params.item;
  const Transaction = route.params.transactions;
  const pendingMonths = Items?.total_month - Items?.paid_month;
  console.log(Items, Transaction, '::::::::::::::::::::::::');
  const item = {
    scheme_name: 'Premium Gold',
    total_amount: '10,000',
    collected_weight: '1.025',
    name: 'Surya Narayana',
    total_month: 15,
    membership_id: '0215202',
    group_code: 'GAV0212',
    branch_name: 'Tirupur',
    monthly_installment: '1250.00',
    due_date: '2022-05-20',
  };
  const Transactions = [
    {
      id: 1,
      created_at: '2022-05-20',
      amount: '1200000',
      scheme_name: 'Golden Harvest',
      group_code: 'GAV0212',
    },
    {
      id: 2,
      created_at: '2022-05-20',
      amount: '1200000',
      scheme_name: 'Golden Harvest',
      group_code: 'GAV0212',
    },
    {
      id: 2,
      created_at: '2022-05-20',
      amount: '1200000',
      scheme_name: 'Golden Harvest',
      group_code: 'GAV0212',
    },
    {
      id: 2,
      created_at: '2022-05-20',
      amount: '1200000',
      scheme_name: 'Golden Harvest',
      group_code: 'GAV0212',
    },
    {
      id: 2,
      created_at: '2022-05-20',
      amount: '1200000',
      scheme_name: 'Golden Harvest',
      group_code: 'GAV0212',
    },
  ];
  const PaymentsData = [
    {id: 1, Due_amount: '₹2000.00', date: '2022-10-10'},
    {id: 2, Due_amount: '₹2000.00', date: '2022-11-10'},
    {id: 3, Due_amount: '₹2000.00', date: '2022-11-16'},
    {id: 4, Due_amount: '₹2000.00', date: '2022-12-12'},
    {id: 5, Due_amount: '₹2000.00', date: '2022-12-14'},
    {id: 6, Due_amount: '₹2000.00', date: '2022-12-16'},
    {id: 7, Due_amount: '₹2000.00', date: '2023-01-10'},
    {id: 8, Due_amount: '₹2000.00', date: '2023-02-10'},
    {id: 9, Due_amount: '₹2000.00', date: '2023-01-14'},
    {id: 10, Due_amount: '₹2000.00', date: '2023-02-02'},
  ];
  const {height, width} = useWindowDimensions();
  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#F7F6F2'}}>
      <Header
        Type={'Premium Gold'}
        onPress={() => {
          navigation.navigate('Chits');
        }}
      />
      <ScrollView>
        <View style={{marginVertical: height * (2 / 100)}}>
          <InfoCard
            pendingMonths={pendingMonths}
            onPress={() => {navigation.navigate('PaymentStats', {data: PaymentsData})}}
            data={Items}
          />
        </View>
        <View style={{marginVertical: height * (2 / 100)}}>
          <ChitInfoForm pendingMonths={15} data={Items} />
        </View>
        <View style={{marginVertical: height * (2 / 100)}}>
          <SchemeTransactions
            transaction
            onPress={() => {
              navigation.navigate('Tran0sactionsList', {data: Transactions});
            }}
            data={Transactions}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SchemedetailsScreen;
