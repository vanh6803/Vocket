import React, {useEffect, useRef, useState} from 'react';
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
import {BASE_URL, dimen} from '../constants';
import HeaderChat from '../components/headerChat';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AvoidSoftInput} from 'react-native-avoid-softinput';
import {useSelector} from 'react-redux';
import {io} from 'socket.io-client';
import axios from 'axios';
import {API_MESSAGE} from '../api';
import Avatar from '../components/Avatar';
import {shortenName} from '../utils/ConvertName';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);

  const navigation = useNavigation();
  const route = useRoute();
  const profile = useSelector(state => state.profileReducer.data);
  const friend = route.params?.friend;
  const receiverId = friend?._id;
  const senderId = profile?.result._id;

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(
          `${API_MESSAGE}/${senderId}/${receiverId}`,
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, []);

  useEffect(() => {
    socket.current = io(BASE_URL);
    const room = [senderId, receiverId].sort().join('_');
    socket.current.emit('joinRoom', room);

    socket.current.on('receiveMessage', message => {
      setMessages(prevMessages => [message, ...prevMessages]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [senderId, receiverId]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: senderId,
        receiver: receiverId,
        message: newMessage,
        room: [senderId, receiverId].sort().join('_'),
      };
      try {
        socket.current.emit('sendMessage', messageData);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={{backgroundColor: colors.bg_dark, flex: 1}}>
      <HeaderChat
        onBackPress={handleBack}
        uri={friend.avatar}
        name={friend.fullName}
      />
      <FlatList
        style={{flex: 1}}
        data={messages}
        inverted
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: item.sender == senderId ? 'row-reverse' : 'row',
                alignItems: 'center',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}>
              <Avatar
                borderWidthContainer={0}
                uri={
                  item.sender == senderId
                    ? profile.result.avatar
                    : friend.avatar
                }
                name={shortenName(item.receiver.fullName)}
              />
              <View
                style={{
                  backgroundColor:
                    item.sender == profile?.result._id
                      ? 'rgba(255,255,255,1)'
                      : 'rgba(129,129,129,0.2)',
                  borderRadius: 20,
                  padding: 10,
                  maxWidth: '70%',
                }}>
                <Text
                  style={{
                    color:
                      item.sender == profile?.result._id ? 'black' : 'white',
                  }}>
                  {item.message}
                </Text>
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => item._id.toString()}
      />
      <View
        style={{
          flexDirection: 'row',
          marginBottom: dimen.height * 0.01,
          marginTop: dimen.height * 0.01,
          alignItems: 'center',
          backgroundColor: colors.bg_optacity,
          borderWidth: 1,
          borderRadius: 30,
          paddingHorizontal: 8,
          marginHorizontal: 10,
        }}>
        <TextInput
          placeholder="Enter message"
          placeholderTextColor={'#757575'}
          cursorColor={'#E0E0E0'}
          style={{color: '#E0E0E0', flex: 1}}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline
        />
        <CricleButton
          onPress={handleSendMessage}
          styleButton={styles.sendBtn}
          icon={<IconOutline.PaperAirplaneIcon color={'white'} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sendBtn: {
    paddingRight: 8,
  },
});

export default ChatScreen;
