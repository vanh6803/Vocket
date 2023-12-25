import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';

/**
 * @param {Object} props - Props của component.
 * @param {string} [props.placeholderTextColor] - Màu sắc cho placeholder.
 * @param {string} [props.placeholder] - Placeholder cho TextInput.
 * @param {Object} [props.styleInput] - Style cho TextInput.
 * @param {'none' | 'text' | 'tel' | 'email' | 'numeric'} [props.inputMode='text'] - Chế độ nhập liệu (giá trị mặc định là 'text').
 * @param {Object} [props.styleContainer] - Style cho container.
 * @param {(text: string) => void} [props.onChangeText] - Hàm được gọi khi giá trị của TextInput thay đổi.
 */

export default function InputCustom({
  placeholderTextColor,
  placeholder,
  styleInput,
  inputMode = 'text',
  styleContainer,
  onChangeText,
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
        inputMode={inputMode}
        className="flex-1 text-white"
        onChangeText={onChangeText}
        cursorColor={'white'}
      />
    </TouchableOpacity>
  );
}
