import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {dimen} from '../constants';
import {colors} from '../assets/Colors';

const BoxContentFriends = ({title, icon, data, renderItem}) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const subData = isShowMore ? data : data?.slice(0, 3);
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  if (!data || data.length == 0) {
    return;
  }
  return (
    <View style={styles.boxContainer}>
      <View style={styles.titleContainer}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <FlatList
        data={subData}
        style={{marginTop: dimen.width * 0.03}}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      {data?.length > 3 ? (
        <View style={styles.showMoreContainer}>
          <View style={[styles.line, {marginRight: dimen.width * 0.03}]} />
          <TouchableOpacity
            onPress={toggleShowMore}
            style={styles.buttonShowMore}>
            <Text style={styles.textButtonShowMore}>
              {isShowMore ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
          <View style={[styles.line, {marginLeft: dimen.width * 0.03}]} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    margin: dimen.width * 0.03,
    paddingHorizontal: dimen.width * 0.02,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: dimen.width * 0.001,
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  showMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    backgroundColor: colors.bg_optacity,
    height: 2,
  },
  textButtonShowMore: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonShowMore: {
    backgroundColor: colors.bg_optacity,
    borderRadius: dimen.width * 0.05,
    padding: 10,
  },
});

export default BoxContentFriends;
