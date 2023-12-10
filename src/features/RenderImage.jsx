import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {dimen} from '../constants/index';
import {colors} from '../assets/Colors';
import CricleButton from '../components/CricleButton';
import {globals} from '../styles/Global';
import axios from 'axios';
import {BASE_URL} from '../constants/index';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPostRequest} from '../redux/action/Post';
import Toast from '../components/Toast';
import Snackbar from 'react-native-snackbar';

export default function RenderImage({
  image,
  onClickClose,
  isFront,
  toggleSaveImage,
}) {
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const uri = isFront ? image.uri : `file://${image.path}`;
  const sendPost = () => {
    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      type: uri.endsWith('.png') ? 'image/png' : 'image/jpeg',
      name: 'image.' + (uri.endsWith('.png') ? 'png' : 'jpg'),
    });
    if (content) {
      formData.append('content', content);
    }
    console.log(formData);
    axios
      .post(`${BASE_URL}api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        dispatch(fetchPostRequest());
        onClickClose();
        Snackbar.show({
          text: 'created new post successfully',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(error => {
        console.error(error.message);
        Snackbar.show({
          text: 'created new post failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: 'red',
        });
      });
  };

  return (
    <View>
      <View className="rounded-[50px] overflow-hidden m-[2px]">
        <Image source={{uri: uri}} className="aspect-square" />
        <TextInput
          placeholder="add a message"
          numberOfLines={1}
          multiline={false}
          className="text-center text-white absolute bottom-3 self-center rounded-3xl px-3 text-[12px] font-semibold max-w-[70%]"
          placeholderTextColor={'white'}
          style={{backgroundColor: 'rgba(0, 0, 0,0.5)'}}
          onChangeText={text => {
            setContent(text);
          }}
        />
      </View>

      <View
        className="flex flex-row justify-around items-center"
        style={{marginTop: dimen.height * 0.05}}>
        <CricleButton
          icon={<IconOutline.XMarkIcon color={'white'} size={45} />}
          onPress={onClickClose}
        />
        <CricleButton
          icon={
            <IconOutline.PaperAirplaneIcon
              color={'white'}
              size={45}
              style={{transform: [{rotate: '-45deg'}]}}
            />
          }
          styleButton={[globals.circleButton, styles.styleButtonSend]}
          onPress={sendPost}
        />
        <CricleButton
          onPress={toggleSaveImage}
          icon={<IconOutline.ArrowDownTrayIcon color={'white'} size={45} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  styleButtonSend: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(120,120,120,0.9)',
  },
});
