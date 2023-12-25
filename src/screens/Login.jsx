import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../assets/Colors';
import {BASE_URL, dimen} from '../constants';
import {icons} from '../assets/icons';
import CricleButton from '../components/CricleButton';
import {globals} from './../styles/Global';
import CheckBox from '../components/CheckBox';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';

export default function Login() {
  const navigation = useNavigation();
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  useEffect(() => {
    setCheckLogin(true);
    // Check if a token exists in local storage
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        // Token exists, navigate to the 'Main' screen
        setCheckLogin(false);
        nextScreen('Main');
      } else {
        setCheckLogin(false);
      }
    });
  }, []);

  const handleCheckBox = () => {
    setCheck(!check);
  };

  const nextScreen = nameScreen => {
    navigation.navigate(nameScreen);
  };

  const handleLogin = () => {
    setLoading(true);
    let data = {
      email: email,
      password: password,
    };
    console.log(data);
    axios
      .post(`${BASE_URL}api/login`, data)
      .then(async response => {
        console.log(response.data);
        setLoading(false);
        const data = response.data;
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('Main');
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          Snackbar.show({
            text: error.response.data.message,
            duration: Snackbar.LENGTH_SHORT,
            textColor: '#FF3838',
          });
        }
      });
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
          <Input
            placeholder={'email'}
            placeholderTextColor={'gray'}
            cursorColor={'#FFFFFF'}
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <Input
            placeholder={'Password'}
            placeholderTextColor={'gray'}
            cursorColor={'#FFFFFF'}
            styleContainer={{
              marginTop: dimen.width * 0.06,
            }}
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
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
            onPress={handleLogin}
            className="flex-row justify-center items-center rounded-3xl"
            disabled={!email || !password || loading ? true : false}
            style={{
              backgroundColor: colors.primary,
              marginTop: dimen.width * 0.06,
              marginHorizontal: dimen.width * 0.04,
              padding: dimen.width * 0.03,
            }}>
            {loading ? (
              <ActivityIndicator color={'white'} className="px-1" />
            ) : null}
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
        {checkLogin ? (
          <View
            className="absolute justify-center items-center"
            style={{
              width: dimen.width,
              height: dimen.height,
              backgroundColor: 'rgba(60,60,60,0.4)',
            }}>
            <ActivityIndicator size={'large'} color={'white'} />
          </View>
        ) : null}
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
