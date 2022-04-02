import './aboutme.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';

export default function AboutMe(props: {aboutMe: string}): JSX.Element {
  const [isEdit, setEdit] = useState(false);

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(false);
  };

  return (
    <>
      <div className="profile-about-me">
        <div className="pt-4 border-bottom-1 pb-3">
          <h4 className="text-primary">
            {' '}
            About Me{' '}
            {isEdit ? (
              <SaveButton onClick={onSave} />
            ) : (
              <EditButton onClick={onEdit} />
            )}{' '}
          </h4>{' '}
          {isEdit ? (
            <textarea autoFocus className="form-control mt-2">
              {' '}
            </textarea>
          ) : (
            <p className="mb-2">{props.aboutMe}</p>
          )}
        </div>{' '}
      </div>{' '}
    </>
  );
}
