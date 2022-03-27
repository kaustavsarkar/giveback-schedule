import './profile.scss';
import {UserProfile} from 'models/user';
import React from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';

export default function ProfilePage(): JSX.Element {
  const userProfile = useAppSelector(
    (state: RootState) => state.user,
  ) as UserProfile;
  const profile = userProfile.user.photoUrl as string;
  const name = userProfile.user.name as string;
  const email = userProfile.user.email as string;
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="profile card card-body px-3 pt-3 pb-0">
          <div className="profile-head">
            <div className="photo-content">
              <div className="cover-photo"> </div>
            </div>{' '}
            <div className="profile-info">
              <div className="profile-photo">
                <img
                  src={profile}
                  className="img-fluid rounded-circle"
                  alt="profile"
                />
              </div>{' '}
              <div className="profile-details">
                <div className="profile-name px-3 pt-2">
                  <h4 className="mb-0"> {name} </h4> <p> UX / UI Designer </p>{' '}
                </div>{' '}
                <div className="profile-email px-2 pt-2">
                  <h4 className="text-muted mb-0">{email}</h4> <p> Email </p>{' '}
                </div>{' '}
              </div>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
