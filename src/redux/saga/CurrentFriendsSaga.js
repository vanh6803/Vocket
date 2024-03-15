import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {FETCH_CURRENT_FRIENDS_REQUEST} from '../KeyConstant';
import {API_CURRENT_FRIENDS} from '../../api';
import {
  fetchCurrentFriendsFail,
  fetchCurrentFriendsSuccess,
} from '../action/CurrentFriends';

function* fetchCurrentFriends(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(API_CURRENT_FRIENDS, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchCurrentFriendsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchCurrentFriendsFail(errorData));
    } else {
      yield put(fetchCurrentFriendsFail(error.message));
    }
  }
}

export default function* watchFetchCurrentFriends() {
  yield takeLatest(FETCH_CURRENT_FRIENDS_REQUEST, fetchCurrentFriends);
}
