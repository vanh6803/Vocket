import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {useAppState} from '@react-native-community/hooks';
import {dimen} from '../constants/index';
import CricleButton from '../components/CricleButton';
import {useIsFocused} from '@react-navigation/native';

export default function RenderCamera({
  takePhoto,
  cameraRef,
  toggleCamera,
  isFront,
  flash,
  toggleFlash,
}) {
  const device = useCameraDevice(isFront ? 'front' : 'back'); // Chọn camera dựa trên trạng thái
  const isFocuse = useIsFocused();
  const appState = useAppState();
  const isActive = isFocuse || appState === 'active';

  return (
    <View>
      <View className="rounded-[50px] overflow-hidden m-[2px]">
        <Camera
          ref={cameraRef}
          className="aspect-square"
          device={device}
          isActive={isActive}
          photo
          enableZoomGesture
          orientation="portrait"
          focusable={true}
          resizeMode="cover"
          photoHdr
        />
      </View>
      <View
        className="flex flex-row justify-around items-center"
        style={{marginTop: dimen.height * 0.05}}>
        <CricleButton
          icon={
            flash ? (
              <IconSolid.BoltIcon color={'white'} size={45} />
            ) : (
              <IconOutline.BoltIcon color={'white'} size={45} />
            )
          }
          onPress={toggleFlash}
        />
        <TouchableOpacity
          className="rounded-full border-yellow-500 border-2 p-1"
          onPress={takePhoto}>
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
