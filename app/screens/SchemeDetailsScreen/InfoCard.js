//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
/**************************************** Import components ***********************************************************/

const InfoCard = ({data, pendingMonths, onPress}) => {
  const {height, width} = useWindowDimensions();
  console.log(data, 'infocard');
  const font = useWindowDimensions().fontScale;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.titleOne}>Total Amount</Text>
          <Text style={styles.titleTwo}>₹{data?.total_amount}</Text>
        </View>
        <View>
          <Text style={[styles.titleOne]}>Total Grams</Text>
          <Text style={[styles.titleTwo]}>{data?.collected_weight}gms</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: height * (3 / 100),
        }}>
        <View>
          <Text style={styles.titleOne}>Pending Payments</Text>
          <Text style={styles.titleTwo}>{pendingMonths}</Text>
        </View>
        <Pressable
          onPress={onPress}
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 13,
            borderRadius: 8,
            height: 33,
          }}>
          <Text
            style={{
              fontFamily: 'SourceSansPro-SemiBold',
              fontSize: 14,
              color: '#9D6939',
            }}>
            PayNow
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(213, 186, 143, 1)',
    borderRadius: 8,
    padding: 10,
  },
  divs: {flexBasis: '50%', justifyContent: 'space-evenly', height: '50%'},
  align: {alignSelf: 'flex-end'},
  titleOne: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 21,
    color: 'white',
  },
  titleTwo: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    color: 'white',
    fontSize: 18,
  },
});
export default InfoCard;
