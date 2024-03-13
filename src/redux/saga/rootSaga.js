import {all} from 'redux-saga/effects';
import watchFetchPosts from './PostSaga';
import watchFetchProfile from './profileSaga';
import {authSaga} from './AuthSaga';
import watchFetchSuggestionFriends from './SuggestionFriendsSaga';
import watchFetchReceiverFriendsRequest from './receiverFriendsRequestSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    watchFetchPosts(),
    watchFetchProfile(),
    watchFetchSuggestionFriends(),
    watchFetchReceiverFriendsRequest(),
  ]);
}
export default rootSaga;
