import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'models/user';

const initialState = (): Array<User> => new Array<User>();

const interviewerSchedulesSlice = createSlice({
  name: 'fetchInterviewerSchedule',
  initialState,
  reducers: {
    fetchInterviewerSchedules(
      state: Array<User>,
      action: PayloadAction<Array<User>>,
    ) {
      console.log(state, action.payload);
      // if (state.length == 0) state = action.payload ?? new Array<User>();
      const stateEmails = new Set(state.map((user) => user.email));
      const newEmails = action.payload.map((user) => user.email);
      const uniqueEmails = new Set(
        Array.from(newEmails).filter((email) => !stateEmails.has(email)),
      );

      const uniqueUsers = action.payload.filter((user) =>
        uniqueEmails.has(user.email),
      );
      console.log([...state, ...uniqueUsers]);
      return [...state, ...uniqueUsers];
    },
  },
});

export default interviewerSchedulesSlice.reducer;
export const {fetchInterviewerSchedules} = interviewerSchedulesSlice.actions;
