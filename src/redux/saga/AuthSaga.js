import {takeLatest, put, call} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RESTORE_TOKEN} from '../KeyConstant';
import {restoreToken, signIn, signOut} from '../action/Auth';

function* restoreTokenSaga(action) {
  try {
    const userToken = action.payload;
    if (userToken) {
      yield put(signIn(userToken));
    } else {
      yield put(signOut());
    }
  } catch (error) {
    // Handle error
    console.error('Error restoring token:', error);
  }
}

export function* authSaga() {
  yield takeLatest(RESTORE_TOKEN, restoreTokenSaga);
}
