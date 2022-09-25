import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from 'firebase/firestore';
import {Interviewers} from 'models/interviewers';
import {Interview} from 'models/schedule';
import {Skills} from 'models/skills';
import {User} from 'models/user';

interface Collection {
  name: string;
}

export class UserCollection implements Collection {
  name = 'User';
}

export class InterviewCollection implements Collection {
  name = 'Interview';
}

export class SkillsCollection implements Collection {
  name = 'Skills';
  static key = 'skills';
}

export class InterviewersCollection implements Collection {
  name = 'Interviewers';
  static key = 'interviewers';
}

export class InterviewerSchedulesConverter
  implements FirestoreDataConverter<User>
{
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return {
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      linkedInProfile: user.linkedInProfile,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): User {
    const data = snapshot.data(options);
    return <User>{
      email: data.email,
      name: data.name,
      linkedInProfile: data.linkedInProfile,
      photoUrl: data?.photoUrl,
      designation: data?.designation,
      skills: data?.skills,
      yearsOfExperience: data?.yoe,
      organisation: data?.organisation,
      aboutMe: data?.aboutMe,
      isInterviewer: data?.isInterviewer,
      schedules: data?.schedules,
      totalSchedules: data?.totalSchedules,
    };
  }
}

// Helps in conversion from {DocumentData} to {User} and vice versa.
//
// To be used while performing I/O with firestore.
export class UserConverter implements FirestoreDataConverter<User> {
  toFirestore(user: WithFieldValue<User>): DocumentData {
    return {
      name: user.name,
      email: user.email,
      photoUrl: user.photoUrl,
      linkedInProfile: user.linkedInProfile,
    };
  }
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): User {
    const data = snapshot.data(options);
    return <User>{
      email: data.email,
      name: data.name,
      isSavedInFirebase: data.isSavedInFirebase,
      linkedInProfile: data.linkedInProfile,
      hasLoggedIn: true,
      photoUrl: data?.photoUrl,
      designation: data?.designation,
      skills: data?.skills,
      yearsOfExperience: data?.yoe,
      organisation: data?.organisation,
      aboutMe: data?.aboutMe,
      isInterviewer: data?.isInterviewer,
      isAdmin: data?.isAdmin,
      schedules: data?.schedules,
      totalSchedules: data?.totalSchedules,
    };
  }
}

export class SkillsConverter implements FirestoreDataConverter<Skills> {
  toFirestore(skills: WithFieldValue<Skills>): DocumentData {
    return {
      skills: skills.skills,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Skills {
    const data = snapshot.data(options);
    return <Skills>{
      skills: data.skills,
    };
  }
}

export class InterviewersConverter
  implements FirestoreDataConverter<Interviewers>
{
  toFirestore(interviewers: WithFieldValue<Interviewers>): DocumentData {
    return {
      interviewers: interviewers.interviewers,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Interviewers {
    const data = snapshot.data(options);
    return <Interviewers>{
      interviewers: data.interviewers,
    };
  }
}

export class InterviewConverter implements FirestoreDataConverter<Interview> {
  toFirestore(interview: WithFieldValue<Interview>): DocumentData {
    return {
      id: interview.id,
      date: interview.date,
      startTime: interview.startTime,
      endTime: interview.endTime,
      interviewer: interview.interviewer,
      interviewee: interview.interviewee,
      skills: interview.skills,
      status: interview.status,
      googleMeetLink: interview.googleMeetLink,
      googleDocLink: interview.googleDocLink,
      interviewerFeedback: interview.interviewerFeedback,
      intervieweeFeedback: interview.intervieweeFeedback,
    };
  }

  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData>,
    options?: SnapshotOptions,
  ): Interview {
    const data = snapshot.data(options);
    return <Interview>{
      id: data.id,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      interviewer: data.interviewer,
      interviewee: data.interviewee,
      skills: data.skills,
      status: data.status,
      googleMeetLink: data.googleMeetLink,
      googleDocLink: data.googleDocLink,
      interviewerFeedback: data.interviewerFeedback,
      intervieweeFeedback: data.intervieweeFeedback,
    };
  }
}
