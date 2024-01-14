import {combineReducers} from 'redux';
import postReducer from './PostReducer';
import profileReducer from './ProfileReducer';
import authReducer from './AuthReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
  profileReducer: profileReducer,
  authReducer: authReducer,
});

export default rootReducer;
