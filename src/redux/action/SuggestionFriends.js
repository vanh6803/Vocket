import {
  FETCH_SUGGESTION_FRIENDS_REQUEST,
  FETCH_SUGGESTION_FRIENDS_SUCCESS,
  FETCH_SUGGESTION_FRIENDS_FAIL,
} from '../KeyConstant';
import createAction from './BaseAction';

export const fetchSuggestionFriendsRequest = token =>
  createAction(FETCH_SUGGESTION_FRIENDS_REQUEST, {token});

export const fetchSuggestionFriendsSuccess = data =>
  createAction(FETCH_SUGGESTION_FRIENDS_SUCCESS, {data});

export const fetchSuggestionFriendsFail = error =>
  createAction(FETCH_SUGGESTION_FRIENDS_FAIL, {error});
