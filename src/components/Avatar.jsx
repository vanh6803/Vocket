import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {colors} from '../assets/Colors';
import {BASE_URL, dimen} from '../constants';

const Avatar = ({uri, size, name, borderWidthContainer}) => {
  const imageSize = useMemo(() => size || dimen.width * 0.1, [size]);

  return (
    <View
      style={{
        borderWidth: borderWidthContainer ?? 1.5,
        borderColor: colors.primary,
        padding: 2,
        borderRadius: imageSize,
        overflow: 'hidden',
      }}>
      <View
        style={{
          width: imageSize,
          height: imageSize,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: imageSize,
          overflow: 'hidden',
          backgroundColor: colors.bg_optacity,
        }}>
        {uri != '' ? (
          <FastImage
            source={{
              uri: `${BASE_URL}${uri}`,
            }}
            style={{
              aspectRatio: 1,
              width: '100%',
              height: '100%',
              borderRadius: imageSize,
            }}
          />
        ) : (
          <View
            style={{
              borderRadius: imageSize,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>{name}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Avatar;
