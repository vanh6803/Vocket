import {View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import CricleButton from './CricleButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {dimen} from '../constants/index';
import {colors} from '../assets/Colors';
import {useAppState} from '@react-native-community/hooks';

export default function RenderCamera() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const [isFrontCamera, setIsFrontCamera] = useState(true); // Trạng thái để theo dõi xem camera nên là camera sau hay không
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back'); // Chọn camera dựa trên trạng thái

  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';

  const toggleCamera = () => {
    setIsFrontCamera(prevIsFrontCamera => !prevIsFrontCamera);
  };
  return (
    <View>
      <View className="rounded-[50px] overflow-hidden m-[2px]">
        <Camera
          className="aspect-square "
          device={device}
          isActive={isActive}
        />
      </View>
      <View
        className="flex flex-row justify-around items-center"
        style={{marginTop: dimen.height * 0.05}}>
        <CricleButton
          icon={<IconOutline.BoltIcon color={'white'} size={45} />}
        />
        <TouchableOpacity className="rounded-full border-yellow-500 border-2 p-1">
          <View className="bg-white w-[70px] h-[70px] rounded-full " />
        </TouchableOpacity>
        <CricleButton
          icon={
            <IconOutline.ArrowPathIcon
              color={'white'}
              size={45}
              onPress={toggleCamera}
            />
          }
        />
      </View>
    </View>
  );
}
