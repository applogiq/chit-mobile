//This is an inputfield with a title and input
 //It receives title,placeholder,value and callback function as props from parent
 //basic usage const handleInput = (childData) =>{setValue(childData)} 
 //<InputField parentCallback = {handleInput}></InputField>
/**************************************** Import Packages ***********************************************************/
import React from "react";
import {Text,View,StyleSheet,TextInput,useWindowDimensions} from "react-native";
/**************************************** Import components ***********************************************************/


const InputField =({parentCallback,placeholder,title,value})=>{
    const { height, width } = useWindowDimensions();
    //Get height,width of screen by this hook
    var w = width
    var h = height*(10/100)

  
    //send input value to parent
const    onchange = (value) => {
        parentCallback(value);
      
    }
    return(
        <View style={[styles.container,{height:h,width:w}]}>
            <Text style={styles.title}>{title}</Text>
<TextInput value={value} style={styles.input} placeholder={placeholder} onChangeText={(value)=>onchange(value)}></TextInput>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
marginTop:10,marginBottom:5
    },
    title:{color:"rgba(65, 39, 15, 0.8)",fontWeight:"600",fontFamily:"SourceSansPro-Bold",lineHeight:21,marginBottom:10},
    input:{backgroundColor:"white",width:'100%',borderRadius:6}
})
export default InputField;