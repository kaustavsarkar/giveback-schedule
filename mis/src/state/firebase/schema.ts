import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import {User} from 'models/user';

interface Collection {
  name: string;
}

export class UserCollection implements Collection {
  name = 'User';
}

// Helps in conversion from {DocumentData} to {User} and vice versa.
//
// To be used while performing I/O with firestore.
export class UserConverter implements FirestoreDataConverter<User> {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return {
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      linkedInProfile: user.linkedInProfile,
    };
  }
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): User {
    const data = snapshot.data(options);
    return <User>{
      email: data.email,
      name: data.name,
      isSavedInFirebase: data.isSavedInFirebase,
      linkedInProfile: data.linkedInProfile,
      hasLoggedIn: true,
    };
  }
}
