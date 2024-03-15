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
  Modal,
  Pressable,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux';
import {dimen} from '../constants';
import BoxContentFriends from '../components/BoxContentFriendsBottomSheet';
import CricleButton from '../components/CricleButton';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';
import {colors} from '../assets/Colors';
import {globals, modalStyle} from '../styles/Global';
import {useNavigation} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import axios from 'axios';
import {
  API_ACCEPT_FRIENDS_REQUEST,
  API_SEARCH_FRIENDS,
  API_SEND_FRIENDS_REQUEST,
} from '../api';
import {fetchProfileRequest} from './../redux/action/Profile';
import {fetchSuggestionFriendsRequest} from './../redux/action/SuggestionFriends';
import {fetchReceiverFriendsRequest} from '../redux/action/ReceiverFriendsRequest';
import {TextStyle} from '../styles/TextStyle';
import SizeBox from '../components/SizeBox';

const FriendScreen = () => {
  const [isShowSuggestSearch, setIsShowSuggestSearch] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [dataSearch, setDataSearch] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [modalFriendProfileVisible, setModalFriendProfileVisible] =
    useState(false);
  const [friendSelected, setFriendSelected] = useState(null);
  const profile = useSelector(state => state.profileReducer.data);
  const suggestionFriends = useSelector(
    state => state.suggestionFriendsReducer.data,
  );
  const receiverFriendsRequest = useSelector(
    state => state.receiverFriendsRequest.data,
  );
  const currentFriends = useSelector(state => state.currentFriends.data);
  const token = useSelector(state => state.authReducer.userToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputSearchRef = useRef(null);
  const contentModalRef = useRef(null);

  useEffect(() => {
    AvoidSoftInput.setAdjustPan();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearchedFriend(debouncedText);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [debouncedText]);

  const handleAccecptFriend = id => {
    console.log(id);
    axios
      .put(
        API_ACCEPT_FRIENDS_REQUEST,
        {friendId: id},
        {
          headers: {Authorization: 'Bearer ' + profile?.result.token},
        },
      )
      .then(response => {
        console.log(response.data);
        dispatch(fetchProfileRequest(profile.result.token));
        dispatch(fetchSuggestionFriendsRequest(profile.result.token));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleRemoveFriend = id => {
    console.log(id);
  };
  const handleAddNewFriend = id => {
    axios
      .post(
        `${API_SEND_FRIENDS_REQUEST}`,
        {friendId: id},
        {
          headers: {Authorization: 'Bearer ' + profile?.result.token},
        },
      )
      .then(response => {
        dispatch(fetchProfileRequest(profile.result.token));
        dispatch(fetchSuggestionFriendsRequest(profile.result.token));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleSearchedFriend = async text => {
    try {
      setIsLoadingSearch(true);
      const response = await axios.get(
        `${API_SEARCH_FRIENDS}?searchTerm=${text}`,
      );
      setDataSearch(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  const closeModalProfileFriend = () => {
    setFriendSelected(null);
    setModalFriendProfileVisible(false);
  };

  const openModalProfileFriend = item => {
    console.log(item);
    setFriendSelected(item);
    setModalFriendProfileVisible(true);
  };

  const handleTextChange = text => {
    setIsLoadingSearch(true);
    setSearchValue(text);
    setIsShowSuggestSearch(true);
    setDebouncedText(text);
    if (text == '') {
      setIsShowSuggestSearch(false);
    }
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
            cursorColor={'white'}
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
              data={currentFriends?.results}
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
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                        alignItems: 'center',
                      }}
                      onPress={() => openModalProfileFriend(item)}>
                      <Avatar
                        uri={item?.avatar}
                        name={shortenName(item?.fullName)}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: dimen.width * 0.04,
                          marginLeft: dimen.width * 0.03,
                        }}>
                        {item.fullName}
                      </Text>
                    </Pressable>
                    <CricleButton
                      onPress={() => handleRemoveFriend(item._id)}
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
              data={receiverFriendsRequest?.results}
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
                      onPress={() => handleAccecptFriend(item._id)}
                      style={styles.buttonItem}>
                      <Text style={styles.textButtonItem}>✓ Accept</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            {/* sent friend requests */}
            <BoxContentFriends
              title={'sent friend requests'}
              icon={
                <View
                  style={{backgroundColor: 'gray', padding: 3}}
                  className="rounded-full justify-center items-center">
                  <IconSolid.UsersIcon color={colors.bg_dark} size={20} />
                </View>
              }
              data={receiverFriendsRequest?.results}
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
                      onPress={() => handleAccecptFriend(item._id)}
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
                    <Pressable
                      onPress={() => openModalProfileFriend(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        flex: 1,
                      }}>
                      <Avatar
                        uri={item?.avatar}
                        name={shortenName(item?.fullName)}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontSize: dimen.width * 0.04,
                          marginLeft: dimen.width * 0.03,
                        }}>
                        {item.fullName}
                      </Text>
                    </Pressable>
                    <TouchableOpacity
                      onPress={() => handleAddNewFriend(item._id)}
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
          <TouchableWithoutFeedback onPress={handleVisibleSearchSuggest}>
            <View
              style={[
                {
                  width: dimen.width,
                  height: dimen.height,
                  position: 'absolute',
                  top: '14%',
                  backgroundColor: 'rgba(70, 70, 70, 0.4)',
                  marginTop: 20,
                },
              ]}>
              <View style={{paddingHorizontal: 10}}>
                <View
                  style={{
                    width: '100%',
                    minHeight: 50,
                    backgroundColor: 'rgb(40, 40,40)',
                    borderRadius: 10,
                    padding: 10,
                    shadowColor: '#FFFFFF',
                    shadowOffset: {
                      width: 0,
                      height: 9,
                    },
                    shadowOpacity: 0.48,
                    shadowRadius: 11.95,
                    elevation: 10,
                  }}>
                  {isLoadingSearch ? (
                    <ActivityIndicator color={colors.primary} size={'large'} />
                  ) : dataSearch?.results && dataSearch.results.length === 0 ? (
                    <View className="justify-center items-center">
                      <Text className="text-white text-base">Not found!!!</Text>
                    </View>
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
                            <Pressable
                              onPress={() => openModalProfileFriend(item)}
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Avatar
                                uri={item?.avatar}
                                name={shortenName(item?.fullName)}
                              />
                              <Text
                                style={{
                                  color: 'white',

                                  fontSize: dimen.width * 0.04,
                                  marginLeft: dimen.width * 0.03,
                                }}>
                                {item.fullName}
                              </Text>
                            </Pressable>
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
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        <Modal
          animationType="fade"
          visible={modalFriendProfileVisible}
          transparent
          onRequestClose={closeModalProfileFriend}>
          <TouchableWithoutFeedback onPress={closeModalProfileFriend}>
            <View style={modalStyle.container}>
              <View>
                <View ref={contentModalRef} style={modalStyle.contentContainer}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Avatar
                      size={dimen.width * 0.25}
                      uri={friendSelected?.avatar}
                      name={shortenName(friendSelected?.fullName)}
                      borderWidthContainer={3}
                      textStyle={[TextStyle.title]}
                    />
                  </View>
                  <SizeBox height={dimen.height * 0.01} />
                  <Text style={[TextStyle.title]}>
                    {friendSelected?.fullName}
                  </Text>
                  <SizeBox height={dimen.height * 0.01} />
                  <Text style={[TextStyle.small, {color: 'lightgray'}]}>
                    {friendSelected?.email}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
