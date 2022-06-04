import {combineReducers} from 'redux';
import userReducer from './user';
import skillReducer from './skills';
import interviewerReducer from './interviewers';

const rootReducer = combineReducers({
  userProfile: userReducer,
  skills: skillReducer,
  interviewers: interviewerReducer,
});

export default rootReducer;
