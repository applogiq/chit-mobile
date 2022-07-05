//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
/**************************************** Import components ***********************************************************/

const ChitsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>chits screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ChitsScreen;
