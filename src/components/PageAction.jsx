import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from './Header';
import RenderImage from './RenderImage';
import RenderCamera from './RenderCamera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {globals} from '../styles/Global';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export default function PageAction({goToPage, nextChat}) {
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

  const handleSavePhoto = async () => {
    if (image) {
      try {
        const saved = await CameraRoll.save(image.path);
        if (saved) {
          console.log('Photo saved successfully!');
          // You can add any additional logic or UI update here after saving the photo.
        } else {
          console.error('Failed to save photo.');
        }
      } catch (error) {
        console.error('Error saving photo:', error);
      }
    }
  };

  return (
    <View className="flex-1">
      <Header
        iconLeft={<IconSolid.UserCircleIcon color={'white'} size={30} />}
        iconRight={
          <IconSolid.ChatBubbleOvalLeftIcon color={'white'} size={30} />
        }
        styleButtonLeft={[globals.circleButton]}
        styleButtonRight={[globals.circleButton]}
        oncClickRight={nextChat}
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
          toggleSaveImage={handleSavePhoto}
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
