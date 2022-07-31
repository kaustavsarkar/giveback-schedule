import File from 'models/drive-file';
import {GoogleCreds} from 'models/user';
import {googleSignIn} from 'modules/auth/google_auth';

export async function createGDoc(creds: GoogleCreds): Promise<File> {
  const docId = process.env.REACT_APP_FILE_ID;
  let accessToken: string;
  if (!creds) {
    const userProfile = await googleSignIn();
    accessToken = userProfile.googleCreds.accessToken;
  } else {
    accessToken = creds.accessToken;
  }

  const responseStream = await fetch(
    ` https://www.googleapis.com/drive/v3/files/${docId}/copy?fields=webViewLink,name,mimeType,id`,
    {
      method: 'POST',
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );

  const response = await responseStream.json();
  try {
    console.log(response['name']);
    return <File>{
      id: response['id'],
      mimeType: response['mimeType'],
      name: response['name'],
      webViewLink: response['webViewLink'],
    };
  } catch (e) {
    console.log(e);
  }
  return <File>{};
}
