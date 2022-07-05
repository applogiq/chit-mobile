//This is an inputfield with a title and input
//It receives title,placeholder,value and callback function as props from parent
//basic usage const handleInput = (childData) =>{setValue(childData)}
//<InputField showicon={false} parentCallback={parentCallback1} title={"userpass"} value={val1} placeholder={"password"} ></InputField>
/**************************************** Import Packages ***********************************************************/
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {IMAGES} from '../../common/images';
/**************************************** Import components ***********************************************************/

const InputField = ({
  parentCallback,
  placeholder,
  title,
  value,
  showicon,
  errormessage,
  maxchars,
  parentstyles,
  loading,
  inputtype,
}) => {
  const {height, width} = useWindowDimensions();
  const [pressed, setPressed] = useState(showicon ? false : true);
  //Get height,width of screen by this hook
  var w = '100%';
  var h = height * (10 / 100);

  const font = useWindowDimensions().fontScale;
  //Get fontscale from and use it to resize fonts

  //send input value to parent
  const onchange = value => {
    parentCallback(value);
  };
  const iconpress = () => {
    setPressed(!pressed);
  };
  return (
    <View style={[styles.container, {height: h, width: w}, parentstyles]}>
      <Text
        style={[
          styles.title,
          {textTransform: 'capitalize', fontSize: font * 9},
        ]}>
        {title}
      </Text>
      <TextInput
        keyboardType={inputtype}
        editable={!loading}
        maxLength={maxchars}
        defaultValue={value}
        secureTextEntry={!pressed}
        value={value}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={value => onchange(value)}></TextInput>
      {showicon ? (
        <View
          style={{
            position: 'absolute',
            marginTop: height * (6.5 / 100),
            marginLeft: width * (85 / 100),
          }}>
          <Pressable onPress={iconpress}>
            <Image
              style={[styles.eyeicon]}
              source={pressed ? IMAGES.eye_open : IMAGES.eye_closed}></Image>
          </Pressable>
        </View>
      ) : null}

      <Text style={[styles.errormessage, {fontSize: font * 8}]}>
        {errormessage}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    color: 'rgba(65, 39, 15, 0.8)',
    fontWeight: '700',
    fontFamily: 'SourceSansPro-SemiBold',
    lineHeight: 21,
    marginBottom: 5,
  },
  input: {backgroundColor: 'white', width: '100%', borderRadius: 6},
  eyeicon: {height: 15, width: 22},
  errormessage: {
    color: 'red',
    fontFamily: 'SourceSansPro-Light',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
export default InputField;
