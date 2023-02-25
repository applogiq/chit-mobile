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
  TouchableOpacity,
} from 'react-native';

/**************************************** Import components ***********************************************************/

import {IMAGES} from '../../common/images';

const ModalComponent = ({
  modalVisible,
  onmodalPress,
  textData1,
  action,
  textData2,
  textData3,
  textData4,
}) => {
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
            {height: height * (30 / 100), width: width * (80 / 100)},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.modalText,
                {color: 'rgba(65, 39, 15, 0.7)', fontSize: 16},
              ]}>
              {textData1}
            </Text>
            <Pressable onPress={onmodalPress}>
              <Image style={styles.icon} source={IMAGES.close_icon} />
            </Pressable>
          </View>
          <View
            style={{
              height: '0.4%',
              width: '100%',
              backgroundColor: 'grey',
              marginTop: '3%',
              marginBottom: '3%',
            }}
          />
          <View style={styles.textCenter}>
            <Text style={[styles.modalText, {color: 'rgba(65, 39, 15, 0.6)'}]}>
              {textData2}
            </Text>
            <Text style={[styles.modalText, {color: 'rgba(65, 39, 15, 0.6)'}]}>
              {textData3}
            </Text>
            <Text style={[styles.modalText, {fontSize: 17}]}>{textData4}</Text>
          </View>
          <TouchableOpacity
            onPress={action}
            style={{
              height: height * (5 / 100),
              width: width * (70 / 100),
              backgroundColor: 'rgba(213, 186, 143, 1)',
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.modalText, {color: 'white'}]}>Confirm</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.3);',
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
    padding: '5%',
  },

  modalText: {
    textAlign: 'center',
    color: 'rgba(65, 39, 15, 0.8)',
    fontWeight: '700',
    fontFamily: 'SourceSansPro-Regular',
    lineHeight: 21,
    marginBottom: 5,
  },
  icon: {height: 15, width: 15, marginLeft: '55%'},
  textCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: '-8%',
  },
});
export default ModalComponent;
