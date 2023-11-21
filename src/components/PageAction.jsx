import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Header from './Header';
import RenderImage from './RenderImage';
import RenderCamera from './RenderCamera';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {globals} from '../styles/Global';

export default function PageAction({goToPage}) {
  const [image, setImage] = useState();
  return (
    <View className="flex-1">
      <Header
        iconLeft={<IconSolid.UsersIcon color={'white'} size={30} />}
        iconRight={<IconSolid.UserCircleIcon color={'white'} size={30} />}
        styleButtonLeft={[globals.circleButton]}
        styleButtonRight={[globals.circleButton]}
      />
      {!image ? <RenderCamera /> : <RenderImage />}
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
