import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import {dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import InputCustom from '../components/InputCustom';
import CricleButton from '../components/CricleButton';
import {globals} from '../styles/Global';

export default function Register() {
  const navigation = useNavigation();
  const pager = useRef();
  const [pageSelected, setPageSelected] = useState(0);

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  const handleNext = () => {
    if (pageSelected < 2) {
      pager.current.setPage(pageSelected + 1);
      setPageSelected(pageSelected + 1);
    } else {
      navigation.navigate('Main'); 
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.bg_dark,
      }}
      className="flex-1">
      <StatusBar backgroundColor={colors.bg_dark} />
      <View className="flex-1">
        <PagerView
          ref={pager}
          initialPage={0}
          style={{width: dimen.width, height: '100%'}}
          orientation={'horizontal'}
          onPageSelected={e => {
            console.log(e.nativeEvent.position);
            let page = e.nativeEvent.position;
            setPageSelected(page);
          }}
          scrollEnabled={false}>
          <Email
            key={1}
            backPress={() => {
              navigation.navigate('Login');
            }}
          />
          <CreatePassword
            key={2}
            backPress={() => {
              console.log('a');
              pager.current.setPage(0);
              setPageSelected(0);
            }}
          />
          <CreateUserName key={3} />
        </PagerView>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        className={`flex-row rounded-3xl justify-center items-center p-3 mb-2`}
        style={{backgroundColor: colors.primary}}>
        <Text className="text-xl font-bold text-white">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const Email = ({backPress}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <CricleButton
        icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
        styleButton={[globals.circleButton, styles.iconButton]}
        onPress={backPress}
      />
      <InputCustom placeholder="Enter email" placeholderTextColor={'gray'} />
    </View>
  );
};

const CreatePassword = ({backPress}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <CricleButton
        icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
        styleButton={[globals.circleButton, styles.iconButton]}
        onPress={backPress}
      />
      <InputCustom placeholder="Enter password" placeholderTextColor={'gray'} />
      <InputCustom
        placeholder="Enter confirm password"
        placeholderTextColor={'gray'}
        styleContainer={{marginTop: dimen.width * 0.02}}
      />
    </View>
  );
};

const CreateUserName = ({}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <InputCustom
        placeholder="Enter full name"
        placeholderTextColor={'gray'}
      />
      <InputCustom
        placeholder="Enter username"
        placeholderTextColor={'gray'}
        styleContainer={{marginTop: dimen.width * 0.02}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    top: '8%',
    left: '5%',
  },
});
