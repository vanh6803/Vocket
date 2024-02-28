import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';
import {shortenName} from '../utils/ConvertName';
import Avatar from './Avatar';

const SearchBar = ({searchData}) => {
  return <View></View>;
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.bg_4C,
    margin: dimen.width * 0.03,
    padding: dimen.width * 0.015,
    paddingHorizontal: dimen.width * 0.02,
  },
  buttonItem: {
    backgroundColor: colors.primary,
    padding: dimen.width * 0.02,
    borderRadius: dimen.width * 0.02,
  },
  textButtonItem: {
    color: colors.bg_dark,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
