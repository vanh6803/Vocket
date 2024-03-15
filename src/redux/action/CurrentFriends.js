import {
  FETCH_CURRENT_FRIENDS_REQUEST,
  FETCH_CURRENT_FRIENDS_SUCCESS,
  FETCH_CURRENT_FRIENDS_FAIL,
} from '../KeyConstant';
import createAction from './BaseAction';

export const fetchCurrentFriendsRequest = token =>
  createAction(FETCH_CURRENT_FRIENDS_REQUEST, {token});

export const fetchCurrentFriendsSuccess = data =>
  createAction(FETCH_CURRENT_FRIENDS_SUCCESS, {data});

export const fetchCurrentFriendsFail = error =>
  createAction(FETCH_CURRENT_FRIENDS_FAIL, {error});
