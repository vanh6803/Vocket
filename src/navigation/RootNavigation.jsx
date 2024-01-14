import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Main from '../screens/Main';
import {colors} from '../assets/Colors';
import Register from '../screens/Register';
import ChatContainer from '../screens/ChatContainer';
import ChatScreen from '../screens/ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {restoreToken} from '../redux/action/Auth';
import {icons} from '../assets/icons';
import {dimen} from '../constants';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const isLogin = useSelector(state => state.authReducer.isLogin);
  const isLoading = useSelector(state => state.authReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      console.log(token);
      dispatch(restoreToken(token));
    });
  }, [dispatch]);

  // if (isLoading == true) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: colors.bg_dark,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //       }}>
  //       <Image
  //         source={icons.iconApp}
  //         style={{
  //           width: dimen.width * 0.5,
  //           height: dimen.width * 0.5,
  //           borderRadius: 30,
  //         }}
  //       />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.bg_dark,
        }}>
        {isLogin ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="chatContainer" component={ChatContainer} />
            <Stack.Screen name="chat" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
