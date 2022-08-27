import './create-schedule.scss';
import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import SelectOptions from './select-options';
import {Button, DateRangePicker, Modal, Progress} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import {DateRange} from 'rsuite/esm/DateRangePicker';
import CreateButton from 'shared/create-button/create-buton';
import {Schedule} from 'models/schedule';
import {Skills} from 'models/skills';
import {User, UserProfile} from 'models/user';
import {updateSchedules} from 'state/actions/users';
import {useNavigate} from 'react-router-dom';
import Header from 'modules/header/header';
import {nanoid} from '@reduxjs/toolkit';
type Time = [number, number] | null;

const week: {[key: number]: string} = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Webnesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

export default function CreateSchedule(): JSX.Element {
  // Progress for each section shall be considered as 25% since we have only
  // 4 sections. Every section receives equal weightage.
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState(new Set<string>());
  const [days, setDays] = useState(new Set<string>());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Time>(null);
  const [endTime, setEndTime] = useState<Time>(null);
  const [showModal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const allSkills = useAppSelector(
    (state: RootState) => state.skills,
  ) as Array<string>;
  const userProfile = useAppSelector(
    (state: RootState) => state.userProfile,
  ) as UserProfile;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      const sDate = getDateWithoutTime(value[0]);
      const eDate = getDateWithoutTime(value[1]);
      setStartDate(sDate);
      setEndDate(eDate);
    } else {
      setStartDate(null);
      setEndDate(null);

      if (progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  const getDateWithoutTime = (date: Date): Date => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  const handleTimeSelect = (value: DateRange | null) => {
    if (value) {
      if (progress < 100 && (startTime == null || endTime == null)) {
        setProgress(progress + 25);
      }
      setStartTime([value[0].getHours(), value[0].getMinutes()]);
      setEndTime([value[1].getHours(), value[1].getMinutes()]);
    } else {
      setStartTime(null);
      setEndTime(null);

      if (progress > 0) {
        setProgress(progress - 25);
      }
    }
  };

  const {combine, beforeToday, after} = DateRangePicker;
  const today = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setDate(today.getDate() + 90);

  const uploadSchedules = () => {
    setLoading(true);
    if (
      endDate == null ||
      startDate == null ||
      startTime == null ||
      endTime == null
    ) {
      return;
    }
    console.log(startDate, endDate);
    const date = new Date(startDate);
    const dateSchedules = new Map<Date, Array<Schedule>>();
    const allSchedules = Array<Schedule>();

    // Generate Skills.
    const selectedSkills: Skills = {
      skills: Array.from(skills),
    };

    // Generate all dates
    while (endDate >= date) {
      console.log(date);
      // Check if the selected date has the selected day as well.
      const day = date.getDay() as number;
      if (days.has(week[day])) {
        // Generate Start Time.
        const sTime = new Date(date);
        sTime.setHours(startTime[0]);
        sTime.setMinutes(startTime[1]);

        // Generate end time.
        const eTime = new Date(date);
        eTime.setHours(endTime[0]);
        eTime.setMinutes(endTime[1]);

        // Set details of the interviewer.
        const interviewer: User = {
          email: userProfile.user.email,
          name: userProfile.user.name,
          photoUrl: userProfile.user.photoUrl,
        };

        // Set scheduling details.
        const schedule: Schedule = {
          id: nanoid(),
          interviewer: interviewer,
          date: new Date(date).toDateString(),
          startTime: sTime.toUTCString(),
          endTime: eTime.toUTCString(),
          skills: selectedSkills,
        };
        allSchedules.push(schedule);

        if (!dateSchedules.has(date)) {
          dateSchedules.set(new Date(date), new Array<Schedule>());
        }
        dateSchedules.get(date)?.push(schedule);
      }
      date?.setDate(date.getDate() + 1);
    }

    console.log(allSchedules, dateSchedules);

    // Dispatch an action to update the schedules for a user.
    allSchedules.length > 0 &&
      dispatch(updateSchedules(allSchedules))
        .then(() => {
          setModal(false);
          navigate('/schedules');
        })
        .finally(() => setLoading(false));
  };

  return (
    <>
      <Header user={userProfile.user} />
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
                    options={Object.values(week)}
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
                    format="HH:mm"
                    ranges={[]}
                    onChange={handleTimeSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {progress == 100 ? (
          <div className="create-btn">
            <CreateButton onClick={() => setModal(true)} />
          </div>
        ) : (
          <div className="col sched-progress">
            <Progress.Circle
              percent={progress}
              strokeColor="#34c3ff"
            ></Progress.Circle>
          </div>
        )}
        <Modal open={showModal} onClose={() => setModal(false)}>
          <Modal.Header>
            <Modal.Title>Verify Schedule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <strong>For Skills</strong> &nbsp; {Array.from(skills).join(', ')}
            </div>
            <div>
              <strong>Interviews shall be scheduled on</strong> &nbsp;{' '}
              {Array.from(days).join(', ')}
            </div>
            <div>
              <strong>
                {startDate?.toDateString() +
                  ` through ` +
                  endDate?.toDateString()}
              </strong>
            </div>
            <div>
              Between preferred time of <strong>{startTime?.join(':')}</strong>{' '}
              and <strong>{endTime?.join(':')}</strong>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="ghost"
              color="orange"
              active
              onClick={() => setModal(false)}
            >
              Edit
            </Button>
            <Button
              appearance="primary"
              color="orange"
              active
              onClick={uploadSchedules}
              loading={isLoading}
            >
              Upload Schedules
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
