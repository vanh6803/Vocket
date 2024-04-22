import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import RenderItemChatContainer from '../components/RenderItemChatContainer';
import {dimen} from '../constants';
import {useSelector} from 'react-redux';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';

const data = [
  {
    id: 1,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    lasterMessage: 'hahha',
    isView: true,
  },
  {
    id: 2,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    lasterMessage: 'hahha',
    isView: false,
  },
  {
    id: 3,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    lasterMessage: 'hahha',
    isView: true,
  },
  {
    id: 4,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    lasterMessage: 'hahha',
    isView: false,
  },
];

const ChatContainer = () => {
  const currentFriends = useSelector(state => state.currentFriends.data);

  const navigation = useNavigation();

  return (
    <View className="flex-1" style={{backgroundColor: colors.bg_dark}}>
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
      <View style={{marginTop: dimen.height * 0.01}}>
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
                  size={dimen.width * 0.12}
                />
              </Pressable>
            );
          }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return (
            <RenderItemChatContainer
              item={item}
              onPress={() => {
                navigation.navigate('chat');
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChatContainer;
