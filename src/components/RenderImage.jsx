import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React from 'react';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {dimen} from '../constants/index';
import {colors} from '../assets/Colors';
import CricleButton from './CricleButton';
import {globals} from '../styles/Global';

export default function RenderImage() {
  return (
    <View>
      <View className="rounded-[50px] overflow-hidden m-[2px]">
        <Image
          source={{
            uri: 'https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg',
          }}
          className="aspect-square"
        />
        <TextInput
          placeholder="add a message"
          className="text-white absolute bottom-3 self-center rounded-3xl px-3 text-[12px] font-semibold max-w-[70%]"
          placeholderTextColor={'white'}
          style={{backgroundColor: 'rgba(0, 0, 0,0.5)'}}
        />
      </View>

      <View
        className="flex flex-row justify-around items-center"
        style={{marginTop: dimen.height * 0.05}}>
        <CricleButton
          icon={<IconOutline.XMarkIcon color={'white'} size={45} />}
        />
        <CricleButton
          icon={
            <IconOutline.PaperAirplaneIcon
              color={'white'}
              size={45}
              style={{transform: [{rotate: '-45deg'}]}}
            />
          }
          styleButton={[globals.circleButton, styles.styleButtonSend]}
        />
        <CricleButton
          icon={<IconOutline.ArrowDownTrayIcon color={'white'} size={45} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  styleButtonSend: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(120,120,120,0.9)',
  },
});
