import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
} from '../KeyConstant';

export const fetchPostRequest = token => {
  return {
    type: FETCH_POST_REQUEST,
    payload: {token},
  };
};

export const fetchPostSuccess = data => {
  return {
    type: FETCH_POST_SUCCESS,
    payload: data,
  };
};

export const fetchPostFail = error => {
  return {
    type: FETCH_POST_FAIL,
    payload: error,
  };
};
