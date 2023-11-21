import {View, Text, Image} from 'react-native';
import React, { useState } from 'react';
import Header from './Header';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';
import CricleButton from './CricleButton';
import ImagesConent from './ImagesConent';

export default function PageContents({goToPage}) {
  return (
    <View style={{height: dimen.height}}>
      <Header
        iconLeft={<IconOutline.ChevronUpIcon color={'white'} size={35} />}
        iconRight={
          <IconOutline.EllipsisHorizontalCircleIcon color={'white'} size={35} />
        }
        onClickLeft={goToPage}
        oncClickRight={()=>{}}//gọi bottom sheet dialog
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
    </View>
  );
}

