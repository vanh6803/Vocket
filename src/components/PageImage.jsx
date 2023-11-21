import {View, Text, Image} from 'react-native';
import React from 'react';
import Header from './Header';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';

export default function PageImage({goToPage}) {
  return (
    <View style={{height: dimen.height}}>
      <Header
        iconLeft={<IconOutline.ChevronUpIcon color={'white'} size={35} />}
        iconRight={
          <IconOutline.EllipsisHorizontalCircleIcon color={'white'} size={35} />
        }
        onClickLeft={goToPage}
      />
      <View className="flex-1  justify-center items-center">
        <View
          className="rounded-[50px] overflow-hidden"
          style={{width: dimen.width, height: dimen.width}}>
          <Image
            source={{
              uri: 'https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg',
            }}
            className="aspect-square"
          />
        </View>
        <View
          className="p-2 px-4 rounded-3xl justify-center items-center"
          style={{
            marginTop: dimen.height * 0.05,
            backgroundColor: colors.bg_optacity,
          }}>
          <Text className="text-white text-base font-semibold">Vanh</Text>
        </View>
      </View>
      {/* footer */}
      <View
        className="flex-row items-center justify-between"
        style={{
          marginTop: dimen.height * 0.05,
          marginHorizontal: dimen.width * 0.05,
        }}>
        <IconOutline.Squares2X2Icon color={'white'} size={35} />
        <View className="flex-row"></View>
        <IconOutline.ShareIcon color={'white'} size={35} />
      </View>
    </View>
  );
}
