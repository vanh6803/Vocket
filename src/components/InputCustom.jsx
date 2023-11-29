import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';

export default function InputCustom({
  placeholderTextColor,
  placeholder,
  styleInput,
  isFocus,
  styleContainer,
}) {
  return (
    <TouchableOpacity
      className="flex-row border rounded-xl p-1"
      style={[
        {
          marginHorizontal: dimen.width * 0.05,
          paddingHorizontal: dimen.width * 0.025,
          backgroundColor: colors.bg_optacity,
        },
        styleContainer,
      ]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styleInput}
        className="flex-1"
      />
    </TouchableOpacity>
  );
}
