import {FirebaseError} from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
  OAuthCredential,
  setPersistence,
  inMemoryPersistence,
} from 'firebase/auth';
import {FirebaseApp} from 'gfirebase/firebase';
import {createGoogleUserProfile, GoogleCreds, UserProfile} from 'models/user';

export const googleSignIn = async (): Promise<UserProfile> => {
  const auth = getAuth(FirebaseApp);
  console.log('before persistence');
  await setPersistence(auth, inMemoryPersistence);
  console.log('after persistence');
  // Setting preferred language for authentication.
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  // We need to get only email and profile information from authentication.
  provider.addScope('email');
  provider.addScope('profile');
  provider.addScope('https://www.googleapis.com/auth/calendar.events');
  provider.addScope('https://www.googleapis.com/auth/documents');
  provider.addScope('https://www.googleapis.com/auth/drive');
  provider.addScope('https://www.googleapis.com/auth/drive.file');
  try {
    const userCredential = (await signInWithPopup(
      auth,
      provider,
    )) as UserCredential;
    const oAuthCred = GoogleAuthProvider.credentialFromResult(
      userCredential,
    ) as OAuthCredential;
    const authUser = userCredential.user;
    // TODO: Save in Cookies and Redux.
    const idTokenResult = await auth.currentUser?.getIdTokenResult();
    const userProfile = createGoogleUserProfile(
      authUser,
      oAuthCred,
      idTokenResult,
    );

    return userProfile;
  } catch (error) {
    console.log(error);
    if (!(error instanceof FirebaseError)) {
      return <UserProfile>{};
    }
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(
      `errorCode: ${errorCode} 
    \n errorMessage: ${errorMessage} 
    \n credential: ${credential}`,
    );
  }
  return <UserProfile>{};
};

export const verifyAndReturnCreds = async (
  creds: GoogleCreds,
): Promise<GoogleCreds> => {
  let accessToken: string;
  if (!creds) {
    const userProfile = await googleSignIn();
    accessToken = userProfile.googleCreds.accessToken;
  } else {
    accessToken = creds.accessToken;
  }
  return <GoogleCreds>{
    accessToken: accessToken,
  };
};
