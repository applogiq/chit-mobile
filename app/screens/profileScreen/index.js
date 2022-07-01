
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,View,StyleSheet,useWindowDimensions,Image,TouchableOpacity} from "react-native";
/**************************************** Import components ***********************************************************/


const ProfileScreen =(props)=>{
    const font = useWindowDimensions().fontScale
    const { height, width } = useWindowDimensions();
    //for responsiveness
    return(
        <View style={styles.container}>
                 <View style={styles.headerContainer}>

<Text style={[styles.headerText,{fontSize:font*17}]}>Profile</Text>
            </View>
<View style={{height:height*(20/100),width:"100%",alignItems:"center",justifyContent:"center"}}>
<Image resizeMode="contain" source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04ZndPl3TMJ4GMG8UeiY8XGh8ifpnPGHTbw&usqp=CAU',
        }} style={styles.image}></Image>
</View>
<View style={{height:"30%"}}>

    <Text style={[styles.tableTitles,{fontSize:font*12}]}>
Basic Info
    </Text>
<View style={styles.detailsCard}>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >Name</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >Montana joe</Text>
    </View>
</View>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >Email address</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >Montanajoe@gmail.com</Text>
    </View>
</View>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >Mobile number</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >9387654372</Text>
    </View>
</View>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >Country</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >India</Text>
    </View>
</View>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >State</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >Tamilnadu</Text>
    </View>
</View>
<View style={styles.row}>
    <Text style={[styles.title,{fontSize:font*9}]} >City</Text>
    <View style={styles.cardItems}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black"}]} >Tiruppur</Text>
    </View>
</View>
</View>
</View>
<View style={{height:"10%",marginTop:"3%"}}>

    <Text style={[styles.tableTitles,{fontSize:font*12}]}>
Security
    </Text>
<View style={styles.detailsCard}>
<View style={styles.row}>
   
    <Text style={[styles.title,{fontSize:font*9}]} >Change password</Text>

    <View style={styles.cardItems}>
    <TouchableOpacity onPress={()=>props.navigation.navigate('ChangePassword')}>
    <Text  style={[styles.title,{fontSize:font*10,color:"black",textDecorationLine:"underline"}]} >change</Text>
  </TouchableOpacity>
    </View>
</View>

</View>
</View>
<View style={{height:"10%",marginTop:"12%"}}>

  
<View style={styles.detailsCard}>
<View style={styles.row}>
    <TouchableOpacity  onPress={()=>props.navigation.navigate('LoginScreen')}>
    <Text style={[styles.logout,{fontSize:font*10}]} >Logout</Text>
    </TouchableOpacity>

</View>

</View>
</View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,backgroundColor:"rgba(247, 246, 242, 1)",paddingLeft:15,paddingRight:15
    },
    headerContainer:{flexDirection:"row",alignItems:"center",marginTop:40},
 
    headerText:{fontFamily:"SourceSansPro-SemiBold",color:"#9D6939",fontWeight:"600"},
    image:{height:120,width:120,borderRadius:100,resizeMode:"contain"},
    tableTitles:{fontFamily:"SourceSansPro-SemiBold",fontWeight:"600",lineHeight:21,color:"rgba(65, 39, 15, 0.8)"},
    detailsCard:{backgroundColor:"white",borderRadius:4,marginTop:"3%",alignContent:"space-between",height:"85%",justifyContent:"space-around",paddingLeft:10,paddingRight:10},
    title:{fontFamily:"SourceSansPro-SemiBold",fontWeight:"400",lineHeight:21,color:"rgba(65, 39, 15, 0.6)"},
    row:{flexDirection:"row"},
    cardItems:{flexDirection:"row",justifyContent:"flex-end",flex:1},
    logout:{color:"rgba(65, 39, 15, 0.8)",fontFamily:"SourceSansPro-SemiBold"}
})
export default ProfileScreen;