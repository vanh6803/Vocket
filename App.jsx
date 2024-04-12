import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  StatusBar,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import {colors} from './src/assets/Colors';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        // Yêu cầu quyền truy cập máy ảnh
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonPositive: 'OK',
          },
        );

        // Yêu cầu quyền truy cập bộ nhớ
        const storageGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'This app needs access to your storage.',
            buttonPositive: 'OK',
          },
        );

        if (
          cameraGranted === PermissionsAndroid.RESULTS.GRANTED &&
          storageGranted === PermissionsAndroid.RESULTS.GRANTED
        ) {
          // Cả hai quyền truy cập máy ảnh và bộ nhớ đều được cấp
          console.log('Camera and storage permissions granted');
        } else {
          // Một trong hai quyền truy cập máy ảnh hoặc bộ nhớ bị từ chối
          console.log('Camera or storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor={colors.bg_dark} />
          <RootNavigation />
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
