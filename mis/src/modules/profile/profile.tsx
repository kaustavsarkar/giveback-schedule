import './profile.scss';
import {UserProfile} from 'models/user';
import React from 'react';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import ProfileHead from './profile-head';

export default function ProfilePage(): JSX.Element {
  const userProfile = useAppSelector(
    (state: RootState) => state.user,
  ) as UserProfile;
  const profilePhoto = userProfile.user.photoUrl as string;
  const name = userProfile.user.name as string;
  const email = userProfile.user.email as string;
  return <ProfileHead profilePhoto={profilePhoto} name={name} email={email} />;
}
