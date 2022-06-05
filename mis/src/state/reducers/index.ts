import {combineReducers} from 'redux';
import userReducer from './user';
import skillReducer from './skills';
import interviewerReducer from './interviewers';
import interviewerScheduleReducer from './interviewer-schedules';

const rootReducer = combineReducers({
  userProfile: userReducer,
  skills: skillReducer,
  interviewers: interviewerReducer,
  interviewersSchedules: interviewerScheduleReducer,
});

export default rootReducer;
