import {takeLatest, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {fetchProfileFail, fetchProfileSuccess} from '../action/Profile';
import {BASE_URL} from '../../constants';
import {FETCH_PROFILE_REQUEST} from '../KeyConstant';

function* fetchProfile(action) {
  try {
    const token = action.payload.token;
    const response = yield call(() =>
      axios.get(`${BASE_URL}api/user/detail`, {
        headers: {Authorization: `Bearer ${token}`},
      }),
    );
    yield put(fetchProfileSuccess(response.data));
  } catch (error) {
    if (error.response) {
      const response = error.response;
      const errorData = response.data;
      yield put(fetchProfileFail(errorData));
    } else {
      yield put(fetchProfileFail(error.message));
    }
  }
}

export default function* watchFetchProfile() {
  yield takeLatest(FETCH_PROFILE_REQUEST, fetchProfile);
}
