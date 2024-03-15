import {combineReducers} from 'redux';
import postReducer from './PostReducer';
import profileReducer from './ProfileReducer';
import authReducer from './AuthReducer';
import suggestionFriendsReducer from './SuggestionFriendsReducer';
import receiverFriendsRequestReducer from './ReceiverFriendsRequestReducer';
import currentFriendsReducer from './CurrentFriendsReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  profileReducer: profileReducer,
  authReducer: authReducer,
  suggestionFriendsReducer: suggestionFriendsReducer,
  receiverFriendsRequest: receiverFriendsRequestReducer,
  currentFriends: currentFriendsReducer,
});

export default rootReducer;
