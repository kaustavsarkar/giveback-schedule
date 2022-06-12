import {Schedule} from 'models/schedule';
import React from 'react';

export function ScheduleCard(props: {schedule: Schedule}): JSX.Element {
  const schedule = props.schedule;
  return (
    <>
      <div className="col-xxl-4 col-lg-4 col-md-6 col-sm-6">
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
                  {schedule.interviewee ?? 'Yet to schedule'}{' '}
                </span>{' '}
              </li>{' '}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
