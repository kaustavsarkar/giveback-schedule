import {Skills} from './skills';
import {User} from './user';

/**
 * Defines the Schedule object for creating and scheduling.
 */
export interface Schedule {
  readonly id?: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly interviewer: User;
  readonly interviewee?: User;
  readonly skills: Skills;
  readonly status?: Status;
}

export class Interview implements Schedule {
  id?: string | undefined;
  date: string;
  startTime: string;
  endTime: string;
  interviewer: User;
  interviewee?: User | undefined;
  skills: Skills;
  status?: Status | undefined;

  // This is the currently logged in user.
  currentUser: User;

  constructor(interview: Schedule, currentUser: User) {
    this.id = interview.id;
    this.date = interview.date;
    this.startTime = interview.startTime;
    this.endTime = interview.endTime;
    this.interviewer = interview.interviewer;
    this.interviewee = interview.interviewee;
    this.skills = interview.skills;
    this.status = interview.status;
    this.currentUser = currentUser;
  }

  /**
   * Returns whether the Interview was in past.
   * @returns boolean
   */
  isPastInterview = (): boolean =>
    new Date(this.endTime).getTime() < new Date().getTime();

  /**
   * Determines if the interview is scheduled for the current time.
   *
   * The method does not determine if the interview has been started.
   * @returns boolean
   */
  isInterviewNow = (): boolean => {
    const currentTime = new Date().getTime();
    return (
      currentTime >= new Date(this.startTime).getTime() &&
      currentTime <= new Date(this.endTime).getTime()
    );
  };

  isInterviewScheduled = (): boolean => this.interviewee != null;

  /**
   * Returns if the interview is scheduled for future.
   * @returns boolean
   */
  isFutureInterview = (): boolean =>
    new Date(this.startTime).getTime() > new Date().getTime();

  /**
   * Determines if the {@link currentUser} is an interviewer.
   * @returns boolean
   */
  isInterviewer = (): boolean =>
    this.interviewer.email === this.currentUser.email;

  /**
   * Determines if the {@link currentUser} is an interviewee.
   * @returns boolean
   */
  isInterviewee = (): boolean =>
    this.interviewee?.email === this.currentUser.email;

  /**
   * Returns relevant modal title to be shown on top of schedule card.
   *
   * @returns string
   */
  scheduleModalTitle = (): string => {
    if (this.isInterviewer() && !this.isInterviewScheduled()) {
      return 'Interview is not scheduled';
    }

    if (this.isPastInterview()) {
      return 'Interview has ended';
    }

    if (this.isFutureInterview()) {
      return 'Interview is yet to start';
    }

    return 'Start the Interview';
  };

  scheduleModalBody = (): string => {
    if (this.isPastInterview() && this.isInterviewee()) {
      return 'Go ahead and check your interview details.';
    }

    if (this.isPastInterview() && this.isInterviewer()) {
      return 'It is a good time to provide feedback if not done already. :)';
    }

    if (this.isFutureInterview()) {
      return 'The interview is yet to start';
    }

    if (this.isInterviewNow() && this.isInterviewer()) {
      return 'Before starting the interview ensure the candidate is ready.';
    }

    // If the interview is to happen now.
    return 'Click here to start the Interview';
  };
}

type Status = 'AVAILABLE' | 'DONE' | 'BOOKED';

export interface DateSchedule {
  readonly schedules: Array<Schedule>;
}
