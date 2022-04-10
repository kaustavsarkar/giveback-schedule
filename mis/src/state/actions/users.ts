import {UserProfile} from 'models/user';
import {updateUser} from 'state/reducers/user';
import {AppDispatch, RootState, UserThunk} from 'state/store';

export const updateUserThunk =
  (): UserThunk => (dispatch: AppDispatch, getState: () => RootState) => {
    console.log('thunk action', getState());
    const userProfile = getState().userPofile as UserProfile;
    dispatch(updateUser(userProfile));
    return <UserProfile>{};
  };
