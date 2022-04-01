import './skills.scss';
import React from 'react';
import EditButton from 'shared/edit-button/edit-button';

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
  let skills = props.skills as Array<string>;

  // If the user has not selected any of the skills assign a default value
  // to it.
  if (!skills) {
    skills = [];
  }
  const skillComponents = skills.map((skill, index) => (
    <Skill_ value={skill} key={`${index}`} />
  ));
  return (
    <div className="profile-skills mb-5">
      <h4 className="text-primary mb-2">
        {' '}
        Skills
        <EditButton />{' '}
      </h4>{' '}
      {skillComponents}
    </div>
  );
}
