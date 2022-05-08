import './create-schedule.scss';
import React, {useState} from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import SelectOptions from './select-skills';
import {DateRangePicker, Progress} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function CreateSchedule(): JSX.Element {
  // Progress for each section shall be considered as 25% since we have only
  // 4 sections. Every section receives equal weightage.
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState(new Set<string>());

  const allSkills = useAppSelector(
    (state: RootState) => state.skills,
  ) as Array<string>;

  const onSkillUpdate: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    console.log('got value, ', value, ' is checked', isChecked);
    console.log(skills);
    if (isChecked) {
      // Check if we already have selected Skills. If skills are already
      // selected, no need to change the progress. Otherwise add to progress.
      // Ensure progress does not go beyond 100.
      if (skills.size == 0 && progress < 100) {
        setProgress(progress + 25);
      }

      setSkills(new Set(skills).add(value));
    } else {
      const newSkills = new Set(skills);
      newSkills.delete(value);
      setSkills(new Set(newSkills));

      // If user disselects all the skills then make the progress go 0.
      // Make sure the value of progress does not go below zero.
      if (skills.size == 1 && progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  return (
    <div className="create-sch row">
      <div className="col">
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Grill with Skills (Required) </h4>{' '}
              </div>{' '}
              <div className="card-body">
                <SelectOptions
                  options={allSkills}
                  onChange={onSkillUpdate}
                ></SelectOptions>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Say Hey to Day (Required) </h4>{' '}
              </div>{' '}
              <div className="card-body">
                <SelectOptions
                  options={[
                    'Monday',
                    'Tuesday',
                    'Webnesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ]}
                ></SelectOptions>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Which Date Mate (Required) </h4>{' '}
              </div>{' '}
              <div className="card-body">
                <DateRangePicker />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-6">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title"> Crime Time? (Required) </h4>{' '}
              </div>{' '}
              <div className="card-body">
                <DateRangePicker format="HH:mm:ss" ranges={[]} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col sched-progress">
        <Progress.Circle
          percent={progress}
          strokeColor="#34c3ff"
        ></Progress.Circle>
      </div>
    </div>
  );
}
