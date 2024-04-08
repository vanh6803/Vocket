import {combineReducers} from 'redux';
import postReducer from './PostReducer';
import profileReducer from './ProfileReducer';
import authReducer from './AuthReducer';
import suggestionFriendsReducer from './SuggestionFriendsReducer';
import receiverFriendsRequestReducer from './ReceiverFriendsRequestReducer';
import currentFriendsReducer from './CurrentFriendsReducer';
import sentFriendsReducer from './SentFriendsReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  profileReducer: profileReducer,
  authReducer: authReducer,
  suggestionFriendsReducer: suggestionFriendsReducer,
  receiverFriendsRequest: receiverFriendsRequestReducer,
  currentFriends: currentFriendsReducer,
  sentFriendsReducer: sentFriendsReducer,
});

export default rootReducer;
