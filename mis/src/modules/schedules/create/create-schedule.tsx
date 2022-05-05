import './create-schedule.scss';
import React from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import SelectOptions from './select-skills';
import {DateRangePicker} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function CreateSchedule(): JSX.Element {
  const allSkills = useAppSelector(
    (state: RootState) => state.skills,
  ) as Array<string>;
  return (
    <div className="create-sch">
      <div className="row">
        <div className="col-xl-8 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> Grill with Skills (Required) </h4>{' '}
            </div>{' '}
            <div className="card-body">
              <SelectOptions options={allSkills}></SelectOptions>
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
  );
}
