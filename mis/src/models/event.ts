export default interface Event {
  summary: string;
  description: string;
  conferenceDataVersion: ConfDataVersion;
  sendUpdates: SendUpdates;
  supportAttachments: boolean;
  kind: Kind;
  start: Time;
  end: Time;
  conferenceData: ConferenceData;
  attendees: Attendee[];
}

export type SendUpdates = 'all' | 'externalOnly' | 'none';
export type Kind = 'calendar#event';
export type ConfDataVersion = 0 | 1;

export interface Time {
  date?: string;
  dateTime?: string;
  timeZone?: string;
}

export interface Attendee {
  displayName?: string;
  email: string;
  optional?: boolean;
}

export interface ConferenceData {
  createRequest: CreateRequest;
}

export interface CreateRequest {
  requestId: string;
  conferenceSolutionKey: ConferenceSolutionKey;
}

export interface ConferenceSolutionKey {
  type: ConferenceType;
}

/**
 * "eventHangout" for Hangouts for consumers (deprecated; existing events may
 * show this conference solution type but new conferences cannot be created)
 *
 * "eventNamedHangout" for classic Hangouts for Google Workspace users
 * (deprecated; existing events may show this conference solution type but new
 *  conferences cannot be created)
 *
 * "hangoutsMeet" for Google Meet (http://meet.google.com)
 *
 * "addOn" for 3P conference providers
 */
export type ConferenceType =
  | 'eventHangout'
  | 'eventNamedHangout'
  | 'hangoutsMeet'
  | 'addOn';
