import React from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import Header from '../../components/Header/header';
import SchemeTransactions from './transactions';

const TransactionsList = ({navigation, route}) => {
  const Data = route?.params?.data;
  console.log('', Data);
  return (
    <SafeAreaView style={{flex: 1, padding: 10, backgroundColor: '#F7F6F2'}}>
         <Header
        Type={'Transactions'}
        navigation={navigation}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginVertical: 10}}>
        <SchemeTransactions
          onPress={() => {
            navigation.navigate('TransactionsList', {data: Data});
          }}
          data={Data}
        />
      </View>
    </SafeAreaView>
  );
};
export default TransactionsList;
