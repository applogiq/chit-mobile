//A card slider componenet
/**************************************** Import Packages ***********************************************************/
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {JoinChit} from '../../redux/actions';
import {useDispatch, useSelector, connect} from 'react-redux';
import {updateStates} from '../../redux/actions';
/**************************************** Import components ***********************************************************/
import getLocalchits from '../../hooks/getfromLocalchits';

const Data = [{id: 1}, {id: 2}, {id: 3}, {id: 4}];
//change this to real data
const MychitsCard = ({
  screenName,
  onpress,
  data,
  userdata,
  handlemodal,
  idx,
  modify,
  setData,
  requested,
  setrequested,
}) => {
  const [middle, setmiddle] = useState(true);
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  //for responsiveness

  //Get fontscale from and use it to resize fonts
  useEffect(() => {
    console.log(requested, '??????????');
  }, [middle]);

  console.log(data, 'new objectssssssssssssssssssssssssssssssssssss');
  const OnClick = () => {
    onpress(data);
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    dispatch(updateStates(true));
    wait(2000).then(() => dispatch(updateStates(false)));
  }, []);
  const onJoin = () => {
    setData(data?.id, idx, data?.name, setter);
    setrequested(data?.id);
    onRefresh();
  };

  const setter = () => {
    setmiddle(!middle);
  };
  console.log(data, 'ponaswinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
  const pendingMonths = data?.total_month - data?.paid_month;

  // let state = requested.includes(data?.id);

  return data?.is_approved === 'approved' ? (
    <View></View>
  ) : (
    <View
      style={[
        styles.container,
        {
          height: height * (25 / 100),
          width: width * (92 / 100),
          marginBottom: '3%',
        },
      ]}>
      {screenName == 'My Chits' ? (
        <View style={styles.innerContainer}>
          <View style={styles.boxSeperator}>
            <View style={styles.flexB}>
              <Text style={styles.textOne}>Chit name</Text>
              <Text style={styles.textTwo}>{data?.scheme_name}</Text>
            </View>
            <View style={styles.flexB}>
              <Text style={[styles.textOne, {alignSelf: 'flex-end'}]}>
                Total amount
              </Text>
              <Text style={[styles.textTwo, {alignSelf: 'flex-end'}]}>
                ₹{data?.total_amount}
              </Text>
            </View>
            <View style={[styles.flexB, {alignContent: 'flex-end'}]}>
              <Text style={[styles.textOne]}>Months Pending</Text>
              <Text style={[styles.textTwo]}>{pendingMonths}</Text>
            </View>
            <View style={[styles.flexB, {alignContent: 'flex-end'}]}>
              <Text style={[styles.textOne, {alignSelf: 'flex-end'}]}>
                Due Bill
              </Text>
              <Text style={[styles.textTwo, {alignSelf: 'flex-end'}]}>
                ₹{data?.monthly_installment}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => OnClick()}
              style={styles.buttonView}>
              <Text style={styles.buttonTitle}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.boxSeperator}>
            <View style={styles.flexB}>
              <Text style={styles.textOne}>Chit name</Text>
              <Text style={styles.textTwo}>{data?.name}</Text>
            </View>
            <View style={styles.flexB}>
              <Text style={[styles.textOne, {alignSelf: 'flex-end'}]}>
                Total amount
              </Text>
              <Text style={[styles.textTwo, {alignSelf: 'flex-end'}]}>
                ₹{data?.total_amount}
              </Text>
            </View>
            <View style={[styles.flexB, {alignContent: 'flex-end'}]}>
              <Text style={[styles.textOne]}>Total Months</Text>
              <Text style={[styles.textTwo]}>{data?.total_month}</Text>
            </View>
            <View style={[styles.flexB, {alignContent: 'flex-end'}]}>
              <Text style={[styles.textOne, {alignSelf: 'flex-end'}]}>
                Monthly Installment
              </Text>
              <Text style={[styles.textTwo, {alignSelf: 'flex-end'}]}>
                ₹{data?.monthly_installment}
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {data?.is_approved === 'requested' ? (
              <TouchableOpacity style={styles.buttonView}>
                <Text style={styles.buttonTitle}>Requested</Text>
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => onJoin()}
                  style={[styles.buttonView, {width: width * (70 / 100)}]}>
                  <Text style={styles.buttonTitle}>Join Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginRight: 10,
    borderRadius: 4,
  },
  innerContainer: {flex: 1, flexDirection: 'row', flexWrap: 'wrap'},
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
  subContainer: {
    height: '65%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  flexB: {flexBasis: '50%'},
  textTop: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
  },
  textBottom: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
  },
  buttonContainer: {
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    height: '66%',
    width: '80%',
    backgroundColor: 'rgba(213, 186, 143, 1)',
    borderRadius: 6,
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {color: 'white', fontFamily: 'SourceSansPro-SemiBold'},
  boxSeperator: {
    height: '65%',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-between',
  },
  textOne: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
  },
  textTwo: {
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
const MyChitCardSlider = ({
  screen,
  onButton,
  yourchitsdata,
  newchitsdata,
  userdata,
  handlemodal,
  modify,
  setData,
  requested,
  setrequested,
}) => {
  const data =
    screen === 'My Chits'
      ? yourchitsdata
      : screen === 'New Plans'
      ? newchitsdata
      : null;
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        scrollEnabled={true}
        snapToAlignment="center"
        ItemSeparatorComponent={separatorItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <MychitsCard
              setrequested={setrequested}
              requested={requested}
              setData={setData}
              modify={modify}
              idx={index}
              handlemodal={handlemodal}
              userdata={userdata}
              data={item}
              screenName={screen}
              onpress={onButton}
              yourchitsdata={yourchitsdata}></MychitsCard>
          );
        }}></FlatList>
    </View>
  );
};
export default MyChitCardSlider;
