import './personal-info.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';

export default function PersonalInfo(props: {
  name: string;
  email: string;
  organisation?: string;
  designation?: string;
  yoe?: string;
}): JSX.Element {
  const [isEdit, setEdit] = useState(false);

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(false);
  };

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  return (
    <div className="profile-personal-info">
      <h4 className="text-primary mb-4">
        Personal Information{' '}
        {isEdit ? (
          <SaveButton onClick={onSave} />
        ) : (
          <EditButton onClick={onEdit} />
        )}
      </h4>{' '}
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
            Organisation <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.organisation ?? 'n/a'} </span>{' '}
        </div>{' '}
      </div>{' '}
      <div className="row mb-2">
        <div className="col-4">
          <h5 className="f-w-500">
            {' '}
            Designation <span className="pull-right">: </span>
          </h5>
        </div>{' '}
        <div className="col-8">
          <span> {props.designation ?? 'n/a'}</span>{' '}
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
