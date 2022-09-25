import './schedules-details.scss';
import MDEditor from '@uiw/react-md-editor';
import {
  Interview,
  IntervieweeFeedback,
  InterviewerFeedback,
} from 'models/schedule';
import {User} from 'models/user';
import Header from 'modules/header/header';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import {Button} from 'rsuite';
import SaveButton from 'shared/save-button/save-button';
import {IntervieweeRating, InterviewerRating} from './rating';

function ScheduleDetailsContainer_(props: {
  user: User;
  children?: JSX.Element;
}): JSX.Element {
  return (
    <div className="schedule-details-container">
      <Header user={props.user}></Header>
      {props.children}
    </div>
  );
}

function InvalidSchedule_(props: {user: User}): JSX.Element {
  return (
    <ScheduleDetailsContainer_ user={props.user}>
      <div>You are probably trying to access an Invalid Schedule</div>
    </ScheduleDetailsContainer_>
  );
}

export default function ScheduleDetails(): JSX.Element {
  const [mdText, setMdText] = useState('');

  const user = useAppSelector((state: RootState) => state.userProfile.user);
  const params = useParams();

  const id = params.scheduleId;
  const schedule = user.schedules?.find((schedule) => schedule.id === id);

  if (schedule === undefined) {
    return <InvalidSchedule_ user={user} />;
  }

  const interview = new Interview(schedule, user);
  interview.intervieweeFeedback ??= new IntervieweeFeedback();
  interview.interviewerFeedback ??= new InterviewerFeedback();

  const [intervieweeFeedback, setIntervieweeFeedback] = useState(
    interview.intervieweeFeedback,
  );
  const [interviewerFeedback, setInterviewerFeedback] = useState(
    interview.interviewerFeedback,
  );

  return (
    <ScheduleDetailsContainer_ user={user}>
      <div className="details-section row">
        <div className="col-xl-4">
          <div className="row">
            <div className="card">
              <div className="card-body">
                <div>
                  <span className="title">Interviewer: </span>
                  <span className="value">{interview.interviewer.email}</span>
                </div>
                <div>
                  <span className="title">Interviewee: </span>
                  <span className="value">{interview.interviewee?.email}</span>
                </div>
                <div>
                  <span className="title">Time: </span>
                  <span className="value">
                    {new Date(interview.startTime).toLocaleString()} -{' '}
                    {new Date(interview.endTime).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="title">Interview Doc: </span>
                  <span className="value">
                    <a
                      href={interview.googleDocLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button color="cyan" appearance="ghost">
                        {' '}
                        Open
                      </Button>
                    </a>
                  </span>
                </div>
                <div>
                  <span className="title">Join the Interview: </span>
                  <span className="value">
                    <a
                      href={interview.googleMeetLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button color="cyan" appearance="ghost">
                        Join Now
                      </Button>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="card">
              {interview.isInterviewee() ? (
                <InterviewerRating
                  feedback={interviewerFeedback}
                  onChange={(feedback: InterviewerFeedback) => {
                    setInterviewerFeedback(feedback);
                  }}
                />
              ) : (
                <IntervieweeRating
                  feedback={intervieweeFeedback}
                  onChange={(feedback: IntervieweeFeedback) => {
                    setIntervieweeFeedback(feedback);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <div className="feedback-container col-xl-8">
          {interview.showProvideFeedbackSection() && (
            <MDEditor
              value={mdText}
              textareaProps={{
                placeholder:
                  'Provide a detailed feedback. Your feedback should be help the other person to improve.',
              }}
              onChange={(value) => setMdText(value ?? '')}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          )}
          {interview.hasIntervieweeFeedback() ?? (
            <MDEditor.Markdown source={intervieweeFeedback.writtenFeedback} />
          )}
          {interview.hasInterviewerFeedback() ?? (
            <MDEditor.Markdown source={interviewerFeedback.comments} />
          )}
        </div>
        <div className="col-xl-4">
          <SaveButton
            onClick={() => {
              if (interview.isInterviewee()) {
                interview.interviewerFeedback = interviewerFeedback;
                interview.interviewerFeedback.comments = mdText;
              }

              if (interview.isInterviewer()) {
                interview.intervieweeFeedback = intervieweeFeedback;
                interview.intervieweeFeedback.writtenFeedback = mdText;
              }

              interview.save();
            }}
          ></SaveButton>
        </div>
      </div>
    </ScheduleDetailsContainer_>
  );
}
