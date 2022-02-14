import {CaseReducer, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {User} from 'models/user';
import {RootState} from 'state/store';

// Define type of state to be used in reducer.
type State = User;

// Reducer to add user.
const addUserReducer: CaseReducer<State, PayloadAction<User>> = (
  state,
  action,
) => {
  state = action.payload;
};

// Used for creating action creators and types imlicitly.
const userSlice = createSlice({
  name: 'user',
  initialState: <User>{},
  reducers: {
    addUser: addUserReducer,
  },
});

// Actions exported from the slice.
//
// Actions are to be added as when they are added here.
export const {addUser} = userSlice.actions;

/**
 * The current user present in the state.
 *
 * @param {RootState} state current state of the application.
 * @return {User} User saved in the state.
 */
export const user = (state: RootState) => state.user;
export default userSlice.reducer;
