import './profile.scss';
import {UserProfile} from 'models/user';
import React from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import ProfileHead from './profile-head';
import ScheduleAgg from './schedule-agg';
import AboutMe from './aboutme';

export default function ProfilePage(): JSX.Element {
  const userProfile = useAppSelector(
    (state: RootState) => state.user,
  ) as UserProfile;
  const profilePhoto = userProfile.user.photoUrl as string;
  const name = userProfile.user.name as string;
  const email = userProfile.user.email as string;
  return (
    <>
      {' '}
      <ProfileHead profilePhoto={profilePhoto} name={name} email={email} />
      <div className="row">
        <div className="col-xl-8">
          <div className="card">
            <div className="card-body">
              <AboutMe user={userProfile.user} />
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className="col-xl-4">
          <div className="row">
            <div className="col-lg-12">
              <ScheduleAgg totalScheduled={10} />
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </>
  );
}
