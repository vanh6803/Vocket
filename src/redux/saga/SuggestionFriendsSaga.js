import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import {FETCH_SUGGESTION_FRIENDS_REQUEST} from '../KeyConstant';
import {
  fetchSuggestionFriendsFail,
  fetchSuggestionFriendsSuccess,
} from '../action/SuggestionFriends';

function* fetchSuggestionFriends(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(`${BASE_URL}api/friend/suggest-friends`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchSuggestionFriendsSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchSuggestionFriendsFail(errorData));
    } else {
      yield put(fetchSuggestionFriendsFail(error.message));
    }
  }
}

export default function* watchFetchSuggestionFriends() {
  yield takeLatest(FETCH_SUGGESTION_FRIENDS_REQUEST, fetchSuggestionFriends);
}
