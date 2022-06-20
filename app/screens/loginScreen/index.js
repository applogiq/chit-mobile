//Login screen of the the application
/**************************************** Import Packages ***********************************************************/
import React,{useState} from "react";
import {Text,View,StyleSheet,useWindowDimensions, ImageBackground,ScrollView,TouchableOpacity,} from "react-native";
/**************************************** Import components ***********************************************************/
import Button from "../../components/Button/buttonComponent";
import InputField from "../../components/Input/inputComponent";
import { IMAGES } from "../../common/images";
import ModalComponent from "../../components/Modal/modalComponent";

/**************************************** Import common files ***********************************************************/
import { isEmpty, isValidEmail, isValidPassword } from '../../common/validator';


const image = { uri: "" };
const LoginScreen =(props)=>{
    const[useridentity,setUseridentity] = useState("")
    const[userpassword,setUserpassword] = useState("")
    const[identityerror,setIdentityerror]=useState("")
    const[passworderror,setPassworderror]=useState("")
 const[modaltext,setModaltext]=useState("")
    const[loading,setLoading] = useState(false)
    const[disabled,setDisabled] = useState(true)

    const[modalVisible,setModalvisible]=useState(false)

    const { height, width } = useWindowDimensions();


    const font = useWindowDimensions().fontScale
    //Get fontscale from and use it to resize fonts

    const handleInputidentity = (childData) =>{setUseridentity(childData)} 
    const handleInputpassword = (childData) =>{setUserpassword(childData)} 
    //callback to be send to child

  

    const doLoginValidation = () => {
        if (isEmpty(useridentity)) {
     
            setIdentityerror("Please enter a valid email address or Phone number empty");
        } else if (!isValidEmail(useridentity)) {
         
            setIdentityerror("Please enter a valid email address or Phone number"); 
        }else if (isValidEmail(useridentity)) {
         
            setIdentityerror(""); 
        }
    
        if (isEmpty(userpassword)) {
       
            setPassworderror("Please enter a valid Password")
        }
    
        if (isEmpty(useridentity)) {
          return false
        } else if (!isValidEmail(useridentity)) {
          return false
        } else if (isEmpty(userpassword)) {
          return false
        } else {
          return true
        }
      };
    
      const onloginPress=()=>{
if(doLoginValidation()){
    const userData = { email_id: useridentity, password: userpassword };
    console.log(userData)
    setLoading(true)
  
   
}
    }
    const handleModal =()=>{
        setModalvisible(!modalVisible)
    }
    const resetStates =()=>{
        setUseridentity("")
        setUserpassword("")
        setIdentityerror("")
        setPassworderroruseState("")
     
        setLoading(false)
        setDisabled(true)
    
        setModalvisible(false)
    }
    return(
        <ScrollView style={[styles.container,]}>
            <View style={{height:height,width:width,}}>
        <ImageBackground source={IMAGES.login_background}      resizeMode="cover"  style={[styles.image,{height:height,width:width,paddingLeft:width*(3/100),paddingRight:width*(3/100)}]}>
            <View style={[styles.titleContainer,{marginTop:height*(35/100)}]} >
       <Text style={[styles.titleText,{fontSize:font*19,lineHeight:font*21}]}>Hello,</Text>
       <Text style={[styles.titleText,{fontSize:font*19,lineHeight:font*21}]}>Welcome to Luxury</Text>
       </View>
       <View style={{marginTop:height*(5/100)}}>
        <InputField loading={loading} parentCallback={handleInputidentity} placeholder={""} title={"Email Address or Phone number"} value={useridentity}  errormessage={identityerror} maxchars={25}></InputField>
        <InputField loading={loading} parentCallback={handleInputpassword} placeholder={""} title={"password"} value={userpassword} showicon={true} errormessage={passworderror} maxchars={10}></InputField>
       </View>
       <View style={{alignSelf:"flex-end",marginTop:height*(1/100)}}>
        <TouchableOpacity>
        <Text style={[styles.forgotText,{fontSize:font*8,lineHeight:font*10}]}>Forgot Password?</Text>
        </TouchableOpacity>
       </View>
       <Button enabled={useridentity != "" && userpassword != "" ? true :false} onpressparam={onloginPress} title={"Sign In"} type={"large"} loading={loading}  disabled={disabled} parentstyles={{marginTop:height*(4/100)}} ></Button>
        </ImageBackground>
        </View>
      <ModalComponent textData={modaltext} modalVisible={modalVisible} onmodalPress={handleModal}></ModalComponent>
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
    titleContainer:{},
   
})
export default LoginScreen;