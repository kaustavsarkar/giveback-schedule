import {Schedule} from 'models/schedule';
import React from 'react';
import {Link} from 'react-router-dom';

function PersonLink_(props: {email: string}): JSX.Element {
  console.log(props.email);
  return (
    <Link to={`/profile/${props.email}`} target="_blank">
      {props.email}{' '}
    </Link>
  );
}

export function ScheduleCard(props: {
  schedule: Schedule;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element {
  const schedule = props.schedule;
  return (
    <>
      <div
        className="col-xxl-4 col-lg-4 col-md-6 col-sm-6"
        onClick={props.onClick}
      >
        <div className="card">
          <div className="card-header align-items-start">
            <h6 className="heading">{schedule.date}</h6>
            <div className="skills">{schedule.skills.skills.join(' ')}</div>
          </div>
          <div className="card-body p-0 pb-3">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="mb-0 title"> Start Time </span> :{' '}
                <span className="ml-2">
                  {' '}
                  {new Date(schedule.startTime).toLocaleString()}{' '}
                </span>{' '}
              </li>{' '}
              <li className="list-group-item">
                <span className="mb-0 title"> End Time </span> :{' '}
                <span className="ml-2">
                  {' '}
                  {new Date(schedule.endTime).toLocaleString()}{' '}
                </span>{' '}
              </li>{' '}
              <li className="list-group-item">
                <span className="mb-0 title"> Interviewee </span> :{' '}
                <span className="ml-2">
                  {' '}
                  {schedule.interviewee?.email ? (
                    <PersonLink_ email={schedule.interviewer?.email} />
                  ) : (
                    'Yet to schedule'
                  )}{' '}
                </span>{' '}
              </li>{' '}
              <li className="list-group-item">
                <span className="mb-0 title"> Interviewer </span> :{' '}
                <span className="ml-2">
                  {' '}
                  <PersonLink_ email={schedule.interviewer?.email} />{' '}
                </span>{' '}
              </li>{' '}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
