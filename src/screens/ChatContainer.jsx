import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import {dimen} from '../constants';
import {useNavigation} from '@react-navigation/native';
import CricleButton from '../components/CricleButton';

const ChatContainer = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: colors.bg_dark}}>
      <View
        className="flex-row"
        style={{
          marginTop: dimen.height * 0.05,
          paddingHorizontal: dimen.width * 0.07,
        }}>
        <CricleButton
          icon={<IconOutline.ChevronLeftIcon size={30} color={'white'} />}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text className="flex-1 text-white text-center text-lg">Messager</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatContainer;
