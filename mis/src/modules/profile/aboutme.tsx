import './aboutme.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';
import {useAppDispatch} from 'state/hooks';
import {updateAboutMe} from 'state/actions/users';

export default function AboutMe(props: {
  aboutMe: string;
  canEdit?: boolean;
  isfirstTimeLogin: boolean;
}): JSX.Element {
  const [isEdit, setEdit] = useState(props.isfirstTimeLogin);
  const [aboutMeText, setAboutMeText] = useState(props.aboutMe ?? '');

  const dispatch = useAppDispatch();

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    console.log('on save', aboutMeText);
    if (props.aboutMe == aboutMeText) {
      setEdit(false);
      return;
    }
    dispatch(updateAboutMe(aboutMeText));
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
            {(props.canEdit ?? false) &&
              (isEdit ? (
                <SaveButton onClick={onSave} />
              ) : (
                <EditButton onClick={onEdit} />
              ))}{' '}
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
            <p className="mb-2">{aboutMeText}</p>
          )}
        </div>{' '}
      </div>{' '}
    </>
  );
}
