import {UserProfile} from 'models/user';
import {googleSignIn} from './google_auth';

export const userSignIn = async () => {
  const userProfile = (await googleSignIn()) as UserProfile;
  saveData_(userProfile);
  return userProfile;
};

function saveData_(userProfile: UserProfile): void {
  const email = userProfile.user.email;
  saveInLocalStorage_(email, userProfile);
  saveInFirebase_();
}

function saveInLocalStorage_(email: string, userProfile: UserProfile): void {
  const userData = localStorage.getItem(email);
  if (userData != null) {
    return;
  }
  localStorage.setItem(email, JSON.stringify(userProfile.user));
}

function saveInFirebase_() {
  // Save data in firebase.
}
