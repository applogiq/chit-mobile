//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import {monthArray} from '../../utils/formatDate';
/**************************************** Import components ***********************************************************/

const SchemeTransactions = ({hidetitle, data, item}) => {
  const [Datas, setDatas] = useState(true);
  const onPress = () => {
    setDatas(data);
  };
  const onPressless = () => {
    setDatas(data?.slice(0, 5));
  };
console.log(Datas, ':::::::::::::::::::::::::::::::::::::::::::DATAS')
  const font = useWindowDimensions().fontScale;
  const {height, width} = useWindowDimensions();
  console.log(data, 'transactionsssssss evwedy89wdv');
  return (
    <View style={styles.container}>
      {hidetitle ? (
        <View></View>
      ) : (
        <Text style={styles.title}>Transactions</Text>
      )}
      {data == undefined ? (
        <Text
          style={[
            styles.cardTitle,
            {
              fontSize: font * 15,
              alignSelf: 'center',
              marginTop: '14%',
              marginBottom: '7%',
            },
          ]}>
          No records found
        </Text>
      ) : null}
      {typeof data === 'object' ? (
        data.length < 1 ? (
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: font * 15,
                alignSelf: 'center',
                marginTop: '14%',
                marginBottom: '7%',
              },
            ]}>
            No records found
          </Text>
        ) : null
      ) : null}
      <FlatList
        data={Datas}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: '#41270F1A',
            }}></View>
        )}
        scrollEnabled={true}
        snapToAlignment="center"
        renderItem={({item}) => {
          const date = item?.created_at.substring(0, 10);
          const NewDate = new Date(date);
          const month = monthArray[NewDate.getMonth()];
          const DateFormat = `${NewDate.getDate()} ${month} ${NewDate.getFullYear()}`;
          console.log(DateFormat, month);
          return (
            <View
              style={{
                padding: 16,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: font * 16,
                    color: 'rgba(65, 39, 15, 0.8)',
                    fontWeight: '600',
                    fontFamily: 'SourceSansPro-SemiBold',
                  }}>
                  {DateFormat}
                </Text>
                <Text
                  style={{
                    fontSize: font * 16,
                    color: 'rgba(65, 39, 15, 0.8)',
                    fontWeight: '600',
                    fontFamily: 'SourceSansPro-SemiBold',
                    marginLeft: width * (50 / 100),
                  }}>
                  ₹{item?.amount / 100}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: '3%'}}>
                <Text
                  style={{
                    fontSize: font * 14,
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

      {data?.length >= 4 && Datas?.length != data.length ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.button}>View more</Text>
        </TouchableOpacity>
      ) : null}
      {data?.length > 6 && Datas?.length == data?.length ? (
        <TouchableOpacity onPress={onPressless}>
          <Text style={styles.button}>View less</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 7,
    paddingTop: 17,
    paddingBottom: 17,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
    fontSize: 17,
    marginBottom: '2%',
  },
  footerText: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  button: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 21,
    color: '#41270FCC',
    textAlign: 'center',
  },
});
export default SchemeTransactions;
