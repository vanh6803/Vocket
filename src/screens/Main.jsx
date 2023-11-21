import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
} from 'react-native-vision-camera';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import PageAction from '../components/PageAction';
import PageContents from '../components/PageContents';

export default function Main() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const pageRef = useRef();

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera.',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Quyền truy cập camera đã được cấp
            console.log('Camera permission granted');
          } else {
            // Quyền truy cập camera bị từ chối
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    // Kiểm tra và yêu cầu quyền truy cập camera nếu cần
    if (!hasPermission) {
      requestCameraPermission();
    }
  }, [hasPermission]);

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
