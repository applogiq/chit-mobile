/**************************************** Import Packages ***********************************************************/
import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalchits = async value => {
  try {
    const previous = await AsyncStorage.getItem('setlocalchits');
    if (previous != null) {
      const val = JSON.parse(previous);
    }

    console.log(
      previous,
      'from hoooooooooooooooooooooooooooooooookoooooooooooooooooofdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    );
    if (typeof val === 'object' && previous != null) {
      val.push(value);
      const inputValue = JSON.stringify(val);
      console.log('iniiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
      return await AsyncStorage.setItem('setlocalchits', inputValue);
    } else {
      const ini = [];
      ini.push(value);
      console.log('hhhhhhhhhhhhhh');
      return await AsyncStorage.setItem('setlocalchits', JSON.stringify(ini));
    }
  } catch (err) {
    return err;
  }
};

export default setLocalchits;
