//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React, { useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
/**************************************** Import components ***********************************************************/
import TopBar from './topBar';
import MyChitCardSlider from './chitsCards';


const ChitsScreen = props => {
  const font = useWindowDimensions().fontScale;
  const { height, width } = useWindowDimensions();
  const [screen, setScreen] = useState("My Chits")
  const onPress = (title) => {

    setScreen(title)
  }
  const onClick = () => {

    props.navigation.navigate("Schemedetails")
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, { fontSize: font * 21 }]}>Chits</Text>
      <View style={{ marginTop: height * (2 / 100), marginBottom: height * (2 / 100) }}>
        <TopBar screenName={screen} onClick={onPress} ></TopBar>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyChitCardSlider screen={screen} onButton={onClick}></MyChitCardSlider>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, paddingTop: 15, paddingLeft: 15, paddingRight: 15, backgroundColor: "#F7F6F2", marginBottom: "20%"
  },

  headerText: {
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#9D6939',
    fontWeight: '600',

  },
});
export default ChitsScreen;
