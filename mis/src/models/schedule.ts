import {Skills} from './skills';
import {User} from './user';

/**
 * Defines the Schedule object for creating and scheduling.
 */
export interface Schedule {
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly interviewer: User;
  readonly interviewee?: User;
  readonly skills: Skills;
  readonly status?: Status;
}

type Status = 'AVAILABLE | DONE';

export interface DateSchedule {
  readonly schedules: Array<Schedule>;
}
