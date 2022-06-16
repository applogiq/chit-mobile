//This is an common button component it reaceives  size,enabled,loading,enabled,type,onpressparam,title,disabled props from other parent componenets 
//Simple usage <Button loading={false} enabled={true} type={"small"} onpressparam={()=>console.log("ssss")} title={"Pay now"} disabled={false} ></Button>
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,StyleSheet,TouchableOpacity,useWindowDimensions,ActivityIndicator} from "react-native";
/**************************************** Import components ***********************************************************/


const Button =({enabled,onpressparam,title,type,loading,disabled,parentstyles})=>{

    const { height, width } = useWindowDimensions();
    //Get height,width of screen by this hook

  const font = useWindowDimensions().fontScale*12;
  //Get fontscale from and use it to resize fonts

  //check the param type from parent set the height,width variables accordingly
       if(type==="large"){
           var w = width*(94.5/100)
          var h = height*(7.9/100)

       }   else if(type==="medium"){
         var w = width*(70.1/100)
       var h = height*(5/100)

    } else if (type==="small"){
        var w = width*(20/100)
       var h = height*(4.06/100)

    }else{
        var w = width*(50/100)
        var h = height*(7/100)
    }
  const onClick =()=>{
      onpressparam()
  } 
    return(

        <TouchableOpacity disabled={disabled} style={[styles.container,{backgroundColor:enabled?"#D5BA8F":"#E3D2B7",width:w,height:h},parentstyles]} onPress={onpressparam}>
  {loading?    <ActivityIndicator size="small" color="white" />:<Text style={[styles.title,{fontSize:font}]} >{title}</Text>}   

     
         </TouchableOpacity> 
    )
}
const styles = StyleSheet.create({
    container:{
    alignSelf:"center",borderRadius:6,alignItems:"center",justifyContent:"center"
    },
    title:{color:"#FFFFFF",fontWeight:"600",fontFamily:"SourceSansPro-SemiBold",lineHeight:21}

})
export default Button;