import './create-schedule.scss';
import React, {useState} from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import SelectOptions from './select-options';
import {DateRangePicker, Progress} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {DateRange} from 'rsuite/esm/DateRangePicker';

export default function CreateSchedule(): JSX.Element {
  // Progress for each section shall be considered as 25% since we have only
  // 4 sections. Every section receives equal weightage.
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState(new Set<string>());
  const [days, setDays] = useState(new Set<string>());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const allSkills = useAppSelector(
    (state: RootState) => state.skills,
  ) as Array<string>;

  const onSkillUpdate: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => handleMultiSelect(skills, setSkills, event);

  const onDaysUpdate: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => handleMultiSelect(days, setDays, event);

  const handleMultiSelect = (
    set: Set<string>,
    setSet: React.Dispatch<React.SetStateAction<Set<string>>>,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isChecked = event.target.checked;
    const value = event.target.value;
    console.log('got value, ', value, ' is checked', isChecked);
    console.log(set);
    if (isChecked) {
      // Check if we already have selected Options. If options are already
      // selected, no need to change the progress. Otherwise add to progress.
      // Ensure progress does not go beyond 100.
      if (set.size == 0 && progress < 100) {
        setProgress(progress + 25);
      }

      setSet(new Set(set).add(value));
    } else {
      const newSet = new Set(set);
      newSet.delete(value);
      setSet(new Set(newSet));

      // If user disselects all the options then make the progress go 0.
      // Make sure the value of progress does not go below zero.
      if (set.size == 1 && progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  const handleDateSelect = (value: DateRange | null) => {
    if (value) {
      if (progress < 100 && (startDate == null || endDate == null)) {
        setProgress(progress + 25);
      }
      setStartDate(value[0]);
      setEndDate(value[1]);
    } else {
      setStartDate(null);
      setEndDate(null);

      if (progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  const handleTimeSelect = (value: DateRange | null) => {
    if (value) {
      if (progress < 100 && (startTime == 0 || endTime == 0)) {
        setProgress(progress + 25);
      }
      setStartTime(value[0].getTime());
      setEndTime(value[1].getTime());
    } else {
      setStartTime(0);
      setEndTime(0);

      if (progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  const {combine, beforeToday, after} = DateRangePicker;
  const today = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setDate(today.getDate() + 90);

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
                  onChange={onDaysUpdate}
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
                <DateRangePicker
                  limitEndYear={1}
                  onChange={handleDateSelect}
                  disabledDate={combine?.(
                    beforeToday?.(),
                    after?.(threeMonthsFromNow),
                  )}
                />
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
                <DateRangePicker
                  format="HH:mm:ss"
                  ranges={[]}
                  onChange={handleTimeSelect}
                />
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
