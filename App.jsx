import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TouchableWithoutFeedback, Keyboard, StatusBar} from 'react-native';
import {colors} from './src/assets/Colors';

const App = () => {
  return (
    <GestureHandlerRootView className="flex-1">
      <StatusBar backgroundColor={colors.bg_dark} />
      <RootNavigation />
    </GestureHandlerRootView>
  );
};

export default App;
