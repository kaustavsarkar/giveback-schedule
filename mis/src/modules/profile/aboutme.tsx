import './aboutme.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';
import {useAppDispatch} from 'state/hooks';
import {updateUserThunk} from 'state/actions/users';

export default function AboutMe(props: {aboutMe: string}): JSX.Element {
  const [isEdit, setEdit] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');

  const dispatch = useAppDispatch();

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    console.log('on save');
    dispatch(updateUserThunk());
    setEdit(false);
  };

  const onAboutMeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMeText(event.target.value);
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
            <textarea
              autoFocus
              value={aboutMeText}
              onChange={onAboutMeChange}
              className="form-control mt-2"
            >
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
