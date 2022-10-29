//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Modal,
  RefreshControl,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useDispatch, useSelector, connect} from 'react-redux';
import {getSchemetransactions} from '../../redux/actions';
import {getYourchits} from '../../redux/actions';
import {getNewchits} from '../../redux/actions';
/**************************************** Import components ***********************************************************/
import TopBar from './topBar';
import {JoinChit} from '../../redux/actions';
import ModalComponent from '../../components/Modal/modalComponent';
import MyChitCardSlider from './chitsCards';
import setLocalchits from '../../hooks/savetoLocal';
import {updateStates} from '../../redux/actions';

const ChitsScreen = ({navigation}) => {
  const statechange = useSelector(state => state.updatestates?.states);
  const [modalVisible, setModalvisible] = useState(false);
  const [yourChitsdata, setyourChitsdata] = useState([]);
  const [newChitsdata, setnewChitsdata] = useState([]);
  const [requested, setRequested] = useState([]);
  const [handler, sethandler] = useState();
  const [userDetails, setUserDetails] = useState('');
  const [id, setId] = useState('');
  const [idx, setIdx] = useState('');
  const [name, setName] = useState('initial');
  const dispatch = useDispatch();
  const font = useWindowDimensions().fontScale;
  const {height, width} = useWindowDimensions();
  const [screen, setScreen] = useState('My Chits');
  const onPress = title => {
    setScreen(title);
  };
  const onClick = params => {
    console.log(params, 'oncliqqqqqqqqqqqqqqqqqqqqqqqqqqque');
    dispatch(getSchemetransactions(userDetails.id, params?.scheme_id)).then(
      resp => {
        navigation.navigate('Schemedetails', {
          item: params,
          transactions: resp.records,
        });
      },
    );
  };

  useEffect(() => {
    setYourchits();
  }, [statechange]);
  const setYourchits = async () => {
    await AsyncStorage.getItem('@loggedUser').then(result => {
      const loggedUser = JSON.parse(result);
      setUserDetails(loggedUser);
      dispatch(getYourchits(loggedUser.id)).then(resp => {
        if (resp.error === true) {
          setyourChitsdata([]);
          Alert.alert('Looks like your authentication is expired');
          AsyncStorage.clear();
          navigation.navigate('LoginScreen');
        } else {
          setyourChitsdata(resp.records);
        }
      });
      dispatch(getNewchits(loggedUser.id)).then(resp => {
        if (resp.error === true) {
          setnewChitsdata([]);
          Alert.alert('Looks like your authentication is expired');
          AsyncStorage.clear();
          navigation.navigate('LoginScreen');
        } else {
          setnewChitsdata(resp.records);
        }
      });
    });
  };
  const handleModal = () => {
    setModalvisible(!modalVisible);
    requested.pop(id);
  };

  const modify = param => {
    function check(val, index) {
      return index != param;
    }
    const result = newChitsdata.filter(check);
    setnewChitsdata(result);
  };
  const action = () => {
    dispatch(
      JoinChit({
        email_id: userDetails?.email_id,
        scheme_id: id,
      }),
    ).then(resp => {
      console.log(
        resp,
        'joinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnchittttttttttttttttttttttttt',
      );
      if (resp?.message == 'success') {
        setModalvisible(!modalVisible);

        Toast.show({
          type: 'success',
          text1: 'Request submitted successfully',
          text2:
            'Once your request is approved by admin it will be reflected in My Chits section',
        });
        handler;
        setLocalchits(id);
        setYourchits();
        console.log(
          'setlocalchitscalled--------------------------------------------',
        );
      }
    });
  };

  const setData = (chitid, chitindex, chitname, setter) => {
    setId(chitid);
    setIdx(chitindex);
    setName(chitname);
    sethandler(setter);
    setModalvisible(!modalVisible);
  };
  const setrequested = param => {
    const v = requested;
    v.push(param);
    console.log(v, 'vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
    setRequested(v);
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    dispatch(updateStates(true));
    wait(2000).then(() => dispatch(updateStates(false)));
  }, []);
  const NewchitsData = newChitsdata;
  console.log(
    NewchitsData,
    'no datata..........................................................................................',
  );
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, {fontSize: font * 21}]}>Chits</Text>
      <View
        style={{
          marginTop: height * (2 / 100),
          marginBottom: height * (2 / 100),
        }}>
        <TopBar screenName={screen} onClick={onPress}></TopBar>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={statechange} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {yourChitsdata.length < 1 && screen == 'My Chits' ? (
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: font * 20,
                alignSelf: 'center',
                marginTop: '14%',
                marginBottom: '7%',
              },
            ]}>
            You have not joined any chits yet
          </Text>
        ) : (
          <View></View>
        )}
        {newChitsdata.length < 1 && screen == 'New Plans' ? (
          <Text
            style={[
              styles.cardTitle,
              {
                fontSize: font * 20,
                alignSelf: 'center',
                marginTop: '14%',
                marginBottom: '7%',
              },
            ]}>
            Sorry there is no new chits available now
          </Text>
        ) : (
          <View></View>
        )}
        <MyChitCardSlider
          setrequested={setrequested}
          requested={requested}
          setData={setData}
          modify={modify}
          handlemodal={handleModal}
          userdata={userDetails}
          yourchitsdata={yourChitsdata}
          screen={screen}
          newchitsdata={newChitsdata}
          onButton={onClick}></MyChitCardSlider>
      </ScrollView>
      <ModalComponent
        action={action}
        textData1={'New scheme request'}
        textData2={''}
        textData3={'Are you sure that you want to join'}
        textData4={`"${name}?"`}
        modalVisible={modalVisible}
        onmodalPress={handleModal}></ModalComponent>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F7F6F2',
    marginBottom: '20%',
  },

  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
  },
});
export default ChitsScreen;
