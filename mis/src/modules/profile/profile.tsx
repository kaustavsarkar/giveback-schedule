import './profile.scss';
import {User, UserProfile} from 'models/user';
import React from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import ProfileHead from './profile-head';
import ScheduleAgg from './schedule-agg';
import AboutMe from './aboutme';
import Skills from './skills';
import Languages from './languages';
import PersonalInfo from './personal-info';

export default function ProfilePage(): JSX.Element {
  const userProfile = useAppSelector(
    (state: RootState) => state.userProfile,
  ) as UserProfile;
  console.log('Profile Page', userProfile);
  const profilePhoto = userProfile.user.photoUrl as string;
  const user = userProfile.user as User;
  const name = user.name as string;
  const email = user.email as string;
  const designation = user.designation as string;
  const skills = user.skills as Array<string>;
  const languages = user.languages as Array<string>;
  const aboutMe = user.aboutMe as string;
  return (
    <>
      {' '}
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
              <div id="about-me" className="tab-pane aboutMe">
                <AboutMe aboutMe={aboutMe} />
                <Skills skills={skills} />
                <Languages languages={languages} />
                <PersonalInfo name={name} email={email} />
              </div>
            </div>{' '}
          </div>{' '}
        </div>{' '}
        <div className="col-xl-4">
          <div className="row">
            <div className="col-lg-12">
              <ScheduleAgg totalScheduled={10} />
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
    </>
  );
}
