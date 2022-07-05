//A card slider componenet
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,View,StyleSheet,useWindowDimensions,Button,FlatList,TouchableOpacity} from "react-native";

/**************************************** Import components ***********************************************************/
const Data = [
    {id:1},
    {id:2},
    {id:3},
    {id:4}
]
//change this to real data
const YourchitsCard =()=>{
    const { height, width } = useWindowDimensions();
    //for responsiveness
    const font = useWindowDimensions().fontScale
    //Get fontscale from and use it to resize fonts
    return(
        <View style={[styles.container,{height:height*(20/100),width:width*(70/100),marginBottom:"3%"}]}>
<View style={styles.innerContainer}>
    <View style={styles.nameContainer}>
        <Text style={[{fontSize:font*10},styles.titleOne]}>Chit name</Text>
        <Text style={[{fontSize:font*12},styles.titleTwo]}>Premium gold</Text>
    </View>
    <View style={[styles.nameContainer,{alignItems:"flex-end"}]}>
    <Text style={[{fontSize:font*10},styles.titleOne]}>Due Bill</Text>
    <Text style={[{fontSize:font*12},styles.titleTwo]}>₹1500</Text>
    </View>
    <View style={styles.nameContainer}>
    <Text style={[{fontSize:font*10},styles.titleOne]}>Upcoming Due</Text>
    <Text style={[{fontSize:font*12},styles.titleTwo]}>May 22,2022</Text>
    </View>
    <View style={[styles.nameContainer,{justifyContent:"flex-end",alignItems:"flex-end"}]}>
 
      <TouchableOpacity  style={{ alignItems:"center",justifyContent:"center",height:height*(5/100),width:width*(20/100),borderRadius:5,backgroundColor:"rgba(213, 186, 143, 1)"}}>
        <Text style={[styles.titleTwo,{color:"white",fontSize:font*11}]}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  
</View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:"#FFFFFF",borderRadius:10, shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,padding:15,marginRight:10
    },
    innerContainer:{flex:1,flexDirection:"row",flexWrap:"wrap",alignContent:"space-between"},
    nameContainer:{flexBasis:"50%",flex:1,height:"40%",width:"100%",justifyContent:"space-between"},
    titleOne:{fontFamily:"SourceSansPro-Regular",fontWeight:"400",lineHeight:21,color:"rgba(65, 39, 15, 0.8)"},
    titleTwo:{fontFamily:"SourceSansPro-SemiBold",fontWeight:"600",lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}
})
//small seperator itemm for flatlist
const separatorItem = () => {
    return <View style={styles.separatorView} />;
  };
//mainslider component
const YourChitCardSlider =()=>{
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
  
   return <YourchitsCard></YourchitsCard>
}}


>

</FlatList>
        </View>
    )
}
export default YourChitCardSlider