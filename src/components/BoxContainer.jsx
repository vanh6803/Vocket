import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {dimen} from '../constants';

const BoxContainer = prop => {
  return (
    <View style={[prop.containterStyle]}>
      <View className="flex-row  items-center">
        {prop.icon}
        <Text className="text-white text-base" style={[prop.titleStyle]}>
          {prop.title}
        </Text>
      </View>
      <View
        className="rounded-2xl overflow-hidden"
        style={[{marginTop: dimen.height * 0.01}, prop.boxContentStyle]}>
        {prop.children}
      </View>
    </View>
  );
};

export default BoxContainer;
