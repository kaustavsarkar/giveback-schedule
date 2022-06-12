import './profile.scss';
import {User} from 'models/user';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import ProfileHead from './profile-head';
import ScheduleAgg from './schedule-agg';
import AboutMe from './aboutme';
import Skills from './skills';
import PersonalInfo from './personal-info';
import {useLocation, useParams} from 'react-router-dom';
import {getUserData} from 'services/user-service';
import LoadingIndicator from 'shared/loading-indicator/loading-indicator';

function ProfileInfo_(props: {
  profileUser: User;
  allSkills: Array<string>;
  canEdit: boolean;
}): JSX.Element {
  const skills = props.profileUser?.skills as Array<string>;
  const aboutMe = props.profileUser?.aboutMe as string;
  const organisation = props.profileUser?.organisation as string;
  const yoe = props.profileUser?.yearsOfExperience as number;
  const name = props.profileUser?.name;
  const email = props.profileUser?.email;
  const designation = props.profileUser?.designation;

  return (
    <div id="about-me" className="tab-pane aboutMe">
      <AboutMe aboutMe={aboutMe} canEdit={props.canEdit} />
      <Skills
        existingSkills={skills}
        allSkills={props.allSkills}
        canEdit={props.canEdit}
      />
      <PersonalInfo
        name={name}
        email={email}
        designation={designation}
        organisation={organisation}
        yoe={yoe}
        canEdit={props.canEdit}
      />
    </div>
  );
}

export default function ProfilePage(): JSX.Element {
  const [profileUser, setProfileUser] = useState<User>();
  const loggedInUser = useAppSelector(
    (state: RootState) => state.userProfile.user,
  ) as User;
  const location = useLocation();
  const params = useParams();
  const emailParam = params.email;
  const canEdit = emailParam !== undefined && emailParam === loggedInUser.email;

  useEffect(() => {
    if (emailParam !== undefined && emailParam !== loggedInUser.email) {
      getUserData(emailParam).then((response) => setProfileUser(response));
    } else {
      setProfileUser(loggedInUser);
    }
  }, [emailParam]);

  console.log(location, params.email, profileUser);

  console.log('profile page got the following userProfile: ', profileUser);

  const allSkills = useAppSelector(
    (state: RootState) => state.skills,
  ) as Array<string>;
  console.log('Profile Page', profileUser);
  const profilePhoto = profileUser?.photoUrl as string;
  const name = profileUser?.name as string;
  const email = profileUser?.email as string;
  const designation = profileUser?.designation as string;
  const totalSchedules = profileUser?.totalSchedules;
  const futureSchedules = profileUser?.schedules?.filter(
    (sch) => new Date(sch.startTime).getTime() >= new Date().getTime(),
  ).length;
  return (
    <>
      {profileUser ? (
        <div>
          <ProfileHead
            profilePhoto={profilePhoto}
            name={name}
            email={email}
            designation={designation}
          />
          <div className="row">
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body">
                  <ProfileInfo_
                    profileUser={profileUser}
                    canEdit={canEdit}
                    allSkills={allSkills}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="row">
                <div className="col-lg-12">
                  <ScheduleAgg
                    totalScheduled={totalSchedules}
                    upcoming={futureSchedules}
                  />
                </div>
              </div>
            </div>
          </div>{' '}
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
}
