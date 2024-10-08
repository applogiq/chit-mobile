//This is a card slider componenet used basic functions of RN flatlist
/**************************************** Import Packages ***********************************************************/
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  FlatList,
} from 'react-native';
/**************************************** Import components ***********************************************************/
import { IMAGES } from '../../common/images';


//Change this to to real time data
const MetalsCard = ({ item }) => {
  const { height, width } = useWindowDimensions();
  //Get window size for responsiveness
  const font = useWindowDimensions().fontScale;
  //Get fontscale from and use it to resize fonts

  return (
    <View
      style={[
        styles.container,
        {
          height: height * (21 / 100),
          width: width * (27 / 100),
          marginBottom: '6%', marginLeft: width * (4 / 100), marginRight: width * (1 / 100)
        },
      ]}>
      <Text style={[styles.metalName, { fontSize: font * 13 }]}>
        {item.metalName}
      </Text>
      <Image style={styles.image} source={item.src}></Image>
      <Text style={[styles.metalName, { fontSize: font * 13, marginTop: '-12%' }]}>
        {item.weight}
      </Text>
      <Text
        style={[
          styles.metalName,
          {
            fontSize: font * 16,
            color: 'rgba(65, 39, 15, 0.8)',
            fontWeight: '600',
            fontFamily: 'SourceSansPro-SemiBold',
          },
        ]}>
        {item.price}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    shadowColor: '#000',

    shadowOpacity: 0.25,

    elevation: 5,

    alignItems: 'center',
    paddingTop: '5%',
    paddingBottom: '4%',
    justifyContent: 'space-between',

  },
  image: { height: '55%', width: '75%', resizeMode: 'contain', marginTop: '-5%' },
  metalName: {
    fontFamily: 'SourceSansPro-Regular',
    fontWeight: '400',
    lineHeight: 21,
    color: 'rgba(65, 39, 15, 0.6)',
    textTransform: 'capitalize',
  },
});

//Small seperator item for flatlist cards
const separatorItem = () => {
  return <View style={styles.separatorView} />;
};
//Mainslider componenet
const MetalsCardSlider = ({ gold, silver, diamond }) => {
  console.log(gold, silver, diamond, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{")
  const Data = [
    { id: 1, src: IMAGES.gold_metal, metalName: 'Gold', weight: '8 Grams', price: gold },
    { id: 2, src: IMAGES.silver_metal, metalName: 'Silver', weight: '8 Grams', price: silver },
    { id: 3, src: IMAGES.diamond_metal, metalName: 'Diamond', weight: '1 Carat', price: diamond },

  ];
  return (
    <View style={{ paddingLeft: "-4%", backgroundColor: "red" }} >
      <FlatList
        data={Data}
        keyExtractor={item => item.id}
        horizontal
        style={{ backgroundColor: '#F7F6F2', }}
        scrollEnabled={true}
        snapToAlignment="center"
        ItemSeparatorComponent={separatorItem}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return <MetalsCard gold={gold} silver={silver} diamond={diamond} item={item}></MetalsCard>;
        }}></FlatList>
    </View>
  );
};
export default MetalsCardSlider;
