import {IdTokenResult, OAuthCredential, User as FUser} from 'firebase/auth';
import {Builder} from 'shared/builder';

// TODO (kaustavsarkar): Make it immutable.
export interface User {
  readonly name: string;
  readonly email: string;
  readonly hasLoggedIn: boolean;
  readonly photoUrl: string;
  readonly linkedInProfile: string;
  readonly isSavedInFirebase: boolean;
}

export const UserBuilder = {} as Builder<User>;

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
