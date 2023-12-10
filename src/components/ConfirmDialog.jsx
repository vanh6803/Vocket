import React from 'react';
import {View, StyleSheet, Modal, Text, TouchableOpacity} from 'react-native';

const ConfirmDialog = ({visible, onClickDelete, onClickCancel}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClickCancel}>
      <View className="flex-1 justify-center items-center">
        <View className="bg-zinc-800 p-4 rounded-3xl">
          <Text className="text-white text-lg font-semibold mb-2">
            Confirm Delete
          </Text>
          <Text className="text-white mb-4">
            Are you sure you want to delete this photo?
          </Text>
          <View className="flex-row justify-end">
            <TouchableOpacity onPress={onClickCancel}>
              <Text className="text-blue-500 mr-4">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickDelete}>
              <Text className="text-red-500">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
