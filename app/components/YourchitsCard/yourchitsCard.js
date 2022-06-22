//This is an boilerplate file
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,View,StyleSheet,useWindowDimensions,Button,FlatList} from "react-native";
/**************************************** Import components ***********************************************************/
const Data = [
    {id:1},
    {id:2},
    {id:3},
    {id:4}
]

const YourchitsCard =()=>{
    const { height, width } = useWindowDimensions();
    const font = useWindowDimensions().fontScale
    //Get fontscale from and use it to resize fonts
    return(
        <View style={[styles.container,{height:height*(20/100),width:width*(70/100)}]}>
<View style={{flex:1,flexDirection:"row",flexWrap:"wrap",alignContent:"space-between"}}>
    <View style={{flexBasis:"50%",flex:1,height:"40%",width:"100%",justifyContent:"space-between"}}>
        <Text style={{fontFamily:"SourceSansPro-Regular",fontWeight:"400",fontSize:font*10,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>Chit name</Text>
        <Text style={{fontFamily:"SourceSansPro-SemiBold",fontWeight:"600",fontSize:font*12,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>Premium gold</Text>
    </View>
    <View style={{flexBasis:"50%",flex:1,height:"40%",width:"100%",justifyContent:"space-between",alignItems:"flex-end"}}>
    <Text style={{fontFamily:"SourceSansPro-Regular",fontWeight:"400",fontSize:font*10,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>Due Bill</Text>
    <Text style={{fontFamily:"SourceSansPro-SemiBold",fontWeight:"600",fontSize:font*12,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>₹1500</Text>
    </View>
    <View style={{flexBasis:"50%",flex:1,height:"40%",width:"100%",justifyContent:"space-between"}}>
    <Text style={{fontFamily:"SourceSansPro-Regular",fontWeight:"400",fontSize:font*10,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>Upcoming Due</Text>
    <Text style={{fontFamily:"SourceSansPro-SemiBold",fontWeight:"600",fontSize:font*12,lineHeight:21,color:"rgba(65, 39, 15, 0.8)"}}>May 22,2022</Text>
    </View>
    <View style={{flexBasis:"50%",flex:1,height:"40%",width:"100%",justifyContent:"flex-end",alignItems:"flex-end"}}>
    <Button
    style={{height:height*(10/100),width:width*(20/100),borderRadius:50}}
        title="Pay Now"
        color="rgba(213, 186, 143, 1)"
        onPress={() => console.log('Button with adjusted color pressed')}
      />
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
 
})

const separatorItem = () => {
    return <View style={styles.separatorView} />;
  };

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