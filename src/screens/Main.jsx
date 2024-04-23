import {View, StatusBar, SafeAreaView, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPostRequest} from '../redux/action/Post';
import PageAction from '../features/PageAction';
import PageContents from '../features/PageContents';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchProfileRequest} from './../redux/action/Profile';
import {fetchSuggestionFriendsRequest} from '../redux/action/SuggestionFriends';
import {fetchReceiverFriendsRequest} from '../redux/action/ReceiverFriendsRequest';
import {fetchCurrentFriendsRequest} from '../redux/action/CurrentFriends';
import {fetchSentFriendsRequest} from '../redux/action/SentFriends';

export default function Main() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.userToken);

  useEffect(() => {
    dispatch(fetchPostRequest(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfileRequest(token));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSuggestionFriendsRequest(token));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchReceiverFriendsRequest(token));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCurrentFriendsRequest(token));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSentFriendsRequest(token));
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View className={`flex flex-1`} style={{backgroundColor: colors.bg_dark}}>
        <StatusBar backgroundColor={colors.bg_dark} />
        <PagerView
          ref={pageRef}
          orientation={'vertical'}
          className="flex-1"
          initialPage={0}
          onPageSelected={e => {
            setCurrentPage(e.nativeEvent.position);
          }}>
          <PageAction
            key={1}
            goToPage={() => {
              pageRef.current.setPage(1);
            }}
            nextChat={() => {
              navigation.navigate('chatContainer');
            }}
            openProfile={() => {
              navigation.navigate('profile');
            }}
            openFriend={() => {
              navigation.navigate('friend');
            }}
          />
          <PageContents
            key={2}
            goToPage={() => {
              pageRef.current.setPage(0);
            }}
          />
        </PagerView>
      </View>
    </SafeAreaView>
  );
}
