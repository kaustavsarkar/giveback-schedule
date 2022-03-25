import {CaseReducer, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {User, UserProfile} from 'models/user';
import {userSignIn} from 'modules/auth/signin';
import {RootState} from 'state/store';

// Define type of state to be used in reducer.
type State = UserProfile;

const initialState = (function () {
  const email = localStorage.getItem('email');
  if (email == null) {
    return <UserProfile>{};
  }

  const userData = localStorage.getItem(email);

  if (userData == null) {
    return <UserProfile>{};
  }

  const object: User = JSON.parse(userData);
  return <UserProfile>{user: object};
})();

export const loginUser = createAsyncThunk('user/login', userSignIn);

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
