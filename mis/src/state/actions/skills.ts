import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {Skills} from 'models/skills';
import {SkillsCollection, SkillsConverter} from 'state/firebase/schema';
import {getSkills} from 'state/reducers/skills';
import {AppDispatch, RootState, SkillThunk} from 'state/store';

export const getAllSkills =
  (forceReload = true): SkillThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const initialSkills = getState().skills;

    console.log(
      'trying to get all skills by force?',
      forceReload,
      'existing skills',
      initialSkills,
    );
    if (!forceReload && initialSkills.length > 0) {
      return getState().skills;
    }

    if (forceReload) {
      await getDataFromFirestore_();
      dispatch(getSkills([]));
    }
    return [''];
  };

async function getDataFromFirestore_(): Promise<Skills | null> {
  const skillsRef = doc(
    fsDatabase,
    SkillsCollection.name,
    SkillsCollection.key,
  ).withConverter(new SkillsConverter()) as DocumentReference<DocumentData>;

  const skills = (await getDoc(skillsRef)) as DocumentSnapshot<Skills>;

  console.log(skills.data()?.skills);

  if (!skills.exists()) {
    return null;
  }

  updateLocalStorage_(skills.data().skills);

  return skills.data();
}

function updateLocalStorage_(skills: Array<string>) {
  localStorage.setItem(SkillsCollection.key, JSON.stringify(skills));
}
