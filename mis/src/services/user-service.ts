import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  FirestoreDataConverter,
  getDoc,
} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {User} from 'models/user';
import {UserCollection, UserConverter} from 'state/firebase/schema';

/**
 * Returns information about the user being looked for.
 *
 * We first check in the local storage for the data about the user. If the
 * user is absent in the local storage we check in firebase.
 *
 * @param email of the user we need to get information about.
 */
export async function getUserData(email: string): Promise<User> {
  const userData = localStorage.getItem(email);

  // If we have the user, then return it.
  if (userData) {
    return JSON.parse(userData) as User;
  }

  return userDataFirebase_(email);
}

async function userDataFirebase_(
  email: string,
  converter?: FirestoreDataConverter<User>,
): Promise<User> {
  const userDocRef = doc(fsDatabase, UserCollection.name, email).withConverter(
    converter ?? new UserConverter(),
  ) as DocumentReference<DocumentData>;

  const userData = (await getDoc(userDocRef)) as DocumentSnapshot<User>;
  if (!userData.exists()) {
    return <User>{};
  }

  return userData.data();
}
