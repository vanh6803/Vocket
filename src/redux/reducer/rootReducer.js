import {combineReducers} from 'redux';
import postReducer from './PostReducer';
import profileReducer from './ProfileReducer';
import authReducer from './AuthReducer';
import suggestionFriendsReducer from './SuggestionFriendsReducer';
import receiverFriendsRequestReducer from './ReceiverFriendsRequestReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  profileReducer: profileReducer,
  authReducer: authReducer,
  suggestionFriendsReducer: suggestionFriendsReducer,
  receiverFriendsRequest: receiverFriendsRequestReducer,
});

export default rootReducer;
