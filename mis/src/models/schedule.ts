import {upsertInterview} from 'services/schedule-service';
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
  readonly googleMeetLink?: string;
  readonly googleDocLink?: string;
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
  googleMeetLink?: string;
  googleDocLink?: string;
  /**
   * Feedback given by the interviewer to the interviewee.
   */
  intervieweeFeedback?: IntervieweeFeedback;
  /**
   * Feedback given by the interviewee to the interviewer.
   */
  interviewerFeedback?: InterviewerFeedback;

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
    this.currentUser = <User>{
      email: currentUser.email,
    };
    this.googleMeetLink = interview.googleMeetLink;
    this.googleDocLink = interview.googleDocLink;
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

  /**
   * To be called when the interview is done and final feedback is
   * being provided by the interviewer and the interviewee.
   */
  save = async (): Promise<void> => {
    this.status = 'DONE';
    await upsertInterview(this);
  };

  hasIntervieweeFeedback = (): boolean =>
    this.intervieweeFeedback !== undefined &&
    this.intervieweeFeedback !== null &&
    this.intervieweeFeedback.writtenFeedback !== undefined &&
    this.intervieweeFeedback.writtenFeedback !== null &&
    this.intervieweeFeedback.writtenFeedback.length > 0;

  hasInterviewerFeedback = (): boolean =>
    this.interviewerFeedback !== undefined &&
    this.interviewerFeedback !== null &&
    this.interviewerFeedback.comments !== undefined &&
    this.interviewerFeedback.comments !== null &&
    this.interviewerFeedback.comments.length > 0;

  showProvideFeedbackSection = (): boolean => {
    if (!this.isPastInterview()) {
      return true;
    }

    console.log(this.interviewerFeedback);

    if (this.isInterviewee() && !this.hasInterviewerFeedback()) {
      return true;
    }

    if (this.isInterviewer() && !this.hasIntervieweeFeedback()) {
      return true;
    }

    return false;
  };
}

export class IntervieweeFeedback {
  private _writtenFeedback?: string | undefined;
  private _implementation?: number | undefined = 1;
  private _communication?: number | undefined = 1;
  private _hireProbability?: number | undefined = 1;
  private _approach?: number | undefined = 1;

  public get writtenFeedback(): string | undefined {
    return this._writtenFeedback;
  }
  public set writtenFeedback(value: string | undefined) {
    this._writtenFeedback = value;
  }
  public get approach(): number | undefined {
    return this._approach;
  }
  public set approach(value: number | undefined) {
    this._approach = value;
  }
  public get implementation(): number | undefined {
    return this._implementation;
  }
  public set implementation(value: number | undefined) {
    this._implementation = value;
  }
  public get communication(): number | undefined {
    return this._communication;
  }
  public set communication(value: number | undefined) {
    this._communication = value;
  }
  private _hintUtilisation?: number | undefined = 1;
  public get hintUtilisation(): number | undefined {
    return this._hintUtilisation;
  }
  public set hintUtilisation(value: number | undefined) {
    this._hintUtilisation = value;
  }
  public get hireProbability(): number | undefined {
    return this._hireProbability;
  }
  public set hireProbability(value: number | undefined) {
    this._hireProbability = value;
  }
}

export class InterviewerFeedback {
  private _comments?: string | undefined;
  private _respectful?: number | undefined = 1;
  private _helpful?: number | undefined = 1;
  private _clarity?: number | undefined = 1;
  private _preparedness?: number | undefined = 1;

  public get comments(): string | undefined {
    return this._comments;
  }
  public set comments(value: string | undefined) {
    this._comments = value;
  }

  public get respectful(): number | undefined {
    return this._respectful;
  }
  public set respectful(value: number | undefined) {
    this._respectful = value;
  }
  public get helpful(): number | undefined {
    return this._helpful;
  }
  public set helpful(value: number | undefined) {
    this._helpful = value;
  }
  public get clarity(): number | undefined {
    return this._clarity;
  }
  public set clarity(value: number | undefined) {
    this._clarity = value;
  }

  public get preparedness(): number | undefined {
    return this._preparedness;
  }
  public set preparedness(value: number | undefined) {
    this._preparedness = value;
  }
}

type Status = 'AVAILABLE' | 'DONE' | 'BOOKED';

export interface DateSchedule {
  readonly schedules: Array<Schedule>;
}
