import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';

export default function CheckBox({
  isChecked,
  onClick,
  title,
  styleTitle,
  styleCheckbox,
}) {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        className="mr-2 border border-white rounded-lg w-6 h-6"
        onPress={onClick}>
        {isChecked ? <IconSolid.CheckIcon color={'yellow'} size={23} /> : null}
      </TouchableOpacity>
      <Text className="text-white text-[14px]">{title}</Text>
    </View>
  );
}
