import {StyleSheet} from 'react-native';
import {colors} from '../assets/Colors';
import {dimen} from '../constants';

export const globals = StyleSheet.create({
  circleButton: {
    backgroundColor: 'rgba(80,80,80,0.6)',
    padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  indicatorLineBottomSheet: {
    width: 30,
    height: 5,
    backgroundColor: 'white',
    marginTop: dimen.width * 0.02,
    alignSelf: 'center',
    borderRadius: 30,
  },
});

export const modalStyle = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(70, 70, 70, 0.3)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: dimen.width * 0.7,
    height: dimen.width * 0.7,
    backgroundColor: 'rgba(26, 26, 26,1)',
    borderRadius: 50,
    shadowColor: 'rgba(150, 150, 150, 0.8)',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowOpacity: 0.5,
    elevation: 3,
    padding: dimen.width * 0.03,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
