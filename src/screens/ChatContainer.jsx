import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {FlatList} from 'react-native-gesture-handler';
import RenderItemChatContainer from '../components/RenderItemChatContainer';
import {dimen} from '../constants';

const data = [
  {
    id: 1,
    name: 'vanh',
    avatar:
      'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/277307779_321723253282654_9089454335861660638_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7bbb8a&_nc_ohc=LLjezRyjhF4AX93UOSY&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJEc7vOZQ34OfCINbI7u46NZNABFhF3eFzdokZ3NBBaw&oe=657B8ABF',
    lasterMessage: 'hahha',
    isView: true,
  },
  {
    id: 2,
    name: 'vanh',
    avatar:
      'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/277307779_321723253282654_9089454335861660638_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7bbb8a&_nc_ohc=LLjezRyjhF4AX93UOSY&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJEc7vOZQ34OfCINbI7u46NZNABFhF3eFzdokZ3NBBaw&oe=657B8ABF',
    lasterMessage: 'hahha',
    isView: false,
  },
  {
    id: 3,
    name: 'vanh',
    avatar:
      'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/277307779_321723253282654_9089454335861660638_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7bbb8a&_nc_ohc=LLjezRyjhF4AX93UOSY&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJEc7vOZQ34OfCINbI7u46NZNABFhF3eFzdokZ3NBBaw&oe=657B8ABF',
    lasterMessage: 'hahha',
    isView: true,
  },
  {
    id: 4,
    name: 'vanh',
    avatar:
      'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/277307779_321723253282654_9089454335861660638_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7bbb8a&_nc_ohc=LLjezRyjhF4AX93UOSY&_nc_ht=scontent.fhan14-2.fna&oh=00_AfCJEc7vOZQ34OfCINbI7u46NZNABFhF3eFzdokZ3NBBaw&oe=657B8ABF',
    lasterMessage: 'hahha',
    isView: false,
  },
];

const ChatContainer = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1" style={{backgroundColor: colors.bg_dark}}>
      <Header
        styleContainer={{marginHorizontal: dimen.width * 0.02}}
        iconLeft={<IconOutline.ChevronLeftIcon size={30} color={'white'} />}
        onClickLeft={() => {
          navigation.goBack();
        }}
        title={'Message'}
      />
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
