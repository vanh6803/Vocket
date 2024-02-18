import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from './../assets/Colors';
import {dimen} from './../constants/index';
import CricleButton from './CricleButton';
import {globals} from '../styles/Global';
import {useSelector} from 'react-redux';
import {shortenName} from '../utils/ConvertName';
import Avatar from './Avatar';
import BoxContentFriendsBottomSheet from './BoxContentFriendsBottomSheet';

const BottomSheetFriend = ({profile}) => {
  const suggestionFriends = useSelector(
    state => state.suggestionFriendsReducer.data,
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: dimen.width * 0.05,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Your Friends
        </Text>

        {/* search */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: dimen.width * 0.02,
            backgroundColor: colors.bg_4C,
            margin: dimen.width * 0.03,
            padding: dimen.width * 0.015,
            paddingHorizontal: dimen.width * 0.02,
          }}>
          <IconOutline.MagnifyingGlassIcon color={'white'} />
          <TextInput
            placeholder="Search and add friends"
            placeholderTextColor={'gray'}
            style={{
              color: 'white',
              flex: 1,
              fontSize: dimen.width * 0.04,
              padding: dimen.width * 0.02,
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: dimen.width * 0.04,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {/* your friends */}
        <BoxContentFriendsBottomSheet
          title={'Your friends'}
          icon={<Icon name="users" color={'white'} size={20} />}
          data={suggestionFriends?.results}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: dimen.width * 0.015,
                  },
                ]}>
                <Avatar uri={item?.avatar} name={shortenName(item?.fullName)} />
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    fontSize: dimen.width * 0.04,
                    marginLeft: dimen.width * 0.03,
                  }}>
                  {item.fullName}
                </Text>
                <CricleButton
                  styleButton={globals.circleButton}
                  icon={<IconSolid.XMarkIcon color={'white'} size={20} />}
                />
              </View>
            );
          }}
        />

        {/* suggestions */}
        <BoxContentFriendsBottomSheet
          title={'Suggestions'}
          icon={<Icon name="lightbulb" color={colors.primary} size={20} />}
          data={suggestionFriends?.results}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: dimen.width * 0.015,
                  },
                ]}>
                <Avatar uri={item?.avatar} name={shortenName(item?.fullName)} />
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    fontSize: dimen.width * 0.04,
                    marginLeft: dimen.width * 0.03,
                  }}>
                  {item.fullName}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.primary,
                    padding: dimen.width * 0.02,
                    borderRadius: dimen.width * 0.02,
                  }}>
                  <Text
                    style={{
                      color: colors.bg_dark,
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                    Add +
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({});

export default BottomSheetFriend;
