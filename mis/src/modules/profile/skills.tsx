import './skills.scss';
import React, {useState} from 'react';
import EditButton from 'shared/edit-button/edit-button';
import SaveButton from 'shared/save-button/save-button';
import {useAppDispatch} from 'state/hooks';
import {getAllSkills} from 'state/actions/skills';
import Select from 'react-select';
import SelectOption, {defaultOptionsStyle} from 'models/select-options';

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

function EditSkills_(props: {
  existingSkills: Array<SelectOption>;
  allSkills: Array<SelectOption>;
}): JSX.Element {
  console.log(
    'existing skills',
    props.existingSkills,
    'all skills',
    props.allSkills,
  );
  return (
    <Select
      closeMenuOnSelect={false}
      isSearchable
      defaultValue={props.existingSkills}
      isMulti
      name="skills"
      styles={defaultOptionsStyle}
      options={props.allSkills}
    ></Select>
  );
}

export default function Skills(props: {
  existingSkills: Array<string>;
  allSkills: Array<string>;
}): JSX.Element {
  const [isEdit, setEdit] = useState(false);
  let existingSkills = props.existingSkills as Array<string>;
  const allSkills = props.allSkills;

  console.log('skills component', allSkills, existingSkills);

  const dispatch = useAppDispatch();

  // If the user has not selected any of the skills assign a default value
  // to it.
  if (!existingSkills) {
    existingSkills = Array<string>();
  }

  const onSave: React.MouseEventHandler<HTMLDivElement> = () => {
    console.log('saving skills');
    setEdit(false);
  };

  const onEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    dispatch(getAllSkills(allSkills.length < 1));
    setEdit(true);
  };

  const skillComponents = isEdit ? (
    <></>
  ) : (
    existingSkills.map((skill, index) => (
      <Skill_ value={skill} key={`${index}`} />
    ))
  );

  const allSkillsOption = isEdit
    ? allSkills.map(mapSkillToOption_)
    : Array<SelectOption>();

  const existingSkillsOption = isEdit
    ? existingSkills.map(mapSkillToOption_)
    : Array<SelectOption>();

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
      {isEdit ? (
        <EditSkills_
          allSkills={allSkillsOption}
          existingSkills={existingSkillsOption}
        />
      ) : (
        skillComponents
      )}
    </div>
  );
}

function mapSkillToOption_(skill: string): SelectOption {
  return {label: skill, value: skill} as SelectOption;
}
