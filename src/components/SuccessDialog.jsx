import React from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';
import LottieView from 'lottie-react-native';
import {amins} from '../assets/anims/index';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';

const SuccessDialog = ({visible}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 justify-center items-center">
        <View
          className="rounded-xl justify-center items-center"
          style={{
            backgroundColor: colors.bg_4C,
            width: dimen.width * 0.9,
          }}>
          <LottieView
            source={amins.success}
            autoPlay
            loop={false}
            style={{
              width: dimen.width * 0.3,
              height: dimen.width * 0.3,
            }}
          />
          <Text className="text-white font-bold text-lg pb-5">
            Create account successfully
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessDialog;
