/**************************************** Import Packages ***********************************************************/
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector, connect } from 'react-redux';
/**************************************** Import components ***********************************************************/
import { IMAGES } from '../../common/images';
import InputField from '../../components/Input/inputComponent';
import { changePasswordfunc } from "../../redux/actions";
import Button from '../../components/Button/buttonComponent';
import OTPTextView from 'react-native-otp-textinput';
import ModalComponent from '../../components/Modal/modalComponent';
import { isValidPassword } from '../../utils/validator';

const ChangePassword = ({ navigation, route }) => {
  const { id } = route.params;
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [modalText, setModaltext] = useState("")
  const { height, width } = useWindowDimensions();
  //For responsiveness
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [error, setError] = useState('');

  const font = useWindowDimensions().fontScale;

  //Get fontscale  and use it to resize fonts

  const handleInputnewpassword = childData => {
    setNewpassword(childData);
  };
  const handleInputoldpassword = childData => {
    setOldpassword(childData);
  };
  const handleInputconfirmpassword = childData => {
    setConfirmpassword(childData);
  };

  const onresetpassword = () => {
    if (oldpassword !== '') {
      if (newpassword === confirmpassword) {
        if (isValidPassword(newpassword)) {

          dispatch(changePasswordfunc({
            "user_id": id,
            "old_password": oldpassword,
            "new_password": newpassword
          })).then((resp) => {
            console.log(resp, "change password ...............")

            if (resp?.message == "password changed") {
              setModaltext("Password updated successfully");
              setModalVisible(!modalVisible);

              setOldpassword('');
              setNewpassword('');
              setConfirmpassword('');
              setError('');
            } else {
              setModalVisible(!modalVisible);
              setModaltext("Something went wrong");
            }


          })

        } else {
          setError(
            'PLease choose a password which contains atleast one capital,one lowercase letter and a special character',
          );
        }
      } else {
        setError("Passwords don't match");
      }
    } else {
      setError('Please enter your old password');
    }
  };
  const handleModal = () => {
    setModalVisible(!modalVisible)
    navigation.navigate('HomeScreen');
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable
          style={{
            height: height * (2 / 100),
            width: height * (2 / 100),
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            resizeMode="stretch"
            style={[
              styles.backIcon,
              { height: height * (2 / 100), width: width * (2 / 100) },
            ]}
            source={IMAGES.back_icon}></Image>
        </Pressable>
        <Text style={[styles.headerText, { fontSize: font * 19 }]}>
          Change password
        </Text>
      </View>

      <View style={{ marginTop: height * (1 / 100) }}>
        <InputField
          showicon={true}
          parentCallback={handleInputoldpassword}
          placeholder={''}
          title={'Old password'}
          value={oldpassword}
          maxchars={15}></InputField>
        <InputField
          showicon={true}
          parentCallback={handleInputnewpassword}
          placeholder={''}
          title={'New password'}
          value={newpassword}
          maxchars={15}></InputField>

        <InputField
          parentCallback={handleInputconfirmpassword}
          placeholder={''}
          title={'Confirm password'}
          value={confirmpassword}
          showicon={true}
          maxchars={15}></InputField>
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Button
          enabled={
            newpassword.length > 4 &&
              confirmpassword.length > 4 &&
              oldpassword.length > 4
              ? true
              : false
          }
          onpressparam={onresetpassword}
          title={'Reset'}
          type={'large'}
          loading={loading}
          disabled={disabled}
          parentstyles={{ marginTop: height * (4 / 100) }}></Button>
      </View>
      <ModalComponent
        textData={modalText}
        modalVisible={modalVisible}
        onmodalPress={handleModal}></ModalComponent>
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
  headerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 40 },
  backIcon: {},
  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',
    marginLeft: '5%',
  },
  error: { fontSize: 12, color: 'red' },
});
export default ChangePassword;
