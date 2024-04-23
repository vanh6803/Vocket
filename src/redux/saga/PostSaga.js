import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {fetchPostFail, fetchPostSuccess} from '../action/Post';
import {BASE_URL} from '../../constants';
import {FETCH_POST_REQUEST} from '../KeyConstant';

function* fetchPosts(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(`${BASE_URL}api/posts`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchPostSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchPostFail(errorData));
    } else {
      yield put(fetchPostFail(error.message));
    }
  }
}

export default function* watchFetchPosts() {
  yield takeLatest(FETCH_POST_REQUEST, fetchPosts);
}
