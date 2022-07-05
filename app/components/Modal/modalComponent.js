//A small customizable modal alert component
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  useWindowDimensions,
  Image,
} from 'react-native';
/**************************************** Import components ***********************************************************/

import {IMAGES} from '../../common/images';

const ModalComponent = ({modalVisible, onmodalPress, textData}) => {
  const {height, width} = useWindowDimensions();
  //For responsiveness
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        onmodalPress();
      }}>
      <View style={[styles.centeredView]}>
        <View
          style={[
            styles.modalView,
            ,
            {height: height * (20 / 100), width: width * (50 / 100)},
          ]}>
          <Pressable onPress={onmodalPress}>
            <Image style={styles.icon} source={IMAGES.close_icon}></Image>
          </Pressable>
          <View style={styles.textCenter}>
            <Text style={styles.modalText}>{textData}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    textAlign: 'center',
    color: 'rgba(65, 39, 15, 0.8)',
    fontWeight: '700',
    fontFamily: 'SourceSansPro-SemiBold',
    lineHeight: 21,
    marginBottom: 5,
  },
  icon: {height: 15, width: 15, marginLeft: '80%', marginTop: '10%'},
  textCenter: {alignItems: 'center', justifyContent: 'center', flex: 1},
});
export default ModalComponent;
