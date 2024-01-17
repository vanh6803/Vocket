import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CricleButton from './CricleButton';
import FastImage from 'react-native-fast-image';
import {dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';

const HeaderChat = ({onBackPress}) => {
  return (
    <View className="flex-row items-center justify-between py-2" style={{}}>
      <CricleButton
        styleButton={{paddingHorizontal: 10}}
        onPress={onBackPress}
        icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
      />
      <View className="flex-row items-center justify-center">
        <FastImage
          source={{
            uri: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
          }}
          className="rounded-full"
          style={{width: dimen.width / 11, height: dimen.width / 11}}
        />
        <View className=" mx-2">
          <Text className="text-white text-xl font-bold">Name</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderChat;
