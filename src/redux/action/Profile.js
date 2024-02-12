import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
} from '../KeyConstant';

export const fetchProfileRequest = token => {
  // console.log(`fetchProfileRequest - ${token}`);
  return {
    type: FETCH_PROFILE_REQUEST,
    payload: { token },
  };
};

export const fetchProfileSuccess = data => {
  // console.log(`fetchProfileSuccess - ${data}`);
  return {
    type: FETCH_PROFILE_SUCCESS,
    payload: data,
  };
};

export const fetchProfileFail = error => {
  // console.log(`fetchProfileFail - ${error}`);
  return {
    type: FETCH_PROFILE_FAIL,
    payload: error,
  };
};
