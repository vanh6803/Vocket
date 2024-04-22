import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CricleButton from './CricleButton';
import FastImage from 'react-native-fast-image';
import {dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';
import Avatar from './Avatar';
import {shortenName} from '../utils/ConvertName';

const HeaderChat = ({onBackPress, name, uri}) => {
  return (
    <View className="flex-row items-center py-2" style={{}}>
      <CricleButton
        styleButton={{paddingHorizontal: 10}}
        onPress={onBackPress}
        icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
      />
      <View className="flex-row items-center justify-center">
        <Avatar uri={uri} name={shortenName(name)} borderWidthContainer={0} />
        <View className=" mx-2">
          <Text className="text-white text-lg font-bold">{name}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderChat;
