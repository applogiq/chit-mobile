//This is a form
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import { monthArray } from '../../utils/formatDate';
/**************************************** Import components ***********************************************************/

const ChitInfoForm = ({ data }) => {
  const { height, width } = useWindowDimensions();

  const font = useWindowDimensions().fontScale;
  const dueDate = data?.due_date.substring(0, 10);
  const NewDate = new Date(dueDate)
          const month = monthArray[NewDate.getMonth()];
          const DateFormat = `${month} ${NewDate.getDate()}, ${NewDate.getFullYear()}`
          console.log(DateFormat, month, );
  console.log(data, 'infor formmmmmmmmmm');
  return (
    <View style={[styles.container, {}]}>
      <View style={styles.infoContainer}>
        <Text style={styles.titleOne}>Beneficiary Name</Text>
        <Text style={styles.titleTwo}>{data?.name}</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Total Months</Text>
        <Text style={styles.titleTwo}>{data?.total_month} Months</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Membership No</Text>
        <Text style={styles.titleTwo}>{data?.membership_id}</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Group Code</Text>
        <Text style={styles.titleTwo}>{data?.group_code}</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Branch</Text>
        <Text style={styles.titleTwo}>{data?.branch_name}</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Monthly Installment</Text>
        <Text style={styles.titleTwo}>₹{data?.monthly_installment}</Text>
      </View>
      <View  style={styles.infoContainer}>
        <Text style={styles.titleOne}>Next Due</Text>
        <Text style={styles.titleTwo}>{DateFormat}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  infoContainer: {
    marginTop:8,
    marginBottom:8
  },

  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 7,
    paddingTop: 17,
    paddingLeft: 17,
    paddingBottom: 17,
    justifyContent: 'space-between',
  },
  titleOne: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
  },
  titleTwo: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
    fontSize: 17,
  },
});
export default ChitInfoForm;
