import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  NativeModules,
  Platform,
} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNPhotoManipulator from 'react-native-image-manipulator';
import Snackbar from 'react-native-snackbar';
import RenderCamera from './RenderCamera';
import RenderImage from './RenderImage';
import {globals} from '../styles/Global';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {BASE_URL, dimen} from '../constants';

const {ImageProcessingModule} = NativeModules;

export default function PageAction({
  goToPage,
  nextChat,
  openProfile,
  openFriend,
}) {
  const camera = useRef();
  const [image, setImage] = useState();

  const profile = useSelector(state => state.profileReducer.data);

  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [flash, setFlash] = useState(false);

  const handleTakePhoto = async () => {
    const photo = await camera.current.takePhoto({
      enableShutterSound: false,
      flash: flash ? 'on' : 'off',
      enableAutoRedEyeReduction: true,
      enableAutoStabilization: true,
      enableAutoDistortionCorrection: true,
    });
    console.log(photo);

    let rotateDegrees = isFrontCamera ? 90 : 0;
    let borderRadius = 50;

    ImageProcessingModule.processImage(photo.path, rotateDegrees, borderRadius)
      .then(processedImage => {
        console.log(processedImage);
        setImage(processedImage);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const toggleCamera = () => {
    setIsFrontCamera(prevIsFrontCamera => !prevIsFrontCamera);
  };

  const toggleFlash = () => {
    setFlash(prevFlash => !prevFlash);
  };

  const handleSavePhoto = async () => {
    if (image) {
      console.log(image);
      try {
        const saved = await CameraRoll.saveAsset(image);
        if (saved) {
          console.log('Photo saved successfully!');
          Snackbar.show({
            text: 'save photo successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
        } else {
          console.error('Failed to save photo.');
          Snackbar.show({
            text: 'save photo failed',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
          });
        }
      } catch (error) {
        console.error('Error saving photo:', error);
        Snackbar.show({
          text: 'save photo failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
      <View className="flex-1">
        <Header
          iconLeft={
            profile?.result.avatar != '' ? (
              <FastImage
                source={{uri: `${BASE_URL}${profile?.result.avatar}`}}
                style={{
                  width: dimen.width * 0.07,
                  height: dimen.width * 0.07,
                  borderRadius: (dimen.width * 0.07) / 2,
                }}
              />
            ) : (
              <IconSolid.UserCircleIcon color={'white'} size={30} />
            )
          }
          iconRight={
            <IconSolid.ChatBubbleOvalLeftIcon color={'white'} size={30} />
          }
          boxChildren={
            <TouchableOpacity onPress={openFriend}>
              <View
                style={{
                  padding: dimen.width * 0.025,
                  paddingHorizontal: dimen.width * 0.04,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <IconSolid.UsersIcon color={'white'} />
                <View style={{width: dimen.width * 0.01}} />
                <Text className="text-white font-medium text-base">
                  {profile?.result.friends?.length == 0
                    ? 'No Friends'
                    : 'Your Friends'}
                </Text>
              </View>
            </TouchableOpacity>
          }
          boxStyle={{backgroundColor: 'rgba(80,80,80,0.6)'}}
          styleButtonLeft={[globals.circleButton]}
          styleButtonRight={[globals.circleButton]}
          oncClickRight={nextChat}
          onClickLeft={openProfile}
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
    </TouchableWithoutFeedback>
  );
}
