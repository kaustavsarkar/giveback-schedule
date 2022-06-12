import './personal-info.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';
import {useAppDispatch} from 'state/hooks';
import {updatePersonalInfo} from 'state/actions/users';

export default function PersonalInfo(props: {
  name: string;
  email: string;
  organisation?: string;
  designation?: string;
  yoe?: number;
  canEdit?: boolean;
}): JSX.Element {
  const [isEdit, setEdit] = useState(false);
  const [organisation, setOrganisation] = useState(props.organisation ?? '');
  const [designation, setDesignation] = useState(props.designation ?? '');
  const [yoe, setYoe] = useState(props.yoe ?? '0');

  const dispatch = useAppDispatch();

  const isInfoSame = () =>
    props.organisation === organisation &&
    props.designation === designation &&
    props.yoe === yoe;

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(false);
    if (isInfoSame()) {
      return;
    }
    const yoeNumber = Number(yoe) == NaN ? 0 : Number(yoe);
    dispatch(updatePersonalInfo(designation, organisation, yoeNumber));
  };

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  const onDesignationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setDesignation(event.target.value.trim());
  };

  const onOrganisationUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOrganisation(event.target.value.trim());
  };

  const onYoeUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setYoe(event.target.value.trim());
  };

  return (
    <div className="profile-personal-info">
      <h4 className="text-primary mb-4">
        Personal Information{' '}
        {props.canEdit &&
          (isEdit ? (
            <SaveButton onClick={onSave} />
          ) : (
            <EditButton onClick={onEdit} />
          ))}
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
          <span>
            {' '}
            {isEdit ? (
              <input
                type="text"
                className="form-control"
                placeholder="Organisation"
                name="organisation"
                value={organisation ?? ''}
                onChange={onOrganisationUpdate}
              />
            ) : (
              organisation
            )}{' '}
          </span>{' '}
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
          <span>
            {' '}
            {isEdit ? (
              <input
                type="text"
                className="form-control"
                placeholder="Designation"
                name="designation"
                value={designation ?? ''}
                onChange={onDesignationUpdate}
              />
            ) : (
              designation
            )}
          </span>{' '}
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
          <span>
            {' '}
            {isEdit ? (
              <input
                type="number"
                step="0.1"
                className="form-control"
                placeholder="Years of Experience"
                name="yoe"
                value={yoe ?? ''}
                onChange={onYoeUpdate}
              />
            ) : (
              yoe
            )}{' '}
            {isEdit ? '' : ' Years of Experiences'}
          </span>{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
