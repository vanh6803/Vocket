import {combineReducers} from 'redux';
import postReducer from './PostReducer';
import profileReducer from './ProfileReducer';
import authReducer from './AuthReducer';
import suggestionFriendsReducer from './SuggestionFriendsReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  profileReducer: profileReducer,
  authReducer: authReducer,
  suggestionFriendsReducer: suggestionFriendsReducer,
});

export default rootReducer;
