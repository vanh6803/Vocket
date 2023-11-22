import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Header from './Header';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';
import CricleButton from './CricleButton';
import ImagesConent from './ImagesConent';
import BottomSheet from '@gorhom/bottom-sheet';

export default function PageContents({goToPage}) {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['20%'], []);

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current.close();
  };
  return (
    <Pressable style={{height: dimen.height}} onPress={handleCloseBottomSheet}>
      <Header
        iconLeft={<IconOutline.ChevronUpIcon color={'white'} size={35} />}
        iconRight={
          <IconOutline.EllipsisHorizontalCircleIcon color={'white'} size={35} />
        }
        onClickLeft={goToPage}
        oncClickRight={() => {
          bottomSheetRef.current.expand();
        }} //gọi bottom sheet dialog
      />
      <ImagesConent />
      {/* footer */}
      <View
        className="flex-row items-center justify-between"
        style={{
          marginTop: dimen.height * 0.05,
          marginHorizontal: dimen.width * 0.05,
        }}>
        <IconOutline.Squares2X2Icon color={'white'} size={35} />
        <View
          className="flex-row p-2 px-3 rounded-3xl"
          style={{backgroundColor: 'rgba(90, 90, 90,0.5)'}}>
          <CricleButton
            icon={
              <IconOutline.ChatBubbleOvalLeftEllipsisIcon
                color={'white'}
                size={35}
              />
            }
          />
          <CricleButton
            icon={<IconSolid.HeartIcon color={'white'} size={35} />}
            styleButton={{
              marginHorizontal: 10,
            }}
          />

          <CricleButton
            icon={
              <IconOutline.ChatBubbleOvalLeftEllipsisIcon
                color={'white'}
                size={35}
              />
            }
          />
        </View>
        <IconOutline.ShareIcon color={'white'} size={35} />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1 }
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{backgroundColor: colors.bg_4C}}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}>
        <View className="flex-1">
          <TouchableOpacity className="flex-1 justify-center items-center">
            <Text className="text-lg text-red-500 font-bold">Delete Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 justify-center items-center border-t border-black">
            <Text className="text-lg text-white  font-bold">
              Download Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 justify-center items-center border-t border-black"
            onPress={handleCloseBottomSheet}>
            <Text className="text-lg text-white font-bold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Pressable>
  );
}
