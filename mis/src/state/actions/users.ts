import {arrayUnion, doc, increment, updateDoc} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {Schedule} from 'models/schedule';
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

export const updatePersonalInfo =
  (designation: string, organisation: string, yoe: number): UserThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = getState().userProfile;
    if (!designation && !organisation && !yoe) {
      console.log('Returning since there is nothing to update');
      return userProfile;
    }

    const user = userProfile.user as User;
    const updatedUserProfile = <UserProfile>{
      ...userProfile,
      user: <User>{
        ...user,
        designation: designation,
        organisation: organisation,
        yearsOfExperience: yoe,
      },
    };

    const userRef = doc(fsDatabase, UserCollection.name, user.email);
    await updateDoc(userRef, {
      organisation: organisation,
      designation: designation,
      yoe: yoe,
    });
    localStorage.setItem(user.email, JSON.stringify(updatedUserProfile.user));
    dispatch(updateUser(updatedUserProfile));
    return updatedUserProfile;
  };

export const updateSchedules =
  (schedules: Array<Schedule>): UserThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const userProfile = getState().userProfile;
    if (schedules == null || schedules.length <= 0) {
      console.log('Returning since there are no schedules to be added');
      return userProfile;
    }

    const totalSchedules = schedules.length;

    const user = userProfile.user as User;
    const updatedUserProfile = <UserProfile>{
      ...userProfile,
      user: <User>{
        ...user,
        schedules: schedules.concat(user.schedules ?? new Array<Schedule>()),
        totalSchedules: (user.totalSchedules ?? 0) + totalSchedules,
      },
    };

    console.log(userProfile.user);

    console.log(
      JSON.stringify(userProfile.user, (key, value) => {
        if (key == 'schedules') {
          value = JSON.stringify(value);
        }
        console.log(typeof key, value);
        return value;
      }),
    );

    const userRef = doc(fsDatabase, UserCollection.name, user.email);
    await updateDoc(userRef, {
      schedules: arrayUnion(...schedules),
      totalSchedules: increment(totalSchedules),
    }),
      localStorage.setItem(user.email, JSON.stringify(updatedUserProfile.user));
    dispatch(updateUser(updatedUserProfile));

    return updatedUserProfile;
  };
