/**************************************** Import Packages ***********************************************************/
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity, Modal, Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/**************************************** Import components ***********************************************************/
import { LogoutUser } from '../../redux/actions';
import { connect, useSelector } from 'react-redux';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { IMAGES } from '../../common/images';


const ProfileScreen = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [filePath, setFilePath] = useState(IMAGES.profile_avatar);
  const [userDetails, setUserDetails] = useState({ "name": "-" })
  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();
  //for responsiveness
  useEffect(() => {
    AsyncStorage.getItem('@loggedUser').then(result => {

      const loggedUser = JSON.parse(result);

      setUserDetails(loggedUser)
    });
  }, [])
  const onLogout = () => {
    setModalVisible(!modalVisible)

  }
  const handleLogout = () => {
    props.LogoutUser({ "email_id": userDetails?.email_id }).then(response => {
      setModalVisible(!modalVisible)
      props.navigation.navigate('LoginScreen')
    })
  }
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
    } else return true;
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
    } else return true;
  };

  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,


      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
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
        response?.assets.map(item => setFilePath({ "uri": item.uri }))
      });
    }
  };

  const chooseFile = () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
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

      response?.assets.map(item => setFilePath({ "uri": item.uri }))
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, { fontSize: font * 21 }]}>Profile</Text>
      </View>



      <View
        style={{
          height: height * (20 / 100),
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={filePath}
          style={styles.image}></Image>
        <Pressable onPress={() => captureImage()} >
          <Image
            resizeMode="contain"
            source={IMAGES.image_edit}
            style={{ height: 25, width: 25, marginTop: "-4%", marginLeft: "20%", }}></Image>
        </Pressable>

      </View>
      <View style={{ height: '40%' }}>
        <Text style={[styles.tableTitles, { fontSize: font * 16 }]}>
          Basic Info
        </Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>Name</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails.name}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>
              Email address
            </Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails?.email_id}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>
              Mobile number
            </Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails?.mobile_number}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>Country</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails?.country}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>State</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails?.state}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>City</Text>
            <View style={styles.cardItems}>
              <Text
                style={[styles.title, { fontSize: font * 14, color: 'black' }]}>
                {userDetails?.city}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: '7.5%', marginTop: '3%' }}>
        <Text style={[styles.tableTitles, { fontSize: font * 16 }]}>
          Security
        </Text>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <Text style={[styles.title, { fontSize: font * 13 }]}>
              Change password
            </Text>

            <View style={styles.cardItems}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("ChangePassword", {
                  id: userDetails?.id,


                })}>
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
      <View style={{ height: '7.5%', marginTop: '12%' }}>
        <View style={styles.detailsCard}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => onLogout()}>
              <Text style={[styles.logout, { fontSize: font * 14 }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
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
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: "4%" },

  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
  },
  image: { height: "65%", width: "30%", borderRadius: 100, resizeMode: 'contain' },
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
  row: { flexDirection: 'row' },
  cardItems: { flexDirection: 'row', justifyContent: 'flex-end', flex: 1 },
  logout: {
    color: 'rgba(65, 39, 15, 0.8)',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(157, 105, 57, 1)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'SourceSansPro-SemiBold',
  }
});

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  LogoutUser: data => dispatch(LogoutUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);