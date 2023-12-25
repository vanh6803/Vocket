import {View, Text} from 'react-native';
import React from 'react';
import CricleButton from './CricleButton';
import {dimen} from '../constants';

export default function Header({
  oncClickRight,
  onClickLeft,
  styleButtonRight,
  styleButtonLeft,
  styleTitle,
  title,
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
          marginTop: dimen.height * 0.045,
        },
        styleContainer,
      ]}>
      <CricleButton
        onPress={onClickLeft}
        styleButton={styleButtonLeft}
        icon={iconLeft}
      />
      <Text style={styleTitle} className="text-white text-lg font-semibold">
        {title}
      </Text>
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
