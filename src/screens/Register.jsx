import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  BackHandler,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../assets/Colors';
import PagerView from 'react-native-pager-view';
import {BASE_URL, dimen} from '../constants';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import InputCustom from '../components/InputCustom';
import CricleButton from '../components/CricleButton';
import {globals} from '../styles/Global';
import Snackbar from 'react-native-snackbar';
import axios from 'axios';
import Input from '../components/Input';
import SuccessDialog from '../components/SuccessDialog';

export default function Register() {
  const navigation = useNavigation();
  const pager = useRef();
  const [pageSelected, setPageSelected] = useState(0);
  const [showDialogDanger, setShowDialogDanger] = useState(false);
  const [showDialogSuccess, setShowDialogSuccess] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [username, setUsername] = useState();
  const [fullName, setFullName] = useState();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handlerBack);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handlerBack);
  }, [pageSelected]);

  const handlerBack = () => {
    if (pageSelected == 1) {
      console.log('a');
      pager.current.setPage(0);
      return true;
    } else if (pageSelected == 2) {
      // show dialog danger zone
      setShowDialogDanger(true);
      return true;
    }
    console.log('b');
    return false;
  };

  const handleNext = async () => {
    if (pageSelected < 2) {
      switch (pageSelected) {
        case 0:
          if (!emailRegex.test(email)) {
            console.log('Email is not in a valid format.');
            Snackbar.show({
              text: 'Please check your email again',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
          }

          try {
            const response = await axios.post(
              `${BASE_URL}api/user/check-email`,
              {
                email,
              },
            );
            console.log(response.data);
          } catch (error) {
            console.log('Axios error:', error);
            if (error.response)
              Snackbar.show({
                text: error.response.data.message,
                duration: Snackbar.LENGTH_SHORT,
              });
            return;
          }
          break;
        case 1:
          if (!password) {
            Snackbar.show({
              text: 'please enter your password',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
          }
          if (password !== confirmPassword) {
            Snackbar.show({
              text: 'Password and Confirm Password do not match.',
              duration: Snackbar.LENGTH_SHORT,
            });
            return;
          }
          break;
        default:
          break;
      }

      pager.current.setPage(pageSelected + 1);
      setPageSelected(pageSelected + 1);
    } else {
      if (!fullName) {
        Snackbar.show({
          text: 'please enter full name',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      if (!username) {
        Snackbar.show({
          text: 'please enter username',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }
      let data = {
        email: email,
        password: password,
        username: username,
        fullName: fullName,
      };
      console.log(data);
      axios
        .post(`${BASE_URL}api/register`, data)
        .then(response => {
          console.log(response.data);
          setShowDialogSuccess(true);
          setTimeout(() => {
            setShowDialogSuccess(false);
            navigation.goBack();
          }, 2000);
        })
        .catch(err => {
  
          console.log(err);
          Snackbar.show({
            text: 'register failed',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
      // navigation.goBack();
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
            onChangeText={text => {
              setEmail(text);
            }}
          />
          <CreatePassword
            key={2}
            backPress={() => {
              console.log('a');
              pager.current.setPage(0);
              setPageSelected(0);
            }}
            onChangeTextConfirmPassword={text => {
              setConfirmPassword(text);
            }}
            onChangeTextPassword={text => {
              setPassword(text);
            }}
          />
          <CreateUserName
            key={3}
            onChangeTextUsername={text => {
              setUsername(text);
            }}
            onChangeTextFullName={text => {
              setFullName(text);
            }}
          />
        </PagerView>
      </View>
      <TouchableOpacity
        onPress={handleNext}
        className={`flex-row rounded-3xl justify-center items-center `}
        style={{
          backgroundColor: colors.primary,
          marginBottom: dimen.height * 0.05,
          padding: dimen.width * 0.02,
        }}>
        <Text className="text-xl font-bold text-white">
          {pageSelected == 2 ? 'Complete' : 'Next'}
        </Text>
      </TouchableOpacity>
      <Modal visible={showDialogDanger} transparent animationType="fade">
        <ContentModelDanger
          onCancel={() => {
            setShowDialogDanger(false);
          }}
          onOk={() => {
            navigation.goBack();
          }}
        />
      </Modal>
      <SuccessDialog visible={showDialogSuccess} />
    </View>
  );
}

const Email = ({backPress, onChangeText}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center">
        <CricleButton
          icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
          styleButton={[globals.circleButton, styles.iconButton]}
          onPress={backPress}
        />
        <InputCustom
          placeholder="Enter email"
          placeholderTextColor={'gray'}
          inputMode={'email'}
          onChangeText={onChangeText}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const CreatePassword = ({
  backPress,
  onChangeTextPassword,
  onChangeTextConfirmPassword,
}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center">
        <CricleButton
          icon={<IconOutline.ChevronLeftIcon color={'white'} size={30} />}
          styleButton={[globals.circleButton, styles.iconButton]}
          onPress={backPress}
        />
        <Input
          placeholder={'Enter password'}
          placeholderTextColor={'gray'}
          cursorColor={'#FFFFFF'}
          secureTextEntry={true}
          onChangeText={onChangeTextPassword}
        />
        <Input
          placeholder={'Enter confirm password'}
          placeholderTextColor={'gray'}
          cursorColor={'#FFFFFF'}
          styleContainer={{
            marginTop: dimen.width * 0.06,
          }}
          secureTextEntry={true}
          onChangeText={onChangeTextConfirmPassword}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const CreateUserName = ({onChangeTextFullName, onChangeTextUsername}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 justify-center items-center">
        <InputCustom
          placeholder="Enter full name"
          placeholderTextColor={'gray'}
          onChangeText={onChangeTextFullName}
        />
        <InputCustom
          placeholder="Enter username"
          placeholderTextColor={'gray'}
          styleContainer={{marginTop: dimen.width * 0.02}}
          onChangeText={onChangeTextUsername}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const ContentModelDanger = ({onCancel, onOk}) => {
  return (
    <Pressable
      className="flex-1 justify-center items-center"
      onPress={onCancel}>
      <View
        className="rounded-lg"
        style={{
          backgroundColor: colors.bg_4C,
          width: dimen.width * 0.9,
          padding: dimen.width * 0.03,
        }}>
        <View className=" flex-row items-center">
          <IconSolid.ExclamationTriangleIcon color="yellow" />
          <Text className="text-white text-lg"> Danger Zone</Text>
        </View>
        <Text className="text-white text-base">
          Are you sure you want to go back? All entered information will be
          lost.
        </Text>
        <View
          className="flex-row justify-end items-center"
          style={{margin: dimen.width * 0.02}}>
          <TouchableOpacity style={{marginRight: dimen.width * 0.02}}>
            <Text
              className="text-white font-semibold text-base"
              onPress={onCancel}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onOk}>
            <Text className="text-red-500 font-semibold text-base">Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
});
