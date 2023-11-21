import {View, Text, Image} from 'react-native';
import React, {useRef} from 'react';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';

const data = [
  {
    id: 1,
    image:
      'https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg',
    content: 'haha',
    user: 'vanh',
  },
  {
    id: 2,
    image:
      'https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg',
    content: 'haha',
    user: 'vanh1',
  },
  {
    id: 3,
    image:
      'https://image-us.24h.com.vn/upload/3-2023/images/2023-09-12/q--2--1694514524-739-width641height960.jpg',
    content: 'haha',
    user: 'vanh2',
  },
];

export default function ImagesConent() {
  const pagerRef = useRef();
  return (
    <View className="flex-1  justify-center items-center">
      <PagerView
        ref={pagerRef}
        orientation={'vertical'}
        style={{width: dimen.width, height: '100%'}}>
        {data.map((data, index) => {
          return (
            <View key={data.id} className="flex-1 justify-center items-center">
              <View
                className="rounded-[50px] overflow-hidden"
                style={{width: dimen.width, height: dimen.width}}>
                <Image
                  source={{
                    uri: data.image,
                  }}
                  className="aspect-square"
                />
                <Text
                  className="absolute text-white bottom-3 rounded-3xl self-center text-base p-1.5 px-3"
                  style={{backgroundColor: 'rgba(0, 0, 0,0.5)'}}>
                  {' '}
                  {data.content}{' '}
                </Text>
              </View>
              <View
                className="p-2 px-4 rounded-3xl justify-center items-center"
                style={{
                  marginTop: dimen.height * 0.05,
                  backgroundColor: colors.bg_optacity,
                }}>
                <Text className="text-white text-base font-semibold">
                  {data.user}
                </Text>
              </View>
            </View>
          );
        })}
      </PagerView>
    </View>
  );
}
