import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';

const Input = ({
  placeholder,
  onChangeText,
  cursorColor,
  secureTextEntry,
  placeholderTextColor,
  styleContainer,
  styleInput,
  sizeIcon,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View
      className="rounded-xl flex-row items-center"
      style={[
        {
          backgroundColor: colors.bg_optacity,
          marginHorizontal: dimen.width * 0.04,
        },
        styleContainer,
      ]}>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        className=" text-white text-base flex-1"
        cursorColor={cursorColor}
        onChangeText={onChangeText}
        style={[
          {
            paddingHorizontal: dimen.width * 0.03,
            padding: dimen.width * 0.035,
          },
          styleInput,
        ]}
        secureTextEntry={secureTextEntry && showPassword}
      />
      {secureTextEntry ? (
        <TouchableOpacity className="p-2" onPress={togglePasswordVisibility}>
          {showPassword ? (
            <IconOutline.EyeIcon color={'gray'} size={sizeIcon || 25} />
          ) : (
            <IconOutline.EyeSlashIcon color={'gray'} size={sizeIcon || 25} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Input;
