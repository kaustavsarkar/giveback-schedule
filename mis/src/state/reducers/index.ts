import {combineReducers} from 'redux';
import userReducer from './user';
import skillReducer from './skills';

const rootReducer = combineReducers({
  userProfile: userReducer,
  skills: skillReducer,
});

export default rootReducer;
