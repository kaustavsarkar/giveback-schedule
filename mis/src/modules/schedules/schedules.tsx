import './schedules.scss';
import {User} from 'models/user';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CreateButton from 'shared/create-button/create-buton';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import {ScheduleCard} from './schedule-card';
import Header from 'modules/header/header';
import {Button, Modal} from 'rsuite';
import {Interview, Schedule} from 'models/schedule';

export default function Schedules(): JSX.Element {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Interview>();
  const navigate = useNavigate();
  const user = useAppSelector(
    (state: RootState) => state.userProfile.user,
  ) as User;

  const handleStartSchedule = (schedule: Schedule) => {
    setOpenDetails(true);
    setSelectedSchedule(new Interview(schedule, user));
  };

  const schedules = [...(user.schedules ?? [])]
    .sort(
      (sch1, sch2) =>
        new Date(sch1.startTime).getTime() - new Date(sch2.startTime).getTime(),
    )
    .map((sch) => new Interview(sch, user));

  const futureSchedules = schedules
    .filter((sch) => sch.isFutureInterview())
    .map((sch) => (
      <ScheduleCard
        key={sch.endTime}
        schedule={sch}
        onClick={() => handleStartSchedule(sch)}
      />
    ));

  const pastSchedules = schedules
    .filter((sch) => sch.isPastInterview())
    .map((sch) => (
      <ScheduleCard
        key={sch.endTime}
        schedule={sch}
        onClick={() => handleStartSchedule(sch)}
      />
    ));

  return (
    <>
      <Header user={user} />
      <div className="schedules">
        <div className="schedule-btns">
          {user.isInterviewer && (
            <div className="create-sch-btn">
              <CreateButton onClick={() => navigate(`create`)} />
            </div>
          )}
          <div className="create-sch-btn">
            <CreateButton text="Book" onClick={() => navigate(`book`)} />
          </div>
        </div>
        <div>
          <h4 className="schedules-heading">
            <span>Upcoming Interviews</span>
          </h4>
          <div className="row schedule">{futureSchedules}</div>
        </div>
        <div>
          <h4 className="schedules-heading">
            <span>Past Interviews</span>
          </h4>
          <div className="row schedule">{pastSchedules}</div>
        </div>
      </div>
      <Modal open={openDetails} onClose={() => setOpenDetails(false)}>
        <Modal.Header>
          <Modal.Title>{selectedSchedule?.scheduleModalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedSchedule?.scheduleModalBody()}</Modal.Body>

        <Modal.Footer>
          {selectedSchedule?.isInterviewScheduled() && (
            <Button
              onClick={() => navigate(`details/${selectedSchedule?.id}`)}
              appearance="primary"
            >
              Ok
            </Button>
          )}

          <Button onClick={() => setOpenDetails(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
