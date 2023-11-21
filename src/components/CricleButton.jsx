import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CricleButton({icon, onPress, styleButton}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{}, styleButton]}
      className="rounded-full justify-center items-center">
      {icon}
    </TouchableOpacity>
  );
  1;
}
