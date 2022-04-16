import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = Array<string>();

// Used for creating action creators and types implicitly.
const skillSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    getSkills(state: Array<string>, action: PayloadAction<Array<string>>) {
      state = action.payload ?? initialState;
      return state;
    },
  },
});

export default skillSlice.reducer;

export const {getSkills} = skillSlice.actions;
