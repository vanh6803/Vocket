import {
  FETCH_RECEIVER_FRIENDS_REQUEST,
  FETCH_RECEIVER_FRIENDS_SUCCESS,
  FETCH_RECEIVER_FRIENDS_FAIL,
} from '../KeyConstant';
import createBaseReducer from './BaseReducer';

const receiverFriendsRequestReducer = createBaseReducer({
  REQUEST: FETCH_RECEIVER_FRIENDS_REQUEST,
  SUCCESS: FETCH_RECEIVER_FRIENDS_SUCCESS,
  FAIL: FETCH_RECEIVER_FRIENDS_FAIL,
});

export default receiverFriendsRequestReducer;
