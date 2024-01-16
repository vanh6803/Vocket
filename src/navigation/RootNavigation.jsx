import {View, Text, Image, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

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

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 200,
      easing: Easing.inOut,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: colors.bg_dark,
          animation: 'slide_from_right',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        {isLogin ? (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="chatContainer"
              component={ChatContainer}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="chat"
              component={ChatScreen}
              options={{
                transitionSpec: {
                  open: config,
                  close: closeConfig,
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            />
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
