import {View, Text} from 'react-native';
import React from 'react';
import CricleButton from './CricleButton';
import {dimen} from '../constants';

export default function Header({
  oncClickRight,
  onClickLeft,
  styleButtonRight,
  styleButtonLeft,
  boxStyle,
  boxChildren,
  iconRight,
  iconLeft,
  styleContainer,
}) {
  return (
    <View
      className="flex flex-row justify-between items-center"
      style={[
        {
          marginHorizontal: dimen.width * 0.08,
          marginVertical: dimen.height * 0.02,
        },
        styleContainer,
      ]}>
      <CricleButton
        onPress={onClickLeft}
        styleButton={styleButtonLeft}
        icon={iconLeft}
      />
      <View style={boxStyle} className="overflow-hidden rounded-3xl">
        {boxChildren}
      </View>
      {iconRight ? (
        <CricleButton
          onPress={oncClickRight}
          styleButton={styleButtonRight}
          icon={iconRight}
        />
      ) : (
        <View className="w-8" />
      )}
    </View>
  );
}
