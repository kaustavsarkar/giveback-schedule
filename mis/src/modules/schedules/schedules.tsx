import './schedules.scss';
import {Schedule} from 'models/schedule';
import {User} from 'models/user';
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import CreateButton from 'shared/create-button/create-buton';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';

const Schedule_ = (props: {schedule: Schedule}): JSX.Element => {
  const schedule = props.schedule;
  return (
    <>
      <div className="col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6">
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
};

export default function Schedules(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(
    (state: RootState) => state.userProfile.user,
  ) as User;

  const schedules = [...(user.schedules ?? [])].sort(
    (sch1, sch2) =>
      new Date(sch1.startTime).getTime() - new Date(sch2.startTime).getTime(),
  );

  const futureSchedules = schedules
    .filter((sch) => new Date(sch.startTime).getTime() >= new Date().getTime())
    .map((sch) => <Schedule_ key={sch.startTime} schedule={sch} />);

  const pastSchedules = schedules
    .filter((sch) => new Date(sch.startTime).getTime() < new Date().getTime())
    .map((sch) => <Schedule_ key={sch.startTime} schedule={sch} />);

  return (
    <div className="schedules">
      <div className="create-sch-btn">
        <CreateButton onClick={() => navigate(`create`)} />
      </div>
      <div>
        <h4 className="schedules-heading">
          <span>Upcoming Interviews</span>
        </h4>
        <div className="row schedule">{futureSchedules}</div>
      </div>
      <div>
        <h4 className="schedules-heading">
          <span>Past Interviews</span>
        </h4>
        <div className="row schedule">{pastSchedules}</div>
      </div>
    </div>
  );
}
