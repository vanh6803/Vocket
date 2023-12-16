import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import {dimen} from '../constants';

const RenderItemChatContainer = ({item, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row mt-3 rounded-xl items-center"
      style={{
        paddingHorizontal: dimen.width / 70,
        backgroundColor: item.isView ? 'rgba(255,255,255,0.1)' : null,
      }}>
      <View className="border-zinc-700 rounded-full border-[3px] p-[2px]">
        <FastImage
          source={{uri: item.avatar}}
          className="rounded-full"
          style={{width: dimen.width / 8.5, height: dimen.width / 8.5}}
        />
      </View>
      <View className="flex-1 ml-2">
        <Text className="text-white text-lg">{item.name}</Text>
        <Text
          className=""
          style={{
            color: item.isView ? 'white' : 'rgba(255,255,255,0.6)',
          }}>
          {item.lasterMessage}
        </Text>
      </View>
      <IconOutline.ChevronRightIcon size={30} color={'white'} />
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default RenderItemChatContainer;
