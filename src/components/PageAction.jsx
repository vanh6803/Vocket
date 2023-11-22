import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from './Header';
import RenderImage from './RenderImage';
import RenderCamera from './RenderCamera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {globals} from '../styles/Global';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function PageAction({goToPage}) {
  const camera = useRef();
  const [image, setImage] = useState();

  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [flash, setFlash] = useState(false);

  const handleTakePhoto = async () => {
    const photo = await camera.current.takePhoto({
      enableShutterSound: true,
      flash: flash ? 'on' : 'off',
    });
    setImage(photo);
  };
  const toggleCamera = () => {
    setIsFrontCamera(prevIsFrontCamera => !prevIsFrontCamera);
  };
  const toggleFlash = () => {
    setFlash(prevFlash => !prevFlash);
  };
  return (
    <View className="flex-1">
      <Header
        iconLeft={<IconSolid.UsersIcon color={'white'} size={30} />}
        iconRight={<IconSolid.UserCircleIcon color={'white'} size={30} />}
        styleButtonLeft={[globals.circleButton]}
        styleButtonRight={[globals.circleButton]}
      />
      {!image ? (
        <RenderCamera
          takePhoto={handleTakePhoto}
          cameraRef={camera}
          toggleCamera={toggleCamera}
          isFront={isFrontCamera}
          flash={flash}
          toggleFlash={toggleFlash}
        />
      ) : (
        <RenderImage
          image={image}
          onClickClose={() => {
            setImage(null);
          }}
          isFront={isFrontCamera}
          toggleSaveImage={savePhotoToCameraRoll}
        />
      )}
      {/* footer */}
      <TouchableOpacity
        className="flex-1 justify-center items-center"
        onPress={goToPage}>
        <Text className="text-white text-xl font-semibold">History</Text>
        <IconOutline.ChevronDoubleDownIcon color={'white'} size={40} />
      </TouchableOpacity>
    </View>
  );
}
