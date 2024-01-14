import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../KeyConstant';

export const restoreToken = token => ({
  type: RESTORE_TOKEN,
  payload: token,
});

export const signIn = token => ({
  type: SIGN_IN,
  payload: token,
});

export const signOut = () => ({
  type: SIGN_OUT,
});
