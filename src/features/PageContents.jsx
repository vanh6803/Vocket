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
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {amins} from './../assets/anims/index';
import moment from 'moment';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import RNFetchBlob from 'rn-fetch-blob';

export default function PageContents({goToPage}) {
  const pagerRef = useRef();
  const [itemSelected, setItemSelected] = useState(null);
  const [indexSelected, setIndexSelected] = useState(0);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState(false);

  const bottomSheetShowMoreOptionRef = useRef(null);
  const snapPointsShowMore = useMemo(() => ['20%'], []);

  const bottomSheetListPosts = useRef(null);
  const snapPointsListPosts = useMemo(() => ['100%'], []);

  const data = useSelector(state => state.postReducer.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(indexSelected);
    }
  }, [indexSelected]);

  const onPageSelected = event => {
    const selectedIndex = event.nativeEvent.position;
    setItemSelected(data?.result[selectedIndex]);
  };

  const ConfirmDeletePhoto = () => {
    console.log(itemSelected);
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
    const {config, fs} = RNFetchBlob;
    let fakeUri = `${BASE_URL}${itemSelected?.image}`;
    console.log(config);
    console.log(fs.dirs.PictureDir);
    let pictureDir = fs.dirs.PictureDir;
    let ext = getExtention(fakeUri);
    ext = '.' + ext[0];
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          pictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', fakeUri)
      .then(res => {
        console.log(res);
        Snackbar.show({
          text: 'save photo successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
        bottomSheetShowMoreOptionRef.current.close();
      })
      .catch(err => {
        console.log(err);
        Snackbar.show({
          text: 'save photo failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
  };

  const getExtention = fileName => {
    return /[.]/.exec(fileName) ? /[^.]+$/.exec(fileName) : undefined;
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

  function calculateTimeDifference(createAt) {
    if (createAt) {
      const currentTime = moment();
      const createdAt = moment(createAt);
      const duration = moment.duration(currentTime.diff(createdAt));
      const days = Math.floor(duration.asDays());
      const hours = Math.floor(duration.asHours());
      const minutes = Math.floor(duration.asMinutes());

      if (days > 0) {
        return `${days}d`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else if (minutes > 0) {
        return `${minutes}p`;
      } else {
        return 'Just now';
      }
    }
  }

  return (
    <Pressable style={{flex: 1}} onPress={handleCloseBottomSheet}>
      {/* TODO: header */}
      <Header
        iconLeft={<IconOutline.ChevronUpIcon color={'white'} size={35} />}
        iconRight={
          <IconOutline.EllipsisHorizontalCircleIcon color={'white'} size={35} />
        }
        onClickLeft={goToPage}
        oncClickRight={() => {
          bottomSheetShowMoreOptionRef.current.expand();
        }}
      />
      {/* TODO: body content */}
      <View className="flex-1 justify-center items-center">
        {data?.result.length > 0 ? (
          <PagerView
            ref={pagerRef}
            orientation={'vertical'}
            onPageSelected={onPageSelected}
            style={{width: dimen.width, height: '100%'}}>
            {data?.result.map((data, index) => {
              return (
                <View
                  key={index}
                  className="flex-1 justify-center items-center">
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
                    {data?.content ? (
                      <Text
                        className="absolute text-white bottom-3 rounded-3xl self-center text-base p-1.5 px-3"
                        style={{backgroundColor: 'rgba(0, 0, 0,0.5)'}}>
                        {data?.content}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    className="p-2 px-4 rounded-3xl justify-center items-center"
                    style={{
                      marginTop: dimen.height * 0.05,
                      backgroundColor: colors.bg_optacity,
                    }}>
                    <Text className="text-white text-lg font-semibold">
                      {`${data?.user_id.fullName} ${calculateTimeDifference(
                        data?.create_at,
                      )}`}
                    </Text>
                  </View>
                </View>
              );
            })}
          </PagerView>
        ) : (
          <View>
            <LottieView
              source={amins.noData}
              autoPlay
              style={{
                width: dimen.width,
                height: dimen.width,
              }}
            />
            <Text className="self-center text-white text-lg font-bold">
              You need to make more friends
            </Text>
          </View>
        )}
      </View>
      {/*TODO: footer */}
      <View
        className="flex-row items-center justify-between"
        style={{
          marginTop: dimen.height * 0.05,
          marginBottom: dimen.height * 0.02,
          marginHorizontal: dimen.width * 0.05,
        }}>
        {/* list all posts */}
        <CricleButton
          onPress={() => {
            bottomSheetListPosts.current.expand();
          }}
          icon={<IconOutline.Squares2X2Icon color={'white'} size={35} />}
        />
        {data?.result.length > 0 ? (
          <Pressable
            onPress={() => {
              navigation.navigate('chat');
            }}
            className="flex-row p-2 px-3 rounded-3xl items-center"
            style={{backgroundColor: 'rgba(90, 90, 90,0.5)'}}>
            <CricleButton
              icon={
                <IconOutline.ChatBubbleOvalLeftEllipsisIcon
                  color={'white'}
                  size={35}
                />
              }
            />
            <Text
              className="text-white text-base"
              style={{marginHorizontal: dimen.width * 0.05}}>
              Gửi tin nhắn ....
            </Text>
          </Pressable>
        ) : (
          <View></View>
        )}
        <CricleButton
          icon={<IconSolid.HeartIcon color={'white'} size={35} />}
        />
      </View>
      {/* TODO: bottom sheet show all list product */}
      <BottomSheet
        ref={bottomSheetListPosts}
        index={-1}
        snapPoints={snapPointsListPosts}
        enablePanDownToClose
        backgroundStyle={{backgroundColor: 'rgba(30,30,30,1)'}}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}
        style={{borderRadius: 50, overflow: 'hidden'}}>
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
