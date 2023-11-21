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
}) {
  return (
    <View
      className="flex flex-row justify-between"
      style={{
        marginHorizontal: dimen.width * 0.08,
        marginVertical: dimen.height * 0.035,
        marginTop: dimen.height * 0.045,
      }}>
      <CricleButton
        onPress={onClickLeft}
        styleButton={styleButtonLeft}
        icon={iconLeft}
      />
      <Text style={styleTitle} className="text-white">
        {title}
      </Text>
      <CricleButton
        onPress={oncClickRight}
        styleButton={styleButtonRight}
        icon={iconRight}
      />
    </View>
  );
}
