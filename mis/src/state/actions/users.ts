import {doc, updateDoc} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {User, UserProfile} from 'models/user';
import {UserCollection} from 'state/firebase/schema';
import {updateUser} from 'state/reducers/user';
import {AppDispatch, RootState, UserThunk} from 'state/store';

export const updateAboutMe =
  (aboutMe: string): UserThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = getState().userPofile as UserProfile;
    aboutMe = aboutMe.trim();
    if (aboutMe == undefined || aboutMe.length == 0) {
      console.log('returning since there is nothing');
      return userProfile;
    }
    const user = userProfile.user as User;
    const updatedUserProfile = <UserProfile>{
      ...userProfile,
      user: <User>{
        ...user,
        aboutMe: aboutMe,
      },
    };
    const userRef = doc(fsDatabase, UserCollection.name, user.email);
    await updateDoc(userRef, {
      aboutMe: aboutMe,
    });
    localStorage.setItem(user.email, JSON.stringify(updatedUserProfile.user));
    dispatch(updateUser(updatedUserProfile));
    return updatedUserProfile;
  };
