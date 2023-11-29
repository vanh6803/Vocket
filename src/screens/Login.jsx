import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../assets/Colors';
import {dimen} from '../constants';
import {icons} from '../assets/icons';
import CricleButton from '../components/CricleButton';
import {globals} from './../styles/Global';
import CheckBox from '../components/CheckBox';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);

  const handleCheckBox = () => {
    setCheck(!check);
    console.log(check);
  };

  const nextScreen = nameScreen => {
    navigation.navigate(nameScreen);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="flex-1">
      <View
        className="flex-1"
        style={{
          backgroundColor: colors.bg_dark,
        }}>
        {/* header */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={{
              uri: 'https://play-lh.googleusercontent.com/eRZLg00mAQGayCrFjDBklPIpW3qFHcmUs8PUQA4z7hVe-cDKMcRqecVHONAIexJGJZM=w240-h480-rw',
            }}
            className="w-32 h-32 rounded-3xl"
            style={{marginTop: dimen.width * 0.12}}
          />
        </View>
        {/* body */}
        <View
          className="flex-1"
          // style={{paddingTop: dimen.width * 0.06}}
        >
          <TextInput
            placeholderTextColor={'gray'}
            placeholder="haha"
            className="rounded-xl text-white text-base"
            cursorColor={'#FFFFFF'}
            style={{
              backgroundColor: colors.bg_optacity,
              marginHorizontal: dimen.width * 0.04,
              paddingHorizontal: dimen.width * 0.03,
              padding: dimen.width * 0.035,
            }}
          />
          <TextInput
            placeholderTextColor={'gray'}
            placeholder="haha"
            className="rounded-xl text-white text-base"
            cursorColor={'#FFFFFF'}
            style={{
              backgroundColor: colors.bg_optacity,
              marginTop: dimen.width * 0.06,
              marginHorizontal: dimen.width * 0.04,
              paddingHorizontal: dimen.width * 0.03,
              padding: dimen.width * 0.035,
            }}
            secureTextEntry
          />
          {/* section remember and forgot password */}
          <View
            className="flex-row justify-between mt-2 items-center"
            style={{marginHorizontal: dimen.width * 0.04}}>
            <CheckBox
              isChecked={check}
              onPress={handleCheckBox}
              title={'remeber password'}
              onClick={handleCheckBox}
            />
            <Text className="text-red-600 self-end text-[14px]">
              Forgot Password?
            </Text>
          </View>
          {/* login */}
          <TouchableOpacity
            onPress={() => nextScreen('Main')}
            className="justify-center items-center rounded-3xl"
            style={{
              backgroundColor: colors.primary,
              marginTop: dimen.width * 0.06,
              marginHorizontal: dimen.width * 0.04,
              padding: dimen.width * 0.03,
            }}>
            <Text className="text-white text-base">Login</Text>
          </TouchableOpacity>
          {/* section register */}
          <View
            className="flex-row justify-center items-center"
            style={{marginTop: dimen.width * 0.03}}>
            <Text className="text-white ">Create new account?</Text>
            <TouchableOpacity
              className="items-center justify-center"
              onPress={() => nextScreen('Register')}>
              <Text className="text-sky-400"> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* footer */}
        <View className="flex-1 ">
          <View
            className="flex-row justify-center items-center mt-0"
            style={{margin: dimen.width * 0.1}}>
            <View className="flex-1 h-[1px] bg-white" />
            <Text className="text-white mx-2 text-base">Or</Text>
            <View className="flex-1 h-[1px] bg-white" />
          </View>
          <View className="flex-row justify-evenly">
            <CricleButton
              icon={<Image source={icons.google} style={styles.icon} />}
              styleButton={[globals.circleButton, styles.iconButton]}
            />
            <CricleButton
              icon={<Image source={icons.facebook} style={styles.icon} />}
              styleButton={[globals.circleButton, styles.iconButton]}
            />
            <CricleButton
              icon={<Image source={icons.apple} style={styles.icon} />}
              styleButton={[globals.circleButton, styles.iconButton]}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: dimen.width * 0.17,
    height: dimen.width * 0.17,
  },
  icon: {
    width: dimen.width * 0.1,
    height: dimen.width * 0.1,
  },
});
