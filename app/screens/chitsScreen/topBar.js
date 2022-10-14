//This the
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Animated,
  Pressable,
} from 'react-native';
/**************************************** Import components ***********************************************************/

const TopBar = ({screenName, onClick}) => {
  const font = useWindowDimensions().fontScale;
  const {height, width} = useWindowDimensions();
  const onpress = data => {
    onClick(data);
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {height: height * (7 / 100), width: width * (92 / 100)},
      ]}>
      <Pressable
        onPress={() => onpress('My Chits')}
        style={[
          styles.buttons,
          {
            backgroundColor:
              screenName == 'My Chits' ? 'rgba(213, 186, 143, 0.3)' : 'white',
          },
        ]}>
        <Text style={styles.buttonTitle}>My Chits</Text>
      </Pressable>
      <Pressable
        onPress={() => onpress('New Plans')}
        style={[
          styles.buttons,
          {
            backgroundColor:
              screenName == 'New Plans' ? 'rgba(213, 186, 143, 0.3)' : 'white',
          },
        ]}>
        <Text style={styles.buttonTitle}>New Plans</Text>
      </Pressable>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 7,
    flexDirection: 'row',
  },
  buttons: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonTitle: {
    color: 'rgba(65, 39, 15, 0.6)',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: 17,
    fontWeight: '600',
  },
});
export default TopBar;
