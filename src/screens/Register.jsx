import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import {dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';

export default function Register() {
  const navigation = useNavigation();
  const pager = useRef();
  const [pageSelected, setPageSelected] = useState(0);
  const handleBack = () => {
    if (pageSelected > 0) {
      pager.current.setPage(pageSelected - 1);
      setPageSelected(pageSelected - 1);
    }
  };

  const handleNext = () => {
    if (pageSelected < 2) {
      pager.current.setPage(pageSelected + 1);
      setPageSelected(pageSelected + 1);
    } else {
      // Navigate to the main screen or perform any other action
      navigation.navigate('Main'); // Replace 'Main' with the name of your main screen
    }
  };
  return (
    <View
      style={{
        backgroundColor: colors.bg_dark,
        height: dimen.height,
        width: dimen.width,
      }}>
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
          }}>
          <Email key={1} />
          <CreatePassword key={2} />
          <CreateUserName key={3} />
        </PagerView>
      </View>
      <TouchableOpacity className="flex-row bg-yellow-400 rounded-3xl justify-center items-center p-3 mb-2">
        <Text className="text-xl font-bold text-black">Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const Email = () => {
  return (
    <View
      style={{
        flex: 1,
        height: dimen.height,
        width: dimen.width,
        justifyContent: 'center',
      }}>
      <Text style={{color: 'white'}}>Email</Text>
    </View>
  );
};

const CreatePassword = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'white'}}>CreatePassword</Text>
    </View>
  );
};

const CreateUserName = () => {
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'white'}}>CreateUserName</Text>
    </View>
  );
};
