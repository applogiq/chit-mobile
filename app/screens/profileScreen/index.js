/**************************************** Import Packages ***********************************************************/
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  PermissionsAndroid,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {setAsyncValue} from '../../utils/asyncHelper';
/**************************************** Import components ***********************************************************/
import {LogoutUser} from '../../redux/actions';
import {Postprofile} from '../../redux/actions';
import ModalComponent from '../../components/Modal/modalComponent';
import {connect, useSelector, useDispatch} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {IMAGES} from '../../common/images';
import {ScrollView} from 'react-native-gesture-handler';
import {updateStates} from '../../redux/actions';

const ProfileScreen = props => {
  const statechange = useSelector(state => state.updatestates?.states);
  const dispatch = useDispatch();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [filePath, setFilePath] = useState('');
  var [userDetails, setUserDetails] = useState({name: '-'});
  const font = useWindowDimensions().fontScale;
  const {height, width} = useWindowDimensions();
  console.log(
    userDetails,
    '2####################################################################################################',
  );
  //for responsiveness
  useEffect(() => {
    AsyncStorage.getItem('@loggedUser').then(result => {
      const loggedUser = JSON.parse(result);

      setUserDetails(loggedUser);
      setFilePath(loggedUser.profile_image);
    });
  }, []);
  const onLogout = () => {
    setModalVisible(!modalVisible);
  };
  const handleLogout = () => {
    props.LogoutUser({email_id: userDetails?.email_id}).then(response => {
      setModalVisible(!modalVisible);
      props.navigation.navigate('LoginScreen');
    });
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const captureImage = async () => {
    setModalVisible2(!modalVisible2);
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,

      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64v -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        response?.assets.map(item => {
          setFilePath(item.uri),
            ImgToBase64.getBase64String(item.uri)
              .then(base64String =>
                dispatch(
                  Postprofile(userDetails?.id, {
                    name: '',
                    mobile_number: '',
                    country: '',
                    state: '',
                    city: '',
                    pincode: '',
                    verification_document: '',
                    scheme_id: '',
                    is_approved: 0,
                    is_active: 0,
                    is_delete: 0,
                    profile_image: base64String,
                  }),
                ).then(resp => {
                  console.log(
                    resp,
                    '///////////////////////////////////////////////////=====================================================================================================================================================================================================================',
                  ),
                    (userDetails.profile_image = item.uri);

                  console.log(item.uri, 'expectooooooo');
                  setAsyncValue('@loggedUser', userDetails);
                  dispatch(updateStates(true));
                  Toast.show({
                    type: 'success',
                    text1: 'Profile updated successfully',
                    text2: 'Your profile picture updated successfully',
                  });
                  dispatch(updateStates(false));
                }),
              )
              .catch(err => console.log('base64 errrrrr'));
        });
      });
    }
  };

  const chooseFile = () => {
    setModalVisible2(!modalVisible2);
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);

      response?.assets.map(item => {
        setFilePath(item.uri),
          ImgToBase64.getBase64String(item.uri)
            .then(base64String =>
              dispatch(
                Postprofile(userDetails?.id, {
                  name: '',
                  mobile_number: '',
                  country: '',
                  state: '',
                  city: '',
                  pincode: '',
                  verification_document: '',
                  scheme_id: '',
                  is_approved: 0,
                  is_active: 0,
                  is_delete: 0,
                  profile_image: base64String,
                }),
              ).then(resp => {
                console.log(
                  resp,
                  '//////////////////////////////////////////////////---------------------------------------------------/',
                ),
                  (userDetails.profile_image = item.uri);
                console.log(item.uri, 'expectooooooo');
                setAsyncValue('@loggedUser', userDetails);
                dispatch(updateStates(true));
                Toast.show({
                  type: 'success',
                  text1: 'Profile updated successfully',
                  text2: 'Your profile picture updated successfully',
                });
                dispatch(updateStates(false));
              }),
            )
            .catch(err => console.log('base64 errrrrr'));
      });
    });
  };
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    dispatch(updateStates(true));
    wait(2000).then(() => dispatch(updateStates(false)));
  }, []);
  const pfimage = `${filePath}?time=${Date.now}`;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, {fontSize: font * 21}]}>Profile</Text>
      </View>

      <View
        style={{
          height: height * (20 / 100),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="cover"
          source={{
            uri:
              filePath == ''
                ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                : pfimage,
          }}
          style={styles.image}
        />

        <Pressable onPress={() => setModalVisible2(!modalVisible2)}>
          <Image
            resizeMode="contain"
            source={{
              uri: 'data:image/png;base64,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',
            }}
            style={{
              height: 25,
              width: 25,
              marginTop: '-4%',
              marginLeft: '20%',
              borderRadius: 25,
            }}
          />
        </Pressable>
      </View>
      <View style={{height: '40%'}}>
        <Text style={[styles.tableTitles, {fontSize: font * 16}]}>
          Basic Info
        </Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>Name</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails.name}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>
              Email address
            </Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails?.email_id}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>
              Mobile number
            </Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails?.mobile_number}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>Country</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails?.country}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>State</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails?.state}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>City</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, {fontSize: font * 14, color: 'black'}]}>
                {userDetails?.city}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{height: '7.5%', marginTop: '3%'}}>
        <Text style={[styles.tableTitles, {fontSize: font * 16}]}>
          Security
        </Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={[styles.title, {fontSize: font * 13}]}>
              Change password
            </Text>

            <View style={styles.cardItems}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('ChangePassword', {
                    id: userDetails?.id,
                  })
                }>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: font * 14,
                      color: 'black',
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  change
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: '7.5%', marginTop: '10%', alignItems: 'center'}}>
        <View style={styles.detailsCard}>
          <TouchableOpacity onPress={() => onLogout()}>
            <View
              style={[
                styles.row,
                {
                  width: width * (90 / 100),
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={[styles.logout, {fontSize: font * 14}]}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure want to logout?</Text>
            <View style={{ flexDirection: "row" }} >
              <Pressable
                style={[styles.button, styles.buttonClose, { marginRight: "5%" }]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose, { marginLeft: "5%" }]}
                onPress={() => handleLogout()}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal> */}
      <ModalComponent
        action={() => handleLogout()}
        textData1={'Confirm Logout Action'}
        textData3={'Are you sure you want to'}
        textData4={'Logout?'}
        modalVisible={modalVisible}
        onmodalPress={onLogout}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          setModalVisible2(!modalVisible2);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{}}>
              <Pressable
                onPress={() => {
                  setModalVisible2(!modalVisible2);
                }}>
                <Text
                  style={{
                    marginLeft: width * (70 / 100),
                    marginBottom: height * (2 / 100),
                    fontWeight: '700',
                    fontSize: 20,
                    color: 'black',
                  }}>
                  X
                </Text>
              </Pressable>
              <Text style={styles.modalText}>
                Choose an action to upload a picture
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: height * (2 / 100)}}>
              <Pressable
                onPress={() => captureImage()}
                style={[
                  styles.button,
                  styles.buttonClose,
                  {marginRight: width * (5 / 100)},
                ]}>
                <Text style={styles.textStyle}>Take a picture now</Text>
              </Pressable>
              <Pressable
                onPress={() => chooseFile()}
                style={[
                  styles.button,
                  styles.buttonClose,
                  {marginLeft: width * (5 / 100)},
                ]}>
                <Text style={styles.textStyle}>Choose from library</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3);'}} />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 246, 242, 1)',
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerContainer: {
    flexDirection: 'row',

    marginTop: '4%',
  },

  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
  },
  image: {
    height: '75%',
    width: '30%',
    borderRadius: 100,
  },
  tableTitles: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '600',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.8)',
  },
  detailsCard: {
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: '3%',
    alignContent: 'space-between',
    height: '85%',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontWeight: '400',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.6)',
  },
  row: {flexDirection: 'row'},
  cardItems: {flexDirection: 'row', justifyContent: 'flex-end', flex: 1},
  logout: {
    color: 'rgba(65, 39, 15, 0.8)',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.3);',
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'rgba(213, 186, 143, 1)',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'black',
    fontSize: 17,
  },
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  LogoutUser: data => dispatch(LogoutUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
