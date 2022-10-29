//Login screen of the the application
/**************************************** Import Packages ***********************************************************/
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Pressable,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
/**************************************** Import components ***********************************************************/
import Button from '../../components/Button/buttonComponent';
import InputField from '../../components/Input/inputComponent';
import {IMAGES} from '../../common/images';
import ModalComponent from '../../components/Modal/modalComponent';
import {LoginUser} from '../../redux/actions';
import {updateStates} from '../../redux/actions';
import {connect, useSelector, useDispatch} from 'react-redux';
/**************************************** Import common files ***********************************************************/
import {isEmpty, isValidEmail, isValidPassword} from '../../utils/validator';

const image = {uri: ''};
const LoginScreen = props => {
  const dispatch = useDispatch();

  const [useridentity, setUseridentity] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [identityerror, setIdentityerror] = useState('');
  const [passworderror, setPassworderror] = useState('');
  const [modaltext, setModaltext] = useState('');
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);

  const [disabled, setDisabled] = useState(true);

  const [modalVisible, setModalvisible] = useState(false);

  const {height, width} = useWindowDimensions();

  const font = useWindowDimensions().fontScale;
  //Get fontscale from and use it to resize fonts

  const handleInputidentity = childData => {
    setUseridentity(childData);
  };
  const handleInputpassword = childData => {
    setUserpassword(childData);
  };
  //callback to be send to child
  const resetStates = () => {
    setUseridentity('');
    setUserpassword('');
    setIdentityerror('');

    setLoading(false);
    setDisabled(true);

    setModalvisible(false);
    setLoader(false);
  };

  const doLoginValidation = () => {
    if (isEmpty(useridentity)) {
      setIdentityerror(
        'Please enter a valid email address or Phone number empty',
      );
    } else if (!isValidEmail(useridentity)) {
      setIdentityerror('Please enter a valid email address or Phone number');
    } else if (isValidEmail(useridentity)) {
      setIdentityerror('');
    }

    if (isEmpty(userpassword)) {
      setPassworderror('Please enter a valid Password');
    }

    if (isEmpty(useridentity)) {
      return false;
    } else if (!isValidEmail(useridentity)) {
      return false;
    } else if (isEmpty(userpassword)) {
      return false;
    } else {
      return true;
    }
  };

  const onloginPress = () => {
    if (doLoginValidation()) {
      setLoading(true);

      props
        .LoginUser({
          email_id: useridentity,
          password: userpassword,
        })
        .then(response => {
          if (response.message == 'user logged in') {
            setModaltext('Login Successful');
            setModalvisible(!modalVisible);
            setTimeout(() => {
              props.navigation.navigate('HomeScreen');
            }, 1500);
            setTimeout(() => {
              setModalvisible(!modalVisible);
            }, 500);
          } else {
            setModaltext('Please enter valid login credentials');
            setModalvisible(!modalVisible);
          }
        });

      resetStates();
    }
  };
  const handleModal = () => {
    setModalvisible(!modalVisible);
  };
  useEffect(() => {
    AsyncStorage.getItem('@token').then(result => {
      const loggedUser = JSON.parse(result);
      if (
        loggedUser.token.access_token != undefined ||
        loggedUser.token.access_token != null
      ) {
        props.navigation.navigate('HomeScreen');
      }
    });
  }, []);
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Login Success',
      text2: 'You have successfully logged in to your account',
    });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    dispatch(updateStates(true));
    wait(2000).then(() => dispatch(updateStates(false)));
  }, []);
  return (
    <ScrollView style={[styles.container]}>
      <View style={{height: height, width: width}}>
        <ImageBackground
          source={IMAGES.login_background}
          resizeMode="contain"
          style={[
            styles.image,
            {
              height: height,
              width: width,
              paddingLeft: width * (3 / 100),
              paddingRight: width * (3 / 100),
            },
          ]}>
          <View
            style={[styles.titleContainer, {marginTop: height * (35 / 100)}]}>
            <Text
              style={[
                styles.titleText,
                {fontSize: font * 24, lineHeight: font * 21},
              ]}>
              Hello,
            </Text>
            <Text
              style={[
                styles.titleText,
                {fontSize: font * 24, lineHeight: font * 21, marginTop: '3%'},
              ]}>
              Welcome to Luxury
            </Text>
          </View>
          <View style={{marginTop: height * (5 / 100)}}>
            <InputField
              data-testid={'email'}
              loading={loading}
              parentCallback={handleInputidentity}
              placeholder={''}
              title={'Email Address'}
              value={useridentity}
              errormessage={identityerror}
              maxchars={35}></InputField>
            <InputField
              data-testid={'password'}
              loading={loading}
              parentCallback={handleInputpassword}
              placeholder={''}
              title={'password'}
              value={userpassword}
              showicon={true}
              errormessage={passworderror}
              maxchars={25}></InputField>
          </View>
          <View
            style={{alignSelf: 'flex-end', marginTop: height * (1.5 / 100)}}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={[styles.forgotText, {fontSize: font * 13}]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            data-testid={'login'}
            enabled={useridentity != '' && userpassword != '' ? true : false}
            onpressparam={onloginPress}
            title={'Log In'}
            type={'large'}
            loading={loading}
            disabled={disabled}
            parentstyles={{marginTop: height * (4 / 100)}}></Button>
        </ImageBackground>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalvisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modaltext}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleModal()}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {},
  titleText: {
    fontFamily: 'Belleza-Regular',
    fontWeight: '400',
    color: '#9D6939',
  },
  forgotText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'rgba(65, 39, 15, 0.8)',
  },
  titleContainer: {},
  loader: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  loadContainer: {alignItems: 'center', justifyContent: 'center', flex: 1},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.3);',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    borderRadius: 20,
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
  },
});
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  LoginUser: data => dispatch(LoginUser(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
