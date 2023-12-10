import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {BASE_URL} from '../constants';
import FastImage from 'react-native-fast-image';

const BottomSheetListPosts = ({data, onClickItem}) => {
  return (
    <View className="flex-1">
      <FlatList
        data={data?.result}
        keyExtractor={data => data._id}
        numColumns={3}
        style={{paddingHorizontal: 2}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onClickItem(index)}
              className="flex-1 m-[2px] max-w-[32%]">
              <FastImage
                source={{
                  uri: `${BASE_URL}${item.image}`,
                  priority: FastImage.priority.normal,
                }}
                className="aspect-square object-cover rounded-lg"
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default BottomSheetListPosts;
