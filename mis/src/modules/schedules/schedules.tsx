import './schedules.scss';
import {User} from 'models/user';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import CreateButton from 'shared/create-button/create-buton';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import {ScheduleCard} from './schedule-card';

export default function Schedules(): JSX.Element {
  const navigate = useNavigate();
  const user = useAppSelector(
    (state: RootState) => state.userProfile.user,
  ) as User;

  const schedules = [...(user.schedules ?? [])].sort(
    (sch1, sch2) =>
      new Date(sch1.startTime).getTime() - new Date(sch2.startTime).getTime(),
  );

  const futureSchedules = schedules
    .filter((sch) => new Date(sch.startTime).getTime() >= new Date().getTime())
    .map((sch) => <ScheduleCard key={sch.startTime} schedule={sch} />);

  const pastSchedules = schedules
    .filter((sch) => new Date(sch.startTime).getTime() < new Date().getTime())
    .map((sch) => <ScheduleCard key={sch.startTime} schedule={sch} />);

  return (
    <div className="schedules">
      <div className="schedule-btns">
        {user.isInterviewer && (
          <div className="create-sch-btn">
            <CreateButton onClick={() => navigate(`create`)} />
          </div>
        )}
        <div className="create-sch-btn">
          <CreateButton text="Book" onClick={() => navigate(`book`)} />
        </div>
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
