import Event, {
  Attendee,
  ConferenceData,
  ConferenceSolutionKey,
  CreateRequest,
  Time,
} from 'models/event';
import {Schedule} from 'models/schedule';
import {GoogleCreds, User} from 'models/user';
import {googleSignIn} from 'modules/auth/google_auth';

export async function createEvent(
  interview: Schedule,
  creds: GoogleCreds,
  interviewee: User,
): Promise<void> {
  let accessToken: string;
  if (!creds) {
    const userProfile = await googleSignIn();
    accessToken = userProfile.googleCreds.accessToken;
  } else {
    accessToken = creds.accessToken;
  }

  const event = <Event>{
    summary: '#giveback interview',
    end: <Time>{
      dateTime: new Date(interview.endTime).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    start: <Time>{
      dateTime: new Date(interview.startTime).toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
    attendees: [
      <Attendee>{
        email: interviewee?.email,
        displayName: interviewee?.name,
      },
      <Attendee>{
        email: interview.interviewer?.email,
        displayName: interview.interviewer?.name,
      },
      <Attendee>{
        email: 'kaustavsarkar.nit@gmail.com',
        displayName: interview.interviewer?.name,
      },
    ],
    kind: 'calendar#event',
    conferenceData: <ConferenceData>{
      createRequest: <CreateRequest>{
        requestId: new Date().toISOString(),
        conferenceSolutionKey: <ConferenceSolutionKey>{
          type: 'hangoutsMeet',
        },
      },
    },
  };

  console.log(JSON.stringify(event, null, 4));

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events/?supportsAttachments=true&conferenceDataVersion=1&sendNotifications=true&sendUpdates=all',
    {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );

  response.json().then((data) => console.log(data));
}
