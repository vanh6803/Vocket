import {
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
} from '../KeyConstant';

const initialState = {
  loadding: false,
  data: null,
  error: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_REQUEST:
      return {
        ...state,
        loadding: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        loadding: false,
        data: action.payload,
        error: null,
      };
    case FETCH_POST_FAIL:
      return {
        ...state,
        loadding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
