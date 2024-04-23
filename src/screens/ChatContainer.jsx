import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {dimen} from '../constants';
import {useSelector} from 'react-redux';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';
import axios from 'axios';
import {API_MESSAGE} from '../api';
import {TextStyle} from '../styles/TextStyle';
import moment from 'moment';

const ChatContainer = () => {
  const currentFriends = useSelector(state => state.currentFriends.data);
  const profile = useSelector(state => state.profileReducer.data);
  const [data, setData] = useState();

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchFriendMessages = async () => {
      try {
        const response = await axios.get(`${API_MESSAGE}/friends-messages`, {
          headers: {Authorization: `Bearer ${profile.result.token}`},
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching friend messages:', error);
      }
    };

    fetchFriendMessages();
  }, [isFocused]);

  const formatTime = createdAt => {
    const now = moment();
    const messageTime = moment(createdAt);
    const diffYears = now.diff(messageTime, 'years');
    if (diffYears > 1) {
      return messageTime.format('DD/MM/YYYY HH:mm');
    }
    const diffDays = now.diff(messageTime, 'days');
    if (diffDays > 1) {
      return messageTime.format('DD/MM HH:mm');
    }
    return messageTime.format('HH:mm');
  };

  if (!data) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg_dark,
        }}>
        <Header
          styleContainer={{marginHorizontal: dimen.width * 0.02}}
          iconLeft={<IconOutline.ChevronLeftIcon size={30} color={'white'} />}
          onClickLeft={() => {
            navigation.goBack();
          }}
          boxChildren={
            <Text className="text-white font-bold text-xl">Message</Text>
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[TextStyle.title, {marginHorizontal: 10}]}>
            Make friends with people to text
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.bg_dark}}>
      <Header
        styleContainer={{marginHorizontal: dimen.width * 0.02}}
        iconLeft={<IconOutline.ChevronLeftIcon size={30} color={'white'} />}
        onClickLeft={() => {
          navigation.goBack();
        }}
        boxChildren={
          <Text className="text-white font-bold text-xl">Message</Text>
        }
      />
      <View
        className="flex-row rounded-3xl items-center"
        style={{
          marginHorizontal: dimen.width * 0.03,
          paddingHorizontal: dimen.width * 0.025,
          backgroundColor: colors.bg_optacity,
        }}>
        <IconOutline.MagnifyingGlassIcon color={'gray'} />
        <TextInput
          placeholder="search friend ..."
          placeholderTextColor={'gray'}
          className="flex-1"
          cursorColor={'white'}
        />
      </View>
      <View style={{margin: 10, marginVertical: 20}}>
        <FlatList
          data={currentFriends?.results}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  console.log(item);
                  navigation.navigate('chat', {friend: item});
                }}
                style={{marginHorizontal: dimen.width * 0.01}}>
                <Avatar
                  uri={item?.avatar}
                  name={shortenName(item?.fullName)}
                  borderColor={'rgb(63,63,70)'}
                  borderWidthContainer={2.5}
                  size={dimen.width * 0.15}
                />
              </Pressable>
            );
          }}
        />
      </View>
      <Text
        style={[
          TextStyle.large,
          {marginHorizontal: 20, marginBottom: 20, fontSize: 20},
        ]}>
        Messsages
      </Text>
      <FlatList
        style={{marginHorizontal: 10}}
        data={data}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('chat', {friend: item.friendDetails});
              }}>
              <Avatar
                marginHorizontal={5}
                borderWidthContainer={0}
                size={dimen.width * 0.13}
                uri={item.friendDetails.avatar}
                name={shortenName(item.friendDetails.fullName)}
              />
              <View>
                <Text style={[TextStyle.base]}>
                  {item.friendDetails.fullName} -{' '}
                  {formatTime(item.latestMessageTime)}
                </Text>
                <Text
                  style={[TextStyle.base]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.senderName == 'You' ? 'You: ' : ''}{' '}
                  {item.latestMessageText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatContainer;
