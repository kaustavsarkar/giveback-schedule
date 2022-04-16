import {configureStore} from '@reduxjs/toolkit';
import {UserProfile} from 'models/user';
import rootReducer from './reducers';
import {ThunkAction} from 'redux-thunk';
import {AnyAction} from 'redux';

/**
 * Confiure the store to be used across the application.
 */
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type UserThunk = ThunkAction<
  Promise<UserProfile>,
  RootState,
  unknown,
  AnyAction
>;
export type SkillThunk = ThunkAction<
  Promise<Array<string>>,
  RootState,
  unknown,
  AnyAction
>;
