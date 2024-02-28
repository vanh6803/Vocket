import React, {useEffect} from 'react';
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
import SearchBar from './SearchBar';

const BottomSheetFriend = ({profile}) => {
  const suggestionFriends = useSelector(
    state => state.suggestionFriendsReducer.data,
  );

  const handleAccecptFriend = () => {};
  const handleRemoveFriend = () => {};
  const handleAddNewFriend = () => {};

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

        <SearchBar searchData={suggestionFriends?.results} />

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
                  onPress={handleRemoveFriend}
                  styleButton={globals.circleButton}
                  icon={<IconSolid.XMarkIcon color={'white'} size={20} />}
                />
              </View>
            );
          }}
        />

        {/* Friend requests */}
        <BoxContentFriendsBottomSheet
          title={'Friend requests'}
          icon={
            <View
              style={{backgroundColor: 'gray', padding: 3}}
              className="rounded-full justify-center items-center">
              <IconSolid.UsersIcon color={colors.bg_dark} size={20} />
            </View>
          }
          data={profile?.freindRequests}
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
                  onPress={handleAccecptFriend}
                  style={styles.buttonItem}>
                  <Text style={styles.textButtonItem}>✓ Accept</Text>
                </TouchableOpacity>
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
                  onPress={handleAddNewFriend}
                  style={styles.buttonItem}>
                  <Text style={styles.textButtonItem}>Add +</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonItem: {
    backgroundColor: colors.primary,
    padding: dimen.width * 0.02,
    borderRadius: dimen.width * 0.02,
  },
  textButtonItem: {
    color: colors.bg_dark,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BottomSheetFriend;
