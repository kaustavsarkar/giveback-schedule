import {CaseReducer, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {UserProfile} from 'models/user';
import {googleSignIn} from 'modules/auth/google_auth';
import {RootState} from 'state/store';

// Define type of state to be used in reducer.
type State = UserProfile;

const initialState = <UserProfile>{};

export const loginUser = createAsyncThunk('user/login', googleSignIn);

// Reducer for user login.
const loginReducer: CaseReducer<
  State,
  PayloadAction<UserProfile | undefined, string>
> = (state: State, action: PayloadAction<UserProfile | undefined, string>) => {
  console.log('inside reducer', state, action);
  state = action.payload ?? initialState;
  return state;
};

// Used for creating action creators and types imlicitly.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // login: loginReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, loginReducer);
  },
});

// Actions exported from the slice.
//
// Actions are to be added as when they are added here.
// export const {login} = userSlice.actions;

/**
 * The current user present in the state.
 *
 * @param {RootState} state current state of the application.
 * @return {UserProfile} User saved in the state.
 */
export const user = (state: RootState): UserProfile => state.user;
export default userSlice.reducer;
