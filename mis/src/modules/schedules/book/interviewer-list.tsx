import './interviewer-list.scss';
import React from 'react';
import ProfileCard from 'shared/profile-card/profile-card';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';

export default function InterviewerList(props: {
  interviewers: string[];
}): JSX.Element {
  const me = useAppSelector((state: RootState) => state.userProfile.user.email);
  const interviewers = props.interviewers;
  console.log(interviewers);

  const interviewerCards = interviewers
    .filter((interviewer) => interviewer != me)
    .map((interviewer) => (
      <ProfileCard email={interviewer} key={interviewer} />
    ));

  console.log(interviewerCards);
  return <div className="row interviewers">{interviewerCards}</div>;
}
