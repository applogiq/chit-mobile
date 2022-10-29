//A card slider componenet
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';

/**************************************** Import components ***********************************************************/
const Data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
//change this to real data
const YourchitsCard = ({data, onClick}) => {
  console.log(data, 'urchitscardsss');
  const {height, width} = useWindowDimensions();
  //for responsiveness
  const font = useWindowDimensions().fontScale;
  //Get fontscale from and use it to resize fonts

  const nextDue = data.due_date.substring(0, 10);

  // const newdate = new Date(data.due_date)

  const onpress = () => {
    onClick(data);
  };
  return (
    <View
      style={[
        styles.container,
        {
          width: width * (70 / 100),
          marginBottom: '3%',
        },
      ]}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <Text style={[{fontSize: font * 14}, styles.titleOne]}>
            Chit name
          </Text>
          <Text style={[{fontSize: font * 16}, styles.titleTwo]}>
            {data?.scheme_name}
          </Text>
        </View>
        <View style={[styles.nameContainer, {alignItems: 'flex-end'}]}>
          <Text style={[{fontSize: font * 14}, styles.titleOne]}>Due Bill</Text>
          <Text style={[{fontSize: font * 16}, styles.titleTwo]}>
            ₹{data.monthly_installment}
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text style={[{fontSize: font * 14}, styles.titleOne]}>
            Upcoming Due
          </Text>
          <Text style={[{fontSize: font * 16}, styles.titleTwo]}>
            {nextDue}
          </Text>
        </View>
        <View
          style={[
            styles.nameContainer,
            {justifyContent: 'flex-end', alignItems: 'flex-end'},
          ]}>
          <TouchableOpacity
            onPress={() => onpress()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height * (5 / 100),
              width: width * (20 / 100),
              borderRadius: 5,
              backgroundColor: 'rgba(213, 186, 143, 1)',
            }}>
            <Text
              style={[styles.titleTwo, {color: 'white', fontSize: font * 15}]}>
              Pay Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    marginRight: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  nameContainer: {
    flexBasis: '50%',
    flex: 1,
    height: '40%',
    width: '100%',
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
  },
});
//small seperator itemm for flatlist
const separatorItem = () => {
  return <View style={styles.separatorView} />;
};
//mainslider component
const YourChitCardSlider = ({data, onClick}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={{marginLeft: width * (3.3 / 100)}}>
      <FlatList
        data={data}
        keyExtractor={item => item}
        horizontal
        scrollEnabled={true}
        snapToAlignment="center"
        ItemSeparatorComponent={separatorItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return <YourchitsCard data={item} onClick={onClick}></YourchitsCard>;
        }}></FlatList>
    </View>
  );
};
export default YourChitCardSlider;
