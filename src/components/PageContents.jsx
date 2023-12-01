import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  FlatList,
} from 'react-native';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import Header from './Header';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {BASE_URL, dimen} from '../constants';
import {colors} from '../assets/Colors';
import CricleButton from './CricleButton';
import ImagesConent from './ImagesConent';
import BottomSheet from '@gorhom/bottom-sheet';
import {useSelector} from 'react-redux';

export default function PageContents({goToPage}) {
  const bottomSheetShowMoreOptionRef = useRef(null);
  const snapPointsShowMore = useMemo(() => ['20%'], []);

  const bottomSheetListPosts = useRef(null);
  const snapPointsListPosts = useMemo(() => ['97%'], []);

  const data = useSelector(state => state.postReducer.data);

  const [indexSelected, setIndexSelected] = useState(0);

  const handleCloseBottomSheet = () => {
    bottomSheetShowMoreOptionRef.current.close();
    bottomSheetListPosts.current.close();
  };

  const handleItemList = useCallback(index => {
    bottomSheetListPosts.current.close();
    console.log(index);
    setIndexSelected(index);
  });

  return (
    <Pressable style={{height: dimen.height}} onPress={handleCloseBottomSheet}>
      <Header
        iconLeft={<IconOutline.ChevronUpIcon color={'white'} size={35} />}
        iconRight={
          <IconOutline.EllipsisHorizontalCircleIcon color={'white'} size={35} />
        }
        onClickLeft={goToPage}
        oncClickRight={() => {
          bottomSheetShowMoreOptionRef.current.expand();
        }} //gọi bottom sheet dialog
      />
      <ImagesConent position={indexSelected} />
      {/* footer */}
      <View
        className="flex-row items-center justify-between"
        style={{
          marginTop: dimen.height * 0.05,
          marginHorizontal: dimen.width * 0.05,
        }}>
        {/* list all posts */}
        <CricleButton
          onPress={() => {
            bottomSheetListPosts.current.expand();
          }}
          icon={<IconOutline.Squares2X2Icon color={'white'} size={35} />}
        />
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
        ref={bottomSheetListPosts}
        index={-1}
        snapPoints={snapPointsListPosts}
        enablePanDownToClose
        backgroundStyle={{backgroundColor: colors.bg_4C}}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}>
        <BottomSheetListPosts data={data} onClickItem={handleItemList} />
      </BottomSheet>
      <BottomSheet
        ref={bottomSheetShowMoreOptionRef}
        index={-1}
        snapPoints={snapPointsShowMore}
        enablePanDownToClose
        backgroundStyle={{backgroundColor: colors.bg_4C}}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}>
        <BottomSheetShowMoreOption
          onCloseBottomSheet={handleCloseBottomSheet}
        />
      </BottomSheet>
    </Pressable>
  );
}

const BottomSheetListPosts = ({data, onClickItem}) => {
  return (
    <View className="flex-1">
      <FlatList
        data={data?.result}
        keyExtractor={data => data._id}
        numColumns={3}
        style={{paddingHorizontal: 2}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onClickItem(index)}
              className="flex-1 m-[2px] max-w-[32%]">
              <Image
                source={{uri: `${BASE_URL}${item.image}`}}
                className="aspect-square object-cover rounded-lg"
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const BottomSheetShowMoreOption = ({onCloseBottomSheet}) => {
  return (
    <View className="flex-1">
      <TouchableOpacity className="flex-1 justify-center items-center">
        <Text className="text-lg text-red-500 font-bold">Delete Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity className="flex-1 justify-center items-center border-t border-black">
        <Text className="text-lg text-white  font-bold">Download Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-1 justify-center items-center border-t border-black"
        onPress={onCloseBottomSheet}>
        <Text className="text-lg text-white font-bold">Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};
