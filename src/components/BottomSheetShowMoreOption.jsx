import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

const BottomSheetShowMoreOption = ({
  onCloseBottomSheet,
  DeletePhoto,
  savePhoto,
}) => {
  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={DeletePhoto}
        className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500 font-bold">Delete Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={savePhoto}
        className="flex-1 justify-center items-center border-t border-black">
        <Text className="text-lg text-white  font-bold">Download Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 justify-center items-center border-t border-black"
        onPress={onCloseBottomSheet}>
        <Text className="text-lg text-white font-bold">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetShowMoreOption;
