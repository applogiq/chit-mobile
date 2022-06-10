//This is an inputfield with a title and input
 //It receives title,placeholder,value and callback function as props from parent
 //basic usage const handleInput = (childData) =>{setValue(childData)} 
 //<InputField showicon={false} parentCallback={parentCallback1} title={"userpass"} value={val1} placeholder={"password"} ></InputField>
/**************************************** Import Packages ***********************************************************/
import React,{useState} from "react";
import {Text,View,StyleSheet,TextInput,useWindowDimensions,Image,Pressable} from "react-native";
import { IMAGES } from "../common/images";
/**************************************** Import components ***********************************************************/


const InputField =({parentCallback,placeholder,title,value,showicon})=>{
    const { height, width } = useWindowDimensions();
    const [pressed,setPressed] = useState( showicon ? false : true)
    //Get height,width of screen by this hook
    var w = width
    var h = height*(10/100)

  
    //send input value to parent
const    onchange = (value) => {
        parentCallback(value);
      
    }
  const iconpress =()=>{
      setPressed(!pressed)
  }
    return(
        <View style={[styles.container,{height:h,width:w}]}>
            <Text  style={[styles.title,{textTransform:"capitalize"}]}>{title}</Text>
<TextInput secureTextEntry={!pressed} value={value} style={styles.input} placeholder={placeholder} onChangeText={(value)=>onchange(value)}></TextInput>
{showicon?   <View style={{position:"absolute",marginTop:height*(6.5/100),marginLeft:width*(85/100)}}>
    <Pressable onPress={iconpress}>
    <Image style={[styles.eyeicon]} source={pressed ? IMAGES["eye-open"] : IMAGES["eye-closed"]}></Image>
    </Pressable>
    </View>:null}
 
   

        </View>
    )
}
const styles = StyleSheet.create({
    container:{
marginTop:10,marginBottom:5
    },
    title:{color:"rgba(65, 39, 15, 0.8)",fontWeight:"600",fontFamily:"SourceSansPro-Bold",lineHeight:21,marginBottom:10},
    input:{backgroundColor:"white",width:'100%',borderRadius:6},
    eyeicon:{height:15,width:22}
})
export default InputField;