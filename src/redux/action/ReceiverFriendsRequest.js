import {
  FETCH_RECEIVER_FRIENDS_REQUEST,
  FETCH_RECEIVER_FRIENDS_SUCCESS,
  FETCH_RECEIVER_FRIENDS_FAIL,
} from '../KeyConstant';
import createAction from './BaseAction';

export const fetchReceiverFriendsRequest = token =>
  createAction(FETCH_RECEIVER_FRIENDS_REQUEST, {token});

export const fetchReceiverFriendsSuccess = data =>
  createAction(FETCH_RECEIVER_FRIENDS_SUCCESS, {data});

export const fetchReceiverFriendsFail = error =>
  createAction(FETCH_RECEIVER_FRIENDS_FAIL, {error});
