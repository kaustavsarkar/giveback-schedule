import './profile-head.scss';
import React from 'react';
import SaveButton from 'shared/save-button/save-button';
import EditButton from 'shared/edit-button/edit-button';
import {useNavigate} from 'react-router-dom';

interface Props_ {
  profilePhoto?: string;
  name?: string;
  email?: string;
  designation?: string;
  showingSchedules?: boolean;
}

export default function ProfileHead({
  profilePhoto,
  name,
  email,
  designation,
  showingSchedules,
}: Props_): JSX.Element {
  const navigate = useNavigate();
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
                  src={profilePhoto}
                  className="img-fluid rounded-circle"
                  onError={(event) => {
                    const {currentTarget} = event;
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = '/profile_pic_ph.png';
                  }}
                  alt="profile"
                />
              </div>{' '}
              <div className="profile-details">
                <div className="profile-name px-3 pt-2">
                  <h4 className="mb-0"> {name} </h4>{' '}
                  <p> {designation ?? 'n/a'} </p>{' '}
                </div>{' '}
                <div className="profile-email px-2 pt-2">
                  <h4 className="text-muted mb-0">{email}</h4> <p> Email </p>{' '}
                </div>{' '}
              </div>{' '}
              <div className="check-schedules">
                {!showingSchedules ? (
                  <SaveButton
                    text="Check Schedules"
                    onClick={() => navigate(`/profile/${email}/book`)}
                  />
                ) : (
                  <EditButton
                    text="Hide Schedules"
                    onClick={() => navigate(`/profile/${email}`)}
                  />
                )}
              </div>
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
