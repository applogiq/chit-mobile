/*
  Screen : asyncHelper

*/

/**************************************** Import Packages ***********************************************************/
import AsyncStorage from '@react-native-async-storage/async-storage';



const setAsyncValue = async (key, value) => {

  try {

    const inputValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, inputValue);

  } catch (err) {

    return err;
  }

};



const clearAsyncValues = () => {
  AsyncStorage.clear();
}

export {
  setAsyncValue,
  clearAsyncValues,

}