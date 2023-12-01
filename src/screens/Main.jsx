import {View, StatusBar} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import PageAction from '../components/PageAction';
import PageContents from '../components/PageContents';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPostRequest} from '../redux/action/Post';

export default function Main() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostRequest());
  }, [dispatch]);

  return (
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
            navigation.navigate('chat');
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
  );
}
