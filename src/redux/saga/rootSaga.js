import {all} from 'redux-saga/effects';
import watchFetchPosts from './PostSaga';
import watchFetchProfile from './profileSaga';
import {authSaga} from './AuthSaga';

function* rootSaga() {
  yield all([watchFetchPosts(), watchFetchProfile(), authSaga()]);
}
export default rootSaga;
