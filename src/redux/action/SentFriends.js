import {
  FETCH_SENT_FRIENDS_REQUEST,
  FETCH_SENT_FRIENDS_SUCCESS,
  FETCH_SENT_FRIENDS_FAIL,
} from '../KeyConstant';
import createAction from './BaseAction';

export const fetchSentFriendsRequest = token =>
  createAction(FETCH_SENT_FRIENDS_REQUEST, {token});

export const fetchSentFriendsSuccess = data =>
  createAction(FETCH_SENT_FRIENDS_SUCCESS, {data});

export const fetchSentFriendsFail = error =>
  createAction(FETCH_SENT_FRIENDS_FAIL, {error});
