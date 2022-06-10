/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//This is the main entry file 
//Rest of screen components will be nested and finally rendered here 
//Redux store provider is configured here
//Please put all needed fonts files in android/app/src/main/assets/fonts
/**************************************** Import Packages ***********************************************************/
import React,{useState} from 'react';
import {


  Text,
Image,
  View,
} from 'react-native';

/**************************************** Import Components ***********************************************************/
import InputField from './app/components/inputComponent';



const App =() => {
const[val1,setVal1]=useState("")
const[val2,setVal2]=useState("")
const[val3,setVal3]=useState("")

const parentCallback1 =(childdata)=>{
  setVal1(childdata)
}
const parentCallback2 =(childdata)=>{
  setVal2(childdata)
}
const parentCallback3 =(childdata)=>{
  setVal3(childdata)
}
  return (
<View style={{flex:1}}>
<Text>welcome to chit mobile app!</Text>

<InputField showicon={false} parentCallback={parentCallback1} title={"userpass"} value={val1} placeholder={"password"} ></InputField>
<InputField showicon={true} parentCallback={parentCallback2} title={"userpass"} value={val2} placeholder={"password"}></InputField>
<InputField showicon={false} parentCallback={parentCallback3} title={"userpass"} value={val3} placeholder={"password"}></InputField>
</View>
  );
};



export default App;
