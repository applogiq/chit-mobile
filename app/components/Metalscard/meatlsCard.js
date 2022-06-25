//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,View,StyleSheet,useWindowDimensions,Image,FlatList} from "react-native";
/**************************************** Import components ***********************************************************/
import { IMAGES } from "../../common/images";

const Data = [
    {id:1,"src":IMAGES.gold_metal,"metalName":"Gold",weight:"8 Grams"},
    {id:2,"src":IMAGES.silver_metal,"metalName":"Silver",weight:"8 Grams"},
    {id:3,"src":IMAGES.diamond_metal,"metalName":"Diamond",weight:"1 Carat"},
    {id:4,"src":IMAGES.gold_metal,"metalName":"Gold",weight:"8 Grams"}
]

const MetalsCard =({item})=>{
    const { height, width } = useWindowDimensions();
    const font = useWindowDimensions().fontScale
    //Get fontscale from and use it to resize fonts
    console.log(item)
    return(
        <View style={[styles.container,{height:height*(23/100),width:width*(30/100)}]}>
<Text style={[styles.metalName,{fontSize:font*9}]}>{item.metalName}</Text>
<Image style={styles.image} source={item.src}></Image>
<Text  style={[styles.metalName,{fontSize:font*9,marginTop:"-12%"}]}>{item.weight}</Text>
<Text  style={[styles.metalName,{fontSize:font*12,color:"rgba(65, 39, 15, 0.8)",fontWeight:"600",fontFamily:"SourceSansPro-SemiBold"}]}>₹520</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
       borderRadius:10,backgroundColor:"rgba(255, 255, 255, 1)",shadowColor: "#000",
       shadowOffset: {
         width: 0,
         height: 2
       },
       shadowOpacity: 0.25,
       shadowRadius: 4,
       elevation: 15,marginRight:10,
alignItems:"center",paddingTop:"5%",paddingBottom:"4%",justifyContent:"space-between"
    },image:{height:"55%",width:"75%",resizeMode:"contain",marginTop:"-5%"},metalName:{fontFamily:"SourceSansPro-Regular",fontWeight:"400",lineHeight:21,color:"rgba(65, 39, 15, 0.6)",textTransform:"capitalize"}
})


const separatorItem = () => {
    return <View style={styles.separatorView} />;
  };

const MetalsCardSlider =()=>{
    return(
        <View>
            <FlatList data={Data}
  keyExtractor={(item) => item.id}
horizontal

scrollEnabled={true}
snapToAlignment="center"

ItemSeparatorComponent={separatorItem}
showsHorizontalScrollIndicator={false}
renderItem={({item})=>{
  
   return <MetalsCard item={item}></MetalsCard>
}}


>

</FlatList>
        </View>
    )
}
export default MetalsCardSlider