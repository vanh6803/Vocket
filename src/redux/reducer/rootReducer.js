import {combineReducers} from 'redux';
import postReducer from './PostReducer';

const rootReducer = combineReducers({
  postReducer: postReducer,
});

export default rootReducer;
