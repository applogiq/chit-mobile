import React from 'react';
import {Image, Pressable, Text, useWindowDimensions, View} from 'react-native';
import {IMAGES} from '../../common/images';

const Header = ({onPress, Type, navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: height * (1 / 100),
      }}>
      <Pressable
        onPress={onPress}>
        <Image
          style={{height: height * (2 / 100), width: width * (2 / 100)}}
          source={IMAGES.back_icon}
        />
      </Pressable>
      <Text
        style={{
          fontFamily: 'SourceSansPro-SemiBold',
          fontSize: 22,
          fontWeight: '600',
          color: '#9D6939',
        }}>
        {'      '}
        {Type}
      </Text>
    </View>
  );
};
export default Header;
