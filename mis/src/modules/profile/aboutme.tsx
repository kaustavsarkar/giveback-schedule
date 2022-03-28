import './aboutme.scss';
import React from 'react';
import Skills from './skills';
import Languages from './languages';
import PersonalInfo from './personal-info';
import {User} from 'models/user';

export default function AboutMe(props: {user: User}): JSX.Element {
  const skills = ['DSA', 'System Design'] as Array<string>;
  const languages = ['English', 'Hindi', 'Bangla'];
  return (
    <div id="about-me" className="tab-pane aboutMe">
      <div className="profile-about-me">
        <div className="pt-4 border-bottom-1 pb-3">
          <h4 className="text-primary"> About Me </h4>{' '}
          <p className="mb-2">
            A wonderful serenity has taken possession of my entire soul, like
            these sweet mornings of spring which I enjoy with my whole heart.I
            am alone, and feel the charm of existence was created for the bliss
            of souls like mine.I am so happy, my dear friend, so absorbed in the
            exquisite sense of mere tranquil existence, that I neglect my
            talents.{' '}
          </p>{' '}
          <p>
            A collection of textile samples lay spread out on the table-Samsa
            was a travelling salesman-and above it there hung a picture that he
            had recently cut out of an illustrated magazine and housed in a
            nice, gilded frame.{' '}
          </p>{' '}
        </div>{' '}
      </div>{' '}
      <Skills skills={skills} />
      <Languages languages={languages} />
      <PersonalInfo name={props.user.name} email={props.user.email} />
    </div>
  );
}
