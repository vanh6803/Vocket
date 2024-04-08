import {all} from 'redux-saga/effects';
import watchFetchPosts from './PostSaga';
import watchFetchProfile from './profileSaga';
import {authSaga} from './AuthSaga';
import watchFetchSuggestionFriends from './SuggestionFriendsSaga';
import watchFetchReceiverFriendsRequest from './receiverFriendsRequestSaga';
import watchFetchCurrentFriends from './CurrentFriendsSaga';
import watchSentCurrentFriends from './SentFriendsSaga';

function* rootSaga() {
  yield all([
    authSaga(),
    watchFetchPosts(),
    watchFetchProfile(),
    watchFetchSuggestionFriends(),
    watchFetchReceiverFriendsRequest(),
    watchFetchCurrentFriends(),
    watchSentCurrentFriends(),
  ]);
}
export default rootSaga;
