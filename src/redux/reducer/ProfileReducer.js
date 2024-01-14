import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
} from '../KeyConstant';

const initialState = {
  loadding: false,
  data: null,
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loadding: true,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loadding: false,
        data: action.payload,
        error: null,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loadding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
