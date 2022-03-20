import * as firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import {getFirestore} from 'firebase/firestore';

// This needs to be the first line in this file.
export const FirebaseApp = firebase.initializeApp(firebaseConfig);

export const fsDatabase = getFirestore();
