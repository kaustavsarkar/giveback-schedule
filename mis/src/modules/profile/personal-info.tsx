import './personal-info.scss';
import React from 'react';

export default function PersonalInfo(props: {
  name: string;
  email: string;
  age?: string;
  yoe?: string;
}): JSX.Element {
  return (
    <div className="profile-personal-info">
      <h4 className="text-primary mb-4">Personal Information </h4>{' '}
      <div className="row mb-2">
        <div className="col-4">
          <h5 className="f-w-500">
            {' '}
            Name <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.name} </span>{' '}
        </div>{' '}
      </div>{' '}
      <div className="row mb-2">
        <div className="col-4">
          <h5 className="f-w-500">
            {' '}
            Email <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.email} </span>{' '}
        </div>{' '}
      </div>{' '}
      <div className="row mb-2">
        <div className="col-4">
          <h5 className="f-w-500">
            {' '}
            Age <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.age ?? 'n/a'} </span>{' '}
        </div>{' '}
      </div>{' '}
      <div className="row mb-2">
        <div className="col-4">
          <h5 className="f-w-500">
            {' '}
            Years of Experience <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.yoe ?? 'n/a'} Years of Experiences </span>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
