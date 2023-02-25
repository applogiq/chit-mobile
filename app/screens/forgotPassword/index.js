/**************************************** Import Packages ***********************************************************/
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector, connect} from 'react-redux';
/**************************************** Import components ***********************************************************/
import {IMAGES} from '../../common/images';
import {PostOtp} from '../../redux/actions';
import {verifyOtpfunc} from '../../redux/actions';
import ModalComponent from '../../components/Modal/modalComponent';
import InputField from '../../components/Input/inputComponent';
import Button from '../../components/Button/buttonComponent';
import OTPTextView from 'react-native-otp-textinput';
import {isValidPassword} from '../../utils/validator';

const ForgotPassword = props => {
  const dispatch = useDispatch();
  const {height, width} = useWindowDimensions();
  //for responsiveness
  const [screen, setScreen] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [userphone, setUserphone] = useState('');
  const [userphoneerror, setUserphoneerror] = useState('');
  const [otploading, setOtploading] = useState(false);
  const [otpdisabled, setOtpdisabled] = useState(true);
  const [userotp, setUserotp] = useState('');
  const [modalVisible, setModalvisible] = useState(false);
  const [modaltext, setModaltext] = useState('');
  const [resetloading, setResetloading] = useState(false);
  const [resetdisabled, setResetDisabled] = useState(true);
  const [resetpassword, setResetpassword] = useState('');
  const [resetcpassword, setResetcpassword] = useState('');
  const [reseterror, setReseterror] = useState('');

  const font = useWindowDimensions().fontScale;

  const descriptionone =
    'Please enter your mobile number linked to your account.We will send an OTP to reset your password';
  const descriptiontwo =
    'Please enter the OTP sent to your registered mobile number';
  const descriptionthree = 'Please enter your new password';

  //Get fontscale from and use it to resize fonts
  const handleInputphone = childData => {
    setUserphone(childData);
  };

  const handleInputpassword = childData => {
    setResetpassword(childData);
  };
  const handleInputconfirmpassword = childData => {
    setResetcpassword(childData);
  };
  const ongpostOtp = () => {
    dispatch(
      PostOtp({
        mobile_number: userphone,
      }),
    ).then(resp => {
      console.log(resp, 'otp uscscscscssc');
      setScreen('otp');
    });
  };
  const onChangepassword = () => {
    setScreen('reset password');
  };
  const onresetpassword = () => {
    if (resetcpassword === resetpassword) {
      if (isValidPassword(resetpassword)) {
        console.log(
          {
            mobile_number: userphone,
            otp: userotp,
            password: resetpassword,
          },
          'objjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
        );
        dispatch(
          verifyOtpfunc({
            mobile_number: userphone,
            otp: userotp,
            password: resetpassword,
          }),
        ).then(resp => {
          if (resp.success) {
            setModaltext('Password changed successfully');
            setModalvisible(!modalVisible);
          } else {
            setModaltext('Something went wrong');
            setModalvisible(!modalVisible);
          }

          setScreen('initial');
          setUserphone('');
          setUserotp('');
          setResetpassword('');
          setResetcpassword('');
          setReseterror('');
        });
      } else {
        setReseterror(
          'PLease choose a password which contains atleast one capital,one lowercase letter and a special character',
        );
      }
    } else {
      setReseterror("Passwords don't match");
    }
  };
  const OnBackpress = () => {
    props.navigation.navigate('LoginScreen');
  };

  const handleModal = () => {
    setModalvisible(!modalVisible);
    props.navigation.navigate('LoginScreen');
  };

  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  console.log(minutes, seconds);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            height: height * (3.5 / 100),
            width: width * (3.5 / 100),
            marginTop: height * (1.5 / 100),
          }}
          onPress={() => OnBackpress()}>
          <Image
            resizeMode="stretch"
            style={[
              styles.backIcon,
              {height: height * (2 / 100), width: width * (2 / 100)},
            ]}
            source={IMAGES.back_icon}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {fontSize: font * 22}]}>
          {screen == 'initial'
            ? 'Forgot Password'
            : screen == 'otp'
            ? 'Forgot Password'
            : 'Reset Password'}
        </Text>
      </View>
      <View style={styles.subTextcontainer}>
        <Text style={[styles.subText, {fontSize: font * 13}]}>
          {screen == 'initial'
            ? descriptionone
            : screen == 'otp'
            ? descriptiontwo
            : descriptionthree}
        </Text>
      </View>
      {screen == 'otp' ? (
        <View>
          <Text style={styles.otpTitle}>Enter OTP</Text>
          <OTPTextView
            tintColor="rgba(65, 39, 15, 0.8)"
            handleTextChange={text => setUserotp(text)}
            textInputStyle={{
              backgroundColor: 'white',
              borderRadius: 4,
              height: 40,
              width: 40,
              fontSize: 14,
            }}
            inputCount={6}
            keyboardType="numeric"
          />
        </View>
      ) : null}
      {screen == 'initial' ? (
        <View style={{marginTop: height * (1 / 100)}}>
          <InputField
            loading={loading}
            parentCallback={handleInputphone}
            placeholder={''}
            title={'Mobile number'}
            value={userphone}
            errormessage={userphoneerror}
            maxchars={10}
            inputtype={'numeric'}
          />
        </View>
      ) : null}

      {screen == 'reset password' ? (
        <View style={{marginTop: height * (1 / 100)}}>
          <InputField
            parentCallback={handleInputpassword}
            placeholder={''}
            showicon={true}
            title={'New password'}
            value={resetpassword}
          />
          <InputField
            errormessage={reseterror}
            parentCallback={handleInputconfirmpassword}
            placeholder={''}
            showicon={true}
            title={'Confirm password'}
            value={resetcpassword}
          />
        </View>
      ) : null}

      <View style={{marginTop: height * (1 / 100)}}>
        {screen == 'initial' ? (
          <Button
            enabled={userphone.length == 10 ? true : false}
            onpressparam={ongpostOtp}
            title={'Get OTP'}
            type={'large'}
            loading={loading}
            disabled={disabled}
            parentstyles={{marginTop: height * (4 / 100)}}
          />
        ) : screen == 'otp' ? (
          <View>
            <Button
              enabled={userotp.length == 6 ? true : false}
              onpressparam={onChangepassword}
              title={'Change password'}
              type={'large'}
              loading={otploading}
              disabled={otpdisabled}
              parentstyles={{marginTop: height * (4 / 100)}}
            />
            {minutes + ':' + seconds == '0:0' ? (
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                  color: 'rgba(65, 39, 15, 0.8)',
                }}>
                OTP has expired
              </Text>
            ) : (
              <Text
                style={{
                  alignSelf: 'center',
                  marginTop: 15,
                  color: 'rgba(65, 39, 15, 0.8)',
                }}>
                OTP will expire in {minutes + ':' + seconds}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setScreen('initial');
                setMinutes(2);
                setSeconds(0);
              }}
              style={{
                alignSelf: 'center',
                marginTop: 15,
                backgroundColor: '#E3D2B7',
                height: '15%',
                width: '25%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'rgba(65, 39, 15, 0.8)',
                }}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            enabled={
              resetpassword.length > 4 && resetcpassword.length > 4
                ? true
                : false
            }
            onpressparam={onresetpassword}
            title={'Reset'}
            type={'large'}
            loading={resetloading}
            disabled={resetdisabled}
            parentstyles={{marginTop: height * (4 / 100)}}
          />
        )}
      </View>
      {/* <ModalComponent
        textData={modaltext}
        modalVisible={modalVisible}
        onmodalPress={handleModal}></ModalComponent> */}
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(247, 246, 242, 1)',
    paddingLeft: 11,
    paddingRight: 11,
  },
  headerContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
  backIcon: {},
  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
    marginLeft: '5%',
  },
  subTextcontainer: {marginTop: '4%'},
  subText: {
    fontFamily: 'SourceSansPro-Regular',
    color: 'rgba(65, 39, 15, 0.8)',
  },
  otpTitle: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: 'rgba(65, 39, 15, 0.8)',
    fontSize: 14,
    marginBottom: 7,
  },
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
export default ForgotPassword;
