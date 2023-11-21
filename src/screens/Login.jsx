import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity>
        <Text
          className="text-black"
          onPress={() => {
            navigation.navigate('Main');
          }}>
          next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
