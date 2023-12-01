import {View, Text, Image} from 'react-native';
import React, {useRef} from 'react';
import {BASE_URL, dimen} from '../constants';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import {useSelector} from 'react-redux';

export default function ImagesConent() {
  const pagerRef = useRef();

  const data = useSelector(state => state.postReducer.data);

  return (
    <View className="flex-1  justify-center items-center">
      <PagerView
        ref={pagerRef}
        orientation={'vertical'}
        style={{width: dimen.width, height: '100%'}}>
        {data?.result.map((data, index) => {
          return (
            <View key={index} className="flex-1 justify-center items-center">
              <View
                className="rounded-[50px] overflow-hidden"
                style={{width: dimen.width, height: dimen.width}}>
                <Image
                  source={{
                    uri: `${BASE_URL}${data.image}`,
                  }}
                  className="aspect-square"
                />
                {data.content ? (
                  <Text
                    className="absolute text-white bottom-3 rounded-3xl self-center text-base p-1.5 px-3"
                    style={{backgroundColor: 'rgba(0, 0, 0,0.5)'}}>
                    {data.content}
                  </Text>
                ) : null}
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
