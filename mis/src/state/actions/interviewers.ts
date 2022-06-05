import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {Interviewers} from 'models/interviewers';
import {
  InterviewersCollection,
  InterviewersConverter,
} from 'state/firebase/schema';
import {fetchInterviewers} from 'state/reducers/interviewers';
import {AppDispatch, InterviewersThunk, RootState} from 'state/store';

export const fetchInterviewersThunk =
  (forceReload = false): InterviewersThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let existingInterviewers = getState().interviewers;
    console.log(
      'Trying to get all interviewers by force? ',
      forceReload,
      'existing interviewers',
      existingInterviewers,
    );

    if (!forceReload && existingInterviewers.length > 0) {
      return existingInterviewers;
    }

    if (forceReload) {
      existingInterviewers = await getDataFromFirestore_();
      dispatch(fetchInterviewers(existingInterviewers));
    }

    return [''];
  };

async function getDataFromFirestore_(): Promise<Array<string>> {
  const interviewersRef = doc(
    fsDatabase,
    InterviewersCollection.name,
    InterviewersCollection.key,
  ).withConverter(
    new InterviewersConverter(),
  ) as DocumentReference<DocumentData>;

  const interviewers = (await getDoc(
    interviewersRef,
  )) as DocumentSnapshot<Interviewers>;

  console.log('saving to local storage', interviewers.data()?.interviewers);

  if (!interviewers.exists()) {
    return [''];
  }

  updateLocalStorage_(interviewers.data().interviewers);

  return interviewers.data().interviewers;
}

function updateLocalStorage_(interviewers: Array<string>) {
  localStorage.setItem(
    InterviewersCollection.key,
    JSON.stringify(interviewers),
  );
}
