import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import {User, UserBuilder, UserProfile} from 'models/user';
import {fsDatabase} from 'gfirebase/firebase';
import {UserCollection, UserConverter} from 'state/firebase/schema';
import {googleSignIn} from './google_auth';

export const userSignIn = async () => {
  const userProfile = (await googleSignIn()) as UserProfile;
  saveData_(userProfile);
  return userProfile;
};

async function saveData_(userProfile: UserProfile): Promise<void> {
  const email = userProfile.user.email;
  saveInLocalStorage_(email, userProfile);
  const userData = (await userDataFirebase_(email)) as User;

  // Save user data in firebase if absent
  !userData && saveInFirebase_(userProfile);
}

function saveInLocalStorage_(email: string, userProfile: UserProfile): void {
  const userData = localStorage.getItem(email);
  if (userData != null) {
    return;
  }
  localStorage.setItem(email, JSON.stringify(userProfile.user));
}

async function saveInFirebase_(userProfile: UserProfile): Promise<void> {
  const user = userProfile.user as User;
  const email = user.email as string;
  await setDoc(doc(fsDatabase, UserCollection.name, email), {
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl,
    // linkedInProfile: user.linkedInProfile,
  });
}

async function userDataFirebase_(email: string): Promise<User | null> {
  const userDocRef = doc(fsDatabase, UserCollection.name, email).withConverter(
    new UserConverter(),
  ) as DocumentReference<DocumentData>;

  const userData = (await getDoc(userDocRef)) as DocumentSnapshot<User>;
  if (!userData.exists()) {
    return null;
  }

  return userData.data();
}
