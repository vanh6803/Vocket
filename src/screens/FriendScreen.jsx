import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {dimen} from '../constants';
import SearchBar from '../components/SearchBar';
import BoxContentFriends from '../components/BoxContentFriendsBottomSheet';
import CricleButton from '../components/CricleButton';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';
import {colors} from '../assets/Colors';
import {globals} from '../styles/Global';

const FriendScreen = () => {
  const profile = useSelector(state => state.profileReducer.data);
  const suggestionFriends = useSelector(
    state => state.suggestionFriendsReducer.data,
  );

  const handleAccecptFriend = () => {};
  const handleRemoveFriend = () => {};
  const handleAddNewFriend = () => {};

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.bg_dark}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <View style={{height: dimen.height * 0.03}} />
          <Text
            style={{
              color: 'white',
              fontSize: dimen.width * 0.05,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            Your Friends
          </Text>

          <View style={{height: dimen.height * 0.01}} />

          <View style={styles.searchContainer}>
            <IconOutline.MagnifyingGlassIcon color={'white'} />
            <TextInput
              placeholder="Search and add friends"
              placeholderTextColor={'gray'}
              style={{
                color: 'white',
                flex: 1,
                fontSize: 16,
                padding: dimen.width * 0.01,
              }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  marginEnd: 5,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          {/* your friends */}
          <BoxContentFriends
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
                  <Avatar
                    uri={item?.avatar}
                    name={shortenName(item?.fullName)}
                  />
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
          <BoxContentFriends
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
                  <Avatar
                    uri={item?.avatar}
                    name={shortenName(item?.fullName)}
                  />
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
          <BoxContentFriends
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
                  <Avatar
                    uri={item?.avatar}
                    name={shortenName(item?.fullName)}
                  />
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
    </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.bg_4C,
    margin: dimen.width * 0.03,
    padding: dimen.width * 0.015,
    paddingHorizontal: dimen.width * 0.02,
  },
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

export default FriendScreen;
