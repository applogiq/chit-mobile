/**************************************** Import Packages ***********************************************************/
import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocalchits = async value => {
  try {
    const previous = await AsyncStorage.getItem('setlocalchits');
    const val = JSON.parse(previous);

    if (typeof val === 'object') {
      if (val.includes(value)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default getLocalchits;
