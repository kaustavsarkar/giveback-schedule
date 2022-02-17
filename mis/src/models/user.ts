import {IdTokenResult, OAuthCredential, User as FUser} from 'firebase/auth';

// TODO (kaustavsarkar): Make it immutable.
export interface User {
  readonly name: string;
  readonly email: string;
  readonly displayPicture: string;
  readonly hasLoggedIn: boolean;
  readonly photoUrl: string;
}

export interface GoogleCreds {
  readonly idToken: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresOn: string;
}

export interface UserProfile {
  readonly user: User;
  readonly googleCreds: GoogleCreds;
}

export const createGoogleUserProfile = (
  authUser: FUser,
  oAuthCred: OAuthCredential,
  idTokenResult?: IdTokenResult,
): UserProfile => {
  const user = <User>{
    email: authUser.email,
    hasLoggedIn: true,
    name: authUser.displayName,
    photoUrl: authUser.photoURL,
  };
  const googleCreds = <GoogleCreds>{
    accessToken: oAuthCred?.accessToken,
    idToken: oAuthCred?.idToken,
    expiresOn: idTokenResult?.expirationTime,
  };
  const userProfile = <UserProfile>{
    user: user,
    googleCreds: googleCreds,
  };
  return userProfile;
};
