import {all} from 'redux-saga/effects';
import watchFetchPosts from './PostSaga';

function* rootSaga() {
  yield all([watchFetchPosts()]);
}
export default rootSaga;
