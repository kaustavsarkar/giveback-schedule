import {configureStore} from '@reduxjs/toolkit';
import {UserProfile} from 'models/user';
import userReducer from './reducers/user';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

/**
 * Confiure the store to be used across the application.
 */
export const store = configureStore({
  reducer: {
    userPofile: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UserThunk = ThunkAction<
  Promise<UserProfile>,
  RootState,
  unknown,
  AnyAction
>;
