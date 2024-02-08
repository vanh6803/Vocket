import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {colors} from './../assets/Colors';
import {dimen} from './../constants/index';
import FastImage from 'react-native-fast-image';
import CricleButton from './CricleButton';
import {globals} from '../styles/Global';

const fakeFriends = [
  {
    id: 1,
    name: 'John 1',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
  },
  {
    id: 2,
    name: 'John 2',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
  },
  {
    id: 3,
    name: 'John 3',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
  },
  {
    id: 4,
    name: 'John 4',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
  },
  {
    id: 5,
    name: 'John 5',
    avatar:
      'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/3/28/photo-1-16484498472652092974741.jpg',
  },
];

const BottomSheetFriend = ({data}) => {
  const [showAll, setShowAll] = useState(false);
  const [showAllSuggestionFriends, setShowAllSuggestionFriends] =
    useState(false);

  const displayedData = showAll ? fakeFriends : fakeFriends.slice(0, 3);
  const suggestionFriends = showAllSuggestionFriends
    ? fakeFriends
    : fakeFriends.slice(0, 3);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const toggleShowAllSuggestionFriends = () => {
    setShowAllSuggestionFriends(!showAllSuggestionFriends);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: dimen.width * 0.05,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Your Friends
        </Text>

        {/* search */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: dimen.width * 0.02,
            backgroundColor: colors.bg_4C,
            margin: dimen.width * 0.03,
            padding: dimen.width * 0.015,
            paddingHorizontal: dimen.width * 0.02,
          }}>
          <IconOutline.MagnifyingGlassIcon color={'white'} />
          <TextInput
            placeholder="Search and add friends"
            placeholderTextColor={'gray'}
            style={{
              color: 'white',
              flex: 1,
              fontSize: dimen.width * 0.04,
              padding: dimen.width * 0.02,
            }}
          />
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontSize: dimen.width * 0.04,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

        {/* your friends */}
        <View
          style={{
            flexDirection: 'row',
            margin: dimen.width * 0.03,
            padding: dimen.width * 0.001,
            paddingHorizontal: dimen.width * 0.02,
          }}>
          <IconSolid.UserGroupIcon color={'white'} />
          <Text style={styles.title}>Your friends</Text>
        </View>
        <FlatList
          data={displayedData}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: dimen.width * 0.03,
                    marginVertical: dimen.width * 0.015,
                  },
                ]}>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: colors.primary,
                    padding: 1.5,
                    borderRadius: dimen.width * 0.1,
                  }}>
                  <FastImage
                    source={{uri: item.avatar}}
                    style={{
                      width: dimen.width * 0.1,
                      height: dimen.width * 0.1,
                      borderRadius: dimen.width * 0.05,
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: 'white',
                    flex: 1,
                    fontSize: dimen.width * 0.04,
                    marginLeft: dimen.width * 0.03,
                  }}>
                  {item.name}
                </Text>
                <CricleButton
                  styleButton={[globals.circleButton, {padding: 5}]}
                  icon={<IconSolid.XMarkIcon color={'white'} />}
                />
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bg_optacity,
              height: 2,
              marginHorizontal: dimen.width * 0.05,
            }}
          />
          {fakeFriends.length > 3 && (
            <TouchableOpacity
              onPress={toggleShowAll}
              style={{
                backgroundColor: colors.bg_optacity,
                borderRadius: dimen.width * 0.05,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: dimen.width * 0.04,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                {showAll ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bg_optacity,
              height: 2,
              marginHorizontal: dimen.width * 0.05,
            }}
          />
        </View>

        {/* suggestions */}
        <View
          style={{
            margin: dimen.width * 0.03,
            paddingHorizontal: dimen.width * 0.02,
          }}>
          <View
            style={{
              flexDirection: 'row',
              padding: dimen.width * 0.001,
            }}>
            <Icon name="lightbulb" color={colors.primary} size={20} />
            <Text style={styles.title}>Suggestions</Text>
          </View>
          <FlatList
            data={suggestionFriends}
            style={{marginTop: dimen.width * 0.03}}
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={[
                    {
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: dimen.width * 0.015,
                    },
                  ]}>
                  <View
                    style={{
                      borderWidth: 1.5,
                      borderColor: colors.primary,
                      padding: 1.5,
                      borderRadius: dimen.width * 0.1,
                    }}>
                    <FastImage
                      source={{uri: item.avatar}}
                      style={{
                        width: dimen.width * 0.1,
                        height: dimen.width * 0.1,
                        borderRadius: dimen.width * 0.05,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: 'white',
                      flex: 1,
                      fontSize: dimen.width * 0.04,
                      marginLeft: dimen.width * 0.03,
                    }}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary,
                      padding: dimen.width * 0.02,
                      borderRadius: dimen.width * 0.02,
                    }}>
                    <Text
                      style={{
                        color: colors.bg_dark,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Add +
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bg_optacity,
              height: 2,
              marginHorizontal: dimen.width * 0.05,
            }}
          />
          {fakeFriends.length > 3 && (
            <TouchableOpacity
              onPress={toggleShowAllSuggestionFriends}
              style={{
                backgroundColor: colors.bg_optacity,
                borderRadius: dimen.width * 0.05,
                padding: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: dimen.width * 0.04,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                }}>
                {showAll ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
          <View
            style={{
              flex: 1,
              backgroundColor: colors.bg_optacity,
              height: 2,
              marginHorizontal: dimen.width * 0.05,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: dimen.width * 0.04,
    marginLeft: 10,
  },
});

export default BottomSheetFriend;
