import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {FETCH_RECEIVER_FRIENDS_REQUEST} from '../KeyConstant';
import {API_RECEIVER_FRIENDS_REQUEST} from '../../api';
import {
  fetchReceiverFriendsFail,
  fetchReceiverFriendsSuccess,
} from '../action/ReceiverFriendsRequest';

function* fetchReceiverFriendsRequest(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(API_RECEIVER_FRIENDS_REQUEST, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchReceiverFriendsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchReceiverFriendsFail(errorData));
    } else {
      yield put(fetchReceiverFriendsFail(error.message));
    }
  }
}

export default function* watchFetchReceiverFriendsRequest() {
  yield takeLatest(FETCH_RECEIVER_FRIENDS_REQUEST, fetchReceiverFriendsRequest);
}
