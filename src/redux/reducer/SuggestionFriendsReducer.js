import {
  FETCH_SUGGESTION_FRIENDS_REQUEST,
  FETCH_SUGGESTION_FRIENDS_SUCCESS,
  FETCH_SUGGESTION_FRIENDS_FAIL,
} from '../KeyConstant';
import createBaseReducer from './BaseReducer';

const suggestionFriendsReducer = createBaseReducer({
  REQUEST: FETCH_SUGGESTION_FRIENDS_REQUEST,
  SUCCESS: FETCH_SUGGESTION_FRIENDS_SUCCESS,
  FAIL: FETCH_SUGGESTION_FRIENDS_FAIL,
});

export default suggestionFriendsReducer;
