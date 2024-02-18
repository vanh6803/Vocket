import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BASE_URL, dimen} from '../constants';
import * as IconSolid from 'react-native-heroicons/solid';
import * as IconOutline from 'react-native-heroicons/outline';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../assets/Colors';
import BoxContainer from './BoxContainer';
import ButtonOption from './ButtonOption';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signOut} from '../redux/action/Auth';

const BottomSheetProfile = ({data}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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

  const shortenName = name => {
    if (name) {
      const words = name.split(' ');
      const initials = words.map(word => (word.length > 1 ? word[0] : ''));
      const result = initials.join('').toUpperCase();
      return result;
    } else {
      return '';
    }
  };

  return (
    <View className="flex-1" style={{marginBottom: dimen.height * 0.03}}>
      {/* header */}
      <View
        className="border-4 border-yellow-500 rounded-full self-center p-1"
        style={{
          width: dimen.width * 0.3,
          height: dimen.width * 0.3,
          marginTop: dimen.height * 0.03,
          overflow: 'hidden',
        }}>
        {data?.avatar != '' ? (
          <FastImage
            source={{
              uri: `${BASE_URL}${data?.avatar}`,
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
              {shortenName(data?.fullName)}
            </Text>
          </View>
        )}
      </View>
      <Text
        className="text-white text-2xl font-semibold self-center"
        style={{marginTop: dimen.width * 0.03}}>
        {data?.fullName}
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
          icon={<IconSolid.QuestionMarkCircleIcon color={'white'} size={20} />}
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
            <IconSolid.ArrowLeftEndOnRectangleIcon color={'white'} size={20} />
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
    </View>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetProfile;
