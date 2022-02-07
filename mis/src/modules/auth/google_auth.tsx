import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseApp } from 'modules/login/firebase';

export const googleSignIn = () => {
  const auth = getAuth(FirebaseApp);
  // Setting preferred language for authentication.
  auth.languageCode = 'en';

  const provider = new GoogleAuthProvider();
  // We need to get only email and profile information from authentication.
  provider.addScope('email');
  provider.addScope('profile');
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      // TODO: Save in Cookies and Redux.
      console.log(
        `token: ${token} \n user: ${JSON.stringify(user, null, 4)} \n credential: ${JSON.stringify(
          credential,
          null,
          4,
        )}`,
      );
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(
        `errorCode: ${errorCode} \n errorMessage: ${errorMessage} \n credential: ${credential} \n email: ${email}`,
      );
    });
};
