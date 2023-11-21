import {View, Text, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import Header from './Header';
import RenderImage from './RenderImage';
import RenderCamera from './RenderCamera';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  ImageManipulator,
} from 'react-native-vision-camera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {globals} from '../styles/Global';

export default function PageAction({goToPage}) {
  const camera = useRef();
  const [image, setImage] = useState();

  const [isFrontCamera, setIsFrontCamera] = useState(true); // Trạng thái để theo dõi xem camera nên là camera sau hay không
  const device = useCameraDevice(isFrontCamera ? 'front' : 'back');

  const handleTakePhoto = async () => {
    const photo = await camera.current.takePhoto();
    setImage(photo);
  };
  const toggleCamera = () => {
    setIsFrontCamera(prevIsFrontCamera => !prevIsFrontCamera);
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
        />
      ) : (
        <RenderImage
          image={image}
          onClickClose={() => {
            setImage(null);
          }}
          isFront={isFrontCamera}
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
