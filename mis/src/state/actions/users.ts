import {doc, updateDoc} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {User, UserProfile} from 'models/user';
import {UserCollection} from 'state/firebase/schema';
import {updateUser} from 'state/reducers/user';
import {AppDispatch, RootState, UserThunk} from 'state/store';

export const updateAboutMe =
  (aboutMe: string): UserThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = getState().userProfile as UserProfile;
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

export const updateSkills =
  (newSkills: Array<string>): UserThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = getState().userProfile as UserProfile;
    const existingSkills = userProfile.user.skills;

    // If the skills have not been updated, there is no point in updating the database.
    if (!haveSkillsUpdated_(new Set(newSkills), new Set(existingSkills))) {
      console.log('returning since there is nothing to update');
      return userProfile;
    }

    const user = userProfile.user as User;
    const updatedUserProfile = <UserProfile>{
      ...userProfile,
      user: <User>{
        ...user,
        skills: newSkills,
      },
    };

    const userRef = doc(fsDatabase, UserCollection.name, user.email);
    await updateDoc(userRef, {
      skills: newSkills,
    });

    localStorage.setItem(user.email, JSON.stringify(updatedUserProfile.user));
    dispatch(updateUser(updatedUserProfile));

    return updatedUserProfile;
  };

function haveSkillsUpdated_(
  newSkills: Set<string>,
  oldskills: Set<string>,
): boolean {
  if (newSkills.size != oldskills.size) {
    return true;
  }

  for (const skill in newSkills) {
    if (!oldskills.has(skill)) {
      return true;
    }
  }

  return false;
}
