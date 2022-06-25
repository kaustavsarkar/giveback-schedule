import {
  arrayUnion,
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreDataConverter,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {Schedule} from 'models/schedule';
import {User, UserProfile} from 'models/user';
import {googleSignIn} from 'modules/auth/google_auth';
import {
  InterviewerSchedulesConverter,
  UserCollection,
  UserConverter,
} from 'state/firebase/schema';
import {fetchInterviewerSchedules} from 'state/reducers/interviewer-schedules';
import {updateUser} from 'state/reducers/user';
import {
  AppDispatch,
  InterviewerSchedulesThunk,
  RootState,
  UserThunk,
} from 'state/store';

export const userSignIn = async () => {
  const userProfile = (await googleSignIn()) as UserProfile;
  return await saveData_(userProfile);
};

async function saveData_(userProfile: UserProfile): Promise<UserProfile> {
  const email = userProfile.user.email;
  let userData = (await userDataFirebase_(email)) as User;
  let firstTimeLogin = false;
  console.log('data from firestore', userData);

  // Save user data in firebase if absent.
  if (!userData) {
    saveInFirebase_(userProfile);
    firstTimeLogin = true;
  }

  userData = <User>{
    ...userData,
    ...userProfile.user,
  };

  userProfile = <UserProfile>{
    ...userProfile,
    user: <User>{
      ...userData,
      isSavedInFirebase: true,
    },
  };
  saveEmail_(email);
  // Once the data is confirmed to be present inside firebase, we
  // can save it in local storage as well.
  saveInLocalStorage_(email, userProfile, firstTimeLogin);
  return userProfile;
}

function saveInLocalStorage_(
  email: string,
  userProfile: UserProfile,
  firstTimeLogin: boolean,
): void {
  const userData = localStorage.getItem(email);

  console.log('Userdata in local storage', userData);
  if (userData != null) {
    return;
  }
  localStorage.setItem(email, JSON.stringify(userProfile.user));
  if (firstTimeLogin) {
    localStorage.setItem('firstTimeLogin', JSON.stringify(firstTimeLogin));
  } else {
    localStorage.setItem('firstTimeLogin', JSON.stringify(firstTimeLogin));
  }
}

async function saveInFirebase_(userProfile: UserProfile): Promise<void> {
  const user = userProfile.user as User;
  const email = user.email as string;
  await setDoc(doc(fsDatabase, UserCollection.name, email), {
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
  });
}

async function userDataFirebase_(
  email: string,
  converter?: FirestoreDataConverter<User>,
): Promise<User | null> {
  const userDocRef = doc(fsDatabase, UserCollection.name, email).withConverter(
    converter ?? new UserConverter(),
  ) as DocumentReference<DocumentData>;

  const userData = (await getDoc(userDocRef)) as DocumentSnapshot<User>;
  if (!userData.exists()) {
    return null;
  }

  return userData.data();
}

function saveEmail_(email: string): void {
  localStorage.setItem('email', email);
}

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

export const getInterviewerSchedule =
  (email: string, forceFetch = false): InterviewerSchedulesThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let schedules = getState().interviewersSchedules;
    const me = getState().userProfile.user;

    console.log('fetching schedules for ', email);

    // User can be an interviewer as well. We would not want to save them as their own interviewer.
    if (me.email === email) {
      console.log('User is also an interviewer');
      return schedules;
    }

    if (!forceFetch && schedules.length < 1) {
      // If there are no schedules in the state check local storage.
      // If it is force fetch make sure it is skipped.
      const interviewerData = localStorage.getItem(email);
      const interviewer: User = interviewerData && JSON.parse(interviewerData);
      schedules = [...schedules, interviewer];
      console.log(schedules);
      dispatch(fetchInterviewerSchedules(schedules));
      return schedules;
    }

    // Could not find data either in state or in local storage. Fetching from firebase.
    const interviewer = await userDataFirebase_(
      email,
      new InterviewerSchedulesConverter(),
    );

    console.log('got schedule from firebase', interviewer);

    if (interviewer == null) {
      return schedules;
    }

    schedules = [...schedules, interviewer];

    console.log(schedules);

    localStorage.setItem(interviewer.email, JSON.stringify(interviewer));

    dispatch(fetchInterviewerSchedules(schedules));

    return schedules;
  };
