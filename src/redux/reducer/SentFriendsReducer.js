import {
  FETCH_SENT_FRIENDS_REQUEST,
  FETCH_SENT_FRIENDS_SUCCESS,
  FETCH_SENT_FRIENDS_FAIL,
} from '../KeyConstant';
import createBaseReducer from './BaseReducer';

const sentFriendsReducer = createBaseReducer({
  REQUEST: FETCH_SENT_FRIENDS_REQUEST,
  SUCCESS: FETCH_SENT_FRIENDS_SUCCESS,
  FAIL: FETCH_SENT_FRIENDS_FAIL,
});

export default sentFriendsReducer;
