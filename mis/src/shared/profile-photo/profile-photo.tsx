import React from 'react';

export default function ProfilePhoto(props: {photoUrl?: string}): JSX.Element {
  return (
    <div className="profile-photo">
      <img
        src={props.photoUrl}
        className="img-fluid rounded-circle"
        onError={({currentTarget}) => {
          console.log('failed to load image');
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = '/profile_pic_ph.png';
        }}
        alt="profile"
      />
    </div>
  );
}
