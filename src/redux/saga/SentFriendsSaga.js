import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {FETCH_SENT_FRIENDS_REQUEST} from '../KeyConstant';
import {API_CURRENT_FRIENDS, API_SENT_FRIENDS_REQUEST} from '../../api';
import {
  fetchSentFriendsFail,
  fetchSentFriendsSuccess,
} from '../action/SentFriends';

function* fetchSentFriends(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(API_SENT_FRIENDS_REQUEST, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchSentFriendsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchSentFriendsFail(errorData));
    } else {
      yield put(fetchSentFriendsFail(error.message));
    }
  }
}

export default function* watchSentCurrentFriends() {
  yield takeLatest(FETCH_SENT_FRIENDS_REQUEST, fetchSentFriends);
}
