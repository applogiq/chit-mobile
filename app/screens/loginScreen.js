//Login screen of the the application
/**************************************** Import Packages ***********************************************************/
import React,{useState} from "react";
import {Text,View,StyleSheet,useWindowDimensions, ImageBackground,ScrollView} from "react-native";
/**************************************** Import components ***********************************************************/
import Button from "../components/buttonComponent";
import InputField from "../components/inputComponent";
import { IMAGES } from "../common/images";

const image = { uri: "" };
const LoginScreen =()=>{
    const[useridentity,setUseridentity] = useState("")
    const[userpassword,setUserpassword] = useState("")
    const[identityerror,setIdentityerror]=useState("")
    const[passworderror,setPassworderror]=useState("")
    const[enabled,setEnabled] = useState(false)
    const[loading,setLoading] = useState(false)
    const[disabled,setDisabled] = useState(false)

    const { height, width } = useWindowDimensions();


    const font = useWindowDimensions().fontScale
    //Get fontscale from and use it to resize fonts

    const handleInputidentity = (childData) =>{setUseridentity(childData)} 
    const handleInputpassword = (childData) =>{setUserpassword(childData)} 
    //callback to be send to child

    const onloginPress=()=>{
        console.log("loginn")
    }
    return(
        <ScrollView style={styles.container}>
        <ImageBackground source={IMAGES.login_background}       resizeMode="cover"  style={[styles.image,{height:height,width:width,paddingLeft:width*(3/100),paddingRight:width*(3/100)}]}>
            <View style={[styles.titleContainer,{marginTop:height*(35/100)}]} >
       <Text style={[styles.titleText,{fontSize:font*19,lineHeight:font*21}]}>Hello,</Text>
       <Text style={[styles.titleText,{fontSize:font*19,lineHeight:font*21}]}>Welcome to Luxury</Text>
       </View>
       <View style={{marginTop:height*(5/100)}}>
        <InputField parentCallback={handleInputidentity} placeholder={""} title={"Email Address or Phone number"} value={useridentity}  errormessage={identityerror} maxchars={8}></InputField>
        <InputField parentCallback={handleInputpassword} placeholder={""} title={"password"} value={userpassword} showicon={true} errormessage={passworderror} maxchars={null}></InputField>
       </View>
       <View style={{alignSelf:"flex-end",marginTop:height*(1/100)}}>
        <Text style={[styles.forgotText,{fontSize:font*8,lineHeight:font*10}]}>Forgot Password?</Text>
       </View>
       <Button enabled={enabled} onpressparam={onloginPress} title={"Sign In"} type={"large"} loading={loading}  disabled={disabled} parentstyles={{marginTop:height*(4/100)}} ></Button>
        </ImageBackground>
   
      </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
    },
    titleText:{fontFamily:"Belleza-Regular",fontWeight:"400",color:"#9D6939"},
    forgotText:{fontFamily:"SourceSansPro-SemiBold",color:"rgba(65, 39, 15, 0.8)"},
    titleContainer:{}
})
export default LoginScreen;