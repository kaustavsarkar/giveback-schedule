import './skills.scss';
import React from 'react';

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
  const skillComponents = props.skills.map((skill, index) => (
    <Skill_ value={skill} key={`${index}`} />
  ));
  return (
    <div className="profile-skills mb-5">
      <h4 className="text-primary mb-2"> Skills </h4> {skillComponents}
    </div>
  );
}
