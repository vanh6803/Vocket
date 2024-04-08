import React, {useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {shortenName} from '../utils/ConvertName';
import BoxContainer from '../components/BoxContainer';
import ButtonOption from '../components/ButtonOption';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {signOut} from '../redux/action/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, dimen} from '../constants';
import axios from 'axios';
import * as IconSolid from 'react-native-heroicons/solid';
import * as IconOutline from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../assets/Colors';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {globals} from '../styles/Global';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profileReducer.data);

  const bottomSheetPhotoRef = useRef(null);
  const bottomSheetOptionRef = useRef(null);
  const snapPointsOption = useMemo(() => ['40%'], []);

  const [photos, setPhotos] = useState();

  const getPhotosFromGallery = () => {
    CameraRoll.getPhotos({first: 20, assetType: 'Photos'}).then(res => {
      setPhotos(res.edges);
    });
  };

  const handleShowOptionBottomSheet = () => {
    bottomSheetOptionRef.current.expand();
  };

  const logout = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      axios
        .get(`${BASE_URL}api/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async response => {
          await AsyncStorage.clear();
          dispatch(signOut());
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.bg_dark,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
      }}>
      <TouchableWithoutFeedback
        onPress={() => {
          bottomSheetOptionRef.current.close();
        }}>
        <View
          style={{
            flex: 1,
          }}>
          {/* header */}
          <View style={globals.indicatorLineBottomSheet} />

          <View
            className="flex-row border-4 border-yellow-500 rounded-full self-center p-1"
            style={{marginTop: dimen.height * 0.03}}>
            <TouchableOpacity
              onPress={handleShowOptionBottomSheet}
              style={{
                width: dimen.width * 0.3,
                height: dimen.width * 0.3,
                overflow: 'hidden',
              }}>
              {profile?.result.avatar != '' ? (
                <FastImage
                  source={{
                    uri: `${BASE_URL}${profile?.result.avatar}`,
                  }}
                  style={{
                    aspectRatio: 1,
                  }}
                  className="rounded-full"
                />
              ) : (
                <View
                  style={{backgroundColor: colors.bg_optacity, flex: 1}}
                  className="rounded-full justify-center items-center">
                  <Text className="text-white font-extrabold text-3xl">
                    {shortenName(profile?.result.fullName)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text
            className="text-white text-2xl font-semibold self-center"
            style={{marginTop: dimen.width * 0.03}}>
            {profile?.result.fullName}
          </Text>
          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className=" rounded-3xl"
              style={{
                backgroundColor: colors.bg_optacity,
                padding: dimen.width * 0.02,
                marginTop: dimen.width * 0.02,
              }}>
              <Text className="text-white text-base font-bold">Edit info</Text>
            </TouchableOpacity>
          </View>
          {/* widget setup */}
          {/* General */}
          <BoxContainer
            title="General"
            containterStyle={{
              margin: dimen.width * 0.04,
            }}
            icon={
              <IconSolid.UserIcon
                color={'white'}
                size={20}
                style={{marginRight: dimen.width * 0.01}}
              />
            }>
            <ButtonOption
              title={'Change email address'}
              icon={<IconSolid.InboxIcon color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Change password'}
              icon={<IconSolid.LockClosedIcon color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Get help'}
              icon={
                <IconSolid.QuestionMarkCircleIcon color={'white'} size={20} />
              }
            />
          </BoxContainer>
          <BoxContainer
            title="About"
            containterStyle={{
              margin: dimen.width * 0.04,
              marginTop: dimen.width * 0.01,
            }}
            icon={<IconSolid.HeartIcon color={'white'} size={20} />}>
            <ButtonOption
              title={'Tiktok'}
              icon={<Icon name="tiktok" color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Instagram'}
              icon={<Icon name="instagram" color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Twitter'}
              icon={<Icon name="twitter" color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Terms of service'}
              icon={<Icon name="signature" color={'white'} size={20} />}
            />
            <ButtonOption
              title={'Privacy policy'}
              icon={<Icon name="lock" color={'white'} size={20} />}
            />
          </BoxContainer>
          <BoxContainer
            title="Danger zone"
            containterStyle={{
              margin: dimen.width * 0.04,
              marginTop: dimen.width * 0.01,
            }}
            icon={
              <IconSolid.ExclamationTriangleIcon
                color={'white'}
                size={20}
                style={{marginRight: dimen.width * 0.01}}
              />
            }>
            <ButtonOption
              onPress={logout}
              title={'Sign out'}
              icon={
                <IconSolid.ArrowLeftEndOnRectangleIcon
                  color={'white'}
                  size={20}
                />
              }
            />
            <ButtonOption
              styleTitle={{color: 'rgba(239,68,68,1)'}}
              title={'Delete account'}
              icon={
                <IconSolid.TrashIcon
                  color={'white'}
                  size={20}
                  className="text-red-500"
                />
              }
            />
          </BoxContainer>
          <BottomSheet
            ref={bottomSheetOptionRef}
            index={-1}
            snapPoints={snapPointsOption}
            enablePanDownToClose
            backgroundStyle={{backgroundColor: 'rgba(40,40,40,1)'}}
            handleIndicatorStyle={{
              backgroundColor: 'white',
            }}
            style={{borderRadius: 50, overflow: 'hidden'}}>
            <BottomSheetView>
              <Text style={[styles.titleOption, {marginBottom: 20}]}>
                Your avatar is visible everyone with your email
              </Text>
              <TouchableOpacity style={styles.buttonOption}>
                <Text style={styles.titleOption}>Choose from library</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonOption}>
                <Text style={styles.titleOption}>Take a Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonOption]}>
                <Text style={[styles.titleOption, {color: 'rgb(247, 7, 7)'}]}>
                  Delete avatar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonOption}
                onPress={() => {
                  bottomSheetOptionRef.current.close();
                }}>
                <Text style={styles.titleOption}>Cancel</Text>
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleOption: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonOption: {
    borderTopWidth: 0.5,
    padding: 10,
  },
});

export default ProfileScreen;
