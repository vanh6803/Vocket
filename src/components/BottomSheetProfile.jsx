import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {dimen} from '../constants';
import * as IconSolid from 'react-native-heroicons/solid';
import * as IconOutline from 'react-native-heroicons/outline';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../assets/Colors';

const BottomSheetProfile = ({data}) => {
  return (
    <View className="flex-1">
      <View
        className="border-4 border-yellow-500 rounded-full self-center p-1"
        style={{width: dimen.width * 0.3, height: dimen.width * 0.3}}>
        <FastImage
          source={{
            uri: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
          }}
          style={{
            aspectRatio: 1,
          }}
          className="rounded-full"
        />
      </View>
      <Text
        className="text-white text-2xl font-semibold self-center"
        style={{marginTop: dimen.width * 0.03}}>
        Name
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetProfile;
