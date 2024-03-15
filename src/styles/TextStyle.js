import {StyleSheet} from 'react-native';
import {colors} from '../assets/Colors';

export const TextSize = {
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 14,
  h6: 12,
};

export const TextStyle = StyleSheet.create({
  small: {
    fontSize: TextSize.h5,
    color: 'white',
  },
  base: {
    fontSize: TextSize.h4,
    color: 'white',
  },
  large: {
    fontSize: TextSize.h3,
    color: 'white',
    fontWeight: '600',
  },
  large_2: {
    fontSize: TextSize.h2,
    color: 'white',
    fontWeight: '600',
  },
  title: {
    fontSize: TextSize.h1,
    color: 'white',
    fontWeight: 'bold',
  },
});
