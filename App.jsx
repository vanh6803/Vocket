import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {colors} from './src/assets/Colors';

const App = () => {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const cameraGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera.',
            buttonPositive: 'OK',
          },
        );

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
          // Both camera and storage permissions are granted
          console.log('Camera and storage permissions granted');
        } else {
          // Either camera or storage permission is denied
          console.log('Camera or storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar backgroundColor={colors.bg_dark} />
      <RootNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
