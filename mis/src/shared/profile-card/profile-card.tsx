import './profile-card.scss';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'state/hooks';
import {getInterviewerSchedule} from 'state/actions/users';
import {RootState} from 'state/store';
import {useNavigate} from 'react-router-dom';
import ProfilePhoto from 'shared/profile-photo/profile-photo';

export default function ProfileCard(props: {email: string}): JSX.Element {
  const email = props.email;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) =>
    state.interviewersSchedules.find((schedule) => schedule.email === email),
  );
  const navigate = useNavigate();

  useEffect(() => {
    !user && dispatch(getInterviewerSchedule(email, !user));
  }, []);

  const showSchedules = () => {
    navigate(`/profile/${user?.email}/book`);
  };

  const futureSchedules = user?.schedules?.filter(
    (sch) => new Date(sch.startTime).getTime() >= new Date().getTime(),
  ).length;
  return (
    <div
      className="profile-card col-xl-3 col-xxl-4 col-lg-4 col-md-6 col-sm-6"
      onClick={showSchedules}
    >
      <div className="card">
        <div className="card-header align-items-start">
          <ProfilePhoto photoUrl={user?.photoUrl} />
        </div>
        <div className="card-body p-0 pb-3">
          <h6 className="heading">{user?.name}</h6>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="mb-0 title"> Organisation: </span> :{' '}
              <span className="ml-2"> {user?.organisation} </span>{' '}
            </li>{' '}
            <li className="list-group-item">
              <span className="mb-0 title"> Designation </span> :{' '}
              <span className="ml-2"> {user?.designation} </span>{' '}
            </li>{' '}
            <li className="list-group-item">
              <span className="mb-0 title"> Skills </span> :{' '}
              <span className="ml-2"> {user?.skills?.join(', ')} </span>{' '}
            </li>{' '}
            <li className="list-group-item">
              <span className="mb-0 title"> Experience </span> :{' '}
              <span className="ml-2"> {user?.yearsOfExperience} </span>{' '}
            </li>{' '}
            <li className="list-group-item">
              <span className="mb-0 title"> Upcoming Interviews </span> :{' '}
              <span className="ml-2"> {futureSchedules} </span>{' '}
            </li>{' '}
          </ul>
        </div>
      </div>
    </div>
  );
}
