import './skills.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';

interface ISkill {
  value: string;
}

function Skill_(skill: ISkill): JSX.Element {
  return (
    <div className="btn btn-primary light btn-xs mb-1 mr-1">
      {' '}
      {skill.value}{' '}
    </div>
  );
}

export default function Skills(props: {skills: Array<string>}): JSX.Element {
  const [isEdit, setEdit] = useState(false);
  let skills = props.skills as Array<string>;

  // If the user has not selected any of the skills assign a default value
  // to it.
  if (!skills) {
    skills = [];
  }
  const skillComponents = skills.map((skill, index) => (
    <Skill_ value={skill} key={`${index}`} />
  ));

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(false);
  };

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setEdit(true);
  };

  return (
    <div className="profile-skills mb-5">
      <h4 className="text-primary mb-2">
        {' '}
        Skills
        {isEdit ? (
          <SaveButton onClick={onSave} />
        ) : (
          <EditButton onClick={onEdit} />
        )}{' '}
      </h4>{' '}
      {skillComponents}
    </div>
  );
}
