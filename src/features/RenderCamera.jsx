import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  useCameraDevice,
  Camera,
  useCameraFormat,
} from 'react-native-vision-camera';
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

  const format = useCameraFormat(device, [
    {iso: 'max'},
    {videoHdr: true},
    {videoResolution: 'max'},
    {photoAspectRatio: 1 / 1},
    {photoResolution: 'max'},
    {pixelFormat: 'native'},
  ]);

  return (
    <View>
      <View
        className="rounded-[50px] overflow-hidden"
        style={{width: dimen.width, height: dimen.width}}>
        <Camera
          ref={cameraRef}
          device={device}
          style={{aspectRatio: 1 / 1}}
          isActive={isActive}
          photo={true}
          orientation="portrait"
          format={format}
        />
      </View>
      <View
        className="flex flex-row justify-around items-center"
        style={{marginTop: dimen.height * 0.03}}>
        <CricleButton
          icon={
            flash ? (
              <IconSolid.BoltIcon color={'white'} size={dimen.width * 0.1} />
            ) : (
              <IconOutline.BoltIcon color={'white'} size={dimen.width * 0.1} />
            )
          }
          onPress={toggleFlash}
        />
        <TouchableOpacity
          className="rounded-full border-yellow-500 border-2 p-1"
          onPress={takePhoto}>
          <View
            className="bg-white  rounded-full "
            style={{width: dimen.width * 0.2, height: dimen.width * 0.2}}
          />
        </TouchableOpacity>
        <CricleButton
          icon={
            <IconOutline.ArrowPathIcon
              color={'white'}
              size={dimen.width * 0.1}
              onPress={toggleCamera}
            />
          }
        />
      </View>
    </View>
  );
}
