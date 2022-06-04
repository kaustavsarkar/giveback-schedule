import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = (): Array<string> => {
  const allInterviewerData = localStorage.getItem('interviewers');

  if (allInterviewerData == null) {
    return Array<string>();
  }

  const allInterviewers: Array<string> = JSON.parse(allInterviewerData);
  return allInterviewers;
};

const interviewerListSlice = createSlice({
  name: 'fetchInterviewers',
  initialState,
  reducers: {
    fetchInterviewers(
      state: Array<string>,
      action: PayloadAction<Array<string>>,
    ) {
      state = action.payload ?? initialState;
      return state;
    },
  },
});

export default interviewerListSlice.reducer;
export const {fetchInterviewers} = interviewerListSlice.actions;
