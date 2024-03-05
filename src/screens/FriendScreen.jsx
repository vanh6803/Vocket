import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {dimen} from '../constants';
import BoxContentFriends from '../components/BoxContentFriendsBottomSheet';
import CricleButton from '../components/CricleButton';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';
import {colors} from '../assets/Colors';
import {globals} from '../styles/Global';
import {useNavigation} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import axios from 'axios';
import {API_SEARCH_FRIENDS} from '../api';

const FriendScreen = () => {
  const [isShowSuggestSearch, setIsShowSuggestSearch] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const profile = useSelector(state => state.profileReducer.data);
  const suggestionFriends = useSelector(
    state => state.suggestionFriendsReducer.data,
  );
  const navigation = useNavigation();

  const inputSearchRef = useRef(null);

  useEffect(() => {
    AvoidSoftInput.setAdjustPan();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearchedFriend(debouncedText);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [debouncedText]);

  const handleAccecptFriend = () => {};
  const handleRemoveFriend = () => {};
  const handleAddNewFriend = () => {};
  const handleSearchedFriend = async text => {
    try {
      setIsLoadingSearch(true);
      const response = await axios.get(
        `${API_SEARCH_FRIENDS}?searchTerm=${text}`,
      );
      console.log(response.data);
      setDataSearch(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const handleTextChange = text => {
    setSearchValue(text);
    setIsShowSuggestSearch(true);
    setDebouncedText(text);
  };

  const handleVisibleSearchSuggest = () => {
    setIsShowSuggestSearch(false);
    Keyboard.dismiss();
    inputSearchRef.current.clear();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: colors.bg_dark}}>
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
            ref={inputSearchRef}
            placeholder="Search and add friends"
            placeholderTextColor={'gray'}
            style={{
              color: 'white',
              flex: 1,
              fontSize: 16,
              padding: dimen.width * 0.01,
            }}
            keyboardAppearance="dark"
            onChangeText={text => handleTextChange(text)}
          />
          <TouchableOpacity onPress={handleVisibleSearchSuggest}>
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
        <ScrollView style={{flex: 1}}>
          <View style={{flex: 1}}>
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
        </ScrollView>

        {isShowSuggestSearch ? (
          <View
            style={[
              {
                width: dimen.width,
                height: 300,
                position: 'absolute',
                top: '14%',
                padding: 15,
              },
            ]}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'rgb(40, 40, 40)',
                borderRadius: 10,
                padding: 10,
                shadowColor: '#BABABA',
                shadowOffset: {
                  width: 0,
                  height: 7,
                },
                shadowOpacity: 0.41,
                shadowRadius: 9.11,

                elevation: 14,
              }}>
              {isLoadingSearch ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={dataSearch?.results}
                  keyExtractor={(item, index) => index.toString()}
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
              )}
            </View>
          </View>
        ) : null}
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
