import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {colors} from '../assets/Colors';
import {dimen} from '../constants';

const ButtonOption = ({icon, title, onPress, styleTitle}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center"
      onPress={onPress}
      style={{
        backgroundColor: colors.bg_optacity,
        padding: dimen.width * 0.03,
        marginTop: 1,
      }}>
      {icon}
      <Text style={styleTitle} className=" ml-1 text-white text-base font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ButtonOption;
