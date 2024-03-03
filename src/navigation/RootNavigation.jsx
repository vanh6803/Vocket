import {View, Text, Image, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  TransitionSpecs,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../screens/Login';
import Main from '../screens/Main';
import {colors} from '../assets/Colors';
import Register from '../screens/Register';
import ChatContainer from '../screens/ChatContainer';
import ChatScreen from '../screens/ChatScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {restoreToken} from '../redux/action/Auth';
import ProfileScreen from '../screens/ProfileScreen';
import FriendScreen from '../screens/FriendScreen';

const Stack = createStackNavigator();

export default function RootNavigation() {
  const isLogin = useSelector(state => state.authReducer.isLogin);
  const isLoading = useSelector(state => state.authReducer.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
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
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {isLogin ? (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{gestureEnabled: false}}
            />
            <Stack.Screen
              name="profile"
              component={ProfileScreen}
              options={{
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
                gestureDirection: 'vertical',
              }}
            />
            <Stack.Screen
              name="friend"
              component={FriendScreen}
              options={{
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOS,
                gestureDirection: 'vertical',
                keyboardHandlingEnabled: true,
              }}
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
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                gestureResponseDistance: 115,
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
