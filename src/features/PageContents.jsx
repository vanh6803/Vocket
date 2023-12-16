import {View, Text, Image, Pressable} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Header from '../components/Header';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {BASE_URL, dimen} from '../constants/index';
import {colors} from '../assets/Colors';
import CricleButton from '../components/CricleButton';
import BottomSheet from '@gorhom/bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import PagerView from 'react-native-pager-view';
import BottomSheetListPosts from '../components/BottomSheetListPosts';
import BottomSheetShowMoreOption from '../components/BottomSheetShowMoreOption';
import ConfirmDialog from '../components/ConfirmDialog';
import axios from 'axios';
import {fetchPostRequest} from '../redux/action/Post';
import Snackbar from 'react-native-snackbar';
import FastImage from 'react-native-fast-image';

export default function PageContents({goToPage}) {
  const pagerRef = useRef();
  const [itemSelected, setItemSelected] = useState(null);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const bottomSheetShowMoreOptionRef = useRef(null);
  const snapPointsShowMore = useMemo(() => ['20%'], []);

  const bottomSheetListPosts = useRef(null);
  const snapPointsListPosts = useMemo(() => ['97%'], []);

  const data = useSelector(state => state.postReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the pagerRef has been initialized
    if (pagerRef.current) {
      // Set the page based on the position prop
      pagerRef.current.setPage(indexSelected);
    }
  }, [indexSelected]);

  const onPageSelected = event => {
    const selectedIndex = event.nativeEvent.position;
    setItemSelected(data?.result[selectedIndex]);
  };

  const ConfirmDeletePhoto = () => {
    console.log(itemSelected);
    // show confirm dialog
    setIsShowConfirmDialog(true);
    handleCloseBottomSheet();
  };

  const handleDeletePhoto = () => {
    if (itemSelected) {
      axios
        .delete(`${BASE_URL}api/posts/${itemSelected?._id}`)
        .then(response => {
          setIsShowConfirmDialog(false);
          Snackbar.show({
            text: 'Delete Photo successfully',
            duration: Snackbar.LENGTH_SHORT,
          });
          setItemSelected(null);
          dispatch(fetchPostRequest());
        })
        .catch(err => {
          console.log('delete image fail:', err);
          Snackbar.show({
            text: 'Delete photo failed',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: 'red',
          });
        });
    }
  };

  const handleDowloadImage = () => {
    console.log(`${BASE_URL}${itemSelected?.image}`);
  };

  // close bottom sheet
  const handleCloseBottomSheet = () => {
    bottomSheetShowMoreOptionRef.current.close();
    bottomSheetListPosts.current.close();
  };

  //select item in list
  const handleItemList = useCallback(index => {
    bottomSheetListPosts.current.close();
    console.log('index selected in list: ', index);
    setIndexSelected(index);
  });

  return (
    <Pressable style={{height: dimen.height}} onPress={handleCloseBottomSheet}>
      {/* TODO: header */}
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
      {/* TODO: body content */}
      <View className="flex-1  justify-center items-center">
        <PagerView
          ref={pagerRef}
          orientation={'vertical'}
          onPageSelected={onPageSelected}
          style={{width: dimen.width, height: '100%'}}>
          {data?.result.map((data, index) => {
            return (
              <View key={index} className="flex-1 justify-center items-center">
                <View
                  className="rounded-[50px] overflow-hidden"
                  style={{
                    width: dimen.width,
                    height: dimen.width,
                    margin: 2,
                    borderRadius: 50,
                    overflow: 'hidden',
                  }}>
                  <FastImage
                    source={{
                      uri: `${BASE_URL}${data.image}`,
                      priority: FastImage.priority.normal,
                    }}
                    style={{width: dimen.width, aspectRatio: 1}}
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
      {/*TODO: footer */}
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
          />
        </View>
        <IconOutline.ShareIcon color={'white'} size={35} />
      </View>
      {/* TODO: bottom sheet show all list product */}
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

      {/* TODO: bottom sheet show action */}
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
          DeletePhoto={ConfirmDeletePhoto}
          savePhoto={handleDowloadImage}
        />
      </BottomSheet>
      <ConfirmDialog
        visible={isShowConfirmDialog}
        onClickCancel={() => {
          setIsShowConfirmDialog(false);
        }}
        onClickDelete={handleDeletePhoto}
      />
    </Pressable>
  );
}