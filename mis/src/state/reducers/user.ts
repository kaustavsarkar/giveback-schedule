import {CaseReducer, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import {User, UserProfile} from 'models/user';
import {userSignIn} from 'state/actions/users';

const initialState = (function () {
  const email = localStorage.getItem('email');
  if (email == null) {
    return <UserProfile>{};
  }

  const userData = localStorage.getItem(email);

  if (userData == null) {
    return <UserProfile>{};
  }

  localStorage.setItem('firstTimeLogin', JSON.parse('false'));
  const object: User = JSON.parse(userData);
  return <UserProfile>{user: object};
})();

export const loginUser = createAsyncThunk('user/login', userSignIn);

// Reducer for user login.
const loginReducer: CaseReducer<
  UserProfile,
  PayloadAction<UserProfile | undefined, string>
> = (
  state: UserProfile,
  action: PayloadAction<UserProfile | undefined, string>,
) => {
  console.log('inside reducer', state, action);
  state = action.payload ?? initialState;
  return state;
};

// Used for creating action creators and types imlicitly.
const userSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateUser(state: UserProfile, action: PayloadAction<UserProfile>) {
      console.log('update user reducer', state, action);
      state = action.payload ?? initialState;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, loginReducer);
  },
});

/**
 * The current user present in the state.
 *
 * @param {RootState} state current state of the application.
 * @return {UserProfile} User saved in the state.
 */
export default userSlice.reducer;
// Actions exported from the slice.
//
// Actions are to be added as when they are added here.
export const {updateUser} = userSlice.actions;
