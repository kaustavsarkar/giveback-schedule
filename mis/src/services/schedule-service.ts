import {
  doc,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  runTransaction,
  setDoc,
  Transaction,
} from 'firebase/firestore';
import {fsDatabase} from 'gfirebase/firebase';
import {Interview, Schedule} from 'models/schedule';
import {User} from 'models/user';
import {
  InterviewCollection,
  InterviewConverter,
  UserCollection,
  UserConverter,
} from 'state/firebase/schema';

/**
 * Books interview for the interviewee and the interviewer.
 *
 * The operation should occur in a transaction in order to avod duplicate
 * bookings. The transaction needs to add the interview to the interviewee doc
 * along with interviewer doc.
 *
 * We would need to update the entire schedules for both the users. The
 * information about the schedules of the users should already be present in
 * the local storage.
 */
export async function bookInterviewFor(
  schedule: Schedule,
  bookFor: User,
): Promise<Schedule> {
  const interviewerEmail = schedule.interviewer.email;
  const intervieweeEmail = bookFor.email;

  const updatedSchedule = <Schedule>{
    ...schedule,
    interviewee: <User>{
      email: bookFor.email,
      name: bookFor.name,
      photoUrl: bookFor.photoUrl,
    },
    status: 'BOOKED',
  };

  const newIntervieweeSchedules = updateSchedulesWithLatest_(
    intervieweeEmail,
    updatedSchedule,
  );

  const interviewerRef = doc(
    fsDatabase,
    UserCollection.name,
    interviewerEmail,
  ).withConverter(new UserConverter()) as DocumentReference<DocumentData>;
  const intervieweeRef = doc(
    fsDatabase,
    UserCollection.name,
    intervieweeEmail,
  ).withConverter(new UserConverter()) as DocumentReference<DocumentData>;

  await runTransaction(fsDatabase, async (transaction: Transaction) => {
    // Get the latest schedule information about the interviewer.
    const interviewerDoc = (await transaction.get(
      interviewerRef,
    )) as DocumentSnapshot<User>;

    // If the interviewer does not exist anymore for whatever reason, throw
    // an error.
    if (!interviewerDoc.exists()) {
      throw 'Interviewer does not exist any more';
    }

    const interviewer = interviewerDoc.data();

    // Set the latest information inside local storage.
    localStorage.setItem(interviewer.email, JSON.stringify(interviewer));

    // Update the interview schedule inside the schedules.
    const newInterviewerSchedules = updateSchedulesWithLatest_(
      interviewerEmail,
      updatedSchedule,
    );

    // We need to check if the size of new schedules and existing schedules
    // is same. The method {@code updateSchedulesWithLatest_} tries to find
    // all the schedules which do not match the selected schedule and replaces
    // the selected one. In case the selecte one does not existing anymore or
    // the status is not 'AVAILABLE' there would be a size mismatch. The new
    // array shall have an extra element.
    if (newInterviewerSchedules.length != interviewer.schedules?.length) {
      throw 'Schedule not found. It is probably booked or removed. Try to Update your data';
    }

    // Update the schedules array inside doc for interviewer.
    transaction.update(interviewerRef, {
      schedules: newInterviewerSchedules,
    });

    // Update the schedules array inside doc for interviewee.
    transaction.update(intervieweeRef, {
      schedules: newIntervieweeSchedules,
    });

    // Update the interviewer object and save it locally.
    const updatedInterviewer = <User>{
      ...interviewer,
      schedules: newInterviewerSchedules,
    };
    localStorage.setItem(interviewerEmail, JSON.stringify(updatedInterviewer));

    // Update the interviewee object and save it locally.
    const updatedInterviewee = <User>{
      ...getUserFromLocalStorage_(intervieweeEmail),
      schedules: newIntervieweeSchedules,
    };
    localStorage.setItem(intervieweeEmail, JSON.stringify(updatedInterviewee));
  });

  return updatedSchedule;
}

function updateSchedulesWithLatest_(
  email: string,
  updatedSchedule: Schedule,
): Array<Schedule> {
  const user: User = getUserFromLocalStorage_(email);
  const userSchedules = user.schedules ?? new Array<Schedule>();
  const filteredSchedules = userSchedules.filter(
    (schedule) =>
      !(
        schedule.interviewer.email === updatedSchedule.interviewer.email &&
        schedule.startTime === updatedSchedule.startTime &&
        schedule.endTime === updatedSchedule.endTime &&
        (schedule.status === 'AVAILABLE' || schedule.status === undefined)
      ),
  );

  console.log(filteredSchedules, userSchedules);

  return [...filteredSchedules, updatedSchedule];
}

function getUserFromLocalStorage_(email: string): User {
  const userDataData = localStorage.getItem(email);
  const user: User = userDataData && JSON.parse(userDataData);
  return user;
}

export async function upsertInterview(interview: Interview): Promise<void> {
  if (interview.id == undefined || interview.id == null) {
    return;
  }

  localStorage.setItem(interview.id, JSON.stringify(interview));

  return setDoc(
    doc(fsDatabase, InterviewCollection.name, interview.id).withConverter(
      new InterviewConverter(),
    ),
    interview,
  );
}
