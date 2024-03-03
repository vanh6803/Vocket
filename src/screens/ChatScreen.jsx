import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {colors} from '../assets/Colors';
import * as IconOutline from 'react-native-heroicons/outline';
import CricleButton from '../components/CricleButton';
import {dimen} from '../constants';
import FastImage from 'react-native-fast-image';
import HeaderChat from '../components/headerChat';
import {useNavigation} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';

const data = [
  {
    id: 1,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'a',
    content: 'haha',
  },
  {
    id: 2,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'b',
    content: 'hehe',
  },
  {
    id: 3,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'a',
    content: 'abcxyz',
  },
  {
    id: 4,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'b',
    content: 'haha',
  },
  {
    id: 5,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'b',
    content:
      "It's important to highlight the navigation prop is not passed in to all components; only screen components receive this prop automatically! React Navigation doesn't do any magic here. For example, if you were to define a MyBackButton component and render it as a child of a screen component, you would not be able to access the navigation prop on it. If, however, you wish to access the navigation prop in any of your components, you may use the useNavigation hook.",
  },
  {
    id: 6,
    name: 'vanh',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
    uid: 'a',
    content:
      "It's important to highlight the navigation prop is not passed in to all components; only screen components receive this prop automatically! React Navigation doesn't do any magic here. For example, if you were to define a MyBackButton component and render it as a child of a screen component, you would not be able to access the navigation prop on it. If, however, you wish to access the navigation prop in any of your components, you may use the useNavigation hook.",
  },
];

const ChatScreen = () => {
  const navigation = useNavigation();

  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    AvoidSoftInput.setAdjustResize();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShow(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShow(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{backgroundColor: colors.bg_dark, flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderChat onBackPress={handleBack} />
      {/* body */}
      <FlatList
        style={{backgroundColor: 'rgba(50,50,50,0.3)', flex: 1}}
        data={data}
        inverted
        renderItem={({item}) => {
          return (
            <View
              className="flex-row flex-1"
              style={{
                alignItems: 'center',
                marginVertical: dimen.height * 0.01,
                flexDirection: item.uid == 'a' ? 'row-reverse' : 'row',
              }}>
              <FastImage
                source={{uri: item.avatar}}
                className="rounded-full self-end m-1"
                style={{width: dimen.width * 0.1, height: dimen.width * 0.1}}
              />
              <View
                className="p-2 px-4 rounded-3xl"
                style={{
                  backgroundColor:
                    item.uid == 'a'
                      ? 'rgba(255,255,255,1)'
                      : 'rgba(129,129,129,0.2)',
                  flexDirection: item.uid == 'a' ? 'row-reverse' : 'row',
                  maxWidth: dimen.width * 0.7,
                }}>
                <Text
                  className="text-base"
                  style={{color: item.uid == 'a' ? 'black' : 'white'}}>
                  {item.content}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      {/* Input */}
      <View
        className="flex-row items-center"
        style={{
          marginBottom: keyboardShow
            ? dimen.height * 0.04
            : dimen.height * 0.01,
          marginTop: dimen.height * 0.01,
        }}>
        <TextInput
          placeholder="enter message"
          placeholderTextColor={'gray'}
          className="border border-white flex-1 mt-1 mx-2 p-2 px-5 rounded-3xl text-white"
          cursorColor={'white'}
        />
        <CricleButton
          styleButton={styles.sendBtn}
          icon={<IconOutline.PaperAirplaneIcon size={30} color={'white'} />}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  sendBtn: {
    paddingRight: 8,
  },
});

export default ChatScreen;
