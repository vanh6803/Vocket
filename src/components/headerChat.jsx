import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import CricleButton from './CricleButton';
import FastImage from 'react-native-fast-image';
import {dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';

const HeaderChat = ({onBackPress}) => {
  return (
    <View
      className="flex-row items-center py-2"
      style={{marginTop: dimen.height * 0.025}}>
      <CricleButton
        onPress={onBackPress}
        icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
      />
      <FastImage
        source={{
          uri: 'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/277307779_321723253282654_9089454335861660638_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7bbb8a&_nc_ohc=LLjezRyjhF4AX93UOSY&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJEc7vOZQ34OfCINbI7u46NZNABFhF3eFzdokZ3NBBaw&oe=657B8ABF',
        }}
        className="rounded-full"
        style={{width: dimen.width / 11, height: dimen.width / 11}}
      />
      <View className="flex-1 mx-2">
        <Text className="text-white text-xl font-bold">Name</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HeaderChat;
