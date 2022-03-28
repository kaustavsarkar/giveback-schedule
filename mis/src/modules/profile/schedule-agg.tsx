import './schedule-agg.scss';
import React from 'react';

interface Props_ {
  totalScheduled?: number;
  completed?: number;
  upcoming?: number;
}

export default function ScheduleAgg({
  totalScheduled,
  completed,
  upcoming,
}: Props_): JSX.Element {
  return (
    <div className="card">
      <div className="card-body">
        <div className="profile-statistics">
          <div className="text-center">
            <div className="row">
              <div className="col">
                <h3 className="m-b-0"> {totalScheduled ?? 'N/A'} </h3>
                <span>Scheduled</span>
              </div>{' '}
              <div className="col">
                <h3 className="m-b-0"> {completed ?? 'N/A'} </h3>{' '}
                <span>Completed</span>
              </div>{' '}
              <div className="col">
                <h3 className="m-b-0"> {upcoming ?? 'N/A'} </h3>{' '}
                <span>Upcoming</span>
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
