import {RESTORE_TOKEN, SIGN_IN, SIGN_OUT} from '../KeyConstant';

const initialState = {
  isLoading: true,
  isLogin: false,
  userToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: true,
      };
    case SIGN_IN:
      return {
        ...state,
        isLogin: true,
        isLoading: false,
        userToken: action.token,
      };
    case SIGN_OUT:
      return {
        ...state,
        isLogin: false,
        isLoading: false,
        userToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
