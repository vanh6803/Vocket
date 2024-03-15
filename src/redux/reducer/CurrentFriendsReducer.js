import {
  FETCH_CURRENT_FRIENDS_REQUEST,
  FETCH_CURRENT_FRIENDS_SUCCESS,
  FETCH_CURRENT_FRIENDS_FAIL,
} from '../KeyConstant';
import createBaseReducer from './BaseReducer';

const currentFriendsReducer = createBaseReducer({
  REQUEST: FETCH_CURRENT_FRIENDS_REQUEST,
  SUCCESS: FETCH_CURRENT_FRIENDS_SUCCESS,
  FAIL: FETCH_CURRENT_FRIENDS_FAIL,
});

export default currentFriendsReducer;
