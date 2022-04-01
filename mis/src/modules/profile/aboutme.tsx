import './aboutme.scss';
import React from 'react';

export default function AboutMe(props: {aboutMe: string}): JSX.Element {
  return (
    <>
      <div className="profile-about-me">
        <div className="pt-4 border-bottom-1 pb-3">
          <h4 className="text-primary"> About Me </h4>{' '}
          <p className="mb-2">{props.aboutMe}</p>{' '}
        </div>{' '}
      </div>{' '}
    </>
  );
}
